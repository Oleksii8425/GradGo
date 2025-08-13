using System.ComponentModel.DataAnnotations;

namespace GradGo.DTOs
{
    public record CountryCreateDto
    (
        [Required] string CountryCode,
        [Required, MinLength(2), MaxLength(20)] string Name,
        [Required] string PhoneCode,
        [Required] string CurrencyCode,
        [Required] string CurrencySymbol
    );
}