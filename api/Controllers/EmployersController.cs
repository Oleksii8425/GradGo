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

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateEmployer(Guid id, [FromBody] EmployerUpdateDto dto)
        {
            var employer = await _context.Employers
                .Include(e => e.Country)
                .Include(e => e.Jobs)
                    .ThenInclude(j => j.Country)
                .Include(e => e.Jobs)
                    .ThenInclude(j => j.Applications)
                .Include(e => e.Jobs)
                    .ThenInclude(j => j.Skills)
                .AsSplitQuery()
                .SingleOrDefaultAsync(e => e.Id == id);

            if (employer is null)
                return NotFound();

            List<Job>? jobs = null;

            if (dto.Jobs is not null)
            {
                jobs = await _context.Jobs
                    .Where(j => dto.Jobs.Contains(j.Id))
                    .ToListAsync();
            }

            employer.UpdateFromDto(dto, jobs);
            await _context.SaveChangesAsync();

            return Ok(employer.ToDto());
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