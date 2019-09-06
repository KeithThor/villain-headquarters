using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using VillainBanker.Data;
using VillainBanker.Models;
using VillainBanker.Services.Interfaces;

namespace VillainBanker.Services
{
    /// <summary>
    /// Class responsible for creating new banking accounts for users.
    /// </summary>
    public class AccountCreator : IAccountCreator
    {
        private readonly AccountsDbContext _dbContext;
        private readonly IConfiguration _config;

        public AccountCreator(AccountsDbContext dbContext,
                              IConfiguration config)
        {
            _dbContext = dbContext;
            _config = config;
        }

        /// <summary>
        /// Attempts to create a new banking account for a user of the given id. Returns true if creation was successful.
        /// </summary>
        /// <param name="userId">The string id of the user to create an account for.</param>
        /// <returns>Returns a task that resolves to true if the account was successfully created.</returns>
        public async Task<bool> CreateAsync(string userId)
        {
            var existing = await _dbContext.FindAsync<Account>(userId);
            if (existing != null) return false;

            var options = _config.Get<AccountCreationOptions>();

            var transactions = new List<Transaction>
            {
                new Transaction
                {
                    Change = 200,
                    Date = DateTime.Now,
                    Message = "Account created."
                }
            };

            var account = new Account
            {
                Id = userId,
                Balance = options.InitialBalance,
                Transactions = transactions
            };

            await _dbContext.AddAsync(account);
            await _dbContext.SaveChangesAsync();
            return true;
        }
    }
}
