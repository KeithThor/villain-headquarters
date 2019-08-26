using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using VillainHeadquarters.Models;
using VillainHeadquarters.Services;

namespace VillainHeadquarters.Controllers
{
    /// <summary>
    /// Controller responsible for logging in and registering users.
    /// </summary>
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly UserFinder _userFinder;
        private readonly TokenBuilder _tokenBuilder;
        private readonly RegistrationService _registrationService;

        public UserController(UserFinder userFinder,
                              TokenBuilder tokenBuilder,
                              RegistrationService registrationService)
        {
            _userFinder = userFinder;
            _tokenBuilder = tokenBuilder;
            _registrationService = registrationService;
        }

        [HttpPost("[action]")]
        public async Task<IActionResult> Login([FromBody]UserCredentials user)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new
                {
                    Message = "Server received invalid data for login request."
                });
            }

            var foundUser = await _userFinder.FindUserAsync(user);
            if (foundUser == null)
            {
                return BadRequest(new
                {
                    Message = "No user was found with that username and password."
                });
            }

            var token = _tokenBuilder.CreateToken(foundUser);
            return new JsonResult(new {
                Token = token,
                Username = foundUser.UserName,
                Id = foundUser.Id
            });
        }

        [HttpPost("[action]")]
        public async Task<IActionResult> Register([FromBody]UserCredentials user)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new
                {
                    Message = "Server received invalid data for register request."
                });
            }

            var newUser = await _registrationService.RegisterUserAsync(user);
            if (newUser == null)
            {
                return BadRequest(new
                {
                    Message = "A user with that username already exists."
                });
            }

            var token = _tokenBuilder.CreateToken(newUser);
            return new JsonResult(new
            {
                Token = token,
                Username = newUser.UserName,
                Id = newUser.Id
            });
        }
    }
}