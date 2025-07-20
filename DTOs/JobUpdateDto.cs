using System.ComponentModel.DataAnnotations;
using GradGo.Models;

namespace GradGo.DTOs
{
    public record JobUpdateDto(
        Guid EmployerId,
        [MinLength(100), MaxLength(1000)] string Description,
        JobType Type,
        int Salary,
        string City,
        string Country,
        string RequiredDegree,
        List<int> Skills
    );
}