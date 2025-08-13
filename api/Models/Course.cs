namespace GradGo.Models
{
    public class Course
    {
        public int Id { get; set; }
        public Guid UniveristyId { get; set; }
        public string Name { get; set; } = null!;
        public Degree Degree { get; set; }
        public University University { get; set; } = null!;
        public DateOnly StartDate { get; set; }
        public DateOnly EndDate { get; set; }
        public ICollection<Jobseeker> Jobseekers { get; set; } = new List<Jobseeker>();
    }
}