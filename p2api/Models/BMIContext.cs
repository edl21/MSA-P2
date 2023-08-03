using Microsoft.EntityFrameworkCore;

namespace p2api.Models
{
    public class BMIContext : DbContext
    {
        public BMIContext(DbContextOptions<BMIContext> options) : base(options) { }

        public DbSet<BMI>? BMIs { get; set; };
        public DbSet<User>? Users { get; set; };
    }
}
