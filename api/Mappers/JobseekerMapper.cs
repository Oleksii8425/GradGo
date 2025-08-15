using GradGo.DTOs;
using GradGo.Models;

namespace GradGo.Mappers
{
    public static class JobseekerMapper
    {
        public static JobseekerDto ToDto(this Jobseeker jobseeker)
        {
            return new JobseekerDto(
                jobseeker.Id,
                jobseeker.Role.GetDescription(),
                jobseeker.Email ?? string.Empty,
                jobseeker.PhoneNumber ?? string.Empty,
                jobseeker.City,
                jobseeker.Country.ToDto(),
                jobseeker.Bio,
                jobseeker.FirstName,
                jobseeker.LastName,
                jobseeker.Age,
                jobseeker.Skills.Select(s => s.ToDto()).ToList(),
                jobseeker.Courses.Select(c => c.ToDto()).ToList(),
                jobseeker.Applications.Select(a => a.ToDto()).ToList()
            );
        }

        public static Jobseeker ToJobseeker(this JobseekerCreateDto dto)
        {
            return new Jobseeker
            {
                FirstName = dto.FirstName,
                LastName = dto.LastName,
                Age = dto.Age,
                Role = dto.Role,
                PhoneNumber = dto.PhoneNumber,
                Email = dto.Email,
                City = dto.City,
                CountryId = dto.CountryId,
                Bio = dto.Bio,
            };
        }

        public static void UpdateFromDto(this Jobseeker jobseeker, JobseekerUpdateDto dto, List<Skill>? skills, List<Course>? courses, List<Application>? applications)
        {
            if (dto.CountryId.HasValue) jobseeker.CountryId = dto.CountryId.Value;
            if (dto.FirstName is not null) jobseeker.FirstName = dto.FirstName;
            if (dto.LastName is not null) jobseeker.LastName = dto.LastName;
            if (dto.Age.HasValue) jobseeker.Age = dto.Age.Value;
            if (dto.Role.HasValue) jobseeker.Role = dto.Role.Value;
            if (dto.PhoneNumber is not null) jobseeker.PhoneNumber = dto.PhoneNumber;
            if (dto.Email is not null) jobseeker.Email = dto.Email;
            if (dto.City is not null) jobseeker.City = dto.City;
            if (dto.Bio is not null) jobseeker.Bio = dto.Bio;
            if (skills is not null) jobseeker.Skills = skills;
            if (courses is not null) jobseeker.Courses = courses;
            if (applications is not null) jobseeker.Applications = applications;
        }
    }
}