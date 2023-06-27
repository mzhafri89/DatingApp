using System.Net;
using System.Text.Json;
using API.Errors;

namespace API.Middleware
{
    public class ExceptionMiddleware
    {
        private RequestDelegate next;
        private ILogger<ExceptionMiddleware> logger;
        private IHostEnvironment env;

        public ExceptionMiddleware(
            RequestDelegate next,
            ILogger<ExceptionMiddleware> logger,
            IHostEnvironment env
        )
        {
            this.next = next;
            this.logger = logger;
            this.env = env;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            try
            {
                // * If no exception is thrown, continue to the next middleware
                await next(context);
            }
            catch (Exception ex)
            {
                // * Log the exception
                logger.LogError(ex, ex.Message);

                // * Set the response status code
                context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;

                // * Set the response content type
                context.Response.ContentType = "application/json";

                // * Get the response body
                var response = env.IsDevelopment()
                    ? new APIException(
                        context.Response.StatusCode,
                        ex.Message,
                        ex.StackTrace?.ToString()
                    )
                    : new APIException(
                        context.Response.StatusCode,
                        ex.Message,
                        "Internal Server Error"
                    );

                // * Serialize the response body
                var options = new JsonSerializerOptions
                {
                    PropertyNamingPolicy = JsonNamingPolicy.CamelCase
                };

                // * Write the response body to the response
                var json = JsonSerializer.Serialize(response, options);
                await context.Response.WriteAsync(json);
            }
        }
    }
}
