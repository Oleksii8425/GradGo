using System.ComponentModel;
using System.Text.Json.Serialization;

namespace GradGo.Models
{
    [JsonConverter(typeof(JsonStringEnumConverter))]
    public enum Degree
    {
        [Description("Bachelor's Degree")]
        Bachelors,
        [Description("Master's Degree")]
        Masters,
        [Description("Doctors")]
        Doctors
    }
}