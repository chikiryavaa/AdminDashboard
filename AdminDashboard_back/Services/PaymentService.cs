using Microsoft.EntityFrameworkCore;
using AdminDashboard.DTOs;
using AdminDashboard.Interfaces;
using AdminDashboard.Data;

namespace AdminDashboard.Services;

public class PaymentService : IPaymentService
{
    private readonly DashboardDbContext _context;
    public PaymentService(DashboardDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<PaymentDto>> GetRecentAsync(int count)
    {
        return await _context.Payments
            .OrderByDescending(p => p.Date)
            .Take(count)
            .Select(p => new PaymentDto { Id = p.Id, ClientId = p.ClientId, Amount = p.Amount, Date = p.Date })
            .AsNoTracking()
            .ToListAsync();
    }

    public async Task<IEnumerable<PaymentDto>> GetByClientAsync(int clientId)
    {
        return await _context.Payments
            .Where(p => p.ClientId == clientId)
            .OrderByDescending(p => p.Date)
            .Select(p => new PaymentDto { Id = p.Id, ClientId = p.ClientId, Amount = p.Amount, Date = p.Date })
            .ToListAsync();
    }
}