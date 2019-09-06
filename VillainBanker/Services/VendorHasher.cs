using Microsoft.Extensions.Configuration;
using System;
using System.Security.Cryptography;
using VillainBanker.Models;
using VillainBanker.Services.Interfaces;

namespace VillainBanker.Services
{
    /// <summary>
    /// Class implementing IVendorHasher that hashes and validates Vendor secrets.
    /// </summary>
    public class VendorHasher : IVendorHasher
    {
        private readonly IConfiguration _config;
        private const int ITERATIONS = 2500;

        public VendorHasher(IConfiguration config)
        {
            _config = config;
        }

        public string Hash(string password)
        {
            var salt = _config.Get<VendorRegistrationOptions>().Secret;
            var passBytes = System.Text.Encoding.UTF8.GetBytes(password);
            var saltBytes = System.Text.Encoding.UTF8.GetBytes(salt);

            var pbkdf2 = new Rfc2898DeriveBytes(passBytes, saltBytes, ITERATIONS);
            byte[] hash = pbkdf2.GetBytes(20);

            byte[] hashBytes = new byte[36];
            Array.Copy(saltBytes, 0, hashBytes, 0, 16);
            Array.Copy(hash, 0, hashBytes, 16, 20);

            return Convert.ToBase64String(hashBytes);
        }

        public bool Validate(string password, string hashedPassword)
        {
            byte[] hashBytes = Convert.FromBase64String(hashedPassword);

            byte[] salt = new byte[16];
            Array.Copy(hashBytes, 0, salt, 0, 16);

            var pbkdf2 = new Rfc2898DeriveBytes(password, salt, ITERATIONS);
            byte[] hash = pbkdf2.GetBytes(20);

            for (int i = 0; i < 20; i++)
            {
                if (hashBytes[i + 16] != hash[i])
                    return false;
            }

            return true;
        }
    }
}
