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
    [Route("api/category")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private ICategoryService _categoryService;

        public CategoryController(ICategoryService categoryService)
        {
            _categoryService = categoryService;
        }

        [HttpGet, Route("get-all-include-product")]
        public List<Category> getAllIncludeProduct()
        {
            return _categoryService.getAllCategoryIncludeProduct();
        }
    }
}