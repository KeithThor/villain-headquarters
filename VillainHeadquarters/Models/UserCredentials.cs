using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace VillainHeadquarters.Models
{
    /// <summary>
    /// POCO representing incoming user credentials data.
    /// </summary>
    public class UserCredentials
    {
        /// <summary>
        /// Represents the user's Username.
        /// </summary>
        public string Username { get; set; }

        /// <summary>
        /// Represents the user's Password.
        /// </summary>
        public string Password { get; set; }
    }
}
