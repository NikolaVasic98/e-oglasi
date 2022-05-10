using Database_Layer.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace User_Interface_Layer.Interfaces
{
    public interface IUserUIL
    {
        public User GetUserByCredentials(string username, string password);
    }
}
