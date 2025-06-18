namespace AdminDashboard.DTOs
{
    public class ClientDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = null!;
        public string Email { get; set; } = null!;
        public decimal BalanceT { get; set; }
    }
}
