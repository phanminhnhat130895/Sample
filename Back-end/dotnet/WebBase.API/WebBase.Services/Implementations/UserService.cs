using AutoMapper;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Text;
using WebBase.Models;
using WebBase.Repositories.Infrastructure;
using WebBase.Services.Interfaces;
using WebBase.Services.ViewModels;

namespace WebBase.Services.Implementations
{
    public class UserService : IUserService
    {
        private IRepository<User> _userRepository;
        private IUnitOfWork _unitOfWork;
        private ILogger _logger;

        public UserService(IRepository<User> userRepository,
            IUnitOfWork unitOfWork,
            ILoggerFactory loggerFactory)
        {
            _userRepository = userRepository;
            _unitOfWork = unitOfWork;
            _logger = loggerFactory.CreateLogger("UserService");
        }

        public UserViewModel OnLogin(UserViewModel userVM)
        {
            try
            {
                var user = _userRepository.FindSingle(_ => _.USERNAME == userVM.USERNAME && _.ACTIVE == 1);

                if (user != null && BCrypt.Net.BCrypt.Verify(userVM.REGISTERPASSWORD, user.PASSWORD))
                    return Mapper.Map<UserViewModel>(user);

                return null;
            }
            catch(Exception ex)
            {
                _logger.LogError("UserService.OnLogin: " + ex.ToString());
                return null;
            }
        }

        public int RegisterUser(UserViewModel userVM)
        {
            try
            {
                var model = Mapper.Map<User>(userVM);

                var salt = BCrypt.Net.BCrypt.GenerateSalt(10);
                model.USERID = Guid.NewGuid().ToString();
                model.PASSWORD = BCrypt.Net.BCrypt.HashPassword(userVM.REGISTERPASSWORD, salt);
                model.CREATEDATE = DateTime.Now;
                model.CUDID = "978e3006-6b4c-4b40-9753-85b603f394aa";

                _userRepository.Add(model);
                _unitOfWork.Commit();

                return 1;
            }
            catch(Exception ex)
            {
                _logger.LogError("UserService.RegisterUser: " + ex.ToString());
                return -1;
            }
        }
    }
}
