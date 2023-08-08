using System;
using Portal.Core.DTOs.Plugs;

namespace Portal.Core.Repositories
{
	public interface IPlugRepository
	{
        /// <summary>
        /// Return a list of all plugs available.
        /// </summary>
        /// <returns></returns>
        public Task<List<PlugDTO>> GetAllPlugsAsync();
	}
}

