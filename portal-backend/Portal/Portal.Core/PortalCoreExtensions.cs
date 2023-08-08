using Coravel;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Portal.Core.Clients;
using Portal.Core.Jobs;
using Portal.Core.Settings;
using Portal.Core.Repositories;
using Portal.Core.Repositories.Implementations;
using Portal.Core.Services;
using Portal.Core.Services.Implementations;

namespace Portal.Core
{
	public static class PortalCoreExtensions
	{
        /// <summary>
        /// Adds all services from the core project.
        /// </summary>
        /// <param name="services"></param>
        /// <returns></returns>
        public static IServiceCollection AddCoreServices(this IServiceCollection services)
        {
            services.AddTransient<ILocationService, LocationService>();
            services.AddTransient<IPlugService, PlugService>();

            return services;
        }
        /// <summary>
        /// Add scheudler and ImportJobs to dependency injection.
        /// </summary>
        /// <param name="services"></param>
        /// <returns></returns>
        public static IServiceCollection AddImportJobs(this IServiceCollection services)
        {
            services.AddScheduler();
            services.AddTransient<ImportBfEStaticDataJob>();
            services.AddTransient<ImportBfEDynamicDataJob>();

            return services;
        }
        /// <summary>
        /// Add http clients to dependency injection.
        /// </summary>
        /// <param name="services"></param>
        /// <returns></returns>
        public static IServiceCollection AddClients(this IServiceCollection services)
        {
            services.AddSingleton<BfEAPIWrapper>();

            return services;
        }
        /// <summary>
        /// Adds PostgreSQL based repositories from the core project.
        /// Make sure <see cref="DatabaseOptions"/> is available.
        /// </summary>
        /// <param name="services"></param>
        /// <returns></returns>
        public static IServiceCollection AddCorePostgreSQLRepositories(this IServiceCollection services)
        {
            // Tell dapper to convert snake case to pascal case.
            Dapper.DefaultTypeMap.MatchNamesWithUnderscores = true;

            // Register repository to dependency injection.
            services.AddTransient<IDataImportRepository, DataImportDatabaseRepository>();
            services.AddTransient<ILocationRepository, LocationDatabaseRepository>();
            services.AddTransient<IPlugRepository, PlugDatabaseRepository>();

            return services;
        }
        /// <summary>
        /// Schedule Import Jobs
        /// </summary>
        /// <param name="app"></param>
        /// <returns></returns>
        public static IApplicationBuilder UseImportJobs(this IApplicationBuilder app)
        {
            var provider = app.ApplicationServices;
            provider.UseScheduler(scheduler =>
            {
                scheduler
                    .Schedule<ImportBfEStaticDataJob>()
                    // Jeden 1.Tag der Woche (Montag) um 01:00
                    .Cron("0 1 * * 1");
                scheduler
                    .Schedule<ImportBfEDynamicDataJob>()
                    // Alle 15 Minuten (13:00, 13:15, 13:45, 14:00...)
                    .Cron("*/15 * * * *");
            });

            return app;
        }
    }
}

