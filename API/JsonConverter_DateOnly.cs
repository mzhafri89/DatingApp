// * Main entry point of dotnet run command

namespace System.Text.Json.Serialization
{
    internal class JsonConverter_DateOnly : JsonConverter<DateOnly>
    {
        public override bool CanConvert(Type typeToConvert)
        {
            return typeof(DateOnly) == typeToConvert;
        }

        public override DateOnly Read(
            ref Utf8JsonReader reader,
            Type typeToConvert,
            JsonSerializerOptions options
        )
        {
            DateTime dateTime = reader.GetDateTime();
            return new DateOnly(dateTime.Year, dateTime.Month, dateTime.Day);
        }

        public override void Write(
            Utf8JsonWriter writer,
            DateOnly value,
            JsonSerializerOptions options
        )
        {
            writer.WriteStringValue(value.ToString("yyyy-MM-dd"));
        }
    }
}
