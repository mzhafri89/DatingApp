// * Main entry point of dotnet run command

// * Create web application instance
using API.Data;
using API.Interfaces;
using Microsoft.EntityFrameworkCore;
using API.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;

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

// * Add authentication middleware
builder.Services
    .AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(opt =>
    {
        opt.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(builder.Configuration["TokenKey"])
            ),
            ValidateIssuer = false,
            ValidateAudience = false
        };
    });

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
