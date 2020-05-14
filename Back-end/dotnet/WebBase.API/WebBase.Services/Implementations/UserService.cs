using AutoMapper;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using WebBase.Models;
using WebBase.Repositories.DapperCore;
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
        private IDapperRepository _dapperRepository;

        public UserService(IRepository<User> userRepository,
            IUnitOfWork unitOfWork,
            ILoggerFactory loggerFactory,
            IDapperRepository dapperRepository)
        {
            _userRepository = userRepository;
            _unitOfWork = unitOfWork;
            _logger = loggerFactory.CreateLogger("UserService");
            _dapperRepository = dapperRepository;
        }

        public UserViewModel OnLogin(UserViewModel userVM)
        {
            try
            {
                var user = _userRepository.FindSingle(_ => _.username == userVM.username && _.status == 1);

                if (user != null && BCrypt.Net.BCrypt.Verify(userVM.password, user.password))
                {
                    user.password = null;
                    return Mapper.Map<UserViewModel>(user);
                }

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
                model.userid = Guid.NewGuid().ToString();
                model.password = BCrypt.Net.BCrypt.HashPassword(userVM.password, salt);
                model.createdate = DateTime.Now;
                model.cudid = "978e3006-6b4c-4b40-9753-85b603f394aa";

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

        public List<User> getAllUserThroughContext()
        {
            try
            {
                return _userRepository.DbSet.ToList();
            }
            catch(Exception ex)
            {
                return null;
            }
        }

        public List<User> getAllUserWithDapper()
        {
            try
            {
                return _dapperRepository.ExecuteForList<User>("Select USERID, USERNAME from user;", commandType: CommandType.Text).ToList();
            }
            catch(Exception ex)
            {
                return null;
            }
        }

        public List<User> getAllUserWithDapperWithParam()
        {
            try
            {
                //object param = new
                //{
                //    userid = "4e02b4f7-e7e5-4e17-9652-fc8b40f006e7",
                //    username = "Admin"
                //};
                User model = new User();
                model.userid = "4e02b4f7-e7e5-4e17-9652-fc8b40f006e7";
                model.username = "Admin";
                return _dapperRepository.ExecuteForList<User>("Select userid, username from user where userid = @userid and username = @username;", model, commandType: CommandType.Text).ToList();
            }
            catch (Exception ex)
            {
                return null;
            }
        }
    }
}
