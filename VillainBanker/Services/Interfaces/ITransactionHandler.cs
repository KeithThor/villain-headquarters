using System.Threading.Tasks;
using VillainBanker.Data;
using VillainBanker.Models;

namespace VillainBanker.Services.Interfaces
{
    /// <summary>
    /// Interface for a class that can handle banking transactions.
    /// </summary>
    public interface ITransactionHandler
    {
        /// <summary>
        /// Makes a transaction for the given user using the options provided in the TransactionRequest.
        /// </summary>
        /// <param name="userId">The string user id of the user to make a transaction for.</param>
        /// <param name="request">The object containing options for the transaction request.</param>
        /// <returns>Returns a task that resolves to a Transaction object if the transaction was completed successfully.</returns>
        Task<Transaction> MakeTransactionAsync(string userId, TransactionRequest request);
    }
}