using System;
using System.Collections.Generic;
using System.Text;

namespace WebBase.Models
{
    public class User : Base
    {
        public string USERID { get; set; }
        public string USERNAME { get; set; }
        public string PASSWORD { get; set; }
        public string ROLE { get; set; }
        public int ACTIVE { get; set; }
        public string EMAIL { get; set; }
        public DateTime DAYOFBIRTH { get; set; }
        public string ADDRESS { get; set; }
    }
}
