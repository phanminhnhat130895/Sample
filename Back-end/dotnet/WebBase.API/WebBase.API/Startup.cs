using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using AutoMapper.Configuration;
using log4net.Config;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json.Serialization;
using WebBase.Repositories;
using WebBase.Services.AutoMapper;

namespace WebBase.API
{
    public class Startup
    {
        public Startup(Microsoft.Extensions.Configuration.IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public Microsoft.Extensions.Configuration.IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_2);

            // add log
            var logRepository = log4net.LogManager.GetRepository(Assembly.GetEntryAssembly());
            XmlConfigurator.Configure(logRepository, new FileInfo("log4net.config"));

            // initialize mapper
            var mapping = new MapperConfigurationExpression();
            mapping.AddProfile<UserProfile>();
            Mapper.Initialize(mapping);

            // add AutoMapper
            services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

            // DI
            DependencyInjection.Start(Configuration, services);

            // Add Db Context
            services.AddDbContext<DatabaseContext>(options =>
            {
                //options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection"));
                options.UseMySQL(Configuration.GetConnectionString("DefaultConnection"));
            });

            // add cors
            services.AddCors();

            // add authenticate
            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
            .AddJwtBearer(options =>
            {
                options.SaveToken = true;
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidateLifetime = true,
                    ValidateIssuerSigningKey = true,
                    ValidIssuer = Configuration["Jwt:Issuer"],
                    ValidAudience = Configuration["Jwt:Issuer"],
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration["Jwt:Key"]))
                };
            });

            // add json option
            services.AddMvc().AddJsonOptions(options =>
            {
                options.SerializerSettings.ContractResolver = new DefaultContractResolver();
                options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore;
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            // config log
            loggerFactory.AddLog4Net();

            // authenticate
            app.UseAuthentication();

            // cors
            app.UseCors(builder =>
            {
                //builder.WithOrigins(Configuration["Origins"]).AllowAnyHeader().AllowAnyMethod();
                builder.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod();
            });

            // route
            app.UseMvc(routes =>
            {
                routes.MapRoute("default", "api/{controller}/{action}/{id?}");
            });
        }
    }
}
