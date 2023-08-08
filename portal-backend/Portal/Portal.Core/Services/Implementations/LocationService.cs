using Portal.Core.DTOs.Locations;
using Portal.Core.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Portal.Core.Services.Implementations
{
    public class LocationService : ILocationService
    {
        private readonly ILocationRepository locationRepository;

        public LocationService(ILocationRepository locationRepository)
        {
            this.locationRepository = locationRepository;
        }

        public async Task<LocationDetailResultDTO?> GetLocationDetailsByIdAsync(string locationId, double lat, double lon)
        {
            return await this.locationRepository.GetLocationDetailsByIdAsync(locationId, lat, lon);
        }

        public async Task<List<LocationSearchResultDTO>> SearchForAvailableLocationsAsync(int plugId, int radius, double lat, double lon)
        {
            // convert km to m.
            var radius_m = radius * 1000;

            if (plugId == default(int))
                return await this.locationRepository.SearchForAvailableLocationsAsync(radius_m, lat, lon);

            return await this.locationRepository.SearchForAvailableLocationsAsync(plugId, radius_m, lat, lon);
        }
    }
}
