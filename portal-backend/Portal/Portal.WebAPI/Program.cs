using Microsoft.AspNetCore.Authentication.JwtBearer;
using Portal.Core;
using Portal.Core.Jobs;
using Portal.Core.Settings;
using Portal.WebAPI.Middleware.Swagger;
using Serilog;
using Serilog.Exceptions;
using Serilog.Formatting.Json;

var builder = WebApplication.CreateBuilder(args);

// Logging
builder.Host.UseSerilog((ctx, lc) => lc
    .Enrich.FromLogContext()
    .Enrich.WithExceptionDetails()
    .WriteTo.File(new JsonFormatter(renderMessage: true), "log.json")
    .WriteTo.Console());

// configuration
builder.Configuration.SetBasePath(Directory.GetCurrentDirectory());
builder.Configuration.AddJsonFile($"appsettings.json", false, true);
builder.Configuration.AddJsonFile($"appsettings.{builder.Environment.EnvironmentName}.json", true, true);
builder.Configuration.AddEnvironmentVariables();

// configure DatabaseOptions
builder.Services.Configure<DatabaseOptions>(
    builder.Configuration.GetRequiredSection("Database")
);

// configure BfEAPIOptions
builder.Services.Configure<BfEAPIOptions>(
    builder.Configuration.GetRequiredSection("BfEAPI")
);

// Add services to the container.
builder.Services.AddCorePostgreSQLRepositories();
builder.Services.AddCoreServices();
builder.Services.AddClients();
builder.Services.AddImportJobs();

// Configure Authentication
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.Authority = builder.Configuration["Auth0:Authority"];
    options.Audience = builder.Configuration["Auth0:Audience"];
});

builder.Services.AddControllers();

builder.Services.AddPortalSwagger();

var app = builder.Build();
app.UseImportJobs();

app.UseSerilogRequestLogging();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UsePortalSwagger();

    // Map API endpoint manually for testing. Make sure to only use this during development!
    // ToDo: Move into PortalCoreExtensions (Can't import MapGet() lol)
    var importBfEStaticDataJob = app.Services.GetRequiredService<ImportBfEStaticDataJob>();
    var importBfEDynamicDataJob = app.Services.GetRequiredService<ImportBfEDynamicDataJob>();

    app.MapGet("/dev/jobs/staticimport", () => importBfEStaticDataJob.Invoke());
    app.MapGet("/dev/jobs/dynamicimport", () => importBfEDynamicDataJob.Invoke());
}

app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();

