using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebBase.Models;
using WebBase.Services.Interfaces;

namespace WebBase.API.Controllers
{
    [Route("api/product")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private IProductService _productService;

        public ProductController(IProductService productService)
        {
            _productService = productService;
        }

        [HttpGet, Route("get-all-include-category")]
        public List<Product> getAllIncludeCategory()
        {
            return _productService.getAllProductIncludeCategory();
        }
    }
}