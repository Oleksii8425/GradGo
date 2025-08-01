using GradGo.Data;
using GradGo.DTOs;
using GradGo.Mappers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
namespace GradGo.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class EmployersController : ControllerBase
    {
        private readonly AppDbContext _context;

        public EmployersController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<EmployerDto>>> GetEmployers()
        {
            var employers = await _context.Employers
                .Include(e => e.Country)
                .Select(e => e.ToDto())
                .ToListAsync();

            return Ok(employers);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<EmployerDto>> GetEmployerById(Guid id)
        {
            var employer = await _context.Employers
                .Include(e => e.Country)
                .SingleOrDefaultAsync(e => e.Id == id);

            if (employer is null)
                return NotFound();

            return Ok(employer.ToDto());
        }

        [HttpPost]
        public async Task<IActionResult> CreateEmployer([FromBody] EmployerCreateDto dto)
        {
            var employer = dto.ToEmployer();

            _context.Add(employer);
            await _context.SaveChangesAsync();

            var savedEmployer = await _context.Employers
                .Include(e => e.Country)
                .FirstOrDefaultAsync(e => e.Id == employer.Id);

            return CreatedAtAction(nameof(GetEmployerById), new { id = employer.Id }, savedEmployer!.ToDto());
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateEmployer(Guid id, [FromBody] EmployerUpdateDto dto)
        {
            var employer = await _context.Employers
                .Include(e => e.Country)
                .SingleOrDefaultAsync(e => e.Id == id);

            if (employer is null)
                return NotFound();

            employer.UpdateFromDto(dto);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEmployer(Guid id)
        {
            var employer = await _context.Employers.FindAsync(id);

            if (employer is null)
                return NotFound();

            _context.Employers.Remove(employer);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}