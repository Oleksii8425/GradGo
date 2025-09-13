using GradGo.Data;
using GradGo.DTOs;
using GradGo.Mappers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace GradGo.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ApplicationsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ApplicationsController(AppDbContext context, ILogger<JobsController> logger)
        {
            _context = context;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ApplicationDto>> GetApplication(Guid id)
        {
            var application = await _context.Applications
                .FirstOrDefaultAsync(a => a.Id == id);

            if (application is null)
                return NotFound();

            return Ok(application.ToDto());
        }

        [HttpPost]
        public async Task<IActionResult> CreateApplication([FromBody] ApplicationCreateDto dto)
        {
            var exists = await _context.Applications
                .AnyAsync(a => a.JobId == dto.JobId && a.JobseekerId == dto.JobseekerId);

            if (exists)
                return BadRequest(new { message = "User already applied to this job." });

            var application = dto.ToApplication();

            _context.Applications.Add(application);
            await _context.SaveChangesAsync();

            var savedApplication = await _context.Applications
                .Include(a => a.Job)
                .Include(a => a.Jobseeker)
                .FirstOrDefaultAsync(a => a.Id == application.Id);

            return CreatedAtAction(
                nameof(GetApplication),
                new { id = application.Id },
                application.ToDto()
            );
        }
    }
}