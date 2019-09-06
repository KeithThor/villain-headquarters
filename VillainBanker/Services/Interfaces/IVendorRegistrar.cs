using System.Threading.Tasks;
using VillainBanker.Data;

namespace VillainBanker.Services.Interfaces
{
    /// <summary>
    /// Interface of a class that registers and verifies Vendors.
    /// </summary>
    public interface IVendorRegistrar
    {
        /// <summary>
        /// Registers a new vendor asynchronously.
        /// </summary>
        /// <param name="vendor">The details of the vendor to register.</param>
        /// <returns>Returns a task that resolves to true if the registration was successful.</returns>
        Task<bool> RegisterAsync(Vendor vendor);

        /// <summary>
        /// Verifies that a vendor with the provided details exists asynchronously.
        /// </summary>
        /// <param name="vendor">The details of the vendor to verify.</param>
        /// <returns>Returns a task that resolves to true if the vendor was successfully verified.</returns>
        Task<bool> VerifyAsync(Vendor vendor);
    }
}