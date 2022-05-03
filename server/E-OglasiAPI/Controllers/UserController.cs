using Authorization.Attributes.AuthorizeAttribute;
using Authorization.Interfaces;
using Authorization.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace E_OglasiAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private IUserService _userService;
        public UserController(IUserService userService)
        {
            this._userService = userService;
        }
        [HttpPost]
        [Route("authenticate")]
        public IActionResult Authenticate(AuthenticateRequest request)
        {
            AuthenticateResponse response = this._userService.Authenticate(request);
            if(response == null)
            {
                return BadRequest(new { message = "Username or password is incorrect." });
            }
            return Ok(response);
        }

        [Authorize]
        [HttpGet]
        [Route("{id}")]
        public IActionResult GetUserById(int id)
        {
            var user = this._userService.GetById(id);
            if(user == null)
            {
                return BadRequest(new { message = "User with id " + id + " doesnt exist." });
            }
            return Ok(user);
        }
    }
}
