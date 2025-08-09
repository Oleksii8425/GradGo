namespace GradGo.Models
{
    public abstract class User
    {
        public Guid Id { get; set; }
        public int CountryId { get; set; }
        public required string Email { get; set; }
        public string? PhoneNumber { get; set; }
        public required string City { get; set; }
        public Country Country { get; set; } = null!;
        public string? Bio { get; set; }
    }
}