using System;
using Portal.Core.DTOs.Plugs;

namespace Portal.Core.Services
{
	public interface IPlugService
	{
        /// <summary>
        /// Return a list of all plugs available.
        /// </summary>
        /// <returns></returns>
        public Task<List<PlugDTO>> GetAllPlugsAsync();
    }
}

