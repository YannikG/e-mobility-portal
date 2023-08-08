using System.ComponentModel.DataAnnotations;

namespace Portal.WebAPI.Models.Locations
{
    public class GEOLocationModel
    {
        public double Lat { get; set; }
        public double Long { get; set; }
    }
}
