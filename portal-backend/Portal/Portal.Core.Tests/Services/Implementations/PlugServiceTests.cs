using Moq;
using Portal.Core.DTOs.Plugs;
using Portal.Core.Repositories;
using Portal.Core.Services.Implementations;

namespace Portal.Core.Tests.Services.Implementations
{
    [TestFixture]
    public class PlugServiceTests
    {
        [Test]
        public async Task GetAllPlugsAsync_WhenCalled_ShouldCallGetAllPlugsAsync_Happy()
        {
            // Arrange
            var plugRepositoryMock = new Mock<IPlugRepository>();
            plugRepositoryMock.Setup(x => x.GetAllPlugsAsync()).ReturnsAsync(new List<PlugDTO>());
            
            var plugService = new PlugService(plugRepositoryMock.Object);

            // Act
            var result = await plugService.GetAllPlugsAsync();

            // Assert
            plugRepositoryMock.Verify(x => x.GetAllPlugsAsync(), Times.Once);
        }
    }
}
