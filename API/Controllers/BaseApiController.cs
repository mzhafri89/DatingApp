using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    // * ApiController allows for automatic DTO binding and validation
    [ApiController]
    [Route("api/[controller]")]
    // * Parent class for all API controllers

    public class BaseApiController : ControllerBase { }
}
