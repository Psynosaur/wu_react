namespace wu_react.Models;

public class AppSettings : IAppSettings
{
    public string StationName { get; set; }
    public string Country { get; set; }
    public double MagneticDeclination { get; set; }
    public double Lat { get; set; }
    public string WeatherStation { get; set; }

}

public interface IAppSettings
{
    public string StationName { get; set; }
    public string Country { get; set; }
    public double MagneticDeclination { get; set; }
    public double Lat { get; set; }
    public string WeatherStation { get; set; }
}