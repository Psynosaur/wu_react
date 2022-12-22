using Microsoft.Extensions.Options;
using wu_react.Models;
using wu_react.Services;

var builder = WebApplication.CreateBuilder(args);

// builder.Configuration.AddJsonFile("appsettings.json", false, true);

builder.Services.AddControllersWithViews();
builder.Services.Configure<ForecastDatabaseSettings>(
    builder.Configuration.GetSection(nameof(ForecastDatabaseSettings)));
builder.Services.Configure<ObservationDatabaseSettings>(
    builder.Configuration.GetSection(nameof(ObservationDatabaseSettings)));
builder.Services.Configure<WeatherUndergroundApiSettings>(
    builder.Configuration.GetSection(nameof(WeatherUndergroundApiSettings)));
builder.Services.AddSingleton<IForecastService, ForecastService>();
builder.Services.AddSingleton<IObservationsService, ObservationsService>();

builder.Services.AddHostedService<ForecastBackgroundService>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();


app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");

app.MapFallbackToFile("index.html");

app.Run();