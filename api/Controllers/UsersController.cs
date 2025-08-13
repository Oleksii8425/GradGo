using System.Linq;
using System.Threading.Tasks;
using GradGo.Data;
using GradGo.DTOs;
using GradGo.Mappers;
using GradGo.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace GradGo.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly AppDbContext _context;

        public UsersController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<UserDto>>> GetUsers()
        {
            var jobseekerDtos = await _context.Jobseekers
                .Include(e => e.Country)
                .Select(j => (UserDto)j.ToDto())
                .ToListAsync();

            var employerDtos = await _context.Employers
                .Include(e => e.Country)
                .Select(e => (UserDto)e.ToDto())
                .ToListAsync();

            var res = jobseekerDtos.Concat(employerDtos).ToList();
            return Ok(res);
        }


        [HttpGet("{id}")]
        public async Task<ActionResult<UserDto>> GetUserById(Guid id)
        {
            var user = await _context.Users
                .Include(u => u.Country)
                .FirstOrDefaultAsync(u => u.Id == id);

            UserDto res;

            if (user is Jobseeker jobseeker)
            {
                res = jobseeker.ToDto();
            }
            else if (user is Employer employer)
            {
                res = employer.ToDto();
            }
            else
            {
                return BadRequest("Unknown user type");
            }

            return Ok(res);
        }
    }
}