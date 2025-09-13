using System.ComponentModel;
using System.Text.Json.Serialization;

namespace GradGo.Models
{
    [JsonConverter(typeof(JsonStringEnumConverter))]
    public enum ApplicationStatus
    {
        [Description("Under Review")]
        UnderReview,
        [Description("Successful")]
        Successful,
        [Description("Rejected")]
        Rejected
    }
}