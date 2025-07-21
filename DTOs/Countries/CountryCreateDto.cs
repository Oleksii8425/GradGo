using System.ComponentModel.DataAnnotations;

namespace GradGo.DTOs
{
    public record CountryCreateDto(
        [Required] string PhoneCode,
        [Required, MinLength(3), MaxLength(20)] string Name
    );
}