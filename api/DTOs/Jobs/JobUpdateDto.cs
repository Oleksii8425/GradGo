using System.ComponentModel.DataAnnotations;
using GradGo.Models;

namespace GradGo.DTOs
{
    public record JobUpdateDto(
        Guid? EmployerId,
        int? CountryId,
        string? Title,
        [MinLength(100), MaxLength(1000)] string? Description,
        JobType? Type,
        int? Salary,
        string? City,
        Degree? RequiredDegree,
        List<int>? Skills
    );
}