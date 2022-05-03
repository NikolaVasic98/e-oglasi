using Authorization.Interfaces;
using Authorization.Models;
using Common.Config;
using Common.Models;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace Authorization.Services
{
    public class UserService : IUserService
    {
        private List<User> _users = new List<User>
        {
            new User {Id = 1, FirstName = "User1", LastName = "Lastname1", Username = "User_1", Password = "blabla1"},
            new User {Id = 2, FirstName = "User2", LastName = "Lastname2", Username = "User_2", Password = "blabla2"},
            new User {Id = 3, FirstName = "User3", LastName = "Lastname3", Username = "User_3", Password = "blabla3"}
        };
        private readonly AppSettings _appSettings;

        public UserService(IOptions<AppSettings> appSettings)
        {
            _appSettings = appSettings.Value;
        }

        public AuthenticateResponse Authenticate(AuthenticateRequest request)
        {
            var user = _users.SingleOrDefault(u => u.Username == request.Username && u.Password == request.Password);

            if (user == null) return null;

            var token = GenerateJwtToken(user);

            return new AuthenticateResponse(user, token);
        }

        public IEnumerable<User> GetAll()
        {
            return _users;
        }

        public User? GetById(int id)
        {
            return _users.SingleOrDefault(u => u.Id == id);
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
