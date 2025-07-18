using GradGo.Data;
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

    [HttpGet(Name = "GetJobs")]
    public async Task<ActionResult<List<Job>>> GetAll() =>
        await _context.Jobs.ToListAsync();

    [HttpGet("{id}", Name = "GetJobById")]
    public async Task<ActionResult<Job>> GetJobById(int id)
    {
        var job = await _context.Jobs.FindAsync(id);

        if (job == null)
            return NotFound();

        return Ok(job);
    }

    [HttpGet("search", Name = "GetJobsBySkills")]
    public async Task<ActionResult<List<Job>>> GetJobsBySkills([FromQuery] List<string> skills)
    {
        var jobs = await _context.Jobs
            .Where(j => j.Skills.Any(s => skills.Contains(s.Title)))
            .ToListAsync();

        return Ok(jobs);
    }
}
