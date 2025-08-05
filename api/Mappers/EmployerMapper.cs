using GradGo.DTOs;
using GradGo.Models;

namespace GradGo.Mappers
{
    public static class EmployerMapper
    {
        public static EmployerDto ToDto(this Employer employer)
        {
            return new EmployerDto
            (
                employer.Id,
                employer.Name,
                employer.City,
                employer.Country.Name,
                employer.StaffCount.GetDescription(),
                employer.Jobs.Select(j => j.ToDto()).ToList()
            );
        }

        public static Employer ToEmployer(this EmployerCreateDto dto)
        {
            return new Employer
            {
                CountryId = dto.CountryId,
                Name = dto.Name,
                Email = dto.Email,
                City = dto.City,
                StaffCount = dto.StaffCount,
                Jobs = new List<Job>()
            };
        }

        public static void UpdateFromDto(this Employer employer, EmployerUpdateDto dto, List<Job>? jobs)
        {
            if (dto.CountryId.HasValue) employer.CountryId = dto.CountryId.Value;
            if (dto.Name is not null) employer.Name = dto.Name;
            if (dto.City is not null) employer.City = dto.City;
            if (dto.StaffCount.HasValue) employer.StaffCount = dto.StaffCount.Value;
            if (jobs is not null) employer.Jobs = jobs;
        }
    }
}