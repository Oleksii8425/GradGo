using System.ComponentModel.DataAnnotations;

namespace GradGo.DTOs
{
    public record ApplicationCreateDto
    (
        [Required] Guid JobId,
        [Required] Guid JobseekerId,
        [Required] string CvPath,
        string? CoverLetterPath,
        string? CoverLetterText
    );
}