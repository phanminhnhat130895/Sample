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
using Newtonsoft.Json.Linq;
using WebBase.Common;
using WebBase.Models;
using WebBase.Security;
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
        private IJwtHandler _jwtHandler;

        public UserController(IUserService userService,
            IConfiguration config,
            IJwtHandler jwtHandler)
        {
            _userService = userService;
            _config = config;
            _jwtHandler = jwtHandler;
        }

        [AllowAnonymous]
        [HttpPost, Route("get-login")]
        public string OnLogin(UserViewModel userVM)
        {
            var user = _userService.OnLogin(userVM);
            if (user != null) return GenerateTokenAuthentication(user);
            return "Unauthenticate";
        }

        [AllowAnonymous]
        [HttpPost, Route("get-login-custom")]
        public string OnLoginCustom(UserViewModel userVM)
        {
            var user = _userService.OnLogin(userVM);
            if (user != null) return _jwtHandler.Create(user);
            return "Unauthenticate";
        }

        [Authorize]
        [HttpPost, Route("register-user")]
        public int RegisterUser(UserViewModel userVM)
        {
            return _userService.RegisterUser(userVM);
        }

        [HttpGet, Route("get-all")]
        public List<User> getAll()
        {
            return _userService.getAllUserThroughContext();
        }

        [HttpGet, Route("dapper-user")]
        public List<User> getAllUserDapper()
        {
            return _userService.getAllUserWithDapper();
        }

        [HttpGet, Route("dapper-user-param")]
        public List<User> getAllUserDapperParam()
        {
            return _userService.getAllUserWithDapperWithParam();
        }

        [HttpPost, Route("upload-image")]
        public int UploadImage(JObject clientData)
        {
            return 1;
        }

        #region private function
        private string GenerateTokenAuthentication(UserViewModel userVM)
        {
            var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
            var creds = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
                new Claim(ClaimType.USERID, userVM.userid),
                new Claim(ClaimType.USERNAME, userVM.username),
                new Claim(ClaimType.ROLE, userVM.role),
                new Claim(ClaimType.EMAIL, userVM.email),
                new Claim(ClaimType.ADDRESS, userVM.address)
            };

            var token = new JwtSecurityToken(_config["Jwt:Issuer"], _config["Jwt:Issuer"], claims, expires: DateTime.Now.AddHours(8), signingCredentials: creds);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
        #endregion
    }
}