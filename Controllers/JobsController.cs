using System.Threading.Tasks;
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

    public JobsController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<List<JobDto>>> GetAll()
    {
        var jobs = await _context.Jobs
            .AsNoTracking()
            .Include(j => j.Skills)
            .Select(j => JobMapper.ToJobDto(j))
            .ToListAsync();

        return Ok(jobs);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<JobDto>> GetJobById(int id)
    {
        var job = await _context.Jobs
            .AsNoTracking()
            .Include(j => j.Skills)
            .SingleOrDefaultAsync(j => j.Id == id);

        if (job is null)
            return NotFound();

        var response = JobMapper.ToJobDto(job);

        return Ok(response);
    }

    [HttpPost]
    public async Task<ActionResult<JobDto>> CreateJob(JobCreateDto dto)
    {
        var skills = await _context.Skills
            .Where(s => dto.Skills.Contains(s.Id))
            .ToHashSetAsync();

        var job = new Job
        {
            EmployerId = dto.EmployerId,
            Description = dto.Description,
            Type = dto.Type,
            City = dto.City,
            Country = dto.Country,
            RequiredDegree = dto.RequiredDegree,
            Skills = skills
        };

        _context.Add(job);
        await _context.SaveChangesAsync();

        var result = JobMapper.ToJobDto(job);

        return CreatedAtAction(nameof(GetJobById), new { id = job.Id }, job);
    }

    [HttpPut]
    public async Task<IActionResult> FullUpdateJob(int id, JobUpdateDto dto)
    {
        var job = await _context.Jobs.FindAsync(id);

        if (job is null)
            return NotFound();

        var skills = await _context.Skills
            .Where(s => dto.Skills.Contains(s.Id))
            .ToListAsync();

        JobMapper.UpdateJobFromDto(job, dto, skills);

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
