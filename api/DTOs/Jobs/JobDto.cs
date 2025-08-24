namespace GradGo.DTOs
{
    public record JobDto
    (
        Guid Id,
        string Title,
        string Description,
        string Type,
        EmployerDto Employer,
        int Salary,
        string City,
        CountryDto Country,
        string RequiredDegree,
        int ApplicantsNo,
        List<SkillDto> Skills
    );
}