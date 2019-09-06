using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using VillainBanker.Data;
using VillainBanker.Services.Interfaces;

namespace VillainBanker.Services
{
    /// <summary>
    /// Class that registers a new Vendor into the banking system.
    /// </summary>
    public class VendorRegistrar : IVendorRegistrar
    {
        private readonly AccountsDbContext _dbContext;
        private readonly IVendorHasher _vendorHasher;

        public VendorRegistrar(AccountsDbContext dbContext,
                               IVendorHasher vendorHasher)
        {
            _dbContext = dbContext;
            _vendorHasher = vendorHasher;
        }

        public async Task<bool> RegisterAsync(Vendor vendor)
        {
            var foundVendor = await _dbContext.Vendors.FirstOrDefaultAsync(v => v.Id == vendor.Id);

            if (foundVendor != null) return false;

            vendor.Secret = _vendorHasher.Hash(vendor.Secret);

            await _dbContext.AddAsync(vendor);

            try
            {
                await _dbContext.SaveChangesAsync();
            }
            catch(Exception ex)
            {
                //Todo: Do something with ex
                return false;
            }
            return true;
        }

        public async Task<bool> VerifyAsync(Vendor vendor)
        {
            var foundVendor = await _dbContext.Vendors.FirstOrDefaultAsync(v => v.Id == vendor.Id);
            if (foundVendor == null) return false;

            return _vendorHasher.Validate(vendor.Secret, foundVendor.Secret);
        }
    }
}
