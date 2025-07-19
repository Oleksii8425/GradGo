using System.ComponentModel.DataAnnotations;
using GradGo.Models;

namespace GradGo.DTOs
{
    public record JobCreateDto(
        [Required] Guid EmployerId,
        [Required, MinLength(100), MaxLength(1000)] string Description,
        [Required] JobType Type,
        [Required] string City,
        [Required] string Country,
        [Required] string RequiredDegree,
        [Required] List<int> Skills
    );
}