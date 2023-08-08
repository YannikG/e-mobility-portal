using Coravel.Invocable;
using Portal.Core.Clients;
using Portal.Core.DTOs.Imports;
using Portal.Core.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Portal.Core.Jobs
{
    public class ImportBfEStaticDataJob : IInvocable
    {
        private readonly BfEAPIWrapper bfEAPIWrapper;
        private readonly IDataImportRepository importRepository;
        public ImportBfEStaticDataJob(BfEAPIWrapper bfEAPIWrapper, IDataImportRepository importRepository)
        {
            this.bfEAPIWrapper = bfEAPIWrapper;
            this.importRepository = importRepository;

        }
        public async Task Invoke()
        {
            var json = await bfEAPIWrapper.GetStaticDataAsync();
            var dto = new BfEDataImportDTO()
            {
                Json = json
            };

            await importRepository.WriteStaticDataAsync(dto);
            await importRepository.WriteLocationsAsync();
        }
    }
}
