using System.ComponentModel.DataAnnotations;

namespace GradGo.Models
{
    public enum JobType
    {
        OnSite,
        Hybrid,
        Remote
    }

    public class Job
    {
        public int Id { get; set; }
        public Guid EmployerId { get; set; }
        public Employer? Employer { get; set; }
        public required string Description { get; set; }
        public JobType Type { get; set; }
        public int Salary { get; set; }
        public required string City { get; set; }
        public required string Country { get; set; }
        public required string RequiredDegree { get; set; }
        public ICollection<Skill> Skills { get; set; } = new HashSet<Skill>();
        public ICollection<Application> Applications { get; set; } = new HashSet<Application>();
        public int ApplicantsNo { get; set; }
    }
}
