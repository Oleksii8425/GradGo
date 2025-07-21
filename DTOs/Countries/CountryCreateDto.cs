using System.ComponentModel.DataAnnotations;

namespace GradGo.DTOs
{
    public record CountryCreateDto(
        [Required] string PhoneCode,
        [Required, MinLength(2), MaxLength(20)] string Name
    );
}