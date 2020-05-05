using System;
using System.Collections.Generic;
using System.Text;
using WebBase.Services.ViewModels;

namespace WebBase.Services.Interfaces
{
    public interface IUserService
    {
        UserViewModel OnLogin(UserViewModel userVM);

        int RegisterUser(UserViewModel userVM);
    }
}
