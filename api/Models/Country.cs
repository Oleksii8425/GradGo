namespace GradGo.Models
{
    public class Country
    {
        public int Id { get; set; }
        public string CountryCode { get; set; } = null!;
        public string Name { get; set; } = null!;
        public string PhoneCode { get; set; } = null!;
        public string CurrencyCode { get; set; } = null!;
        public string CurrencySymbol { get; set; } = null!;
    }
}