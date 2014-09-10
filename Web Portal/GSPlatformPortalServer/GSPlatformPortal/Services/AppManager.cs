using GSPlatformPortal.Models;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.IO;
using System.Linq;
using System.Web;

namespace GSPlatformPortal.Services
{
    public class AppManager
    {
        public static string INSTALLED_MODULE_FOLDER = HttpContext.Current.Server.MapPath("~/InstalledModules/");
        public static string APP_HOME = HttpContext.Current.Server.MapPath("~/Home/");
        private static string MODULE_HOME = Path.Combine(APP_HOME, "modules");


        private JSONHelper jHelper;

        public AppManager()
        {
            this.jHelper = new JSONHelper();
        }

        public static void installModule(string zipFile, bool isLocal = false)
        {
            string dir = INSTALLED_MODULE_FOLDER + DateTime.Now.ToFileTime().ToString();
            ZipService.Decompress(zipFile, dir);
            if (Directory.Exists(dir))
            {
                JObject jConfig = JSONHelper.getJSONFromFile(Path.Combine(dir, "config.json"));
                string id = JSONHelper.getSimpleValue(jConfig, "id");
                string destDir;
                if (id.Equals("framework"))
                {
                    destDir = APP_HOME;
                }
                else
                {
                    if (!Directory.Exists(MODULE_HOME))
                    {
                        Directory.CreateDirectory(MODULE_HOME);
                    }
                    destDir = Path.Combine(MODULE_HOME, id);
                }
                IOHelper.copyDir(dir, destDir);
            }

        }

        public static Collection<Module> listModules()
        {
            Collection<Module> modules = new Collection<Module>();
            if (Directory.Exists(MODULE_HOME))
            {
                string [] moduledirs = Directory.GetDirectories(MODULE_HOME);
                foreach (string m in moduledirs)
                {
                    JObject jConfig = JSONHelper.getJSONFromFile(Path.Combine(m, "config.json"));
                    if (jConfig != null)
                    {
                        modules.Add(new Module()
                            {
                                id = JSONHelper.getSimpleValue(jConfig, "id"),
                                version = JSONHelper.getSimpleValue(jConfig, "version"),
                                name = JSONHelper.getSimpleValue(jConfig, "name"),
                                moduleName = JSONHelper.getSimpleValue(jConfig, "module")
                            }
                        );
                    }
                }
            }
            return modules;
        }

    }
}