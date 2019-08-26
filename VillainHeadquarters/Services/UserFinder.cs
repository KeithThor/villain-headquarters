using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using VillainHeadquarters.Data;
using VillainHeadquarters.Models;

namespace VillainHeadquarters.Services
{
    /// <summary>
    /// Service responsible for finding a user in the database for a login or registration attempt.
    /// </summary>
    public class UserFinder
    {
        private readonly UserManager<ApplicationUser> _userManager;

        public UserFinder(UserManager<ApplicationUser> userManager)
        {
            _userManager = userManager;
        }

        /// <summary>
        /// Asynchronously searches for and returns a user with the given credentials, if it exists in the database.
        /// </summary>
        /// <param name="user">The object containing the user's Username and Password.</param>
        /// <returns>Returns a task containing an ApplicationUser if one exists for the given UserCredentials object.</returns>
        public async Task<ApplicationUser> FindUserAsync(UserCredentials user)
        {
            var foundUser = await _userManager.FindByNameAsync(user.Username);
            if (foundUser == null) return null;

            var success = await _userManager.CheckPasswordAsync(foundUser, user.Password);
            if (!success) return null;

            return foundUser;
        }
    }
}
