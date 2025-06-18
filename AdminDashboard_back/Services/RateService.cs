using Microsoft.EntityFrameworkCore;
using AdminDashboard.DTOs;
using AdminDashboard.Interfaces;
using AdminDashboard.Models;
using AdminDashboard.Data;

namespace AdminDashboard.Services;

public class RateService : IRateService
{
    private readonly DashboardDbContext _context;
    public RateService(DashboardDbContext context)
    {
        _context = context;
    }

    public async Task<RateDto?> GetCurrentAsync()
    {
        var rate = await _context.Rates.OrderByDescending(r => r.UpdatedAt).FirstOrDefaultAsync();
        if (rate == null) return null;
        return new RateDto { CurrentRate = rate.CurrentRate, UpdatedAt = rate.UpdatedAt };
    }

    public async Task<RateDto> UpdateAsync(decimal newRate)
    {
        var rate = new Rate { CurrentRate = newRate, UpdatedAt = DateTime.UtcNow };
        _context.Rates.Add(rate);
        await _context.SaveChangesAsync();
        return new RateDto { CurrentRate = rate.CurrentRate, UpdatedAt = rate.UpdatedAt };
    }
}