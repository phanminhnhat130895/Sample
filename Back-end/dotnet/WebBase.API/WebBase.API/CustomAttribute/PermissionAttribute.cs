using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebBase.API.CustomAttribute
{
    public class PermissionAttribute : TypeFilterAttribute
    {
        public PermissionAttribute(string role) : base(typeof(PermissionFilter))
        {
            Arguments = new object[] { role };
        }
    }

    public class PermissionFilter : IAuthorizationFilter
    {
        readonly string _role;

        public PermissionFilter(string role)
        {
            _role = role;
        }

        public void OnAuthorization(AuthorizationFilterContext context)
        {
            var hasClaim = context.HttpContext.User.Claims.Any(_ => _.Value == _role);
            if (!hasClaim)
            {
                context.Result = new ForbidResult();
            }
        }
    }
}
