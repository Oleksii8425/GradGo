using System.ComponentModel;
using System.Text.Json.Serialization;

namespace GradGo.Models
{
    [JsonConverter(typeof(JsonStringEnumConverter))]
    public enum JobType
    {
        [Description("On-Site")]
        OnSite,
        [Description("Hybrid")]
        Hybrid,
        [Description("Remote")]
        Remote
    }
}