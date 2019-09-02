namespace VillainShared.Auth
{
    /// <summary>
    /// A static class containing claims values for Villains servers.
    /// </summary>
    public static class VillainsClaimsValues
    {
        /// <summary>
        /// Returns a string indicating that this claims value is 'user'.
        /// </summary>
        public static readonly string User = "villains.keiththor.com/user";

        /// <summary>
        /// Returns a string indicating that this claims value is 'admin'.
        /// </summary>
        public static readonly string Admin = "villains.keiththor.com/admin";

        /// <summary>
        /// Returns a string indicating that this claims value is 'banker'.
        /// </summary>
        public static readonly string Banker = "villains.keiththor.com/banker";
    }
}
