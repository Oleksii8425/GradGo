using System.ComponentModel.DataAnnotations;
using GradGo.Models;

namespace GradGo.DTOs
{
    public record JobCreateDto(
        [Required] Guid EmployerId,
        [Required] int CountryId,
        [Required] string Title,
        [Required, MinLength(100), MaxLength(1000)] string Description,
        [Required] JobType Type,
        [Required] int Salary,
        [Required] string City,
        [Required] Degree RequiredDegree,
        [Required] List<int> Skills,
        List<Guid> Applications
    );
}