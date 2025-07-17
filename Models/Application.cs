namespace GradGo.Models
{
    public class Application
    {
        public int Id { get; set; }
        public Guid JobseekerId { get; set; }
        public required Jobseeker Jobseeker { get; set; }
        public int JobId { get; set; }
        public required Job Job { get; set; }
        public DateTime AppliedOn { get; set; }
        public required string Status { get; set; }
    }
}