using System;
using Dapper;
using Microsoft.Extensions.Options;
using Portal.Core.DTOs.Plugs;
using Portal.Core.Settings;

namespace Portal.Core.Repositories.Implementations
{
	public class PlugDatabaseRepository : BaseDatabaseRepository, IPlugRepository
	{
        private const string GET_ALL_SQL = "SELECT DISTINCT * FROM Plugs";
        public PlugDatabaseRepository(IOptions<DatabaseOptions> options) : base(options)
        {
        }

        public async Task<List<PlugDTO>> GetAllPlugsAsync()
        {
            using (var connection = await GetAndOpenConnectionAsync())
            {
                var result = await connection.QueryAsync<PlugDTO>(GET_ALL_SQL);
                return result.ToList();
            }
        }
    }
}

