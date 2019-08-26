using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace VillainHeadquarters.Data
{
    public class UserDbContext: DbContext
    {
        public UserDbContext(DbContextOptions options) : base(options)
        {

        }

        public DbSet<ApplicationUser> Users { get; set; }
    }
}
