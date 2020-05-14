using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.Text;
using WebBase.Services.ViewModels;

namespace WebBase.Security
{
    public interface IJwtHandler
    {
        string Create(UserViewModel userVM);
        TokenValidationParameters Parameters { get; }
    }
}
