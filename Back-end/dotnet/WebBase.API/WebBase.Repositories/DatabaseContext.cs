using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;
using WebBase.Models;

namespace WebBase.Repositories
{
    public class DatabaseContext : DbContext
    {
        public DatabaseContext(DbContextOptions<DatabaseContext> options) : base(options) { }

        public virtual DbSet<User> User { get; set; }

        public virtual DbSet<Category> Category { get; set; }

        public virtual DbSet<Product> Product { get; set; }
    }
}
