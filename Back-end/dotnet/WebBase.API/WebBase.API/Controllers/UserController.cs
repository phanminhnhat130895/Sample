using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using WebBase.Services.Interfaces;
using WebBase.Services.ViewModels;

namespace WebBase.API.Controllers
{
    [Route("api/user")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private IUserService _userService;
        private IConfiguration _config;

        public UserController(IUserService userService,
            IConfiguration config)
        {
            _userService = userService;
            _config = config;
        }

        [AllowAnonymous]
        [HttpPost, Route("get-login")]
        public string OnLogin(UserViewModel userVM)
        {
            var user = _userService.OnLogin(userVM);
            if (user != null) return GenerateTokenAuthentication(user);
            return "Unauthenticate";
        }

        [Authorize]
        [HttpPost, Route("register-user")]
        public int RegisterUser(UserViewModel userVM)
        {
            return _userService.RegisterUser(userVM);
        }

        #region private function
        private string GenerateTokenAuthentication(UserViewModel userVM)
        {
            var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
            var creds = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
                new Claim("USERID", userVM.USERID),
                new Claim("USERNAME", userVM.USERNAME),
                new Claim("ROLE", userVM.ROLE),
                new Claim("EMAIL", userVM.EMAIL),
                new Claim("ADDRESS", userVM.ADDRESS)
            };

            var token = new JwtSecurityToken(_config["Jwt:Issuer"], _config["Jwt:Issuer"], claims, expires: DateTime.Now.AddHours(8), signingCredentials: creds);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
        #endregion
    }
}