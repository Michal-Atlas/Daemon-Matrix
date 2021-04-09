using DaemonAPI.Model.Objects;
using Microsoft.EntityFrameworkCore;

namespace DaemonAPI.Model
{
    public class DaemonMatrixDbContext : DbContext
    {
        public DbSet<Picture> Pictures { get; set; }
        public DbSet<Tag> Tags { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
            => optionsBuilder.UseNpgsql(@"host=localhost;database=daemon_matrix;user id=michal-atlas;password=*********;");
    }
}