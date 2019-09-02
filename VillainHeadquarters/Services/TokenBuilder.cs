using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using VillainHeadquarters.Data;
using VillainShared.Models;

namespace VillainHeadquarters.Services
{
    /// <summary>
    /// Service responsible for building Javascript Web Tokens.
    /// </summary>
    public class TokenBuilder
    {
        private readonly IConfiguration _config;
        private readonly JwtSecurityTokenHandler _tokenHandler;
        private SymmetricSecurityKey _key;

        public TokenBuilder(IConfiguration config,
                            JwtSecurityTokenHandler tokenHandler)
        {
            _config = config;
            _tokenHandler = tokenHandler;
        }

        /// <summary>
        /// Creates a Javascript Web Token for the specified ApplicationUser.
        /// </summary>
        /// <param name="user">The ApplicationUser to build a Javascript Web Token for.</param>
        /// <returns>Returns a stringified JWT of the ApplicationUser.</returns>
        public string CreateToken(ApplicationUser user)
        {
            var tokenManagement = _config.GetSection("tokenManagement")
                                         .Get<TokenManagement>();

            var key = GetSecurityKey(tokenManagement);

            var signingCredentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256Signature);

            var convertedClaims = user.Claims.Select(idClaim => idClaim.ToClaim())
                                             .ToList();

            var token = new JwtSecurityToken(
                issuer: tokenManagement.Issuer,
                audience: tokenManagement.Audience,
                expires: DateTime.Now.AddSeconds(tokenManagement.AccessExpiration),
                signingCredentials: signingCredentials,
                claims: convertedClaims);

            return _tokenHandler.WriteToken(token);
        }

        /// <summary>
        /// Returns a SymmetricSecurityKey created from the TokenManagement object.
        /// </summary>
        /// <param name="manager">The manager loaded from configuration that contains the Secret used for the key.</param>
        /// <returns></returns>
        private SymmetricSecurityKey GetSecurityKey(TokenManagement manager)
        {
            if (_key != null) return _key;

            _key = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes(manager.Secret));
            return _key;
        }
    }
}
