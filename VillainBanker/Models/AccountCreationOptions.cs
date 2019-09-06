namespace VillainBanker.Models
{
    /// <summary>
    /// Object used to set the options for account creation.
    /// </summary>
    public class AccountCreationOptions
    {
        /// <summary>
        /// The amount of crypto currency a new account receives.
        /// </summary>
        public decimal InitialBalance { get; set; }
    }
}
