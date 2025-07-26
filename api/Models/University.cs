namespace GradGo.Models
{
    public class University
    {
        public Guid Id { get; set; }
        public int CountryId { get; set; }
        public required string Name { get; set; }
        public required string City { get; set; }
        public Country Country { get; set; } = null!;
    }
}