// * Main entry point of dotnet run command

// * Create web application instance
var builder = WebApplication.CreateBuilder(args);

// * Add services to the container.
builder.Services.AddControllers();

var app = builder.Build();

// * Middlewares section

app.MapControllers();

app.Run();
