using System.Text.Json.Serialization;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace wu_react.Models;

public class Observations
{

    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string Id { get; set; }
    [BsonElement("DateTime")]
    [BsonDateTimeOptions(Kind = DateTimeKind.Utc)]
    [BsonRepresentation(BsonType.DateTime)]
    [JsonPropertyName("ot")]
    public DateTime ObsTime { get; set; } 
    [JsonPropertyName("to")]
    public double TempOutCur { get; set; }
    [JsonPropertyName("tmn")]
    public double Tmin { get; set; }
    [JsonPropertyName("tmx")]
    public double Tmax { get; set; }
    [JsonPropertyName("ho")]
    public double HumOutCur { get; set; }
    [JsonPropertyName("p")]
    public double PressCur { get; set; }
    [JsonPropertyName("dc")]
    public double DewCur { get; set; }
    [JsonPropertyName("hidx")]
    public double HeatIdxCur { get; set; }
    [JsonPropertyName("wc")]
    public double WindChillCur { get; set; }
    [JsonPropertyName("ti")]
    public double TempInCur { get; set; }
    [JsonPropertyName("hi")]
    public double HumInCur { get; set; }
    [JsonPropertyName("ws")]
    public double WindSpeedCur { get ; set; } 
    [JsonPropertyName("was")]
    public double WindAvgSpeedCur { get; set; }
    
    [JsonPropertyName("wd")]
    public double WindDirCur { get; set; }
    [JsonPropertyName("wde")]
    public string WindDirCurEng { get; set; }
    [JsonPropertyName("wg")]
    public double WindGust10 { get; set; }
    [JsonPropertyName("wda")]
    public double WindDirAvg10 { get; set; }
    [JsonPropertyName("wdae")]
    public string WindDirAvg10Eng { get; set; }
    [JsonPropertyName("rr")]
    public double RainRateCur { get; set; }
    [JsonPropertyName("rd")]
    public double RainDay { get; set; }
    [JsonPropertyName("rpd")]
    public double RainYest { get; set; }
    [JsonPropertyName("rm")]
    public double RainMonth { get; set; }
    [JsonPropertyName("ry")]
    public double RainYear { get; set; }
    // ReSharper disable once InconsistentNaming
    [JsonPropertyName("uv")]
    public double UV { get; set; }
    [JsonPropertyName("sr")]
    public double SolarRad { get; set; }
}
    
    
public class RainObs
{
    public long ObsTime { get; set; } 
    public decimal WindDirAvg10 { get; set; }
    public decimal RainRateCur { get; set; } 
    public string WindDirAvg10Eng { get; set; } 
}
public class WindObs
{
}
    
public class Metric
{
    public int temp { get; set; }
    public int heatIndex { get; set; }
    public int dewpt { get; set; }
    public int windChill { get; set; }
    public int windSpeed { get; set; }
    public int windGust { get; set; }
    public double pressure { get; set; }
    public double precipRate { get; set; }
    public double precipTotal { get; set; }
    public int elev { get; set; }
}

public class WUObservations
{
    public string stationID { get; set; }
    public DateTime obsTimeUtc { get; set; }
    public string obsTimeLocal { get; set; }
    public string neighborhood { get; set; }
    public string softwareType { get; set; }
    public string country { get; set; }
    public double solarRadiation { get; set; }
    public double lon { get; set; }
    public object realtimeFrequency { get; set; }
    public int epoch { get; set; }
    public double lat { get; set; }
    public double uv { get; set; }
    public int winddir { get; set; }
    public int humidity { get; set; }
    public int qcStatus { get; set; }
    public Metric metric { get; set; }
}