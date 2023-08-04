using Microsoft.EntityFrameworkCore;

namespace p2api.Models
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<User>? Users { get; set; }
        public DbSet<BMI>? BMIs { get; set; }
    }
}
