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
        public required String Description { get; set; }
        public JobType Type { get; set; }
        public required String City { get; set; }
        public required String Country { get; set; }
        public required String RequiredDegree { get; set; }
        public Skill[]? Skills { get; set; }
        public int AplicantsNo { get; set; }
    }
}
