namespace VillainBanker.Models
{
    /// <summary>
    /// A model object for a transaction request.
    /// </summary>
    public class TransactionRequest
    {
        /// <summary>
        /// The amount to change the user's currency by.
        /// </summary>
        public decimal Amount { get; set; }

        /// <summary>
        /// The message to describe this transaction.
        /// </summary>
        public string Message { get; set; }
    }
}
