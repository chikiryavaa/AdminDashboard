using AdminDashboard.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AdminDashboard.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize(Roles = "Admin")]
public class PaymentsController : ControllerBase
{
    private readonly IPaymentService _paymentService;
    public PaymentsController(IPaymentService paymentService)
    {
        _paymentService = paymentService;
    }

    [HttpGet]
    public async Task<IActionResult> GetRecent([FromQuery] int take)
    {
        if (take <= 0 )
        {
            return BadRequest("Число должно быть > 0");
        }
        var payments = await _paymentService.GetRecentAsync(take);
        return Ok(payments);
    }

    [HttpGet("client/{clientId}")]
    public async Task<IActionResult> GetByClient(int clientId)
    {
        var payments = await _paymentService.GetByClientAsync(clientId);
        return Ok(payments);
    }
}