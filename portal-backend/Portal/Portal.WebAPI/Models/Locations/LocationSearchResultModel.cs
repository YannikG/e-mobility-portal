namespace Portal.WebAPI.Models.Locations
{
    public class LocationSearchResultModel
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
        public string Availability { get; set; } = string.Empty;
    }
}
