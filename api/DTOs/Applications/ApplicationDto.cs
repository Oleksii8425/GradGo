namespace GradGo.DTOs
{
    public record ApplicationDto
    (
        Guid Id,
        JobDto Job,
        JobseekerDto Jobseeker,
        DateTime AppliedOn,
        string Status
    );
}