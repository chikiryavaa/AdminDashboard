﻿namespace AdminDashboard.Models
{
    public class Payment
    {
        public int Id { get; set; }
        public int ClientId { get; set; }
        public Client Client { get; set; } = null!;
        public decimal Amount { get; set; }
        public DateTime Date { get; set; }
    }
}
