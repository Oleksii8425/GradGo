namespace GradGo.Models
{
    public class Application
    {
        public Guid Id { get; set; }
        public Guid JobId { get; set; }
        public Guid JobseekerId { get; set; }
        public Job Job { get; set; } = null!;
        public Jobseeker Jobseeker { get; set; } = null!;
        public DateTime AppliedOn { get; set; }
        public ApplicationStatus Status { get; set; }
    }
}