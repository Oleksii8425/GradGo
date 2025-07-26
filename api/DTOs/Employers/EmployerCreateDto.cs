using System.ComponentModel.DataAnnotations;
using GradGo.Models;

namespace GradGo.DTOs
{
    public record EmployerCreateDto(
        [Required] string Name,
        [Required] string City,
        [Required] int CountryId,
        [Required] StaffCount StaffCount
    );
}