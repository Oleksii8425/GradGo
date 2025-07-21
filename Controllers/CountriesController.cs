using GradGo.Data;
using GradGo.DTOs;
using GradGo.Mappers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace GradGo.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CountriesController : ControllerBase
    {
        private readonly AppDbContext _context;

        public CountriesController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<CountryDto>> GetCountries()
        {
            var countries = await _context.Countries
                .Select(c => c.ToDto())
                .AsNoTracking()
                .ToListAsync();

            return Ok(countries);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<CountryDto>> GetCountryById(int id)
        {
            var country = await _context.Countries.FindAsync(id);

            if (country is null)
                return NotFound();

            return Ok(country.ToDto());
        }

        [HttpPost]
        public async Task<IActionResult> CreateCountry([FromBody] CountryCreateDto dto)
        {
            var country = dto.ToCountry();

            _context.Countries.Add(country);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetCountryById), new { id = country.Id }, country.ToDto());
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateCountry(int id, [FromBody] CountryUpdateDto dto)
        {
            var country = await _context.Countries.FindAsync(id);

            if (country is null)
                return NotFound();

            country.UpdateCountryFromDto(dto);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCountry(int id)
        {
            var country = await _context.Countries.FindAsync(id);

            if (country is null)
                return NotFound();

            _context.Countries.Remove(country);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}