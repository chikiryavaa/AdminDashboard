using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using AdminDashboard.DTOs;
using AdminDashboard.Interfaces;

namespace AdminDashboard.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize(Roles = "Admin")]
public class RateController : ControllerBase
{
    private readonly IRateService _rateService;
    public RateController(IRateService rateService)
    {
        _rateService = rateService;
    }

    [HttpGet]
    public async Task<IActionResult> GetCurrent()
    {
        var dto = await _rateService.GetCurrentAsync();
        if (dto == null) return NotFound();
        return Ok(dto);
    }

    [HttpPost]
    public async Task<IActionResult> Update([FromBody] RateDto request)
    {
        var updated = await _rateService.UpdateAsync(request.CurrentRate);
        return Ok(updated);
    }
}