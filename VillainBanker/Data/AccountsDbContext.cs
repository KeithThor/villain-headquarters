using Microsoft.EntityFrameworkCore;

namespace VillainBanker.Data
{
    /// <summary>
    /// A class implementation of EntityFrameworkCore DbContext for user banking Accounts.
    /// </summary>
    public class AccountsDbContext: DbContext
    {
        public AccountsDbContext(DbContextOptions options) : base(options)
        {
            
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>()
                        .HasMany<Account>()
                        .WithOne();

            modelBuilder.Entity<Account>()
                        .HasMany<Transaction>()
                        .WithOne();

            modelBuilder.Entity<Transaction>()
                        .Property(trans => trans.Id)
                        .ValueGeneratedOnAdd();
        }

        /// <summary>
        /// Contains the database table for all users.
        /// </summary>
        public DbSet<User> Users { get; set; }

        /// <summary>
        /// Contains the database table for user accounts.
        /// </summary>
        public DbSet<Account> Accounts { get; set; }

        /// <summary>
        /// Contains the database table for user account transactions.
        /// </summary>
        public DbSet<Transaction> Transactions { get; set; }

        /// <summary>
        /// Contains the database table for vendor data.
        /// </summary>
        public DbSet<Vendor> Vendors { get; set; }
    }
}
