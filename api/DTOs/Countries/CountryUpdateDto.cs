namespace GradGo.DTOs
{
    public record CountryUpdateDto
    (
        string? CountryCode,
        string? Name,
        string? PhoneCode,
        string? CurrencyCode,
        string? CurrencySymbol
    );
}