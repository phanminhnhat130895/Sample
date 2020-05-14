using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.EntityFrameworkCore.Internal;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebBase.API.CustomAttribute
{
    public class PermissionArrayAttribute : TypeFilterAttribute
    {
        public PermissionArrayAttribute(string[] role) : base(typeof(PermissionArrayFilter))
        {
            Arguments = new object[] { role };
        }
    }

    public class PermissionArrayFilter : IAuthorizationFilter
    {
        readonly string[] _role;

        public PermissionArrayFilter(string[] role)
        {
            _role = role;
        }

        public void OnAuthorization(AuthorizationFilterContext context)
        {
            var hasClaim = context.HttpContext.User.Claims.Any(_ => _role.IndexOf(_.Value) > -1);
            if (!hasClaim)
            {
                context.Result = new ForbidResult();
            }
        }
    }
}
