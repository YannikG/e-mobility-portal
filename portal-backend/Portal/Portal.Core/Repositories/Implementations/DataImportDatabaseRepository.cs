using Dapper;
using Microsoft.Extensions.Options;
using Npgsql;
using Portal.Core.DTOs.Imports;
using Portal.Core.Settings;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Portal.Core.Repositories.Implementations
{
    public class DataImportDatabaseRepository : BaseDatabaseRepository, IDataImportRepository
    {
        // Insert Statement with parameter @json from DTO.
        const string insertStatementStaticSql = "INSERT INTO public.StaticDataRaw (json_string) VALUES (@json::JSON)";
        const string insertStatementDynamicSql = "INSERT INTO public.DynamicDataRaw (json_string) VALUES (@json::JSON)";
        const string insertFunctionLocationsSql = "EXEC dbo.sp_start_job 'sp_locations_insert'";
        public DataImportDatabaseRepository(IOptions<DatabaseOptions> options) : base(options) { }

        public async Task WriteStaticDataAsync(BfEDataImportDTO dto)
        {
            using(var connection = await GetAndOpenConnectionAsync())
            {
                // Execute async SQL statement without return value.
                await connection.ExecuteAsync(insertStatementStaticSql, dto);
            }
        }

        public async Task WriteDynamicDataAsync(BfEDataImportDTO dto)
        {
            using (var connection = await GetAndOpenConnectionAsync())
            {
                // Execute async SQL statement without return value.
                await connection.ExecuteAsync(insertStatementDynamicSql, dto);
            }
        }

        public async Task WriteLocationsAsync()
        {
            using (var connection = await GetAndOpenConnectionAsync())
            {
                using (var command = new NpgsqlCommand("sp_locations_insert", connection))
                {
                    command.CommandType = CommandType.StoredProcedure;

                    // Command Timeout auf 30 Minuten setzen
                    command.CommandTimeout = 1800;
                    command.ExecuteNonQuery();
                }
            }
        }
    }
}