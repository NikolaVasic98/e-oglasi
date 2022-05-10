using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Database_Layer.Models
{
    [Table("User")]
    public partial class User
    {
        [Key]
        [Column("id")]
        public int Id { get; set; }
        [Column("firstname")]
        [StringLength(255)]
        [Unicode(false)]
        public string? Firstname { get; set; }
        [Column("lastname")]
        [StringLength(255)]
        [Unicode(false)]
        public string? Lastname { get; set; }
        [Column("username")]
        [StringLength(255)]
        [Unicode(false)]
        public string? Username { get; set; }
        [Column("password")]
        [StringLength(255)]
        [Unicode(false)]
        public string? Password { get; set; }
        [Column("roleId")]
        public int? RoleId { get; set; }

        [ForeignKey("RoleId")]
        [InverseProperty("Users")]
        public virtual Role? Role { get; set; }
    }
}
