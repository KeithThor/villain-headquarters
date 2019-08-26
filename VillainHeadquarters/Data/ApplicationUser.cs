using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;

namespace VillainHeadquarters.Data
{
    /// <summary>
    /// Represents a user and all accompanying user-related data as a model from the database.
    /// </summary>
    public class ApplicationUser: IdentityUser
    {
        /// <summary>
        /// The List of this ApplicationUser's claims.
        /// </summary>
        public List<IdentityUserClaim<string>> Claims { get; set; }
    }
}
