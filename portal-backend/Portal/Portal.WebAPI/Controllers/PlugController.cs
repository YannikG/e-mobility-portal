using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Portal.Core.Services;
using Portal.WebAPI.Models.Plug.Converters;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Portal.WebAPI.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class PlugController : ControllerBase
    {
        private readonly IPlugService plugService;

        public PlugController(IPlugService plugService)
        {
            this.plugService = plugService;
        }

        [HttpGet]
        public async Task<IActionResult> GetPlugs()
        {
            var serviceResult = await plugService.GetAllPlugsAsync();

            return Ok(PlugDTOToPlugModelConverter.ConvertToModel(serviceResult));
        }
    }
}

