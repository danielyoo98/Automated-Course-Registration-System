﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using ACRS.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Microsoft.AspNetCore.Identity;
using ACRS.Models;

namespace ACRS
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddAuthentication(option =>
            {
                option.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                option.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                option.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer(options =>
            {
                options.SaveToken = true;
                options.RequireHttpsMetadata = true;
                options.TokenValidationParameters = new TokenValidationParameters()
                {
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidAudience = Configuration["Jwt:Site"],
                    ValidIssuer = Configuration["Jwt:Site"],
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration["Jwt:SigningKey"]))
                };
            });

            services.AddIdentity<IdentityUser, IdentityRole>(options =>
            {
                options.Stores.MaxLengthForKeys = 128;
            }).AddEntityFrameworkStores<ApplicationDbContext>()
           .AddDefaultTokenProviders();

            services.AddCors(o => o.AddPolicy("CORSPolicy", builder =>
            {
                builder.AllowAnyOrigin()
                       .AllowAnyMethod()
                       .AllowAnyHeader();
            }));

            string databaseType = Configuration["DatabaseType"] ?? "sqlite";

            switch (databaseType)
            {
                case "mysql":
                    var host = Configuration["MySQL:Host"];
                    var port = Configuration["MySQL:Port"];
                    var userId = Configuration["MySQL:UserId"];
                    var password = Configuration["MySQL:Password"];
                    var db = Configuration["MySQL:Database"];

                    services.AddDbContext<ApplicationDbContext>(options =>
                    {
                        options.UseMySql($"server={host}; userid={userId}; pwd={password};"
                            + $"port={port}; database={db}");
                    });
                    break;
                case "sqlite":
                default:
                    services.AddDbContext<ApplicationDbContext>(options =>
                        options.UseSqlite(Configuration["SQLite:ConnectionString"]));
                    break;
            }

            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_2).AddControllersAsServices();
        }

        public void Configure(IApplicationBuilder app, IHostingEnvironment env, UserManager<IdentityUser> userManager, RoleManager<IdentityRole> roleManager)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseHsts();
            }

            app.UseCors("CORSPolicy");
            // app.UseHttpsRedirection();
            app.UseAuthentication();
            app.UseMvc();

            DummyData.Initialize(app, userManager, roleManager).Wait();
        }
    }
}
