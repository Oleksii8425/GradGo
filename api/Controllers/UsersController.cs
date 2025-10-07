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

        private readonly CookieOptions REFRESH_TOKEN_OPTIONS = new()
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
            var users = await _userManager.Users.ToListAsync();
            return Ok(users.Select(u => u.ToDto()).ToList());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<UserDto>> GetUserById(Guid id)
        {
            var user = await _context.Users
                .Include(u => u.Country)
                .FirstOrDefaultAsync(u => u.Id == id);

            if (user == null)
                return NotFound(new { message = "User with such ID doesn't exist." });

            var dto = await MapUserToDtoAsync(user);
            return Ok(dto);
        }

        [HttpPost("register/employer")]
        public async Task<ActionResult> RegisterEmployer(EmployerCreateDto dto)
        {
            var employer = dto.ToEmployer();
            var result = await _userManager.CreateAsync(employer, dto.Password);

            if (!result.Succeeded)
                return BadRequest(result.Errors);

            await SendEmailAsync(employer);

            return Ok(new { message = "User registered successfully. Please check your email to confirm your account." });
        }

        [HttpPost("register/jobseeker")]
        public async Task<ActionResult> RegisterJobseeker(JobseekerCreateDto dto)
        {
            var jobseeker = dto.ToJobseeker();

            if (dto.Skills is not null)
            {
                jobseeker.Skills = await _context.Skills
                    .Where(s => dto.Skills.Contains(s.Id))
                    .ToListAsync();
            }

            if (dto.Courses is not null)
            {
                jobseeker.Courses = await _context.Courses
                    .Where(c => dto.Courses.Contains(c.Id))
                    .ToListAsync();
            }

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

            if (user == null || !await _userManager.CheckPasswordAsync(user, dto.Password))
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

            var dtoRes = await MapUserToDtoAsync(user);

            return Ok(new { token = accessToken, user = dtoRes });
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
            var dto = await MapUserToDtoAsync(user);

            return Ok(new { token = newAccessToken, user = dto });
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
                    user.RefreshToken = string.Empty;
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

        // Private Helpers

        private async Task<UserDto> MapUserToDtoAsync(User user)
        {
            return user.Role switch
            {
                UserRole.BaseUser => user.ToDto(),
                UserRole.Employer => (await LoadEmployerAsync(user.Id)).ToDto(),
                UserRole.Jobseeker => (await LoadJobseekerAsync(user.Id)).ToDto(),
                _ => throw new Exception("Unknown user type")
            };
        }

        private async Task<Employer> LoadEmployerAsync(Guid userId)
        {
            var employer = await _context.Employers
                .Include(e => e.Country)
                .Include(e => e.Jobs)
                    .ThenInclude(j => j.Country)
                .Include(e => e.Jobs)
                    .ThenInclude(j => j.Applications)
                .Include(e => e.Jobs)
                    .ThenInclude(j => j.Skills)
                .AsSplitQuery()
                .FirstOrDefaultAsync(e => e.Id == userId);

            return employer ?? throw new Exception("Employer not found");
        }

        private async Task<Jobseeker> LoadJobseekerAsync(Guid userId)
        {
            var jobseeker = await _context.Jobseekers
                .Include(j => j.Country)
                .Include(j => j.Skills)
                .Include(j => j.Courses)
                .Include(j => j.Applications)
                    .ThenInclude(a => a.Job)
                        .ThenInclude(j => j.Employer)
                .AsSplitQuery()
                .FirstOrDefaultAsync(j => j.Id == userId);

            return jobseeker ?? throw new Exception("Jobseeker not found");
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

            var claims = new[]
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
                expires: DateTime.UtcNow.AddMinutes(15), // extended from 20s
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
