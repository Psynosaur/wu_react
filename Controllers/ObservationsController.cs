using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
using wu_react.Models;
using wu_react.Services;

namespace wu_react.Controllers;

[Route("[controller]")]
[ApiController]
public class ObservationsController : ControllerBase
{
    private readonly IObservationsService _observationsService;
    private readonly ILogger _logger;

    public ObservationsController(
        IObservationsService observationsService,
        ILoggerFactory logFactory)
    {
        _observationsService = observationsService;
        _logger = logFactory.CreateLogger<ObservationsController>();;
    }

    [HttpGet]
    public async Task<ActionResult<List<Observations>>> Get() =>
        await _observationsService.Latest();

    [HttpGet("{id:length(24)}", Name = "GetObservation")]
    public async Task<ActionResult<Observations>> Get(string id)
    {
        try
        {
            var observation = await _observationsService.Get(id);
            return observation.FirstOrDefault();
        }
        catch (Exception ex)
        {
            _logger.LogInformation(ex.ToString());
            throw;
        }
            
    }
        
    [HttpGet("day")]
    public async Task<ActionResult<List<Observations>>> Day()
    {
        try
        {
            var observations = await _observationsService.Daily();
            return observations.ToList();
        }
        catch (Exception ex)
        {
            _logger.LogInformation(ex.ToString());
            throw;
        }
            
    }
    
    [HttpGet("date")]
    public async Task<ActionResult<List<Observations>>> Date(string date)
    {
        try
        {
            var observations = await _observationsService.Date(date);
            return observations.ToList();
        }
        catch (Exception ex)
        {
            _logger.LogInformation(ex.ToString());
            throw;
        }
            
    }

    [HttpPost]
    public async Task<ActionResult<Observations>> Create(Observations observations)
    {
        try
        {
            await _observationsService.Create(observations);
            return CreatedAtRoute("GetObservation", new { id = observations.Id }, observations);
        }
        catch (Exception ex)
        {
            _logger.LogInformation(ex.ToString());
            throw;
        }
           
    }

    [HttpPut("{id:length(24)}")]
    public async Task<IActionResult> Update(string id, Observations observationsIn)
    {
        try
        {
            var observation = await _observationsService.Get(id);
            if (observation.FirstOrDefault() == null)
            {
                return NotFound();
            }
            _observationsService.Update(id, observationsIn);
            return NoContent();
        }
        catch (Exception ex)
        {
            _logger.LogInformation(ex.ToString());
            throw;
        }
            
    }

    [HttpDelete("{id:length(24)}")]
    public async Task<IActionResult> Delete(string id)
    {
        try
        {
            var observation =await _observationsService.Get(id);
            if (observation.FirstOrDefault() == null)
            {
                return NotFound();
            }
            _observationsService.Remove(observation.FirstOrDefault().Id);
            return NoContent();
        }
        catch (Exception ex)
        {
            _logger.LogInformation(ex.ToString());
            throw;
        }
    }
}