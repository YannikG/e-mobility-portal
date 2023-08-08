using Portal.Core.DTOs.Imports;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Portal.Core.Repositories
{
    public interface IDataImportRepository
    {
        /// <summary>
        /// Write data to import table public.StaticDataRaw.
        /// </summary>
        /// <param name="dto"></param>
        /// <returns></returns>
        public Task WriteStaticDataAsync(BfEDataImportDTO dto);

        /// <summary>
        /// Write data to import table public.DynamicDataRaw.
        /// </summary>
        /// <param name="dto"></param>
        /// <returns></returns>
        public Task WriteDynamicDataAsync(BfEDataImportDTO dto);

        /// <summary>
        /// Write data to table public.locations, using fire and forget. 
        /// </summary>
        /// <returns></returns>
        public Task WriteLocationsAsync();
    }
}
