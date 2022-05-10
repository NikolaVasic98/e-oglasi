using Database_Layer.Context;
using Database_Layer.Interfaces;
using Database_Layer.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Database_Layer.Implementation
{
    public class UserDAL : IUserDAL
    {
        private readonly DatabaseContext context;
        private DbSet<User> Users;
        public UserDAL(DatabaseContext context)
        {
            this.context = context;
            this.Users = context.Users;
        }
        public User GetUserByCredentials(string username, string password)
        {
            User? user = Users.FirstOrDefault(u => u.Username == username && u.Password == password);
            if(user == null)
            {
                throw new Exception("User is not found");
            }
            return user;
        }
    }
}
