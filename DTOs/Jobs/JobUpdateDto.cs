using System.ComponentModel.DataAnnotations;
using GradGo.Models;

namespace GradGo.DTOs
{
    public record JobUpdateDto(
        Guid? EmployerId,
        int? CountryId,
        [MinLength(100), MaxLength(1000)] string? Description,
        JobType? Type,
        int? Salary,
        string? City,
        string? RequiredDegree,
        List<int>? Skills
    );
}