using GradGo.Controllers;
using GradGo.DTOs;
using GradGo.Models;

namespace GradGo.Mappers
{
    public static class JobMapper
    {
        public static Job FromJobDto(JobDto dto)
        {
            return new Job
            {
                Id = dto.Id,
                EmployerId = dto.EmployerId,
                Description = dto.Description,
                Type = dto.Type,
                Salary = dto.Salary,
                City = dto.City,
                Country = dto.Country,
                RequiredDegree = dto.RequiredDegree,
                ApplicantsNo = dto.ApplicantsNo,
                Skills = dto.Skills
                    .Select(s => new Skill { Id = s.Id, Title = s.Title })
                    .ToHashSet()
            };
        }

        public static Job FromCreateDto(JobCreateDto dto, IEnumerable<Skill> skills)
        {
            return new Job
            {
                EmployerId = dto.EmployerId,
                Description = dto.Description,
                Type = dto.Type,
                Salary = dto.Salary,
                City = dto.City,
                Country = dto.Country,
                RequiredDegree = dto.RequiredDegree,
                Skills = skills.ToHashSet()
            };
        }

        public static void UpdateJobFromDto(Job job, JobUpdateDto dto, IEnumerable<Skill> skills)
        {
            job.EmployerId = dto.EmployerId;
            job.Description = dto.Description;
            job.Type = dto.Type;
            job.Salary = dto.Salary;
            job.City = dto.City;
            job.Country = dto.Country;
            job.RequiredDegree = dto.RequiredDegree;
            job.Skills = skills.ToHashSet();
        }

        public static JobDto ToJobDto(Job job)
        {
            return new JobDto(
                job.Id,
                job.EmployerId,
                job.Description,
                job.Type,
                job.Salary,
                job.City,
                job.Country,
                job.RequiredDegree,
                job.ApplicantsNo,
                job.Skills
                    .Select(s => new SkillResponseDto(s.Id, s.Title))
                    .ToList()
            );
        }

        public static JobCreateDto ToCreateDto(Job job)
        {
            return new JobCreateDto(
                job.EmployerId,
                job.Description,
                job.Type,
                job.Salary,
                job.City,
                job.Country,
                job.RequiredDegree,
                job.Skills
                    .Select(s => s.Id)
                    .ToList()
            );
        }

        public static JobUpdateDto ToUpdateDto(Job job)
        {
            return new JobUpdateDto(
                job.EmployerId,
                job.Description,
                job.Type,
                job.Salary,
                job.City,
                job.Country,
                job.RequiredDegree,
                job.Skills
                    .Select(s => s.Id)
                    .ToList()
            );
        }
    }
}