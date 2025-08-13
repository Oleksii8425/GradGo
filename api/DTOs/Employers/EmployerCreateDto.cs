using System.ComponentModel.DataAnnotations;
using GradGo.Models;

namespace GradGo.DTOs
{
    public record EmployerCreateDto(
        [Required] string Name,
        string PhoneNumber,
        [Required] string Email,
        [Required] string City,
        [Required] int CountryId,
        [Required] string Bio,
        [Required] StaffCount StaffCount
    );
}