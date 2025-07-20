using System.ComponentModel.DataAnnotations;

namespace GradGo.DTOs
{
    public record SkillRequestDto(
        [Required, MaxLength(50)] string Title
    );
}