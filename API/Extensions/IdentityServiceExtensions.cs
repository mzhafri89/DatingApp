// * This class is used to extend the IServiceCollection interface for identity services.

using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;

namespace API.Extensions
{
    public static class IdentityServiceExtensions
    {
        public static IServiceCollection AddIdentityServices(
            this IServiceCollection services,
            IConfiguration config
        )
        {
            //* Add authentication middleware
            services
                .AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(opt =>
                {
                    opt.TokenValidationParameters = new TokenValidationParameters
                    {
                        //* Validate the signing key with the server's key
                        ValidateIssuerSigningKey = true,
                        IssuerSigningKey = new SymmetricSecurityKey(
                            Encoding.UTF8.GetBytes(config["TokenKey"])
                        ),
                        //* Don't validate the issuer
                        ValidateIssuer = false,
                        //* Don't validate the audience
                        ValidateAudience = false
                    };
                });

            return services;
        }
    }
}
