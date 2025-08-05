namespace GradGo.DTOs
{
    public record EmployerDto(
        Guid Id,
        string Name,
        string City,
        string CountryName,
        string StaffCount,
        List<JobDto> jobs
    );
}