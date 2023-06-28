using System.Security.Cryptography;
using System.Text.Json;
using API.Entities;
using API.Helpers;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class Seed
    {
        // * Generate dummy users
        public static async Task SeedUers(DataContext dataContext)
        {
            // * If there are any users in the database, return
            if (await dataContext.AppUsers.AnyAsync())
                return;

            // * Read the json file
            var userData = await System.IO.File.ReadAllTextAsync("Data/UserSeedData.json");

            // * JsonSerializerOptions options
            var options = new JsonSerializerOptions
            {
                PropertyNameCaseInsensitive = true,
                Converters = { new DateOnlyConverter() } // Add the custom converter
            };

            // * Deserialize the json file
            var users = System.Text.Json.JsonSerializer.Deserialize<List<AppUser>>(
                userData,
                options
            ); // Pass the options to the Deserialize method

            // * Generate password hash and salt for each user
            foreach (var user in users)
            {
                using var hmac = new HMACSHA512();

                user.UserName = user.UserName.ToLower();
                user.PasswordHash = hmac.ComputeHash(
                    System.Text.Encoding.UTF8.GetBytes("Pa$$w0rd")
                );
                user.PasswordSalt = hmac.Key;

                // * Add the user to the database
                dataContext.AppUsers.Add(user);
            }

            // * Save the changes
            await dataContext.SaveChangesAsync();
        }
    }
}
