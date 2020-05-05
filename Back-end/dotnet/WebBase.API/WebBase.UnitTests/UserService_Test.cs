using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Moq;
using System;
using System.Linq;
using System.Linq.Expressions;
using WebBase.Models;
using WebBase.Repositories.Infrastructure;
using WebBase.Services.Implementations;
using WebBase.Services.Interfaces;
using WebBase.Services.ViewModels;
using Xunit;

namespace WebBase.UnitTests
{
    public class UserService_Test : BaseService_Test, IDisposable
    {
        private IUserService _userService;
        private Mock<IRepository<User>> _mockUserRepository;

        protected override void Setup()
        {
            _mockUserRepository = new Mock<IRepository<User>>();

            _mockUserRepository.Setup(x => x.FindSingle(It.IsAny<Expression<Func<User, bool>>>(), It.IsAny<Expression<Func<User, object>>[]>()))
                .Returns(new Func<Expression<Func<User, bool>>, Expression<Func<User, object>>[], User>(
                    (predicate, properties) =>
                    {
                        var user = _context.Object.User.AsQueryable();
                        foreach (var property in properties)
                        {
                            user.Include(property);
                        }
                        return user.Where(predicate).SingleOrDefault();
                    }));

            _mockUserRepository.Setup(x => x.FindAll(It.IsAny<Expression<Func<User, object>>[]>()))
                .Returns(new Func<Expression<Func<User, object>>[], IQueryable<User>>(
                    (properties) =>
                    {
                        var user = _context.Object.User.AsQueryable();
                        foreach (var property in properties)
                        {
                            user.Include(property);
                        }
                        return user;
                    }));

            _mockUserRepository.Setup(x => x.FindAll(It.IsAny<Expression<Func<User, bool>>>(), It.IsAny<Expression<Func<User, object>>[]>()))
                .Returns(new Func<Expression<Func<User, bool>>, Expression<Func<User, object>>[], IQueryable<User>>(
                    (predicate, properties) =>
                    {
                        var user = _context.Object.User.AsQueryable();
                        foreach (var property in properties)
                        {
                            user.Include(property);
                        }
                        return user.Where(predicate);
                    }));

            _mockUserRepository.Setup(x => x.Count(It.IsAny<Expression<Func<User, bool>>>()))
               .Returns(new Func<Expression<Func<User, bool>>, int>(
                   (predicate) =>
                   {
                       var user = _context.Object.User.AsQueryable();
                       return user.Count(predicate);
                   }));

            //_mockUserRepository.Setup(x => x.CallProc(It.IsAny<string>(), It.IsAny<object[]>()))
            //   .Returns(new Func<string, object[], User>(
            //       (store, param) =>
            //       {
            //           var user = _context.Object.User.AsQueryable();
            //           return user.Where(x => x.USERNAME == "Member").SingleOrDefault();
            //       }));

            _mockUserRepository.Setup(x => x.Add(It.IsAny<User>()));

            _mockUserRepository.Setup(x => x.Update(It.IsAny<User>()));

            _mockUserRepository.Setup(x => x.Remove(It.IsAny<User>()));

            _mockLoggerFactory.Setup(m => m.CreateLogger("UserService")).Returns(_mockLogger.Object);

            _userService = new UserService(_mockUserRepository.Object,
                _mockUnitOfWork.Object,
                _mockLoggerFactory.Object
                //_mockHostingEnvironment.Object
                );
        }

        [Fact]
        public void RegisterUser_Success()
        {
            UserViewModel userVM = new UserViewModel()
            {
                USERNAME = "Success",
                REGISTERPASSWORD = "Success#123*",
                ACTIVE = 1,
                ROLE = "Admin",
                EMAIL = "Success@gmail.com",
                ADDRESS = "Biên Hòa, Đồng Nai",
                DAYOFBIRTH = new DateTime(1995, 8, 13)
            };

            var result = _userService.RegisterUser(userVM);

            Assert.Equal(1, result);

            Mapper.Reset();
        }

        [Fact]
        public void RegisterUser_Fail()
        {
            var result = _userService.RegisterUser(null);

            Assert.Equal(-1, result);

            Mapper.Reset();
        }

        public void Dispose()
        {
            GC.SuppressFinalize(this);
        }
    }
}
