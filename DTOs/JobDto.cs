using GradGo.Models;

namespace GradGo.DTOs
{
    public record JobDto(
        int Id,
        Guid EmployerId,
        string Description,
        JobType Type,
        int Salary,
        string City,
        string Country,
        string RequiredDegree,
        int ApplicantsNo,
        List<SkillResponseDto> Skills
    );
}