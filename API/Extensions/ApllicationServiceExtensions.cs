// * This class is used to extend the IServiceCollection interface.
using API.Data;
using API.Interfaces;
using API.Services;
using Microsoft.EntityFrameworkCore;

namespace API.Extensions
{
    public static class ApllicationServiceExtensions
    {
        public static IServiceCollection AddApplicationServices(
            this IServiceCollection services,
            IConfiguration config
        )
        {
            // * Add database connection
            services.AddDbContext<DataContext>(opt =>
            {
                opt.UseSqlite(config.GetConnectionString("DefaultConnection"));
            });

            // * Add cors policy
            services.AddCors(opt =>
            {
                opt.AddPolicy(
                    "CorsPolicy",
                    policy =>
                    {
                        policy
                            .AllowAnyHeader()
                            .AllowAnyMethod()
                            .WithOrigins("https://localhost:4200");
                    }
                );
            });

            //* Add token services
            //* scoped - service is created once per client request
            //* singleton - service is created once and reused
            //* transient - service is created each time it is requested
            services.AddScoped<ITokenService, TokenService>();

            return services;
        }
    }
}
