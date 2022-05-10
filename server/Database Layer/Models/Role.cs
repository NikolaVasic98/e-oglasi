using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Database_Layer.Models
{
    [Table("Role")]
    public partial class Role
    {
        public Role()
        {
            Users = new HashSet<User>();
        }

        [Key]
        [Column("id")]
        public int Id { get; set; }
        [Column("value")]
        [StringLength(50)]
        [Unicode(false)]
        public string Value { get; set; } = null!;

        [InverseProperty("Role")]
        public virtual ICollection<User> Users { get; set; }
    }
}
