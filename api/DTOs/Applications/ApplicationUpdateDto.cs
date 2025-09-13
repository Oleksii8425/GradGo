using GradGo.Models;

namespace GradGo.DTOs
{
    public record ApplicationUpdateDto
    (
        Guid? JobId,
        Guid? JobseekerId,
        DateTime? AppliedOn,
        ApplicationStatus? Status
    );
}