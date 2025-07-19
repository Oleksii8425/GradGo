using System.ComponentModel.DataAnnotations;

namespace GradGo.DTOs
{
    public record SkillCreateDto([Required, MaxLength(50)] string Title);
}