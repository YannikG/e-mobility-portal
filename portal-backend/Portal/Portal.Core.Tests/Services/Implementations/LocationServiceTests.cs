using Moq;
using Portal.Core.DTOs.Locations;
using Portal.Core.Repositories;
using Portal.Core.Services.Implementations;

namespace Portal.Core.Tests.Services.Implementations
{
    [TestFixture]
    public class LocationServiceTests
    {   
        private const int PlugId_default = default(int);
        private const int PlugId_with_value = 1;
        private const int Radius_with_value = 10;
        private const int Radius_with_value_in_m = 10000;
        private const double Lat_with_value = 10.0;
        private const double Lon_with_value = 10.0;
        private const string LocationID_value = "CH*1234565443224565433";

        [Test]
        public async Task SearchForAvailableLocationsAsync_WhenPlugIdIsDefault_ShouldCallSearchForAvailableLocationsAsyncWithoutPlugIdAsync_Happy()
        {
            // Arrange           
            var locationRepositoryMock = new Mock<ILocationRepository>();
            locationRepositoryMock.Setup(x => x.SearchForAvailableLocationsAsync(Radius_with_value_in_m, Lat_with_value, Lon_with_value)).ReturnsAsync(new List<LocationSearchResultDTO>());
            
            var locationService = new LocationService(locationRepositoryMock.Object);

            // Act
            var result = await locationService.SearchForAvailableLocationsAsync(PlugId_default, Radius_with_value, Lat_with_value, Lon_with_value);

            // Assert
            locationRepositoryMock.Verify(x => x.SearchForAvailableLocationsAsync(Radius_with_value_in_m, Lat_with_value, Lon_with_value), Times.Once);
        }

        [Test]
        public async Task SearchForAvailableLocationsAsync_WhenPlugIdIsNotDefault_ShouldCallSearchForAvailableLocationsAsyncWithPlugIdAsync_Happy()
        {
            var locationRepositoryMock = new Mock<ILocationRepository>();
            locationRepositoryMock.Setup(x => x.SearchForAvailableLocationsAsync(PlugId_with_value, Radius_with_value_in_m, Lat_with_value, Lon_with_value)).ReturnsAsync(new List<LocationSearchResultDTO>());
            
            var locationService = new LocationService(locationRepositoryMock.Object);
            
            // Act
            var result = await locationService.SearchForAvailableLocationsAsync(PlugId_with_value, Radius_with_value, Lat_with_value, Lon_with_value);
            
            // Assert
            locationRepositoryMock.Verify(x => x.SearchForAvailableLocationsAsync(PlugId_with_value, Radius_with_value_in_m, Lat_with_value, Lon_with_value), Times.Once);
        }

        [Test]
        public async Task GetLocationDetailsByIdAsync_ShouldCallGetLocationDetailsByIdAsyncWithLocationIdAsync_Happy()
        {
            var locationRepositoryMock = new Mock<ILocationRepository>();
            locationRepositoryMock.Setup(x => x.GetLocationDetailsByIdAsync(LocationID_value, Lat_with_value, Lon_with_value)).ReturnsAsync(new LocationDetailResultDTO());

            var locationService = new LocationService(locationRepositoryMock.Object);

            // Act
            var result = await locationService.GetLocationDetailsByIdAsync(LocationID_value, Lat_with_value, Lon_with_value);

            // Assert
            locationRepositoryMock.Verify(x => x.GetLocationDetailsByIdAsync(LocationID_value, Lat_with_value, Lon_with_value), Times.Once);
        }
    }
}
