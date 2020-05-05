using AutoMapper;
using AutoMapper.Configuration;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Logging;
using Moq;
using System;
using System.Collections.Generic;
using System.Text;
using WebBase.Repositories;
using WebBase.Repositories.Infrastructure;
using WebBase.Services.AutoMapper;
using WebBase.UnitTests.Data;

namespace WebBase.UnitTests
{
    public abstract class BaseService_Test
    {
        protected Mock<DatabaseContext> _context;
        protected Mock<IUnitOfWork> _mockUnitOfWork;
        protected Mock<IMapper> _mockMapper;
        protected Mock<ILogger> _mockLogger;
        protected Mock<ILoggerFactory> _mockLoggerFactory;
        protected Mock<IHostingEnvironment> _mockHostingEnvironment;

        public BaseService_Test()
        {
            _context = new Mock<DatabaseContext>();
            _mockUnitOfWork = new Mock<IUnitOfWork>();
            _mockMapper = new Mock<IMapper>();
            _mockLogger = new Mock<ILogger>();
            _mockLoggerFactory = new Mock<ILoggerFactory>();
            _mockHostingEnvironment = new Mock<IHostingEnvironment>();

            // Initializer data
            Initializer initializer = new Initializer();
            initializer.Initialize(_context);

            var mapping = new MapperConfigurationExpression();
            mapping.AddProfile<UserProfile>();
            Mapper.Initialize(mapping);

            Setup();
        }

        protected abstract void Setup();
    }
}
