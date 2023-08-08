using Dapper;
using Microsoft.Extensions.Options;
using Portal.Core.DTOs.Locations;
using Portal.Core.DTOs.Plugs;
using Portal.Core.Settings;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Portal.Core.Repositories.Implementations
{
    public class LocationDatabaseRepository : BaseDatabaseRepository, ILocationRepository
    {
        private const string SEARCH_LOCATIONS_SQL = "SELECT DISTINCT l.location_id, l.provider, l.street, l.postal_code, l.city, l.is_open_24h, l.accessibility, l.google_coordinate_lat, l.google_coordinate_long, ca.availability , ROUND(earth_distance(ll_to_earth(@lat, @lon), ll_to_earth(google_coordinate_lat, google_coordinate_long))::NUMERIC / 1000, 2) AS distance FROM locations l"
                                                    + " LEFT JOIN chargingstations c ON c.location_id = l.location_id"
                                                    + " LEFT JOIN chargingstationavailability ca ON ca.charging_station_id  = c.charging_station_id"
                                                    + " LEFT JOIN plugschargingstation pc ON c.charging_station_id  = pc.charging_station_id"
                                                    + " WHERE earth_box(ll_to_earth (@lat, @lon), @radius) @> ll_to_earth (google_coordinate_lat, google_coordinate_long)"
                                                    + " AND earth_distance(ll_to_earth (@lat, @lon), ll_to_earth (google_coordinate_lat, google_coordinate_long)) < @radius"
                                                    + " AND pc.plug_id = @plugId"
                                                    + " AND (ca.availability = 'Available' OR ca.availability  = 'Unknown')"
                                                    + " ORDER BY distance ASC";

        private const string SEARCH_LOCATIONS_WITHOUT_PLUG_SQL = "SELECT DISTINCT l.location_id, l.provider, l.street, l.postal_code, l.city, l.is_open_24h, l.accessibility, l.google_coordinate_lat, l.google_coordinate_long, ca.availability , ROUND(earth_distance(ll_to_earth(@lat, @lon), ll_to_earth(google_coordinate_lat, google_coordinate_long))::NUMERIC / 1000, 2) AS distance FROM locations l"
                                                    + " LEFT JOIN chargingstations c ON c.location_id = l.location_id"
                                                    + " LEFT JOIN chargingstationavailability ca ON ca.charging_station_id  = c.charging_station_id"
                                                    + " WHERE earth_box(ll_to_earth (@lat, @lon), @radius) @> ll_to_earth (google_coordinate_lat, google_coordinate_long)"
                                                    + " AND earth_distance(ll_to_earth (@lat, @lon), ll_to_earth (google_coordinate_lat, google_coordinate_long)) < @radius"
                                                    + " AND (ca.availability = 'Available' OR ca.availability  = 'Unknown')"
                                                    + " ORDER BY distance ASC";
        private const string DETAIL_LOCATIONS_BY_ID_AND_GEO_SQL = "SELECT l.location_id, l.provider, l.street, l.city, l.postal_code, l.is_open_24h, l.google_coordinate_lat, l.google_coordinate_long, l.accessibility, ROUND(earth_distance(ll_to_earth(@lat, @lon), ll_to_earth(l.google_coordinate_lat, l.google_coordinate_long))::NUMERIC / 1000, 2) AS distance, c.charging_station_id, ca.availability, p.plug_id, p.plug FROM locations l"
                                                    + " LEFT JOIN chargingstations c ON c.location_id = l.location_id"
                                                    + " LEFT JOIN chargingstationavailability ca ON ca.charging_station_id  = c.charging_station_id"
                                                    + " LEFT JOIN plugschargingstation pc ON c.charging_station_id  = pc.charging_station_id"
                                                    + " LEFT JOIN plugs p ON p.plug_id  = pc.plug_id"
                                                    + " WHERE l.location_id  = @locationId";

        public LocationDatabaseRepository(IOptions<DatabaseOptions> options) : base(options)
        {
        }

        public async Task<List<LocationSearchResultDTO>> SearchForAvailableLocationsAsync(int plugId, int radius, double lat, double lon)
        {
            using (var conn = await GetAndOpenConnectionAsync())
            {
                var result = await conn.QueryAsync<LocationSearchResultDTO>(SEARCH_LOCATIONS_SQL, new { plugId = plugId, radius = radius, lat = lat, lon = lon });
                return result.ToList();
            }
        }

        public async Task<List<LocationSearchResultDTO>> SearchForAvailableLocationsAsync(int radius, double lat, double lon)
        {
            using (var conn = await GetAndOpenConnectionAsync())
            {
                var result = await conn.QueryAsync<LocationSearchResultDTO>(SEARCH_LOCATIONS_WITHOUT_PLUG_SQL, new { radius = radius, lat = lat, lon = lon });
                return result.ToList();
            }
        }

        public async Task<LocationDetailResultDTO?> GetLocationDetailsByIdAsync(string locationId, double lat, double lon)
        {
            using (var conn = await GetAndOpenConnectionAsync())
            {
                var dbResult = await conn.QueryAsync<LocationStationDetailDatabaseRawDTO>(
                    DETAIL_LOCATIONS_BY_ID_AND_GEO_SQL,
                    new { locationId = locationId, lat = lat, lon = lon }
                );

                if (dbResult.Count() <= 0)
                    return null;

                var result = new LocationDetailResultDTO()
                {
                    LocationId = dbResult.First().LocationId,
                    Accessibility = dbResult.First().Accessibility,
                    City = dbResult.First().City,
                    Street = dbResult.First().Street,
                    PostalCode = dbResult.First().PostalCode,
                    Provider = dbResult.First().Provider,
                    IsOpen24h = dbResult.First().IsOpen24h,
                    Distance = dbResult.First().Distance,
                    GoogleCoordinateLat = dbResult.First().GoogleCoordinateLat,
                    GoogleCoordinateLong = dbResult.First().GoogleCoordinateLong
                };

                dbResult.ToList().ForEach(station =>
                {
                    result.ChargingStations.Add(new LocationDetailChargingStationResultDTO()
                    {
                        Availability = station.Availability,
                        ChargingStationId = station.ChargingStationId
                    });
                });

                result.ChargingStations = result.ChargingStations.DistinctBy(cs => cs.ChargingStationId).ToList();

                result.ChargingStations.ForEach(station =>
                {
                    dbResult.Where(r => r.ChargingStationId == station.ChargingStationId).ToList().ForEach(p =>
                    {
                        station.Plugs.Add(new PlugDTO()
                        {
                            Plug = p.Plug,
                            PlugId = p.PlugId
                        });

                        station.Plugs = station.Plugs.DistinctBy(p => p.PlugId).ToList();
                    });
                });

                return result;
            }
        }
    }
}
