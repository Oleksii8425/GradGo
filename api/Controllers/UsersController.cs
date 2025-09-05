using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using GradGo.Data;
using GradGo.DTOs;
using GradGo.Mappers;
using GradGo.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

namespace GradGo.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly UserManager<User> _userManager;
        private readonly IEmailSender _emailSender;
        private readonly IConfiguration _configuration;
        private readonly CookieOptions REFRESH_TOKEN_OPTIONS = new CookieOptions
        {
            HttpOnly = true,
            Secure = true,
            SameSite = SameSiteMode.None, // dev only
            Expires = DateTime.UtcNow.AddDays(7)
        };

        public UsersController(
            AppDbContext context,
            UserManager<User> userManager,
            IEmailSender emailSender,
            IConfiguration configuration)
        {
            _context = context;
            _userManager = userManager;
            _emailSender = emailSender;
            _configuration = configuration;
        }

        [HttpGet]
        public async Task<ActionResult<List<UserDto>>> GetUsers()
        {
            var res = await _userManager.Users.ToListAsync();
            return Ok(res);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<UserDto>> GetUserById(Guid id)
        {
            var user = await _context.Users
                .Include(u => u.Country)
                .FirstOrDefaultAsync(u => u.Id == id);

            if (user == null)
                return BadRequest(new { message = "User with such ID doesn't exist." });

            UserDto res;

            if (user.Role == UserRole.BaseUser)
            {
                res = user.ToDto();
            }
            else if (user.Role == UserRole.Employer)
            {
                res = ((Employer)user).ToDto();
            }
            else if (user.Role == UserRole.Jobseeker)
            {
                res = ((Jobseeker)user).ToDto();
            }
            else
            {
                return BadRequest(new { message = "Unknown user type" });
            }

            return Ok(res);
        }

        [HttpPost("register/employer")]
        public async Task<ActionResult<EmployerDto>> RegisterEmployer(EmployerCreateDto dto)
        {
            var employer = dto.ToEmployer();

            var result = await _userManager.CreateAsync(employer, dto.Password);
            if (!result.Succeeded)
                return BadRequest(result.Errors);

            await SendEmailAsync(employer);

            return Ok(new { message = "User registered successfully. Please check your email to confirm your account." });
        }

        [HttpPost("register/jobseeker")]
        public async Task<ActionResult<JobseekerDto>> RegisterJobseeker(JobseekerCreateDto dto)
        {
            var jobseeker = dto.ToJobseeker();

            var result = await _userManager.CreateAsync(jobseeker, dto.Password);
            if (!result.Succeeded)
                return BadRequest(result.Errors);

            await SendEmailAsync(jobseeker);

            return Ok(new { message = "User registered successfully. Please check your email to confirm your account." });
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(UserLoginDto dto)
        {
            var user = await _context.Users
                .Include(u => u.Country)
                .FirstOrDefaultAsync(u => u.Email == dto.Email);

            if (user == null)
                return Unauthorized(new { message = "Invalid email or password" });

            var isPasswordValid = await _userManager.CheckPasswordAsync(user, dto.Password);
            if (!isPasswordValid)
                return Unauthorized(new { message = "Invalid email or password" });

            if (!await _userManager.IsEmailConfirmedAsync(user))
            {
                await SendEmailAsync(user);
                return BadRequest(new { message = "Email not confirmed. Please check your inbox." });
            }

            var accessToken = GenerateJwtToken(user);
            var refreshToken = Guid.NewGuid().ToString();
            user.RefreshToken = refreshToken;
            user.RefreshTokenExpiryTime = DateTime.UtcNow.AddDays(7);

            await _userManager.UpdateAsync(user);

            Response.Cookies.Append("refreshToken", refreshToken, REFRESH_TOKEN_OPTIONS);

            UserDto res = user.Role switch
            {
                UserRole.BaseUser => user.ToDto(),
                UserRole.Employer => ((Employer)user).ToDto(),
                UserRole.Jobseeker => ((Jobseeker)user).ToDto(),
                _ => throw new Exception("Unknown user type")
            };

            return Ok(new { Token = accessToken, User = res });
        }

        [HttpPost("refresh-token")]
        public async Task<IActionResult> RefreshToken()
        {
            var refreshToken = Request.Cookies["refreshToken"];

            if (string.IsNullOrEmpty(refreshToken))
                return Unauthorized(new { message = "No refresh token provided" });

            var user = await _userManager.Users
                .Include(u => u.Country)
                .FirstOrDefaultAsync(u => u.RefreshToken == refreshToken);

            if (user == null || user.RefreshTokenExpiryTime <= DateTime.UtcNow)
                return Unauthorized(new { message = "Invalid or expired refresh token" });

            var newAccessToken = GenerateJwtToken(user);
            var userDto = user.Role switch
            {
                UserRole.BaseUser => user.ToDto(),
                UserRole.Employer => ((Employer)user).ToDto(),
                UserRole.Jobseeker => ((Jobseeker)user).ToDto(),
                _ => throw new Exception("Unknown user type")
            };

            return Ok(new { token = newAccessToken, user = userDto });
        }

        [HttpPost("logout")]
        public async Task<IActionResult> Logout()
        {
            var refreshToken = Request.Cookies["refreshToken"];
            if (!string.IsNullOrEmpty(refreshToken))
            {
                var user = await _context.Users.FirstOrDefaultAsync(u => u.RefreshToken == refreshToken);
                if (user != null)
                {
                    user.RefreshToken = "";
                    user.RefreshTokenExpiryTime = DateTime.MinValue;
                    await _context.SaveChangesAsync();
                }
            }

            Response.Cookies.Delete("refreshToken");
            return Ok(new { message = "Logged out" });
        }


        [HttpGet("confirm-email")]
        public async Task<IActionResult> ConfirmEmail(Guid userId, string token)
        {
            var user = await _userManager.FindByIdAsync(userId.ToString());
            if (user == null)
                return BadRequest(new { message = "Invalid user ID" });

            var result = await _userManager.ConfirmEmailAsync(user, token);
            if (!result.Succeeded)
                return BadRequest(new { message = "Email confirmation failed" });

            return Ok(new { message = "Email confirmed successfully" });
        }

        private async Task SendEmailAsync(User user)
        {
            var token = await _userManager.GenerateEmailConfirmationTokenAsync(user);

            var confirmationLink = Url.Action(
                "ConfirmEmail",
                "Users",
                new { userId = user.Id, token },
                Request.Scheme
            );

            await _emailSender.SendEmailAsync(
                user.Email!,
                "Confirm your email",
                $"Please confirm your account by clicking this link: <a href='{confirmationLink}'>Confirm Email</a>"
            );
        }

        private string GenerateJwtToken(User user)
        {
            var jwtSettings = _configuration.GetSection("Jwt");

            var claims = new Claim[]
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Email, user.Email!),
                new Claim(ClaimTypes.Role, user.Role.ToString())
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt__Key"]!));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: jwtSettings["Issuer"],
                audience: jwtSettings["Audience"],
                claims: claims,
                expires: DateTime.UtcNow.AddSeconds(20),
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}