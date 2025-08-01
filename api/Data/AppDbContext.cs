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

            modelBuilder.Entity<Course>()
                .Property(c => c.Degree)
                .HasConversion<string>();

            modelBuilder.Entity<Employer>()
                .HasIndex(e => e.StaffCount)
                .IsUnique();

            modelBuilder.Entity<Job>()
                .Property(j => j.RequiredDegree)
                .HasConversion<string>();

            modelBuilder.Entity<Job>()
                .Property(j => j.Type)
                .HasConversion<string>();

            modelBuilder.Entity<Skill>()
                .HasIndex(s => s.Title)
                .IsUnique();
        }

        public DbSet<Application> Applications { get; set; }
        public DbSet<Country> Countries { get; set; }
        public DbSet<Course> Courses { get; set; }
        public DbSet<Employer> Employers { get; set; }
        public DbSet<Job> Jobs { get; set; }
        public DbSet<Jobseeker> Jobseekers { get; set; }
        public DbSet<Skill> Skills { get; set; }
        public DbSet<University> Universities { get; set; }
    }
}
