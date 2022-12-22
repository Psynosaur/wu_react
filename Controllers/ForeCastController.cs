using Microsoft.AspNetCore.Mvc;
using wu_react.Models;
using wu_react.Services;

namespace wu_react.Controllers;

[ApiController]
[Route("[controller]")]
public class ForecastController : ControllerBase
{
    private readonly ILogger<ForecastController> _logger;
    private readonly IForecastService _forecastService;

    public ForecastController(ILogger<ForecastController> logger, IForecastService forecastService)
    {
        _logger = logger;
        _forecastService = forecastService;
    }

    [HttpGet]
    public async Task<ActionResult<Forecasts>> Get()
    {
        return Ok(await _forecastService.Latest());
    }
}