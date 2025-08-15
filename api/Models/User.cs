using Microsoft.AspNetCore.Identity;

namespace GradGo.Models
{
    public class User : IdentityUser<Guid>
    {
        public int CountryId { get; set; }
        public UserRole Role { get; set; }
        public string City { get; set; } = null!;
        public Country Country { get; set; } = null!;
        public string Bio { get; set; } = null!;
    }
}