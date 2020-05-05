using System;
using System.Collections.Generic;
using System.Text;
using WebBase.Models;

namespace WebBase.Services.ViewModels
{
    public class UserViewModel : Base
    {
        public string USERID { get; set; }
        public string USERNAME { get; set; }
        public string REGISTERPASSWORD { get; set; }
        public string ROLE { get; set; }
        public int ACTIVE { get; set; }
        public string EMAIL { get; set; }
        public DateTime DAYOFBIRTH { get; set; }
        public string ADDRESS { get; set; }
    }
}
