using Database_Layer.Context;
using Database_Layer.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Database_Layer.Implementation
{
    public class BaseDAL<T> : IBaseDAL<T> where T: class
    {
        private readonly DatabaseContext context;
        public BaseDAL(DatabaseContext context)
        {
            this.context = context;
        }
        public T? GetById(int id)
        {
            T? obj = context.Set<T>().Find(id);
            if(obj == null)
            {
                throw new Exception("User is not found");
            }
            else
            {
                return obj;
            }   
        }
    }
}
