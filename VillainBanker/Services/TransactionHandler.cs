using Microsoft.EntityFrameworkCore;
using System;
using System.Threading.Tasks;
using VillainBanker.Data;
using VillainBanker.Models;
using VillainBanker.Services.Interfaces;

namespace VillainBanker.Services
{
    /// <summary>
    /// Class responsible for handling transactions made on a user's account.
    /// </summary>
    public class TransactionHandler : ITransactionHandler
    {
        private readonly AccountsDbContext _dbContext;

        public TransactionHandler(AccountsDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        /// <summary>
        /// Attempts to make the transaction on the account for the user with the given user id asynchronously.
        /// <para>Returns the Transaction if successful, else returns null.</para>
        /// </summary>
        /// <param name="userId">The string id of the user to make a transaction for.</param>
        /// <param name="request">The object containing the transaction details.</param>
        /// <returns>Returns a task object that will resolve to the value of a Transaction object if the transaction
        /// is successful.</returns>
        public async Task<Transaction> MakeTransactionAsync(string userId, TransactionRequest request)
        {
            var account = await _dbContext.Accounts.FirstOrDefaultAsync(acc => acc.Id == userId);
            if (account == null) return null;
            if (account.Balance + request.Amount <= 0) return null;

            using (var dbTransaction = _dbContext.Database.BeginTransaction())
            {
                try
                {
                    var previousBalance = account.Balance;
                    account.Balance += request.Amount;
                    _dbContext.Accounts.Update(account);

                    var transaction = new Transaction
                    {
                        Previous = previousBalance,
                        Change = request.Amount,
                        Date = DateTime.Now,
                        Message = request.Message,
                        Current = account.Balance
                    };

                    await _dbContext.Transactions.AddAsync(transaction);

                    await _dbContext.SaveChangesAsync();

                    dbTransaction.Commit();

                    return transaction;
                }
                catch (Exception ex)
                {
                    // Todo: Do something with exception
                    return null;
                }
            }
        }
    }
}
