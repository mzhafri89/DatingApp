using API.Entities;

// ! Dont specify action result type here causes weird bug, assume
// ! the concrete class would know how to get the return type
namespace API.Services
{
    public interface IUserRepository
    {
        void Update(AppUser user);

        Task<bool> SaveAllAsync();

        Task<IEnumerable<AppUser>> GetUsersAsync();

        Task<AppUser> GetUserByIdAsync(int id);

        Task<AppUser> GetUserByUsernameAsync(string username);
    }
}
