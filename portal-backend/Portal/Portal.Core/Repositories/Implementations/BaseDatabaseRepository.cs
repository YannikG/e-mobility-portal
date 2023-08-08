using Microsoft.Extensions.Options;
using Npgsql;
using Portal.Core.Settings;

namespace Portal.Core.Repositories.Implementations
{
    /// <summary>
    /// base class to provide functionalities to all PostgreSQL based repositories implementations.
    /// </summary>
    public class BaseDatabaseRepository
    {
        internal readonly DatabaseOptions options;

        public BaseDatabaseRepository(IOptions<DatabaseOptions> options)
        {
            this.options = options.Value;
        }

        /// <summary>
        /// Opens and returns a new <see cref="NpgsqlConnection"/> object.
        /// This method should be used in a using-statement.
        /// </summary>
        /// <returns></returns>
        internal async Task<NpgsqlConnection> GetAndOpenConnectionAsync()
        {
            var conn = new NpgsqlConnection(options.ConnectionString);
            await conn.OpenAsync();
            return conn;
        }
    }
}
