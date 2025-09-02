namespace GradGo.DTOs
{
    public record JobDto
    (
        Guid Id,
        Guid EmployerId,
        int CountryId,
        string Title,
        string Description,
        string EmplyerName,
        string Type,
        int Salary,
        string currencySymbol,
        string City,
        string CountryName,
        string RequiredDegree,
        int ApplicantsNo,
        List<SkillDto> Skills
    );
}