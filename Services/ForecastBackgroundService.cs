using System.Net.Http.Headers;
using Microsoft.Extensions.Options;
using MongoDB.Bson.Serialization;
using wu_react.Models;

namespace wu_react.Services;

public class ForecastBackgroundService: IHostedService, IDisposable
{
    private Timer? _timer;
    private readonly HttpClient _httpClient = new();
    private readonly ILogger _logger;
    private readonly IForecastService _forecastService;
    private readonly IOptions<WeatherUndergroundApiSettings> _options;

    public ForecastBackgroundService(ILogger<ForecastBackgroundService> logger,
        IForecastService forecastService, IOptions<WeatherUndergroundApiSettings> options)
    {
        _logger = logger;
        _forecastService = forecastService;
        _options = options;

        // Set the "Content-Type" request header to "application/json"
        _httpClient.DefaultRequestHeaders.Accept.Clear();
        _httpClient.DefaultRequestHeaders.Accept.Add(
            new MediaTypeWithQualityHeaderValue("application/json"));
    }

    public Task StartAsync(CancellationToken stoppingToken)
    {
        // Set the timer to fire every 60 minutes (3600000 milliseconds)
        _timer = new Timer(FetchWeatherForecast, null, TimeSpan.Zero, TimeSpan.FromSeconds(3600));
        return Task.CompletedTask;
    }

    private async void FetchWeatherForecast(object? state)
    {
        // Use the HTTP client to send a GET request to the API
        //https://api.weather.com/v3/wx/forecast/daily/10day?apiKey=e1f10a1e78da46f5b10a1e78da96f525&geocode=-33.865%2C18.663&units=m&language=en-GB&format=json
        //https://api.weather.com/v3/wx/forecast/daily/5day?geocode=-33.864643,18.659822&format=json&units=m&language=en-US&apiKey=d4748acffd2e4d8ab48acffd2e7d8abc

        string url = string.Format(
            "https://api.weather.com/v3/wx/forecast/daily/5day?" +
            "geocode={0},{1}&format={2}&units={3}&language={4}&apiKey={5}",
            _options.Value.Lat,
            _options.Value.Lon,
            _options.Value.Format,
            _options.Value.Units,
            _options.Value.Language,
            _options.Value.Pat
        );
        var response = await _httpClient.GetAsync(url);
        string responseBody = await response.Content.ReadAsStringAsync();
        var document = BsonSerializer.Deserialize<Forecasts>(responseBody);
        await _forecastService.Create(document);

        // Log the response status code
        _logger.LogInformation("API response status code: {StatusCode}", response.StatusCode);

        // Do something with the response here
    }

    public Task StopAsync(CancellationToken stoppingToken)
    {
        _timer?.Change(Timeout.Infinite, 0);

        return Task.CompletedTask;
    }
    public void Dispose()
    {
        _timer?.Dispose();
    }
}