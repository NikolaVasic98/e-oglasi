
using Database_Layer.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Authorization.Models
{
    public class AuthenticateResponse
    {
        public int Id { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? Username { get; set; }
        public string Token { get; set; }

        public AuthenticateResponse(User user, string token)
        {
            this.Id = user.Id;
            this.FirstName = user.Firstname;
            this.LastName = user.Lastname;
            this.Username = user.Username;
            this.Token = token;
        }
    }
}
