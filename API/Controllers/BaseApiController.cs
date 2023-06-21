using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    // * Parent class for all API controllers

    public class BaseApiController : ControllerBase { }
}
