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
                jobseeker.Email,
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
                PhoneNumber = dto.PhoneNumber,
                Email = dto.Email,
                City = dto.City,
                CountryId = dto.CountryId,
                Bio = dto.Bio,
                FirstName = dto.Firstname,
                LastName = dto.Lastname,
                Age = dto.Age,
            };
        }

        // public static void UpdateFromDto(this Jobseeker jobseeker, JobseekerUpdateDto dto, List<Job>? jobs)
        // {
        //     if (dto.CountryId.HasValue) jobseeker.CountryId = dto.CountryId.Value;
        //     if (dto.Name is not null) jobseeker.Name = dto.Name;
        //     if (dto.City is not null) jobseeker.City = dto.City;
        //     if (dto.StaffCount.HasValue) jobseeker.StaffCount = dto.StaffCount.Value;
        //     if (jobs is not null) jobseeker.Jobs = jobs;
        // }
    }
}