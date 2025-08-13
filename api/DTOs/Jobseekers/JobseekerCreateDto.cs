using System.ComponentModel.DataAnnotations;

namespace GradGo.DTOs
{
    public record JobseekerCreateDto
    (
        [Required] string Firstname,
        [Required] string Lastname,
        [Required] int Age,
        string? PhoneNumber,
        [Required] string Email,
        [Required] string City,
        [Required] int CountryId,
        [Required] string Bio,
        [Required] List<int> Skills,
        [Required] List<int> Courses
    );
}