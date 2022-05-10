using Database_Layer.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Database_Layer.Interfaces
{
    public interface IUserDAL
    {
        public User GetUserByCredentials(string username, string password);
    }
}
