using Portal.Core.DTOs.Locations;

namespace Portal.WebAPI.Models.Locations.Converters
{
    public static class LocationSearchResultDTOToLocationSearchResultModelConverter
    {
        public static List<LocationSearchResultModel> ConvertToModel(List<LocationSearchResultDTO> dto)
        {
            return dto.Select(r =>
            {
                // Convert DTO to Model
                return new LocationSearchResultModel()
                {
                    LocationId = r.LocationId,
                    Accessibility = r.Accessibility,
                    City = r.City,
                    IsOpen24h = r.IsOpen24h,
                    Location = new GEOLocationModel()
                    {
                        Lat = r.GoogleCoordinateLat,
                        Long = r.GoogleCoordinateLong
                    },
                    PostalCode = r.PostalCode,
                    Provider = r.Provider,
                    Street = r.Street,
                    Distance = r.Distance,
                    Availability = r.Availability
                };
            }).ToList();
        }
    }
}
