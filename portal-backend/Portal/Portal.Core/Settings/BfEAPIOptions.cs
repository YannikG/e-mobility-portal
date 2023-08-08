using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Portal.Core.Settings
{
    public class BfEAPIOptions
    {
        public string BaseUrl { get; set; } = string.Empty;
        public string StaticDataEndpoint { get; set; } = string.Empty;
        public string DynamicDataEndpoint { get; set; } = string.Empty;

    }
}
