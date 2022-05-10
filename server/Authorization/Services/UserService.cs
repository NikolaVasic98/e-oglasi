using Authorization.Interfaces;
using Authorization.Models;
using Bussines_Logic.Interfaces;
using Common.Config;
using Database_Layer.Models;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Authorization.Services
{
    public class UserService : IUserService
    {
        private readonly AppSettings _appSettings;
        private readonly IUserBL userBL;

        public UserService(IOptions<AppSettings> appSettings, IUserBL userBL)
        {
            _appSettings = appSettings.Value;
            this.userBL = userBL;
        }

        public AuthenticateResponse Authenticate(AuthenticateRequest request)
        {
            User user = userBL.GetUserByCredentials(request.Username, request.Password);
            var token = GenerateJwtToken(user);
            return new AuthenticateResponse(user, token);
        }

        public IEnumerable<User> GetAll()
        {
            return null;
        }

        public User? GetById(int id)
        {
            return null;
        }

        private string GenerateJwtToken(User user)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_appSettings.Secret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[] { new Claim("id", user.Id.ToString()) }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
    }
}
