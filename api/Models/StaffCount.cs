using System.ComponentModel;
using System.Text.Json.Serialization;

namespace GradGo.Models
{
    [JsonConverter(typeof(JsonStringEnumConverter))]
    public enum StaffCount
    {
        [Description("Less than 50")]
        LessThan50,
        [Description("50 to 100")]
        Between50And100,
        [Description("100 to 500")]
        Between100And500,
        [Description("More than 500")]
        MoreThan500
    }
}