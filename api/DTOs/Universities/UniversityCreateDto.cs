using System.ComponentModel.DataAnnotations;

namespace GradGo.DTOs
{
    public record UniversityCreateDto(
        [Required] string Name,
        [Required] string City,
        [Required] int CountryId
    );
}