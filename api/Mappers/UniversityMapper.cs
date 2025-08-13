using GradGo.DTOs;
using GradGo.Models;

namespace GradGo.Mappers
{
    public static class UniversityMapper
    {
        public static UniversityDto ToDto(this University university)
        {
            return new UniversityDto(
                university.Id,
                university.Name,
                university.City,
                university.Country.ToDto()
            );
        }

        public static University ToUniversity(this UniversityCreateDto dto)
        {
            return new University
            {
                Name = dto.Name,
                City = dto.City,
                CountryId = dto.CountryId
            };
        }

        public static void UpdateUniversityFromDto(this University university, UniversityUpdateDto dto)
        {
            if (dto.Name != null) university.Name = dto.Name;
            if (dto.City != null) university.City = dto.City;
            if (dto.CountryId.HasValue) university.CountryId = dto.CountryId.Value;
        }
    }
}
