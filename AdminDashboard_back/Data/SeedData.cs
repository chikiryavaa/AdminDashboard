using AdminDashboard.Models;
using Microsoft.EntityFrameworkCore;

namespace AdminDashboard.Data
{
    public static class SeedData
    {
        public static void Initialize(DashboardDbContext context)
        {
            context.Database.Migrate();

            if (!context.Clients.Any())
            {
                var clients = new List<Client>
                {
                    new Client { Name = "Alice", Email = "alice@example.com", BalanceT = 100 },
                    new Client { Name = "Bob",   Email = "bob@example.com",   BalanceT = 200 },
                    new Client { Name = "Charlie", Email = "charlie@example.com", BalanceT = 300 }
                };
                context.Clients.AddRange(clients);
                context.SaveChanges();

                var payments = new List<Payment>
                {
                    new Payment { ClientId = clients[0].Id, Amount = 50,  Date = DateTime.UtcNow.AddDays(-5) },
                    new Payment { ClientId = clients[1].Id, Amount = 75,  Date = DateTime.UtcNow.AddDays(-4) },
                    new Payment { ClientId = clients[2].Id, Amount = 100, Date = DateTime.UtcNow.AddDays(-3) },
                    new Payment { ClientId = clients[0].Id, Amount = 25,  Date = DateTime.UtcNow.AddDays(-2) },
                    new Payment { ClientId = clients[1].Id, Amount = 125, Date = DateTime.UtcNow.AddDays(-1) }
                };
                context.Payments.AddRange(payments);
                context.SaveChanges();
            }

            if (!context.Rates.Any())
            {
                var rate = new Rate { CurrentRate = 10m, UpdatedAt = DateTime.UtcNow };
                context.Rates.Add(rate);
                context.SaveChanges();
            }
        }
    }
}
