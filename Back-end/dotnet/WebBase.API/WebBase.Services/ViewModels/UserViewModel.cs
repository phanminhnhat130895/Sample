using System;
using System.Collections.Generic;
using System.Text;
using WebBase.Models;

namespace WebBase.Services.ViewModels
{
    public class UserViewModel : Base
    {
        //public string USERID { get; set; }
        //public string USERNAME { get; set; }
        //public string REGISTERPASSWORD { get; set; }
        //public string ROLE { get; set; }
        //public int ACTIVE { get; set; }
        //public string EMAIL { get; set; }
        //public DateTime DAYOFBIRTH { get; set; }
        //public string ADDRESS { get; set; }
        public string userid { get; set; }
        public string firstname { get; set; }
        public string lastname { get; set; }
        public string gender { get; set; }
        public DateTime? dayofbirth { get; set; }
        public string email { get; set; }
        public string phone { get; set; }
        public string address { get; set; }
        public string username { get; set; }
        public string password { get; set; }
        public string role { get; set; }
        public byte status { get; set; }
    }
}
