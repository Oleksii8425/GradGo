namespace GradGo.Models
{
    public class Jobseeker
    {
        public Guid Id { get; set; }
        public int CountryId { get; set; }
        public required string FirstName { get; set; }
        public required string LastName { get; set; }
        public int Age { get; set; }
        public required string Email { get; set; }
        public string? PhoneNumber { get; set; }
        public required string City { get; set; }
        public Country? Country { get; set; }
        public ICollection<Skill> Skills { get; set; } = new List<Skill>();
        public ICollection<Course> Courses { get; set; } = new List<Course>();
        public ICollection<Application> Applications { get; set; } = new List<Application>();
    }
}
