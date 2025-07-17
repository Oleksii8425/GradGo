namespace GradGo.Models
{
    public class Employer
    {
        public Guid Id { get; set; }
        public required string Name { get; set; }
        public required string City { get; set; }
        public required string Country { get; set; }
        public int EmployeesNo { get; set; }
    }
}