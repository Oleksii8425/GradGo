namespace GradGo.DTOs
{
    public record JobDto
    (
        Guid Id,
        Guid EmployerId,
        int CountryId,
        string Title,
        string Description,
        string EmployerName,
        string Type,
        int Salary,
        string CurrencySymbol,
        string City,
        string CountryName,
        string RequiredDegree,
        int ApplicantsNo,
        List<SkillDto> Skills
    );
}