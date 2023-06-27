// * Main entry point of dotnet run command

// * Create web application instance
using API.Data;
using API.Extensions;
using API.Middleware;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// * Add services to the container.
builder.Services
    .AddControllers()
    .AddJsonOptions(options =>
    {
        // * Add date only converter
        options.JsonSerializerOptions.Converters.Add(
            new System.Text.Json.Serialization.JsonConverter_DateOnly()
        );
    });

// * Add application services
builder.Services.AddApplicationServices(builder.Configuration);

// * Add identity services
builder.Services.AddIdentityServices(builder.Configuration);

var app = builder.Build();

// * Middlewares pipeline section

//* Use exception middleware
app.UseMiddleware<ExceptionMiddleware>();

// * Use cors policy
app.UseCors("CorsPolicy");

// * Use authentication middleware - validates the token
app.UseAuthentication();

// * Use authorization middleware - checks if user is authorized to access the resource
app.UseAuthorization();

app.MapControllers();

// * Add seed data if environment is development
if (app.Environment.IsDevelopment())
{
    try
    {
        // * get the scope of the service provider
        using var scope = app.Services.CreateScope();
        var services = scope.ServiceProvider;

        // * Get the data context
        var dataContext = services.GetRequiredService<DataContext>();
        //* Automatically apply any pending migrations
        await dataContext.Database.MigrateAsync();
        // * Seed the data
        await Seed.SeedUers(dataContext);
    }
    catch (Exception error)
    {
        var logger = app.Services.GetRequiredService<ILogger<Program>>();
        logger.LogError(error, "An error occured during migration");
    }
}

app.Run();
