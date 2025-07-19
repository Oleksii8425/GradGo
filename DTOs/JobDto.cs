using GradGo.Models;

namespace GradGo.DTOs
{
    public record JobDto(
        int Id,
        Guid EmployerId,
        string Description,
        JobType Type,
        string City,
        string Country,
        string RequiredDegree,
        int ApplicantsNo,
        List<SkillDto> Skills
    );
}