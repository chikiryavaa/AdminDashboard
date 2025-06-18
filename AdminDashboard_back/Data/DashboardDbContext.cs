using AdminDashboard.Models;
using Microsoft.EntityFrameworkCore;

namespace AdminDashboard.Data
{
    public class DashboardDbContext : DbContext
    {
        public DashboardDbContext(DbContextOptions<DashboardDbContext> options) : base(options) { }

        public DbSet<Client> Clients => Set<Client>();
        public DbSet<Payment> Payments => Set<Payment>();
        public DbSet<Rate> Rates => Set<Rate>();
    }
}
