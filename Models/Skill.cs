namespace GradGo.Models
{
    public class Skill
    {
        public int Id { get; set; }
        public required string Title { get; set; }
        public ICollection<Jobseeker> Jobseekers { get; set; } = new List<Jobseeker>();
        public ICollection<Job> Jobs { get; set; } = new List<Job>();
    }
}