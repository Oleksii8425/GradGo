using GradGo.Data;
using GradGo.DTOs;
using GradGo.Mappers;
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
    public async Task<ActionResult<List<SkillDto>>> GetAllSkills()
    {
        var skills = await _context.Skills
            .AsNoTracking()
            .Select(s => s.ToSkillDto())
            .ToListAsync();

        return Ok(skills);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<SkillDto>> GetSkill(int id)
    {
        var skill = await _context.Skills
            .AsNoTracking()
            .Where(s => s.Id == id)
            .Select(s => s.ToSkillDto())
            .FirstOrDefaultAsync();

        if (skill is null)
            return NotFound();

        return Ok(skill);
    }

    [HttpPost]
    public async Task<ActionResult<SkillDto>> CreateSkill(SkillCreateDto dto)
    {
        var exists = await _context.Skills
            .AnyAsync(s => s.Title == dto.Title);

        if (exists)
            return BadRequest(new { message = "Skill with this title already exists." });

        var skill = new Skill { Title = dto.Title };

        _context.Skills.Add(skill);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetSkill), new { id = skill.Id }, skill.ToSkillDto());
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateSkill(int id, SkillUpdateDto dto)
    {
        var skill = await _context.Skills.FindAsync(id);

        if (skill is null)
            return NotFound();

        skill.UpdateSkillFromDto(dto);

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateException)
        {
            if (await _context.Skills.AnyAsync(s => s.Id != id && s.Title == dto.Title))
                return BadRequest(new { message = "Another skill with this title already exists." });

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
