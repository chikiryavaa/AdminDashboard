using AdminDashboard.Interfaces;

namespace AdminDashboard.Services
{
    public class AuthService : IAuthService
    {
        private readonly IConfiguration _configuration;
        private readonly JwtService _jwtService;
        public AuthService(IConfiguration configuration, JwtService jwtService)
        {
            _configuration = configuration;
            _jwtService = jwtService;
        }
        public string? Authenticate(string email, string password)
        {
            var adminEmail = _configuration["AdminCredentials:Email"];
            var adminPassword = _configuration["AdminCredentials:Password"];
            if (email == adminEmail && password == adminPassword)
            {
                return _jwtService.GenerateToken(email, "Admin");
            }
            return null;


        }
    }
}
