using System;
using Portal.Core.DTOs.Plugs;

namespace Portal.WebAPI.Models.Plug.Converters
{
    public static class PlugDTOToPlugModelConverter
    {
        public static List<PlugModel> ConvertToModel(List<PlugDTO> dto)
        {
            return dto.Select(r =>
            {
                return new PlugModel()
                {
                    PlugId = r.PlugId,
                    PlugName = r.Plug
                };
            }).ToList();
        }
    }
}

