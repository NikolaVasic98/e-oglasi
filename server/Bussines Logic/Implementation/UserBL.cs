using Bussines_Logic.Interfaces;
using Database_Layer.Interfaces;
using Database_Layer.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bussines_Logic.Implementation
{
    public class UserBL : IUserBL
    {
        private readonly IBaseDAL<User> baseDAL;
        private readonly IUserDAL userDAL;
        public UserBL(IBaseDAL<User> baseDAL, IUserDAL userDAL)
        {
            this.baseDAL = baseDAL;
            this.userDAL = userDAL;
        }
        public User GetUserByCredentials(string username, string password)
        {
            return userDAL.GetUserByCredentials(username, password);
        }
    }
}
