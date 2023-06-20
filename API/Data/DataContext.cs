// * Derived from the entity framework DbContext class
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class DataContext : DbContext
    {
        // * Constructor
        public DataContext(DbContextOptions options)
            : base(options) { }

        // * DbSet is a collection of entities
        // * AppUser is the entity
        // * AppUsers is the name of the table
        public DbSet<Entities.AppUser> AppUsers { get; set; }
    }
}
