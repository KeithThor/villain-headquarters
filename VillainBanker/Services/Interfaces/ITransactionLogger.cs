using System.Threading.Tasks;

namespace VillainBanker.Services.Interfaces
{
    /// <summary>
    /// Interface for a logger used for transactions.
    /// </summary>
    public interface ITransactionLogger
    {
        /// <summary>
        /// Logs a transaction.
        /// </summary>
        /// <param name="message">The message to display in the transaction log.</param>
        void Log(string message);

        /// <summary>
        /// Logs a transaction asynchronously.
        /// </summary>
        /// <param name="message">The message to display in the transaction log.</param>
        /// <returns>Returns a task that resolves when the transaction is successfully logged.</returns>
        Task LogAsync(string message);
    }
}
