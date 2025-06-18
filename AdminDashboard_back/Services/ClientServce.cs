using Microsoft.EntityFrameworkCore;
using AdminDashboard.DTOs;
using AdminDashboard.Interfaces;
using AdminDashboard.Data;

namespace AdminDashboard.Services;

public class ClientService : IClientService
{
    private readonly DashboardDbContext _context;
    public ClientService(DashboardDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<ClientDto>> GetAllAsync()
    {
        return await _context.Clients
            .Select(c => new ClientDto { Id = c.Id, Name = c.Name, Email = c.Email, BalanceT = c.BalanceT })
            .AsNoTracking()
            .ToListAsync();
    }
}