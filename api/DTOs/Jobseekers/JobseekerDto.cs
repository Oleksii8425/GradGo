namespace GradGo.DTOs
{
    public record JobseekerDto(
        Guid Id,
        string Role,
        string PhoneNumber,
        string Email,
        string UserName,
        string City,
        CountryDto Country,
        string Bio,
        string FirstName,
        string LastName,
        int Age,
        List<SkillDto> Skills,
        List<CourseDto> Courses,
        List<ApplicationDto> Applications
    ) : UserDto(Id, PhoneNumber, Email, City, Country, Bio);
}