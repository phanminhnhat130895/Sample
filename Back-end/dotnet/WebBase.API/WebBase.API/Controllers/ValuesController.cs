using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace WebBase.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ValuesController : ControllerBase
    {
        // GET api/values
        [HttpGet]
        public ActionResult<IEnumerable<string>> Get()
        {
            return new string[] { @"[{""idcategory"":""080f5be1-85a7-416f-ae64-dbdfc64f499c"",""name"":""Ram PC"",""slug"":""ram-pc"",""status"":1,""createat"":""2020-05-06T00:00:00"",""updateat"":null,""deleteat"":null,""cudid"":""0"",""Products"":[{""idproduct"":""22c3e677-7e05-4968-9240-df28498e95ab"",""idcategory"":""080f5be1-85a7-416f-ae64-dbdfc64f499c"",""name"":""Ram 8GB DDR4"",""slug"":""ram-8gb-ddr4"",""status"":1,""createat"":""2020-05-06T00:00:00"",""updateat"":null,""deleteat"":null,""cudid"":""0""value1", "value2" };
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public ActionResult<string> Get(int id)
        {
            return "value";
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
