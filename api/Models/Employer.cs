namespace GradGo.Models
{
    public class Employer : User
    {
        public required string Name { get; set; }
        public StaffCount StaffCount { get; set; }
        public ICollection<Job> Jobs { get; set; } = new List<Job>();
    }
}