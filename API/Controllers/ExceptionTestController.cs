using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class BuggyController : BaseApiController
    {
        [HttpGet("server-error")]
        public ActionResult<string> GetServerError()
        {
            string thing = null;
            return thing.ToString();
        }
    }
}
