using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace WebBase.API.CustomAttribute
{
    public class PermissionClaimAttribute : TypeFilterAttribute
    {
        public PermissionClaimAttribute(string claimType, string claimValue) : base(typeof(PermissionClaimFilter))
        {
            Arguments = new object[] { new Claim(claimType, claimValue) };
        }
    }

    public class PermissionClaimFilter : IAuthorizationFilter
    {
        readonly Claim _claim;

        public PermissionClaimFilter(Claim claim)
        {
            _claim = claim;
        }

        public void OnAuthorization(AuthorizationFilterContext context)
        {
            var hasClaim = context.HttpContext.User.Claims.Any(_ => _.Type == _claim.Type && _.Value == _claim.Value);
            if (!hasClaim)
            {
                context.Result = new ForbidResult();
            }
        }
    }
}
