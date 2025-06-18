using AdminDashboard.DTOs;

namespace AdminDashboard.Interfaces
{
    public interface IClientService
    {
        Task<IEnumerable<ClientDto>> GetAllAsync();
    }
}
