using GradGo.Data;
using GradGo.DTOs;
using GradGo.Mappers;
using GradGo.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace GradGo.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly UserManager<User> _userManager;
        private readonly IEmailSender _emailSender;

        public UsersController(AppDbContext context, UserManager<User> userManager, IEmailSender emailSender)
        {
            _context = context;
            _userManager = userManager;
            _emailSender = emailSender;
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

            if (user == null) return BadRequest("User with such ID doesn't exist.");

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
                return BadRequest("Unknown user type");
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

            return Ok(new { Message = "User registered successfully. Please check your email to confirm your account." });
        }

        [HttpPost("register/jobseeker")]
        public async Task<ActionResult<JobseekerDto>> RegisterJobseeker(JobseekerCreateDto dto)
        {
            var jobseeker = dto.ToJobseeker();

            var result = await _userManager.CreateAsync(jobseeker, dto.Password);
            if (!result.Succeeded)
                return BadRequest(result.Errors);

            await SendEmailAsync(jobseeker);

            return Ok(new { Message = "User registered successfully. Please check your email to confirm your account." });
        }

        [HttpGet("confirm-email")]
        public async Task<IActionResult> ConfirmEmail(Guid userId, string token)
        {
            var user = await _userManager.FindByIdAsync(userId.ToString());
            if (user == null) return BadRequest("Invalid user ID");

            var result = await _userManager.ConfirmEmailAsync(user, token);
            if (!result.Succeeded) return BadRequest("Email confirmation failed");

            return Ok("Email confirmed successfully");
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
    }
}