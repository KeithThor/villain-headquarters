using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using System.IdentityModel.Tokens.Jwt;
using VillainHeadquarters.Services;

namespace VillainHeadquarters
{
    public static class StartupExtensions
    {
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
