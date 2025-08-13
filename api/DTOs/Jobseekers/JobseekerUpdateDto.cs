namespace GradGo.DTOs
{
    public record JobseekerUpdateDto
    (
        string? Firstname,
        string? Lastname,
        int? Age,
        string? Email,
        string? City,
        int? CountryId,
        string? Bio,
        List<int>? Skills,
        List<int>? Courses
    );
}