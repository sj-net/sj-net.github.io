---
title: MOQ
parent: .Net Framework
layout: default
published: true
grand_parent: My Docs
---

### How to add HealthChecks to .Net Framework
---

``` csharp
using Microsoft.Extensions.Diagnostics.HealthChecks;

namespace Microsoft.Extensions.DependencyInjection
{
    public class SampleDatabaseHealthCheck : IHealthCheck
    {
        private readonly DBContext dbContext;
    
        public SampleDatabaseHealthCheck(DBContext dbContext)
        {
            this.dbContext = dbContext;
        }
        public async Task<HealthCheckResult> CheckHealthAsync(HealthCheckContext context, CancellationToken cancellationToken = default)
        {
            try
            {
                // select 1 is the fastest way to detect whether the DB can be connected or not.
                var result = await dbContext.ExecuteSqlCommandAsync("Select 1", cancellationToken);
                return HealthCheckResult.Healthy();
            }
            catch (System.Exception e)
            {
                return HealthCheckResult.Unhealthy(exception: e);
            }
        }
    }

    public static class HealthCheckExtensions
    {
        public static HealthCheckService GetHealthCheckService(DBContext dbContext)
        {
            var serviceCollection = new ServiceCollection();
            serviceCollection
                    .AddLogging() // HealthCheckService needs ILogger
                    .AddHealthChecks()
                    // if the ctor needs custom arguements
                    .AddTypeActivatedCheck<SampleDatabaseHealthCheck>("database", dbContext)
                    // if ctor argument can be resolved by this this serviceCollection
                    .AddCheck<SampleDatabaseHealthCheck>("database");
            // ensure the health check can be resolved with all the required dependecies else this throws DI error.
            var serviceProvider = serviceCollection.BuildServiceProvider();
            return serviceProvider.GetRequiredService<HealthCheckService>();
        }
    }
}
```
