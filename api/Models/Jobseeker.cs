namespace GradGo.Models
{
    public class Jobseeker : User
    {
        public required string FirstName { get; set; }
        public required string LastName { get; set; }
        public int Age { get; set; }
        public ICollection<Skill> Skills { get; set; } = new List<Skill>();
        public ICollection<Course> Courses { get; set; } = new List<Course>();
        public ICollection<Application> Applications { get; set; } = new List<Application>();
    }
}
