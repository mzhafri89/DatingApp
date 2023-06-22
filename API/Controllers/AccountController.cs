using API.Data;
using API.DTOs;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;
using System.Text;

namespace API.Controllers
{
    // * The resource path would be derived from the class name eg: /api/account
    public class AccountController : BaseApiController
    {
        private readonly DataContext context;

        public AccountController(DataContext context)
        {
            this.context = context;
        }

        [HttpPost("register")]
        // * Handle register requests @ /api/account/register

        // * By default the body of the request is not bound to the parameters of the method
        // * only query strings and route parameters are bound by default
        public async Task<ActionResult<AppUser>> Register(RegisterDTO registerDTO)
        // * DTO would be bind automatically to the body of the request
        {
            // * Check if username already exists
            if (await UserExists(registerDTO.Username))
                return BadRequest("Username is taken");

            // * Create new user
            // * Using is used to dispose of the HMACSHA512 object after its used
            using var hmac = new HMACSHA512();

            var user = new AppUser
            {
                UserName = registerDTO.Username.ToLower(),
                PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(registerDTO.Password)),
                PasswordSalt = hmac.Key
            };

            // * Add user to database
            context.AppUsers.Add(user);
            await context.SaveChangesAsync();

            return user;
        }

        private async Task<bool> UserExists(string username)
        {
            return await context.AppUsers.AnyAsync(user => user.UserName == username.ToLower());
        }
    }
}
