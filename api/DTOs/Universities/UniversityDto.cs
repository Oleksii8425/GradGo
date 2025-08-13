namespace GradGo.DTOs
{
    public record UniversityDto
    (
        Guid Id,
        string Name,
        string City,
        CountryDto Country
    );
}