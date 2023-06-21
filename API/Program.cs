// * Main entry point of dotnet run command

// * Create web application instance
using API.Data;
using Microsoft.EntityFrameworkCore;

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

var app = builder.Build();

// * Middlewares section

// * Use cors policy
app.UseCors("CorsPolicy");

app.MapControllers();

app.Run();
