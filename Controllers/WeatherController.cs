using Microsoft.AspNetCore.Mvc;
using wu_react.Models;
using wu_react.Services;

namespace wu_react.Controllers;

[ApiController]
[Route("api/[controller]/[action]")]
public class WeatherController : ControllerBase
{
    private readonly IObservationsService _observationsService;
    private readonly ILogger _logger;
    public WeatherController(
        IObservationsService observationsService,
        ILoggerFactory logFactory)
    {
        _observationsService = observationsService;
        _logger = logFactory.CreateLogger<WeatherController>();
    }

    /*
        Meteobridge Data getter
        - This is where Meteobridge sends the weather data to
        - It stores the result in the mongodb
    */
    [HttpGet]
    public async Task<ActionResult<string>> Mb([FromQuery] Observations data)
    {
        try
        {
            if (data.ObsTime != default && !double.IsNaN(data.TempOutCur))
            {
                await _observationsService.Create(data);
                return "DATA OK";
            }
            return "DATA BAD";
        }
        catch (Exception ex)
        {
            _logger.LogInformation(ex.ToString());
            throw;
        }
    }
}