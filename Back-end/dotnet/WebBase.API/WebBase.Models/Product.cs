using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace WebBase.Models
{
    public class Product
    {
        [Key]
        public string idproduct { get; set; }
        public string idcategory { get; set; }
        public string name { get; set; }
        public string slug { get; set; }
        public byte status { get; set; }
        public DateTime createat { get; set; }
        public DateTime? updateat { get; set; }
        public DateTime? deleteat { get; set; }
        public string cudid { get; set; }

        public virtual Category Category { get; set; }
    }
}
