using Portal.Core.DTOs.Locations;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Portal.Core.Repositories
{
    public interface ILocationRepository
    {
        /// <summary>
        /// Only search for available locations based on search parameters.
        /// </summary>
        /// <param name="plugId"></param>
        /// <param name="radius">Radius in meter</param>
        /// <param name="lat"></param>
        /// <param name="lon"></param>
        /// <returns></returns>
        public Task<List<LocationSearchResultDTO>> SearchForAvailableLocationsAsync(int plugId, int radius, double lat, double lon);

        /// <summary>
        /// Only search for available locations based on search parameters.
        /// </summary>
        /// <param name="radius">Radius in meter</param>
        /// <param name="lat"></param>
        /// <param name="lon"></param>
        /// <returns></returns>
        public Task<List<LocationSearchResultDTO>> SearchForAvailableLocationsAsync(int radius, double lat, double lon);

        /// <summary>
        /// Get all details about a location based on the location id and lat and long.
        /// </summary>
        /// <param name="locationId"></param>
        /// <param name="lat"></param>
        /// <param name="lon"></param>
        /// <returns></returns>
        public Task<LocationDetailResultDTO?> GetLocationDetailsByIdAsync(string locationId, double lat, double lon);

    }
}
