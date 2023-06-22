using API.Entities;
using API.Interfaces;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace API.Services
{
    public class TokenService : ITokenService
    {
        // * SymmetricSecurityKey is used to sign the token - the same key is used to sign and validate the token
        // * The key is stored in the server and never leaves the server
        // * AssymentricSecurityKey uses a public and private key where the private key is used to sign the token and the public key is used to validate the token
        // * and the public key is shared with the client to decode the token
        private readonly SymmetricSecurityKey _key;

        public TokenService(IConfiguration config)
        {
            _key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["TokenKey"]));
        }

        public string CreateToken(AppUser user)
        {
            // * Add claims to the token - claims are used to add additional information to the token
            var claims = new List<Claim>
            {
                // * Add username to the token
                new Claim(JwtRegisteredClaimNames.NameId, user.UserName),
            };

            // * Generate signing credentials
            var creds = new SigningCredentials(_key, SecurityAlgorithms.HmacSha512Signature);

            // * Describe how the token should look like
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                // * Add claims to the token
                Subject = new ClaimsIdentity(claims),
                // * Token expires after 7 days
                Expires = DateTime.UtcNow.AddDays(7),
                // * Add signing credentials to the token
                SigningCredentials = creds
            };

            // * Create token handler
            var tokenHandler = new JwtSecurityTokenHandler();

            // * Create token
            var token = tokenHandler.CreateToken(tokenDescriptor);

            // * Return token
            return tokenHandler.WriteToken(token);
        }
    }
}
