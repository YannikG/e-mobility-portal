using System.ComponentModel.DataAnnotations;

namespace Portal.WebAPI.Models.Locations
{
    public class LocationSearchModel
    {
        public GEOLocationModel Location { get; set; }
        public int PlugId { get; set; }
        public int Radius { get; set; }
    }
}
