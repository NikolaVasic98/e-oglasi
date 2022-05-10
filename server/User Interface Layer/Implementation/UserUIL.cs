using Bussines_Logic.Interfaces;
using Database_Layer.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using User_Interface_Layer.Interfaces;

namespace User_Interface_Layer.Implementation
{
    public class UserUIL : IUserUIL
    {
        private readonly IUserBL userBL;
        public UserUIL(IUserBL userBL)
        {
            this.userBL = userBL;
        }
        public User GetUserByCredentials(string username, string password)
        {
            return userBL.GetUserByCredentials(username, password);
        }
    }
}
