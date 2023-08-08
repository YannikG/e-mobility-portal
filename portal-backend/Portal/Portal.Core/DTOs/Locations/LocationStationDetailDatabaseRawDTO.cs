using System;
namespace Portal.Core.DTOs.Locations
{
	public class LocationStationDetailDatabaseRawDTO
	{
        // Location
        public string LocationId { get; set; } = string.Empty;
        public string Provider { get; set; } = string.Empty;
        public string? Street { get; set; }
        public string? PostalCode { get; set; }
        public string? City { get; set; }
        public double GoogleCoordinateLat { get; set; }
        public double GoogleCoordinateLong { get; set; }
        public bool IsOpen24h { get; set; }
        public string Accessibility { get; set; } = string.Empty;
        public double Distance { get; set; }

        // Charging Station
        public string ChargingStationId { get; set; } = string.Empty;
        public string Availability { get; set; } = string.Empty;

        // Plugs
        public int PlugId { get; set; }
        public string Plug { get; set; } = string.Empty;
    }
}

