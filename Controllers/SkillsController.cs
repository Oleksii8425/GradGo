using GradGo.Data;
using GradGo.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace GradGo.Controllers;

[ApiController]
[Route("[controller]")]
public class SkillsController : ControllerBase
{
    private readonly AppDbContext _context;

    public SkillsController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet(Name = "GetSkills")]
    public async Task<ActionResult<List<Skill>>> GetAll() =>
        await _context.Skills.ToListAsync();

    [HttpGet("{id}", Name = "GetSkillById")]
    public async Task<ActionResult<Skill>> Get(int id)
    {
        var skill = await _context.Skills.FindAsync(id);

        if (skill == null)
            return NotFound();

        return skill;
    }
}
