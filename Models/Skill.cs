using System.ComponentModel.DataAnnotations;

namespace GradGo.Models
{
    public class Skill
    {
        public int Id { get; set; }

        [MaxLength(50)]
        public required string Title { get; set; }
        public ICollection<Jobseeker> Jobseekers { get; set; } = new HashSet<Jobseeker>();
        public ICollection<Job> Jobs { get; set; } = new HashSet<Job>();
    }
}