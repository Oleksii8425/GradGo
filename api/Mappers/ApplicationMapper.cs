using GradGo.DTOs;
using GradGo.Models;

namespace GradGo.Mappers
{
    public static class ApplicationMapper
    {
        public static ApplicationDto ToDto(this Application application)
        {
            return new ApplicationDto(
                application.Id,
                application.Job.ToDto(),
                application.Jobseeker.ToDto(),
                application.AppliedOn,
                application.Status
            );
        }
    }
}