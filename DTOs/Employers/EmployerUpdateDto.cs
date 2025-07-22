using GradGo.Models;

namespace GradGo.DTOs
{
    public record EmployerUpdateDto(
        string? Name,
        string? City,
        int? CountryId,
        StaffCount? StaffCount
    );
}