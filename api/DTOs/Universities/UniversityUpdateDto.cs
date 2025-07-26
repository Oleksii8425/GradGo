namespace GradGo.DTOs
{
    public record UniversityUpdateDto(
        string? Name,
        string? City,
        int? CountryId
    );
}