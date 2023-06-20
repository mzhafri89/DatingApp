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

var app = builder.Build();

// * Middlewares section

app.MapControllers();

app.Run();
