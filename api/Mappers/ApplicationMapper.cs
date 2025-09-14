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
                application.Job.Id,
                application.Jobseeker.Id,
                application.AppliedOn,
                application.Status.GetDescription()
            );
        }

        public static Application ToApplication(this ApplicationCreateDto dto)
        {
            return new Application
            {
                JobId = dto.JobId,
                JobseekerId = dto.JobseekerId,
                AppliedOn = DateTime.UtcNow,
                Status = ApplicationStatus.UnderReview,
                CvPath = dto.CvPath,
                CoverLetterPath = dto.CoverLetterPath,
                CoverLetterText = dto.CoverLetterText
            };
        }

        public static void UpdateApplicationFromDto(this Application application, ApplicationUpdateDto dto)
        {
            if (dto.JobId.HasValue)
                application.JobId = dto.JobId.Value;

            if (dto.JobseekerId.HasValue)
                application.JobseekerId = dto.JobseekerId.Value;

            if (dto.AppliedOn.HasValue)
                application.AppliedOn = dto.AppliedOn.Value;

            if (dto.Status.HasValue)
                application.Status = dto.Status.Value;
        }
    }
}