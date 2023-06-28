// * namespace is sync to folder struc

using API.Extensions;

namespace API.Entities
{
    public class AppUser
    {
        // * Class properties needs to follow the convention of the entity framework
        // * Id is the primary key  of the table
        public int Id { get; set; }

        // * Dot net 6+ allows for nullables string, can be disabled in API.csproj
        public string UserName { get; set; }

        public byte[] PasswordHash { get; set; }

        public byte[] PasswordSalt { get; set; }

        public DateOnly DateOfBirth { get; set; }

        public string KnownAs { get; set; }

        public DateTime Created { get; set; } = DateTime.UtcNow;

        public DateTime LastActive { get; set; } = DateTime.UtcNow;

        public string Gender { get; set; }

        public string Introduction { get; set; }

        public string LookingFor { get; set; }

        public string Interests { get; set; }

        public string City { get; set; }

        public string Country { get; set; }

        public List<Photo> Photos { get; set; } = new List<Photo>();

        // * Extension method to calculate age
        // * Will be used in AutoMapperProfiles.cs to map the age
        public int GetAge()
        {
            return DateOfBirth.CalculateAge();
        }
    }
}
