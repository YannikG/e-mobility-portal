using System;
using Portal.Core.DTOs.Locations;
using Portal.WebAPI.Models.Plug;

namespace Portal.WebAPI.Models.Locations.Converters
{
    public static class LocationDetailResultDTOToLocationDetailResultModelConverter
    {
        public static LocationDetailResultModel ConvertToModel(LocationDetailResultDTO dto)
        {
            var model = new LocationDetailResultModel()
            {
                Accessibility = dto.Accessibility,
                City = dto.City,
                Distance = dto.Distance,
                IsOpen24h = dto.IsOpen24h,
                LocationId = dto.LocationId,
                PostalCode = dto.PostalCode,
                Provider = dto.Provider,
                Street = dto.Street,
                Location = new GEOLocationModel()
                {
                    Lat = dto.GoogleCoordinateLat,
                    Long = dto.GoogleCoordinateLong
                }
            };

            dto.ChargingStations.ForEach(cs =>
            {

                var modelCS = new LocationDetailChargingStationModel()
                {
                    Availability = cs.Availability,
                    ChargingStationId = cs.ChargingStationId
                };

                cs.Plugs.ForEach(p =>
                {
                    modelCS.Plugs.Add(new PlugModel()
                    {
                        PlugId = p.PlugId,
                        PlugName = p.Plug
                    });
                });

                model.ChargingStations.Add(modelCS);
            });

            return model;
        }
    }
}

