using Microsoft.Extensions.Options;
using Portal.Core.Settings;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace Portal.Core.Clients
{
    public class BfEAPIWrapper
    {
        private readonly BfEAPIOptions options;
        private readonly Uri baseUri;

        public BfEAPIWrapper(IOptions<BfEAPIOptions> options) 
        {
            this.options = options.Value;
            this.baseUri = new Uri(this.options.BaseUrl);
        }

        public async Task<string> GetStaticDataAsync()
        {
            var requestUri = new Uri(this.baseUri, this.options.StaticDataEndpoint);
            return await makeRequestAsync(requestUri);
        }

        public async Task<string> GetDynamicDataAsync()
        {
            var requestUri = new Uri(this.baseUri, this.options.DynamicDataEndpoint);
            return await makeRequestAsync(requestUri);
        }

        private async Task<string> makeRequestAsync(Uri requestUri)
        {
            using (var httpClient = new HttpClient())
            {
                var response = await httpClient.GetAsync(requestUri);
                if (response.IsSuccessStatusCode)
                {
                    return await response.Content.ReadAsStringAsync();
                }
                else
                {
                    throw new Exception($"API call failed with status code: {response.StatusCode}");
                }
            }

        }
    }
}