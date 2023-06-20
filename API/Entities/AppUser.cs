// * namespace is sync to folder struc
namespace API.Entities
{
    public class AppUser
    {
        // * Class properties needs to follow the convention of the entity framework
        // * Id is the primary key  of the table
        public int Id { get; set; }

        // * Dot net 6+ allows for nullables string, can be disabled in API.csproj
        public string UserName { get; set; }
    }
}
