using System.Text.Json.Serialization;

namespace GradGo.DTOs
{
    [JsonDerivedType(typeof(JobseekerDto), typeDiscriminator: "jobseeker")]
    [JsonDerivedType(typeof(EmployerDto), typeDiscriminator: "employer")]
    public abstract record UserDto
    (
        Guid Id,
        string PhoneNumber,
        string Email,
        string City,
        CountryDto Country,
        string Bio
    );
}