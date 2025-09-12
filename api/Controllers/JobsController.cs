using GradGo.Data;
using GradGo.DTOs;
using GradGo.Mappers;
using GradGo.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace GradGo.Controllers;

[ApiController]
[Route("[controller]")]
public class JobsController : ControllerBase
{
    private readonly AppDbContext _context;
    private readonly ILogger<JobsController> _logger;

    public JobsController(AppDbContext context, ILogger<JobsController> logger)
    {
        _context = context;
        _logger = logger;
    }

    [HttpGet]
    public async Task<ActionResult<List<JobDto>>> GetAll(
        [FromQuery] List<string>? keywords,
        [FromQuery] int? countryId,
        [FromQuery] JobType? type,
        [FromQuery] int? minSalary,
        [FromQuery] string? city,
        [FromQuery] Degree? requiredDegree
    )
    {
        var query = _context.Jobs
            .AsNoTracking()
            .Include(j => j.Employer)
            .Include(j => j.Country)
            .Include(j => j.Skills)
            .Include(j => j.Applications)
            .AsSplitQuery()
            .AsQueryable();

        if (keywords is not null && keywords.Count > 0)
        {
            foreach (var k in keywords)
            {
                var pattern = $"%{k}%";
                query = query.Where(j =>
                    EF.Functions.ILike(j.Employer.Name, pattern) ||
                    EF.Functions.ILike(j.Title, pattern) ||
                    EF.Functions.ILike(j.Description, pattern) ||
                    j.Skills.Any(s => EF.Functions.ILike(s.Title, pattern))
                );
            }
        }

        if (countryId is not null)
        {
            query = query.Where(j => j.CountryId == countryId);
        }

        if (type is not null)
        {
            query = query.Where(j => j.Type == type);
        }

        if (minSalary is not null)
        {
            query = query.Where(j => j.Salary >= minSalary);
        }

        if (city is not null)
        {
            query = query.Where(j => EF.Functions.ILike(j.City, city));
        }

        if (requiredDegree is not null)
        {
            query = query.Where(j => j.RequiredDegree == requiredDegree);
        }

        var jobs = await query
            .Select(j => j.ToDto())
            .ToListAsync();

        return Ok(jobs);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<JobDto>> GetJobById(Guid id)
    {
        var job = await _context.Jobs
            .AsNoTracking()
            .Where(j => j.Id == id)
            .Include(j => j.Employer)
            .Include(j => j.Country)
            .Include(j => j.Skills)
            .Include(j => j.Applications)
            .AsSplitQuery()
            .SingleOrDefaultAsync();

        if (job is null)
            return NotFound();

        return Ok(job.ToDto());
    }

    [HttpPost]
    public async Task<ActionResult<JobDto>> CreateJob([FromBody] JobCreateDto dto)
    {
        var job = dto.ToJob();

        if (dto.Skills is not null)
        {
            var skills = await _context.Skills
                .Where(s => dto.Skills.Contains(s.Id))
                .ToHashSetAsync();

            job.Skills = skills;
        }

        if (dto.Applications is not null)
        {
            var applications = await _context.Applications
                .Where(a => dto.Applications.Contains(a.Id))
                .ToHashSetAsync();

            job.Applications = applications;
        }

        _context.Jobs.Add(job);
        await _context.SaveChangesAsync();

        var savedjob = await _context.Jobs
            .AsNoTracking()
            .Include(j => j.Employer)
                .ThenInclude(e => e.Country)
            .Include(j => j.Country)
            .Include(j => j.Skills)
            .Include(j => j.Applications)
            .AsSplitQuery()
            .FirstOrDefaultAsync(j => j.Id == job.Id);

        return CreatedAtAction(nameof(GetJobById), new { id = job.Id }, savedjob!.ToDto());
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateJob(Guid id, [FromBody] JobUpdateDto dto)
    {
        var job = await _context.Jobs.FindAsync(id);

        if (job is null)
            return NotFound();

        job.UpdateJobFromDto(dto);

        if (dto.Skills != null)
        {
            var skills = await _context.Skills
                .Where(s => dto.Skills.Contains(s.Id))
                .ToListAsync();

            job.Skills = skills;
        }

        await _context.SaveChangesAsync();

        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteJob(Guid id)
    {
        var job = await _context.Jobs.FindAsync(id);

        if (job is null)
            return NotFound();

        _context.Jobs.Remove(job);
        await _context.SaveChangesAsync();

        return NoContent();
    }
}
