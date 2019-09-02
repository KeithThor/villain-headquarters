namespace VillainShared.Auth
{
    /// <summary>
    /// Static class that contains all of the strongly-typed names for Authorization Policies
    /// used in Villains servers.
    /// </summary>
    public static class AuthorizationPolicies
    {
        /// <summary>
        /// Returns a string indicating that this is an AdminOnly authorization policy.
        /// </summary>
        public static readonly string AdminOnly = "AdminOnly";

        /// <summary>
        /// Returns a string indicating that this is an BankerOnly authorization policy.
        /// </summary>
        public static readonly string BankerOnly = "BankerOnly";
    }
}
