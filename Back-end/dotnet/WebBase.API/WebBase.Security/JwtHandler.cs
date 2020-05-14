using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.IO;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Xml;
using WebBase.Common;
using WebBase.Services.ViewModels;

namespace WebBase.Security
{
    public class JwtHandler : IJwtHandler
    {
        private readonly JwtSettings _settings;
        private readonly JwtSecurityTokenHandler _jwtSecurityTokenHandler = new JwtSecurityTokenHandler();
        private SecurityKey _issuerSigningKey;
        private SigningCredentials _signingCredentials;
        private JwtHeader _jwtHeader;
        public TokenValidationParameters Parameters { get; private set; }

        public JwtHandler(IOptions<JwtSettings> settings)
        {
            _settings = settings.Value;
            if (_settings.UseRsa)
            {
                InitializeRsa();
            }
            else
            {
                InitializeHmac();
            }

            InitializeJwtParameters();
        }

        private void InitializeRsa()
        {
            using(RSA publicRsa = RSA.Create())
            {
                var publicKeyXml = File.ReadAllText(_settings.RsaPublicKey);
                //publicRsa.FromXmlString(publicKeyXml);
                RsaExtension.FromXmlString(publicRsa, publicKeyXml);
                _issuerSigningKey = new RsaSecurityKey(publicRsa);
            }
            if (string.IsNullOrEmpty(_settings.RsaPrivateKey))
            {
                return;
            }
            using (RSA privateRsa = RSA.Create())
            {
                var privateKeyXml = File.ReadAllText(_settings.RsaPrivateKey);
                //privateRsa.FromXmlString(privateKeyXml);
                RsaExtension.FromXmlString(privateRsa, privateKeyXml);
                var privateKey = new RsaSecurityKey(privateRsa);
                _signingCredentials = new SigningCredentials(privateKey, SecurityAlgorithms.RsaSha256);
            }
        }

        private void InitializeHmac()
        {
            _issuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_settings.HmacSecretKey));
            _signingCredentials = new SigningCredentials(_issuerSigningKey, SecurityAlgorithms.HmacSha256);
        }

        private void InitializeJwtParameters()
        {
            _jwtHeader = new JwtHeader(_signingCredentials);
            Parameters = new TokenValidationParameters
            {
                ValidateLifetime = true,
                ValidateIssuer = true,
                ValidIssuer = _settings.Issuer,
                ValidateAudience = true,
                ValidAudience = _settings.Issuer,
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = _issuerSigningKey
            };
        }

        public string Create(UserViewModel userVM)
        {
            DateTime nowUtc = DateTime.UtcNow;
            DateTime expires;
            if (_settings.ExpiryTime.Contains('h'))
                expires = nowUtc.AddHours(Convert.ToDouble(_settings.ExpiryTime.Replace("h", "")));
            else
                expires = nowUtc.AddDays(Convert.ToDouble(_settings.ExpiryTime.Replace("h", "")));

            //DateTime centuryBegin = new DateTime(1970, 1, 1);
            //long exp = (long)(new TimeSpan(expires.Ticks - centuryBegin.Ticks).TotalSeconds);
            //long now = (long)(new TimeSpan(nowUtc.Ticks - centuryBegin.Ticks).TotalSeconds);
            //string issuer = _settings.Issuer ?? string.Empty;

            var payload = new[]
            {
                new Claim(ClaimType.USERID, userVM.userid),
                new Claim(ClaimType.USERNAME, userVM.username),
                new Claim(ClaimType.ROLE, userVM.role),
                new Claim(ClaimType.EMAIL, userVM.email),
                new Claim(ClaimType.ADDRESS, userVM.address)
            };

            JwtSecurityToken token = new JwtSecurityToken(_settings.Issuer, _settings.Issuer, payload, nowUtc, expires, signingCredentials: _signingCredentials);
            return _jwtSecurityTokenHandler.WriteToken(token);
        }
    }
}
