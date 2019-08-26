using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using VillainHeadquarters.Data;
using VillainHeadquarters.Models;

namespace VillainHeadquarters.Services
{
    public class RegistrationService
    {
        private readonly UserManager<ApplicationUser> _userManager;

        public RegistrationService(UserManager<ApplicationUser> userManager)
        {
            _userManager = userManager;
        }

        /// <summary>
        /// Registers a new basic user account asynchronously.
        /// </summary>
        /// <param name="user">The credentials of the new user to register.</param>
        /// <returns>Returns an ApplicationUser if registration was successful, else returns null.</returns>
        public async Task<ApplicationUser> RegisterUserAsync(UserCredentials user)
        {
            if (await _userManager.FindByNameAsync(user.Username) != null) return null;

            var id = Guid.NewGuid().ToString();
            var idClaims = GetUserClaims(user, id );
            var claims = idClaims.Select(idClaim => idClaim.ToClaim()).ToList();

            var newUser = new ApplicationUser
            {
                Id = id,
                UserName = user.Username,
                Claims = idClaims
            };

            var result = await _userManager.CreateAsync(newUser, user.Password);
            if (!result.Succeeded) return null;

            result = await _userManager.AddClaimsAsync(newUser, claims);
            if (!result.Succeeded) return null;
            else return newUser;
        }

        /// <summary>
        /// Constructs and returns a new List of IdentityUserClaims for the given user.
        /// </summary>
        /// <param name="user">The object that holds the user's credentials.</param>
        /// <param name="userId">The id of the new user.</param>
        /// <returns></returns>
        private List<IdentityUserClaim<string>> GetUserClaims(UserCredentials user, string userId)
        {
            return new List<IdentityUserClaim<string>>
            {
                new IdentityUserClaim<string>
                {
                    ClaimType = ClaimTypes.Name,
                    ClaimValue = user.Username
                },
                new IdentityUserClaim<string>
                {
                    ClaimType = ClaimTypes.NameIdentifier,
                    ClaimValue = userId
                },
                new IdentityUserClaim<string>
                {
                    ClaimType = ClaimTypes.Role,
                    ClaimValue = "villains.keiththor.com/user"
                }
            };
        }
    }
}
