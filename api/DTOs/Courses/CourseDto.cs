namespace GradGo.DTOs
{
    public record CourseDto
    (
        int Id,
        string Name,
        string Degree,
        UniversityDto University,
        DateOnly StartDate,
        DateOnly EndDate
    );
}