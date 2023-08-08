using System;
namespace Portal.Core.Settings
{
    /// <summary>
    /// PostgreSQL database options model.
    /// </summary>
    public class DatabaseOptions
    {
        /// <summary>
        /// Fully qualified connection string to a PostgreSQL supported database.
        /// </summary>
        public string ConnectionString { get; set; } = string.Empty;
    }
}

