using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using GradGo.Models;
using Microsoft.AspNetCore.Identity;

namespace GradGo.Data
{
    public class AppDbContext : IdentityDbContext<User, IdentityRole<Guid>, Guid>
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<User>()
                .Property(u => u.Role)
                .HasConversion<string>();

            modelBuilder.Entity<User>()
                .HasDiscriminator(u => u.Role)
                .HasValue<User>(UserRole.BaseUser)
                .HasValue<Employer>(UserRole.Employer)
                .HasValue<Jobseeker>(UserRole.Jobseeker);

            modelBuilder.Entity<User>()
                .Property(u => u.CountryId)
                .HasDefaultValue(198);

            modelBuilder.Entity<User>()
                .Property(u => u.City)
                .HasDefaultValue("N/A");

            modelBuilder.Entity<User>()
                .Property(u => u.Bio)
                .HasDefaultValue("");

            modelBuilder.Entity<Course>()
                .Property(c => c.Degree)
                .HasConversion<string>();

            modelBuilder.Entity<Employer>()
                .HasIndex(e => e.StaffCount)
                .IsUnique();

            modelBuilder.Entity<Employer>()
                .Property(e => e.StaffCount)
                .HasConversion<string>();

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
        public DbSet<Job> Jobs { get; set; }
        public DbSet<Skill> Skills { get; set; }
        public DbSet<University> Universities { get; set; }
        public DbSet<Employer> Employers { get; set; }
        public DbSet<Jobseeker> Jobseekers { get; set; }
    }
}
