using Database_Layer.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bussines_Logic.Interfaces
{
    public interface IUserBL
    {
        public User GetUserByCredentials(string username, string password);
    }
}
