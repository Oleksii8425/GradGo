using GradGo.Models;

namespace GradGo.DTOs
{
    public record EmployerUpdateDto(
        string? Name,
        string? Email,
        string? City,
        int? CountryId,
        StaffCount? StaffCount,
        List<Guid> Jobs
    );
}