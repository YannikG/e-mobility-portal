using System;
namespace Portal.WebAPI.Models.Locations
{
	public class LocationDetailResultModel
	{
        public string LocationId { get; set; } = string.Empty;
        public string Provider { get; set; } = string.Empty;
        public string? Street { get; set; }
        public string? PostalCode { get; set; }
        public string? City { get; set; }
        public GEOLocationModel? Location { get; set; }
        public bool IsOpen24h { get; set; }
        public string Accessibility { get; set; } = string.Empty;
        public double Distance { get; set; }
        public List<LocationDetailChargingStationModel> ChargingStations { get; set; } = new List<LocationDetailChargingStationModel>();
    }
}

