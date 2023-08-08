using System;
using Portal.Core.DTOs.Plugs;

namespace Portal.Core.DTOs.Locations
{
	public class LocationDetailChargingStationResultDTO
	{
		public string ChargingStationId { get; set; } = string.Empty;
		public string Availability { get; set; } = string.Empty;
		public List<PlugDTO> Plugs { get; set; } = new List<PlugDTO>();
	}
}

