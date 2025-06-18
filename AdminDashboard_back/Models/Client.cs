namespace AdminDashboard.Models
{
    public class Client
    {
        public int Id { get; set; }
        public string Name { get; set; } = null!;
        public string Email { get; set; } = null!;
        public decimal BalanceT { get; set; }
    }
}
