namespace VillainBanker.Services.Interfaces
{
    /// <summary>
    /// Interface for a class that hashes and validates passwords for Vendor secrets.
    /// </summary>
    public interface IVendorHasher
    {
        /// <summary>
        /// Hashes the given secret and returns the hashed output.
        /// </summary>
        /// <param name="secret">The string secret to hash.</param>
        /// <returns>Contains the hashed secret.</returns>
        string Hash(string secret);

        /// <summary>
        /// Checks if the provided secret results in the provided hashed secret.
        /// </summary>
        /// <param name="secret">The secret to check.</param>
        /// <param name="hashedSecret">The secret to test if identical.</param>
        /// <returns>Returns true if the secret is valid.</returns>
        bool Validate(string secret, string hashedSecret);
    }
}