using GradGo.DTOs;
using GradGo.Models;

namespace GradGo.Mappers
{
    public static class CountryMapper
    {
        public static CountryDto ToDto(this Country country)
        {
            return new CountryDto(
                country.Id,
                country.CountryCode,
                country.Name,
                country.PhoneCode,
                country.CurrencyCode,
                country.CurrencySymbol
            );
        }

        public static Country ToCountry(this CountryCreateDto dto)
        {
            return new Country
            {
                CountryCode = dto.CountryCode,
                Name = dto.Name,
                PhoneCode = dto.PhoneCode,
                CurrencyCode = dto.CurrencyCode,
                CurrencySymbol = dto.CurrencySymbol
            };
        }

        public static void UpdateCountryFromDto(this Country country, CountryUpdateDto dto)
        {
            if (dto.CountryCode is not null)
                country.CountryCode = dto.CountryCode;

            if (dto.Name is not null)
                country.Name = dto.Name.Trim();

            if (dto.PhoneCode is not null)
                country.PhoneCode = dto.PhoneCode;

            if (dto.CurrencyCode is not null)
                country.CurrencyCode = dto.CurrencyCode;

            if (dto.CurrencySymbol is not null)
                country.CurrencySymbol = dto.CurrencySymbol;
        }
    }
}