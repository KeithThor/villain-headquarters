using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace VillainBanker.Data
{
    /// <summary>
    /// Represents a database user model object.
    /// </summary>
    public class User
    {
        public string Id { get; set; }

        /// <summary>
        /// A List containing the accounts associated with this user.
        /// </summary>
        public List<Account> Accounts { get; set; }
    }
}
