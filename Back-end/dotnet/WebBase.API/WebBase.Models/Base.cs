using System;
using System.Collections.Generic;
using System.Text;

namespace WebBase.Models
{
    public class Base
    {
        //public DateTime CREATEDATE { get; set; }
        //public DateTime? UPDATEDATE { get; set; }
        //public DateTime? DELETEDATE { get; set; }
        //public string CUDID { get; set; }
        public DateTime? createdate { get; set; }
        public DateTime? updatedate { get; set; }
        public DateTime? deletedate { get; set; }
        public string cudid { get; set; }
    }
}
