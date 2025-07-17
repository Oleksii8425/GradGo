using Microsoft.EntityFrameworkCore;
using GradGo.Models;

namespace GradGo.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options) { }

        public DbSet<Job> Jobs { get; set; }
    }
}
