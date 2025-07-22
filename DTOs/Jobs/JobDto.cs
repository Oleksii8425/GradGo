using System.ComponentModel.DataAnnotations;
using GradGo.Models;

namespace GradGo.DTOs
{
    public record JobDto(
        [Required] Guid Id,
        [Required] string Description,
        [Required] JobType Type,
        [Required] string EmployerName,
        [Required] int Salary,
        [Required] string City,
        [Required] string CountryName,
        [Required] string RequiredDegree,
        [Required] int ApplicantsNo,
        [Required] List<SkillDto> Skills
    );
}