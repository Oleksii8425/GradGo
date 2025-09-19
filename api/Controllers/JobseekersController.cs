using GradGo.Data;
using GradGo.DTOs;
using GradGo.Mappers;
using GradGo.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
namespace GradGo.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class JobseekersController : ControllerBase
    {
        private readonly AppDbContext _context;

        public JobseekersController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<JobseekerDto>>> GetJobseekers()
        {
            var jobseekers = await _context.Jobseekers
                .Include(j => j.Country)
                .Include(j => j.Skills)
                .Include(j => j.Courses)
                .Include(j => j.Applications)
                    .ThenInclude(a => a.Job)
                .AsSplitQuery()
                .ToListAsync();

            return Ok(jobseekers.Select(j => j.ToDto()));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<JobseekerDto>> GetJobseekerById(Guid id)
        {
            var jobseeker = await _context.Jobseekers
                .Include(j => j.Country)
                .Include(j => j.Skills)
                .Include(j => j.Courses)
                .Include(j => j.Applications)
                    .ThenInclude(a => a.Job)
                .AsSplitQuery()
                .SingleOrDefaultAsync(j => j.Id == id);

            if (jobseeker is null)
                return NotFound();

            return Ok(jobseeker.ToDto());
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateJobseeker(Guid id, [FromBody] JobseekerUpdateDto dto)
        {
            var jobseeker = await _context.Jobseekers
                .Include(j => j.Country)
                .Include(j => j.Skills)
                .Include(j => j.Courses)
                .Include(j => j.Applications)
                    .ThenInclude(a => a.Job)
                .AsSplitQuery()
                .SingleOrDefaultAsync(j => j.Id == id);

            if (jobseeker is null)
                return NotFound();

            List<Skill>? skills = null;

            if (dto.Skills is not null)
            {
                skills = await _context.Skills
                    .Where(s => dto.Skills.Contains(s.Id))
                    .ToListAsync();
            }

            List<Course>? courses = null;

            if (dto.Courses is not null)
            {
                courses = await _context.Courses
                    .Where(c => dto.Courses.Contains(c.Id))
                    .ToListAsync();
            }
            
            List<Application>? applications = null;

            if (dto.Applications is not null)
            {
                applications = await _context.Applications
                    .Where(a => dto.Applications.Contains(a.Id))
                    .ToListAsync();
            }

            jobseeker.UpdateFromDto(dto, skills, courses, applications);
            await _context.SaveChangesAsync();

            return Ok(jobseeker.ToDto());
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteJobseeker(Guid id)
        {
            var jobseeker = await _context.Jobseekers.FindAsync(id);

            if (jobseeker is null)
                return NotFound();

            _context.Jobseekers.Remove(jobseeker);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}