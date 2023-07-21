using Microsoft.EntityFrameworkCore;

namespace p2api.Models
{
    public class BMIContext : DbContext
    {
        public BMIContext(DbContextOptions<BMIContext> options) : base(options) { }

        public DbSet<BMI>? BMIs { get; set; } = null;
        public DbSet<User>? Users { get; set; } = null;
    }
}
