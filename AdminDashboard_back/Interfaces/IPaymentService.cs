using AdminDashboard.DTOs;

namespace AdminDashboard.Interfaces
{
    public interface IPaymentService
    {
        Task<IEnumerable<PaymentDto>> GetRecentAsync(int count);
        Task<IEnumerable<PaymentDto>> GetByClientAsync(int clientId);
    }
}
