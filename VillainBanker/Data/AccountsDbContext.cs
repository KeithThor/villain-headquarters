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
            modelBuilder.Entity<Account>()
                        .HasMany<Transaction>()
                        .WithOne();
        }

        public DbSet<Account> Accounts { get; set; }
        public DbSet<Transaction> Transactions { get; set; }
    }
}
