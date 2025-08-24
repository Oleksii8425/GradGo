using GradGo.DTOs;
using GradGo.Models;

namespace GradGo.Mappers
{
    public static class UserMapper
    {
        public static UserDto ToDto(this User user)
        {
            return new UserDto
            (
                user.Id,
                user.PhoneNumber ?? string.Empty,
                user.Email ?? string.Empty,
                user.City,
                user.Country.ToDto(),
                user.Bio
            );
        }

        public static Jobseeker ToJobseeker(this User user, Jobseeker jobseeker)
        {
            return new Jobseeker
            {
                Id = user.Id,
                CountryId = user.CountryId,
                Role = user.Role,
                PhoneNumber = user.PhoneNumber,
                Email = user.Email,
                City = user.City,
                Country = user.Country,
                Bio = user.Bio,
                FirstName = jobseeker.FirstName,
                LastName = jobseeker.LastName,
                Age = jobseeker.Age,
                Skills = jobseeker.Skills,
                Courses = jobseeker.Courses,
                Applications = jobseeker.Applications
            };
        }

        public static Employer ToEmployer(this User user, Employer employer)
        {
            return new Employer
            {
                Id = user.Id,
                CountryId = user.CountryId,
                Role = user.Role,
                PhoneNumber = user.PhoneNumber,
                Email = user.Email,
                City = user.City,
                Country = user.Country,
                Bio = user.Bio,
                Name = employer.Name,
                StaffCount = employer.StaffCount,
                Jobs = employer.Jobs
            };
        }
    }
}