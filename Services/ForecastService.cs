using Microsoft.Extensions.Options;
using MongoDB.Driver;
using wu_react.Models;

namespace wu_react.Services;

public class ForecastService : IForecastService
{
    private readonly IMongoCollection<Forecasts> _forecast;
    private readonly ILogger _logger;

    public ForecastService(IOptions<ForecastDatabaseSettings> mongoDbSettings, ILoggerFactory logFactory)
    {
        MongoClient client = new MongoClient(mongoDbSettings.Value.ConnectionString);
        var database = client.GetDatabase(mongoDbSettings.Value.DatabaseName);
        _forecast = database.GetCollection<Forecasts>(mongoDbSettings.Value.ForecastCollectionName);
        _logger = logFactory.CreateLogger<ForecastService>();;
    }
    public async Task<List<Forecasts>> Latest()
    {
        try
        {
            return await _forecast
                .Find(doc => true)
                .Limit(1)
                .Sort("{$natural:-1}").ToListAsync();
        }
        catch (Exception ex)
        {
            _logger.LogInformation(ex.ToString());
            throw;
        }
    }

    public async Task Create(Forecasts fc)
    {
        try
        {
            await _forecast.InsertOneAsync(fc);
        }
        catch (Exception ex)
        {
            _logger.LogInformation(ex.ToString());
            throw;
        }
            
    }
}