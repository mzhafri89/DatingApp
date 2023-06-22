namespace API.DTOs
{
    public class UserDto
    {
        public string Username { get; set; }

        // * Token is returned to the client after login
        public string Token { get; set; }
    }
}
