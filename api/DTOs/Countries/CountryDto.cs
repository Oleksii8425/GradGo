namespace GradGo.DTOs
{
    public record CountryDto
    (
        int Id,
        string CountryCode,
        string Name,
        string PhoneCode,
        string CurrencyCode,
        string CurrencySymbol
    );
}