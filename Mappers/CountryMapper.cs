using GradGo.DTOs;
using GradGo.Models;

namespace GradGo.Mappers
{
    public static class CountryMapper
    {
        public static CountryDto ToDto(this Country country)
        {
            return new CountryDto(country.Id, country.Name);
        }

        public static Country ToCountry(this CountryCreateDto dto)
        {
            return new Country
            {
                PhoneCode = dto.PhoneCode,
                Name = dto.Name
            };
        }

        public static void UpdateCountryFromDto(this Country country, CountryUpdateDto dto)
        {
            if (dto.PhoneCode is not null)
                country.PhoneCode = dto.PhoneCode;

            if (dto.Name is not null)
                country.Name = dto.Name.Trim();
        }
    }
}