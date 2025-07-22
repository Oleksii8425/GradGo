using GradGo.Data;
using GradGo.DTOs;
using GradGo.Mappers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace GradGo.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UniversitiesController : ControllerBase
    {
        private readonly AppDbContext _context;

        public UniversitiesController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<UniversityDto>>> GetUniversities()
        {
            var universities = await _context.Universities
                .Include(u => u.Country)
                .Select(u => u.ToDto())
                .AsSplitQuery()
                .ToListAsync();

            return Ok(universities);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<IEnumerable<UniversityDto>>> GetUniversityById(Guid id)
        {
            var university = await _context.Universities
                .Include(u => u.Country)
                .SingleOrDefaultAsync(u => u.Id == id);

            if (university is null)
                return NotFound();

            return Ok(university.ToDto());
        }

        [HttpPost]
        public async Task<ActionResult<UniversityDto>> CreateUniversity([FromBody] UniversityCreateDto dto)
        {
            var university = dto.ToUniversity();
            
            _context.Universities.Add(university);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetUniversityById), new { id = university.Id }, university.ToDto());
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUniversity(Guid id, [FromBody] UniversityUpdateDto dto)
        {
            var university = await _context.Universities.FindAsync(id);

            if (university is null)
                return NotFound();

            university.UpdateUniversityFromDto(dto);

            _context.Universities.Update(university);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUniversity(Guid id)
        {
            var university = await _context.Universities.FindAsync(id);

            if (university is null)
                return NotFound();

            _context.Universities.Remove(university);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}