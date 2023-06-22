using System.ComponentModel.DataAnnotations;

namespace API.DTOs
{
    public class LoginDto
    {
        [Required]
        public string Username { get; set; }

        [Required]
        // * Password is not stored in plain text
        public string Password { get; set; }
    }
}
