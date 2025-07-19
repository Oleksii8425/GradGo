using GradGo.DTOs;
using GradGo.Models;

namespace GradGo.Mappers
{
    public static class JobMapper
    {
        public static JobDto ToDto(Job job)
        {
            return new JobDto(
                job.Id,
                job.EmployerId,
                job.Description,
                job.Type,
                job.City,
                job.Country,
                job.RequiredDegree,
                job.ApplicantsNo,
                job.Skills
                    .Select(s => new SkillDto(s.Id, s.Title))
                    .ToList()
            );
        }

        public static Job FromDto(JobDto dto)
        {
            return new Job {
                Id = dto.Id,
                EmployerId = dto.EmployerId,
                Description = dto.Description,
                Type = dto.Type,
                City = dto.City,
                Country = dto.Country,
                RequiredDegree = dto.RequiredDegree,
                ApplicantsNo = dto.ApplicantsNo,
                Skills = dto.Skills
                    .Select(s => new Skill { Id = s.Id, Title = s.Title })
                    .ToHashSet()
            };
        }
    }
}