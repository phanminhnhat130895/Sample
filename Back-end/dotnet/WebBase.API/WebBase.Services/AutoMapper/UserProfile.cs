using AutoMapper;
using System;
using System.Collections.Generic;
using System.Text;
using WebBase.Models;
using WebBase.Services.ViewModels;

namespace WebBase.Services.AutoMapper
{
    public class UserProfile : Profile
    {
        public UserProfile()
        {
            CreateMap<User, UserViewModel>();
            CreateMap<UserViewModel, User>();
        }
    }
}
