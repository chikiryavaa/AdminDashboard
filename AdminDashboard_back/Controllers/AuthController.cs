using AdminDashboard.DTOs;
using AdminDashboard.Interfaces;
using AdminDashboard.Services;
using Microsoft.AspNetCore.Mvc;

namespace AdminDashboard.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;
        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginRequest req)
        {
            var token = _authService.Authenticate(req.Email, req.Password);
            if (token is null) return Unauthorized();
            return Ok(new { Token = token });
        }
    }

}
