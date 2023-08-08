using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Portal.Core.DTOs.Locations
{
    public class LocationSearchResultDTO
    {
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
        public string Availability { get; set; } = string.Empty;
    }
}
