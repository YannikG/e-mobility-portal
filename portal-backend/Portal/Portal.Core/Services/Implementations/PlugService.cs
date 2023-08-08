using System;
using Portal.Core.DTOs.Plugs;
using Portal.Core.Repositories;

namespace Portal.Core.Services.Implementations
{
	public class PlugService : IPlugService
	{
        private readonly IPlugRepository plugRepository;

		public PlugService(IPlugRepository plugRepository)
		{
            this.plugRepository = plugRepository;
		}

        public async Task<List<PlugDTO>> GetAllPlugsAsync()
        {
            return await plugRepository.GetAllPlugsAsync();
        }
    }
}

