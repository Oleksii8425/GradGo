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

        public ApplicationsController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<ApplicationDto>> GetApplications([FromQuery] Guid? jobseekerId)
        {
            var applications = _context.Applications
                .Include(a => a.Job)
                    .ThenInclude(j => j.Employer)
                .Include(a => a.Jobseeker)
                .AsQueryable();

            if (jobseekerId is not null)
            {
                applications = applications
                    .Where(a => a.Jobseeker.Id == jobseekerId);
            }

            var results = await applications
                .Select(a => a.ToDto(a.Job))
                .ToListAsync();

            return Ok(results);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ApplicationDto>> GetApplication(Guid id)
        {
            var application = await _context.Applications
                .Include(a => a.Job)
                .Include(a => a.Jobseeker)
                .FirstOrDefaultAsync(a => a.Id == id);

            if (application is null)
                return NotFound();

            return Ok(application.ToDto(application.Job));
        }

        [HttpPost]
        public async Task<IActionResult> CreateApplication([FromForm] ApplicationCreateDto dto)
        {
            var exists = await _context.Applications
                .AnyAsync(a => a.JobId == dto.JobId && a.JobseekerId == dto.JobseekerId);

            if (exists)
                return BadRequest(new { message = "User already applied to this job." });

            string cvKey = $"{dto.JobseekerId}/Applications/{dto.JobId}/{dto.Cv.FileName}";

            string? coverLetterKey = dto.CoverLetter != null
                ? $"{dto.JobseekerId}/Applications/{dto.JobId}/{dto.CoverLetter.FileName}"
                : null;

            // Create Application entity
            var application = dto.ToApplication();
            application.CvPath = cvKey;
            application.CoverLetterPath = coverLetterKey;

            _context.Applications.Add(application);
            await _context.SaveChangesAsync();

            var savedApplication = await _context.Applications
                .Include(a => a.Job)
                .Include(a => a.Jobseeker)
                .FirstOrDefaultAsync(a => a.Id == application.Id);

            return CreatedAtAction(
                nameof(GetApplication),
                new { id = application.Id },
                savedApplication!.ToDto(savedApplication!.Job)
            );
        }
    }
}