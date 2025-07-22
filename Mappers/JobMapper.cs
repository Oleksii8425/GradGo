using GradGo.DTOs;
using GradGo.Models;

namespace GradGo.Mappers
{
    public static class JobMapper
    {
        public static JobDto ToDto(this Job job)
        {
            return new JobDto(
                job.Id,
                job.Description,
                job.Type.GetDescription(),
                job.Employer.Name,
                job.Salary,
                job.City,
                job.Country.Name,
                job.RequiredDegree.GetDescription(),
                job.Applications.Count,
                job.Skills.Select(s => s.ToDto()).ToList()
            );
        }

        public static Job ToJob(this JobCreateDto dto)
        {
            return new Job
            {
                EmployerId = dto.EmployerId,
                CountryId = dto.CountryId,
                Description = dto.Description,
                Type = dto.Type,
                Salary = dto.Salary,
                City = dto.City,
                RequiredDegree = dto.RequiredDegree
            };
        }

        public static void UpdateJobFromDto(this Job job, JobUpdateDto dto)
        {
            if (dto.EmployerId.HasValue) job.EmployerId = dto.EmployerId.Value;
            if (dto.CountryId.HasValue) job.CountryId = dto.CountryId.Value;
            if (dto.Description != null) job.Description = dto.Description;
            if (dto.Type.HasValue) job.Type = dto.Type.Value;
            if (dto.Salary.HasValue) job.Salary = dto.Salary.Value;
            if (dto.City != null) job.City = dto.City;
            if (dto.RequiredDegree.HasValue) job.RequiredDegree = dto.RequiredDegree.Value;
        }
    }
}