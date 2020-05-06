using System;
using System.Collections.Generic;
using System.Text;
using WebBase.Models;

namespace WebBase.Services.Interfaces
{
    public interface ICategoryService
    {
        List<Category> getAllCategoryIncludeProduct();
    }
}
