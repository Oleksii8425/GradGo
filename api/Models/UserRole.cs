using System.ComponentModel;
using System.Text.Json.Serialization;

namespace GradGo.Models
{
    [JsonConverter(typeof(JsonStringEnumConverter))]
    public enum UserRole
    {
        [Description("Employer")]
        Employer,
        [Description("Jobseeker")]
        Jobseeker
    }
}