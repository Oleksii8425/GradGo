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

    [HttpGet]
    public async Task<ActionResult<List<Skill>>> GetAll() =>
        await _context.Skills.ToListAsync();

    [HttpGet("{id}")]
    public async Task<ActionResult<Skill>> Get(int id)
    {
        var skill = await _context.Skills.FindAsync(id);

        if (skill == null)
            return NotFound();

        return skill;
    }

    [HttpPost]
    public async Task<IActionResult> CreateSkill(Skill skill)
    {
        _context.Skills.Add(skill);
        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateException)
        {
            var skillExists = await _context.Skills.AnyAsync(s => s.Title == skill.Title);
            if (skillExists)
                return BadRequest("Skill already exists.");
            else
                throw;
        }

        return CreatedAtAction(nameof(Get), new { id = skill.Id }, skill);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateSkill(int id, Skill skill)
    {
        if (id != skill.Id)
            return BadRequest();

        _context.Entry(skill).State = EntityState.Modified;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            var skillExists = await _context.Skills.AnyAsync(s => s.Id == id);
            if (!skillExists)
                return NotFound();
            else
                throw;
        }

        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteSkill(int id)
    {
        var skill = await _context.Skills.FindAsync(id);
        if (skill == null)
            return NotFound();

        _context.Skills.Remove(skill);
        await _context.SaveChangesAsync();

        return NoContent();
    }
}
