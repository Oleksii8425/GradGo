using System.ComponentModel.DataAnnotations;
using GradGo.Models;

namespace GradGo.DTOs
{
    public record JobseekerCreateDto
    (
        [Required] string FirstName,
        [Required] string LastName,
        [Required] int Age,
        [Required] UserRole Role,
        string? PhoneNumber,
        [Required] string Email,
        [Required] string City,
        [Required] int CountryId,
        [Required] string Bio,
        [Required] List<int> Skills,
        [Required] List<int> Courses
    );
}