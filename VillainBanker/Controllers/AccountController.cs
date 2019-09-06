using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using System.Threading.Tasks;
using VillainBanker.Models;
using VillainBanker.Services;

namespace VillainBanker.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class AccountController : ControllerBase
    {
        private readonly AccountCreator _accountCreator;
        private readonly TransactionHandler _transactionHandler;

        public AccountController(AccountCreator accountCreator,
                                 TransactionHandler transactionHandler)
        {
            _accountCreator = accountCreator;
            _transactionHandler = transactionHandler;
        }

        [ActionName("[Action]")]
        [HttpPost]
        public async Task<IActionResult> Create()
        {
            var success = await _accountCreator.CreateAsync(GetUserName());
            if (!success) return new ConflictResult();

            return new NoContentResult();
        }

        [ActionName("[Action]")]
        [HttpPost]
        public async Task<IActionResult> Withdraw([FromBody]TransactionRequest request)
        {
            if (request.Amount <= 0) return new BadRequestResult();
            request.Amount = -request.Amount;

            var receipt = await _transactionHandler.MakeTransactionAsync(GetUserName(), request);

            if (receipt == null) return new BadRequestResult();

            return new JsonResult(receipt);
        }

        [ActionName("[Action]")]
        [HttpPost]
        public async Task<IActionResult> Deposit([FromBody]TransactionRequest request)
        {
            if (request.Amount <= 0) return new BadRequestResult();

            var receipt = await _transactionHandler.MakeTransactionAsync(GetUserName(), request);

            if (receipt == null) return new BadRequestResult();

            return new JsonResult(receipt);
        }

        private string GetUserName()
        {
            return User.FindFirst(ClaimTypes.NameIdentifier).Value;
        }
    }
}