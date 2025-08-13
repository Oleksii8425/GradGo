using System.ComponentModel.DataAnnotations;

namespace GradGo.DTOs
{
    public record CourseCreateDto
    (
        [Required] string Name,
        [Required] string Degree,
        [Required] Guid UniversityId,
        [Required] DateOnly StartDate,
        [Required] DateOnly EndDate,
        [Required] List<Guid> Jobseekers
    );
}