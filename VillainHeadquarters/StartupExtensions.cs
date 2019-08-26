using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using VillainHeadquarters.Models;
using VillainHeadquarters.Services;

namespace VillainHeadquarters
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
        public static void AddVillainsAuth(this IServiceCollection services)
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
        /// Adds all dependency injection requirements for the Villains server.
        /// </summary>
        /// <param name="services"></param>
        public static void AddInjections(this IServiceCollection services)
        {
            services.AddSingleton<JwtSecurityTokenHandler>();
            services.AddSingleton<TokenBuilder>();
            services.AddTransient<RegistrationService>();
            services.AddTransient<UserFinder>();
        }

        /// <summary>
        /// Use cors settings specific to the Villains application.
        /// </summary>
        /// <param name="app"></param>
        public static void UseVillainsCors(this IApplicationBuilder app)
        {
            app.UseCors(builder =>
            {
                builder.AllowAnyOrigin();
                builder.AllowAnyHeader();
                builder.AllowAnyMethod();
            });
        }
    }
}
