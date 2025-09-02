namespace GradGo.DTOs
{
    public record ApplicationDto
    (
        Guid Id,
        Guid JobId,
        Guid JobseekerId,
        DateTime AppliedOn,
        string Status
    );
}