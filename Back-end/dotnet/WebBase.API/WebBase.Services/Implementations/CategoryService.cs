using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using WebBase.Models;
using WebBase.Repositories.Infrastructure;
using WebBase.Services.Interfaces;

namespace WebBase.Services.Implementations
{
    public class CategoryService : ICategoryService
    {
        private IRepository<Category> _categoryRepository;

        public CategoryService(IRepository<Category> categoryRepository)
        {
            _categoryRepository = categoryRepository;
        }

        public List<Category> getAllCategoryIncludeProduct()
        {
            try
            {
                var result = _categoryRepository.FindAll(_ => _.Products).ToList();
                return result;
            }
            catch(Exception ex)
            {
                return null;
            }
        }
    }
}
