using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebBase.Models;
using WebBase.Repositories.Infrastructure;
using WebBase.Services.Implementations;
using WebBase.Services.Interfaces;

namespace WebBase.API
{
    public class DependencyInjection
    {
        public static void Start(IConfiguration configuration, IServiceCollection services)
        {
            services.AddTransient<IUnitOfWork, UnitOfWork>();

            services.AddTransient<IRepository<User>, Repository<User>>();
            services.AddTransient<IUserService, UserService>();
        }
    }
}
