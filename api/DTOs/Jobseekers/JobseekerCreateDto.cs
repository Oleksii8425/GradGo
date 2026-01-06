using System.ComponentModel.DataAnnotations;
using GradGo.Models;

namespace GradGo.DTOs
{
    public record JobseekerCreateDto
    (
        string FirstName,
        string LastName,
        [Range(16, 100)] int Age,
        UserRole Role,
        string PhoneNumber,
        string Email,
        string Password,
        string City,
        int CountryId,
        string Bio,
        List<int> Skills,
        List<int> Courses
    );
}