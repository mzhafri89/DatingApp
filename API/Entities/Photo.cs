using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{
    // * EF will create a table called Photos instead of Photo
    // * We dont create a DbSet for this class because we dont want to query the database directly
    [Table("Photos")]
    public class Photo
    {
        public int Id { get; set; }

        public string Url { get; set; }

        public bool IsMain { get; set; }

        public string PublicId { get; set; }

        // * This is the relationship between AppUser and Photo
        // * Defining this would ensure that a photo cannot exist without an AppUser

        public AppUser AppUser { get; set; }

        // * EF will create a column called AppUserId

        public int AppUserId { get; set; }
    }
}
