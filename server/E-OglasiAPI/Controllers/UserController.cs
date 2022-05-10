using Authorization.Attributes.AuthorizeAttribute;
using Authorization.Interfaces;
using Authorization.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using User_Interface_Layer.Interfaces;

namespace E_OglasiAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private IUserService _userService;
        private readonly IUserUIL userUIL;
        public UserController(IUserService userService, IUserUIL userUIL)
        {
            this._userService = userService;
            this.userUIL = userUIL;
        }
        [HttpPost]
        [Route("authenticate")]
        public IActionResult Authenticate(AuthenticateRequest request)
        {
            try
            {
                AuthenticateResponse response = this._userService.Authenticate(request);
                return Ok(response);
            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
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
