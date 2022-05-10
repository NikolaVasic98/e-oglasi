using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Database_Layer.Interfaces
{
    public interface IBaseDAL<T>
    {
        public T? GetById(int id);
    }
}
