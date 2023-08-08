using System;
using Portal.WebAPI.Models.Plug;

namespace Portal.WebAPI.Models.Locations
{
    public class LocationDetailChargingStationModel
    {
        public string ChargingStationId { get; set; } = string.Empty;
        public string Availability { get; set; } = string.Empty;
        public List<PlugModel> Plugs { get; set; } = new List<PlugModel>();
    }
}

