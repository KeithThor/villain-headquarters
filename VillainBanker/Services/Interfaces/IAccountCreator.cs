using System.Threading.Tasks;

namespace VillainBanker.Services.Interfaces
{
    /// <summary>
    /// Interface for a class that can create bank accounts.
    /// </summary>
    public interface IAccountCreator
    {
        /// <summary>
        /// Asynchronously creates a bank account for a user with the given id.
        /// </summary>
        /// <param name="userId">The string user id of the user to create a bank account for.</param>
        /// <returns>Returns a task that resolves to true if a user was successfully created.</returns>
        Task<bool> CreateAsync(string userId);
    }
}