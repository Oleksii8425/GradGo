namespace GradGo.DTOs
{
    public record JobDto(
        Guid Id,
        string Title,
        string Description,
        string Type,
        string EmployerName,
        int Salary,
        string City,
        string CountryName,
        string RequiredDegree,
        int ApplicantsNo,
        List<SkillDto> Skills
    );
}