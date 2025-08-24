using System.ComponentModel.DataAnnotations;
using GradGo.Models;

namespace GradGo.DTOs
{
    public record EmployerCreateDto(
        [Required] string Name,
        [Required] UserRole Role,
        string PhoneNumber,
        [Required] string Email,
        [Required] string Password,
        [Required] string City,
        [Required] int CountryId,
        [Required] string Bio,
        [Required] StaffCount StaffCount
    );
}