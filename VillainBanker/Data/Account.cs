using System.Collections.Generic;

namespace VillainBanker.Data
{
    /// <summary>
    /// POCO used as a model for a database Account table.
    /// </summary>
    public class Account
    {
        /// <summary>
        /// The id of this account.
        /// </summary>
        public string Id { get; set; }

        /// <summary>
        /// The amount of fake cryptocurrency this account has.
        /// </summary>
        public decimal Balance { get; set; }

        /// <summary>
        /// A list of all the transactions made on this account.
        /// </summary>
        public List<Transaction> Transactions { get; set; }

        public virtual User User { get; set; }
    }
}
