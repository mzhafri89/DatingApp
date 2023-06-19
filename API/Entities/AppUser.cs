// * namespace is sync to folder struc
namespace API.Entities
{
    public class AppUser
    {
        public int Id { get; set; }

        // * Dot net 6+ allows for nullables string, can be disabled in API.csproj
        public string UserName { get; set; }
    }
}