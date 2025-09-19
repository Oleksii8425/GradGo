using GradGo.Models;

namespace GradGo.DTOs
{
    public record JobseekerUpdateDto
    (
        string? FirstName,
        string? LastName,
        int? Age,
        UserRole? Role,
        string? PhoneNumber,
        string? Email,
        string? City,
        int? CountryId,
        string? Bio,
        List<int>? Skills,
        List<int>? Courses,
        List<Guid>? Applications
    );
}