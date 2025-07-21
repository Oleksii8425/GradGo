namespace GradGo.Models
{
    public class Application
    {
        public int Id { get; set; }
        public int JobId { get; set; }
        public Guid JobseekerId { get; set; }
        public Job? Job { get; set; }
        public Jobseeker? Jobseeker { get; set; }
        public DateTime AppliedOn { get; set; }
        public required string Status { get; set; }
    }
}