using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using VillainBanker.Data;
using VillainBanker.Services.Interfaces;
using VillainShared.Auth;

namespace VillainBanker.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(AuthorizationPolicies.AdminOnly)]
    public class VendorController : ControllerBase
    {
        private readonly IVendorRegistrar _vendorRegistrar;

        public VendorController(IVendorRegistrar vendorRegistrar)
        {
            _vendorRegistrar = vendorRegistrar;
        }

        [Route("[action]")]
        [HttpPost]
        public async Task<IActionResult> Register([FromBody]Vendor vendor)
        {
            if (!ModelState.IsValid) return new BadRequestResult();

            var success = await _vendorRegistrar.RegisterAsync(vendor);

            if (success) return new OkResult();
            else return new BadRequestResult();
        }
    }
}