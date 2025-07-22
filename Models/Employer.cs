namespace GradGo.Models
{
    public class Employer
    {
        public Guid Id { get; set; }
        public int CountryId { get; set; }
        public required string Name { get; set; }
        public required string City { get; set; }
        public Country? Country { get; set; }
        public StaffCount StaffCount { get; set; }
    }
}