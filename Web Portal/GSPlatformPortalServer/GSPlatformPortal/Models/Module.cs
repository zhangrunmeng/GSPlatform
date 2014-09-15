using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace GSPlatformPortal.Models
{
    public class Module
    {
        public string id { set; get; }
        public string version { set; get; }
        public string name { set; get; }
        public string module { set; get; }
        public string nav { set; get; }
        public string desc { set; get; }
        public string file { set; get; }
    }
}