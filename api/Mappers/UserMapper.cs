using GradGo.Models;

namespace GradGo.Mappers
{
    public static class UserMapper
    {

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