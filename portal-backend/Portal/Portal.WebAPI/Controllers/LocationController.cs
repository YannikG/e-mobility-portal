using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Portal.Core.Services;
using Portal.WebAPI.Models.Locations;
using Portal.WebAPI.Models.Locations.Converters;

namespace Portal.WebAPI.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class LocationController : ControllerBase
    {
        private readonly ILocationService locationService;

        public LocationController(ILocationService locationService)
        {
            this.locationService = locationService;
        }

        [HttpGet("search")]
        public async Task<IActionResult> SearchForAvailableLocationsAsync([FromQuery] LocationSearchModel searchModel)
        {
            if (searchModel.Location is null)
                return BadRequest("Geo Location is required.");

            if (searchModel.Radius <= 0)
                return BadRequest("Radius must be greater than 0.");

            var serviceResult = await this.locationService.SearchForAvailableLocationsAsync(searchModel.PlugId, searchModel.Radius, searchModel.Location.Lat, searchModel.Location.Long);
            return Ok(LocationSearchResultDTOToLocationSearchResultModelConverter.ConvertToModel(serviceResult));
        }

        [HttpGet("details/{locationId}")]
        public async Task<IActionResult> GetLocationDetailsAsync(string locationId, [FromQuery] GEOLocationModel location)
        {
            if (string.IsNullOrEmpty(locationId))
                return BadRequest("LocationId is required.");

            if (location is null)
                return BadRequest("Geo Location is required.");


            var serviceResult = await this.locationService.GetLocationDetailsByIdAsync(locationId, location.Lat, location.Long);

            if (serviceResult is null)
                return NotFound();

            return Ok(LocationDetailResultDTOToLocationDetailResultModelConverter.ConvertToModel(serviceResult));
        }
    }
}
