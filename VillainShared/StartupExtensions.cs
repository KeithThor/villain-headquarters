using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using System.Text;
using VillainShared.Auth;
using VillainShared.Models;

namespace VillainShared
{
    public static class StartupExtensions
    {
        /// <summary>
        /// Loads token management settings from the appsettings.json file.
        /// </summary>
        /// <param name="services"></param>
        private static TokenManagement GetToken(IServiceCollection services)
        {
            var provider = services.BuildServiceProvider();
            var config = provider.GetService<IConfiguration>();

            services.Configure<TokenManagement>(config.GetSection("tokenManagement"));
            var token = config.GetSection("tokenManagement").Get<TokenManagement>();
            return token;
        }

        /// <summary>
        /// Adds JWT authentication for use in Villains microservices.
        /// </summary>
        /// <param name="services"></param>
        public static void AddVillainsAuthentication(this IServiceCollection services)
        {
            var token = GetToken(services);
            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                    .AddJwtBearer(options =>
                    {
                        options.SaveToken = true;
                        options.TokenValidationParameters = new TokenValidationParameters
                        {
                            ValidateIssuerSigningKey = true,
                            IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(token.Secret)),
                            ValidIssuer = token.Issuer,
                            ValidAudience = token.Audience,
                            ValidateIssuer = true,
                            ValidateLifetime = true,
                            ValidateAudience = true
                        };
                    });
        }

        /// <summary>
        /// Adds Authorization and related authorization policies to the server based on the requirements for
        /// Villains.
        /// </summary>
        /// <param name="services"></param>
        public static void AddVillainsAuthorization(this IServiceCollection services)
        {
            services.AddAuthorization(options =>
            {
                options.AddPolicy(AuthorizationPolicies.AdminOnly, policy =>
                {
                    policy.RequireClaim(ClaimTypes.Role, VillainsClaimsValues.Admin);
                });

                options.AddPolicy(AuthorizationPolicies.BankerOnly, policy =>
                {
                    policy.RequireClaim(ClaimTypes.Role, VillainsClaimsValues.Banker);
                });
            });
        }
    }
}
