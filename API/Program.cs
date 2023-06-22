// * Main entry point of dotnet run command

// * Create web application instance
using API.Data;
using API.Interfaces;
using Microsoft.EntityFrameworkCore;
using API.Services;

var builder = WebApplication.CreateBuilder(args);

// * Add services to the container.
builder.Services.AddControllers();

// * Database connection
builder.Services.AddDbContext<DataContext>(opt =>
{
    opt.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection"));
});

// * Add cors policy
builder.Services.AddCors(opt =>
{
    opt.AddPolicy(
        "CorsPolicy",
        policy =>
        {
            policy.AllowAnyHeader().AllowAnyMethod().WithOrigins("https://localhost:4200");
        }
    );
});

// * Add authentication services
// * scoped - service is created once per client request
// * singleton - service is created once and reused
// * transient - service is created each time it is requested
builder.Services.AddScoped<ITokenService, TokenService>();

var app = builder.Build();

// * Middlewares section

// * Use cors policy
app.UseCors("CorsPolicy");

app.MapControllers();

app.Run();
