using System;

namespace VillainBanker.Data
{
    /// <summary>
    /// Object containing data about a banking transaction.
    /// </summary>
    public class Transaction
    {
        /// <summary>
        /// The unique id that corresponds to this transaction.
        /// </summary>
        public int Id { get; set; }

        /// <summary>
        /// The change in currency for the account.
        /// </summary>
        public decimal Change { get; set; }

        /// <summary>
        /// The time at which the transaction was completed.
        /// </summary>
        public DateTime Date { get; set; }

        /// <summary>
        /// Message containing transaction details.
        /// </summary>
        public string Message { get; set; }
    }
}
