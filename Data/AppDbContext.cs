using Microsoft.EntityFrameworkCore;
using GradGo.Models;

namespace GradGo.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Skill>()
                .HasIndex(s => s.Title)
                .IsUnique();
        }


        public DbSet<Employer> Employers { get; set; }
        public DbSet<Job> Jobs { get; set; }
        public DbSet<Jobseeker> Jobseekers { get; set; }
        public DbSet<Application> Applications { get; set; }
        public DbSet<Skill> Skills { get; set; }
        public DbSet<University> Universities { get; set; }
        public DbSet<Course> Courses { get; set; }
    }
}
