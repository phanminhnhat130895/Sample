using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebBase.API.CustomAttribute;
using WebBase.Common;
using WebBase.Security;

namespace WebBase.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ValuesController : ControllerBase
    {
        private readonly IJwtHandler _jwtHandler;

        public ValuesController(IJwtHandler jwtHandler)
        {
            _jwtHandler = jwtHandler;
        }

        // GET api/values
        //[PermissionClaim(ClaimType.ROLE, "Admin")]
        [Authorize]
        [HttpGet]
        public ActionResult<IEnumerable<string>> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/values/5
        [Permission("Admin")]
        [HttpGet("{id}")]
        public ActionResult<string> Get(int id)
        {
            return "value";
        }

        [PermissionArray(role: new string[] { "Admin", "Member" })]
        [HttpGet("get-with-permission")]
        public ActionResult<string> GetWithPermission()
        {
            return "You have permission";
        }

        // POST api/values
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
