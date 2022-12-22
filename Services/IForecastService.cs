using wu_react.Models;

namespace wu_react.Services
{
    public interface IForecastService
    {
        public Task<List<Forecasts>> Latest();

        public Task Create(Forecasts fc);

    }
}