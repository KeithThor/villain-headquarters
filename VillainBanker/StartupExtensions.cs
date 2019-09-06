using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using VillainBanker.Models;
using VillainBanker.Services;
using VillainBanker.Services.Interfaces;

namespace VillainBanker
{
    public static class StartupExtensions
    {
        ///// <summary>
        ///// Loads token management settings from the appsettings.json file.
        ///// </summary>
        ///// <param name="services"></param>
        //public static void ConfigureAccountCreation(IServiceCollection services)
        //{
        //    var provider = services.BuildServiceProvider();
        //    var config = provider.GetService<IConfiguration>();

        //}

        /// <summary>
        /// Adds all dependency injection requirements for the Villains server.
        /// </summary>
        /// <param name="services"></param>
        public static void AddInjections(this IServiceCollection services)
        {
            services.AddTransient<IAccountCreator, AccountCreator>();
            services.AddTransient<ITransactionHandler, TransactionHandler>();
            services.AddTransient<ITransactionLogger, TransactionLogger>();
        }
    }
}
