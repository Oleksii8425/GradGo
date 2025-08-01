using GradGo.Data;
using GradGo.DTOs;
using GradGo.Mappers;
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
    public async Task<ActionResult<List<JobDto>>> GetAll()
    {
        var jobs = await _context.Jobs
            .AsNoTracking()
            .Include(j => j.Employer)
            .Include(j => j.Country)
            .Include(j => j.Skills)
            .Include(j => j.Applications)
            .AsSplitQuery()
            .ToListAsync();

        var response = jobs.Select(j => j.ToDto()).ToList();

        return Ok(response);
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
        _logger.LogWarning("dto.Skills:");
        foreach (var skill in dto.Skills)
        {
            _logger.LogWarning(skill.ToString());
        }

        var skills = await _context.Skills
            .Where(s => dto.Skills.Contains(s.Id))
            .ToHashSetAsync();

        _logger.LogWarning("skills:");
        foreach (var skill in skills)
        {
            _logger.LogWarning("skill " + skill.Id + ": " + skill.Title);
        }

        var job = dto.ToJob();
        job.Skills = skills;

        _context.Add(job);
        await _context.SaveChangesAsync();

        var savedjob = await _context.Jobs
            .AsNoTracking()
            .Where(j => j.Id == job.Id)
            .Include(j => j.Employer)
            .Include(j => j.Skills)
            .Include(j => j.Country)
            .Include(j => j.Applications)
            .SingleAsync();

        return CreatedAtAction(nameof(GetJobById), new { id = job.Id }, savedjob.ToDto());
    }

    [HttpPut]
    public async Task<IActionResult> UpdateJob(int id, [FromBody] JobUpdateDto dto)
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
    public async Task<IActionResult> DeleteJob(int id)
    {
        var job = await _context.Jobs.FindAsync(id);

        if (job is null)
            return NotFound();

        _context.Jobs.Remove(job);
        await _context.SaveChangesAsync();

        return NoContent();
    }
}
