// * Main entry point of dotnet run command

// * Create web application instance
using API.Extensions;

var builder = WebApplication.CreateBuilder(args);

// * Add services to the container.
builder.Services.AddControllers();

// * Add application services
builder.Services.AddApplicationServices(builder.Configuration);

// * Add identity services
builder.Services.AddIdentityServices(builder.Configuration);

var app = builder.Build();

// * Middlewares section

// * Use cors policy
app.UseCors("CorsPolicy");

// * Use authentication middleware - validates the token
app.UseAuthentication();

// * Use authorization middleware - checks if user is authorized to access the resource
app.UseAuthorization();

app.MapControllers();

app.Run();
