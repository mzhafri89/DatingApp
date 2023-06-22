using API.Data;
using API.DTOs;
using API.Entities;
using API.Interfaces;
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
        private readonly ITokenService tokenService;

        public AccountController(DataContext context, ITokenService tokenService)
        {
            this.context = context;
            this.tokenService = tokenService;
        }

        [HttpPost("register")]
        // * Handle register requests @ /api/account/register

        // * By default the body of the request is not bound to the parameters of the method
        // * only query strings and route parameters are bound by default
        public async Task<ActionResult<UserDto>> Register(RegisterDto registerDTO)
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

            return new UserDto { Username = user.UserName, Token = tokenService.CreateToken(user) };
        }

        [HttpPost("login")]
        // * Handle login requests @ /api/account/login
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDTO)
        {
            // * Find user by username - SingleOrDefault is used because were not using a primary key
            var user = await context.AppUsers.SingleOrDefaultAsync(
                user => user.UserName == loginDTO.Username.ToLower()
            );

            // * If user does not exist
            if (user == null)
                return Unauthorized("Invalid credentials");

            // * Create new HMACSHA512 object with the password salt
            using var hmac = new HMACSHA512(user.PasswordSalt);

            // * Compute hash of the password provided by the user
            var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(loginDTO.Password));

            // * Compare the computed hash with the password hash stored in the database
            for (int i = 0; i < computedHash.Length; i++)
            {
                // * If the hashes do not match
                if (computedHash[i] != user.PasswordHash[i])
                    return Unauthorized("Invalid password");
            }

            return new UserDto { Username = user.UserName, Token = tokenService.CreateToken(user) };
        }

        private async Task<bool> UserExists(string username)
        {
            return await context.AppUsers.AnyAsync(user => user.UserName == username.ToLower());
        }
    }
}
