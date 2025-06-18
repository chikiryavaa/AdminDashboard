using AdminDashboard.DTOs;

namespace AdminDashboard.Interfaces
{
    public interface IRateService
    {
        Task<RateDto?> GetCurrentAsync();
        Task<RateDto> UpdateAsync(decimal newRate);
    }
}
