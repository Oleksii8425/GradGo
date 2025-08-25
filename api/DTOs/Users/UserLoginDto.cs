using System.ComponentModel.DataAnnotations;

namespace GradGo.DTOs
{
    public record UserLoginDto
    (
        [Required] string Email,
        [Required] string Password
    );
}