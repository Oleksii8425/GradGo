namespace GradGo.DTOs
{
    public record CourseUpdateDto
    (
        string? Name,
        string? Degree,
        Guid? UniversityId,
        DateOnly? StartDate,
        DateOnly? EndDate,
        List<Guid>? Jobseekers
    );
}