using Microsoft.AspNetCore.Identity;

namespace GradGo.Models
{
    public abstract class User
    {
        public Guid Id { get; set; }
        public int CountryId { get; set; }
        public UserRole Role { get; set; }
        public string? PhoneNumber { get; set; }
        public required string Email { get; set; }
        public required string City { get; set; }
        public Country Country { get; set; } = null!;
        public required string Bio { get; set; }
    }
}