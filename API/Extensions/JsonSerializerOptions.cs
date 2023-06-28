using System.Text.Json;
using System.Text.Json.Serialization;
using API.Helpers;

namespace API.Extensions
{
    public static class JsonExtensions
    {
        public static JsonSerializerOptions AddJsonOptions(this JsonSerializerOptions options)
        {
            options.Converters.Add(new DateOnlyConverter());
            options.ReferenceHandler = ReferenceHandler.Preserve;

            return options;
        }
    }
}
