namespace GradGo.Models
{
    public class Job
    {
        public Guid Id { get; set; }
        public Guid EmployerId { get; set; }
        public int CountryId { get; set; }
        public Employer Employer { get; set; } = null!;
        public required string Title { get; set; }
        public required string Description { get; set; }
        public JobType Type { get; set; }
        public int Salary { get; set; }
        public required string City { get; set; }
        public Country Country { get; set; } = null!;
        public Degree RequiredDegree { get; set; }
        public ICollection<Skill> Skills { get; set; } = new HashSet<Skill>();
        public ICollection<Application> Applications { get; set; } = new HashSet<Application>();
    }
}
