namespace GradGo.DTOs
{
    public record EmployerDto(
        Guid Id,
        string Role,
        string PhoneNumber,
        string Email,
        string City,
        CountryDto Country,
        string Bio,
        string Name,
        string StaffCount,
        List<JobDto> jobs
    ) : UserDto(Id, PhoneNumber, Email, City, Country, Bio);
}