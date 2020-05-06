using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using WebBase.Models;
using WebBase.Repositories.Infrastructure;
using WebBase.Services.Interfaces;

namespace WebBase.Services.Implementations
{
    public class ProductService : IProductService
    {
        private IRepository<Product> _productRepository;

        public ProductService(IRepository<Product> productRepository)
        {
            _productRepository = productRepository;
        }

        public List<Product> getAllProductIncludeCategory()
        {
            try
            {
                //var result = _productRepository.FindAll(_ => _.Category).Select(_ => new Product()
                //{
                //    idproduct = _.idproduct,
                //    idcategory = _.idcategory,
                //    name = _.name,
                //    slug = _.slug,
                //    status = _.status,
                //    createat = _.createat,
                //    updateat = _.updateat,
                //    deleteat = _.deleteat,
                //    cudid = _.cudid,
                //    Category = new Category()
                //    {
                //        idcategory = _.Category.idcategory,
                //        name = _.Category.name
                //    }
                //}).ToList();
                //return result;
                return _productRepository.FindAll(_ => _.idproduct == "22c3e677-7e05-4968-9240-df28498e95ab", _ => _.Category).ToList();
            }
            catch(Exception ex)
            {
                return null;
            }
        }
    }
}
