using API.Entities;
using Microsoft.AspNetCore.Mvc;

namespace API.Services
{
    public interface IUserRepository
    {
        void Update(AppUser user);

        Task<bool> SaveAllAsync();

        Task<ActionResult<IEnumerable<AppUser>>> GetUsersAsync();

        Task<AppUser> GetUserByIdAsync(int id);

        Task<AppUser> GetUserByUsernameAsync(string username);
    }
}
