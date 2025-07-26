namespace GradGo.Models
{
    public class Course
    {
        public int Id { get; set; }
        public Guid UniveristyId { get; set; }
        public required string Name { get; set; }
        public required Degree Degree { get; set; }
        public DateOnly StartDate { get; set; }
        public DateOnly EndDate { get; set; }
        public ICollection<Jobseeker> Jobseekers { get; set; } = new List<Jobseeker>();
    }
}