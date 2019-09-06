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
        public const string AdminOnly = "AdminOnly";

        /// <summary>
        /// Returns a string indicating that this is an BankerOnly authorization policy.
        /// </summary>
        public const string BankerOnly = "BankerOnly";
    }
}
