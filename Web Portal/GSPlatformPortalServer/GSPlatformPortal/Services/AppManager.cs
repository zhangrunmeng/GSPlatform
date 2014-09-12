using GSPlatformPortal.Models;
using Newtonsoft.Json;
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
        private static string CONFIG_FILE = "config.json";

        private JSONHelper jHelper;

        public AppManager()
        {
            this.jHelper = new JSONHelper();
        }

        public static Module getModuleInfo(string zipFile)
        {
            string dir = INSTALLED_MODULE_FOLDER + DateTime.Now.ToFileTime().ToString();
            ZipService.Decompress(zipFile, dir);
            Module module = JSONHelper.getJSONFromFile<Module>(Path.Combine(dir, CONFIG_FILE));
            module.file = Path.GetFileName(dir);
            return module;
        }

        public static void installModule(string zipFile, string dir = null)
        {
            if (!Directory.Exists(APP_HOME))
            {
                Directory.CreateDirectory(APP_HOME);
            }
            if (!Directory.Exists(MODULE_HOME))
            {
                Directory.CreateDirectory(MODULE_HOME);
            }

            if (dir == null)
            {
                dir = INSTALLED_MODULE_FOLDER + DateTime.Now.ToFileTime().ToString();
                ZipService.Decompress(zipFile, dir);
            }
            else
            {
                dir = INSTALLED_MODULE_FOLDER + dir;
            }

            if (Directory.Exists(dir))
            {
                Module module = JSONHelper.getJSONFromFile<Module>(Path.Combine(dir, CONFIG_FILE));
                string destDir;
                if (module.id.Equals("framework"))
                {
                    destDir = APP_HOME;
                }
                else
                {
                    destDir = Path.Combine(MODULE_HOME, module.id);
                }
                IOHelper.copyDir(dir, destDir);
            }

        }

        public static Collection<Module> listModules()
        {
            Collection<Module> modules = new Collection<Module>();
            string config = IOHelper.readFile(Path.Combine(APP_HOME, CONFIG_FILE));
            if (config != null)
            {
                modules.Add(JsonConvert.DeserializeObject<Module>(config));
            }
            if (Directory.Exists(MODULE_HOME))
            {
                string [] moduledirs = Directory.GetDirectories(MODULE_HOME);
                foreach (string m in moduledirs)
                {
                    config = IOHelper.readFile(Path.Combine(m, CONFIG_FILE));
                    if (config != null)
                    {
                        modules.Add(JsonConvert.DeserializeObject<Module>(config));
                    }
                }
            }
            return modules;
        }

        public static void uninstallModule(string id)
        {
            if (id.Equals("framework"))
            {
                string[] files = Directory.GetFiles(APP_HOME);
                foreach (string f in files)
                {
                    File.Delete(f);
                }
                string[] dirs = Directory.GetDirectories(APP_HOME);
                foreach (string d in dirs)
                {
                    if (!Path.GetFileName(d).Equals("modules"))
                    {
                        Directory.Delete(d, true);
                    }
                }
            }
            else
            {
                string[] moduledirs = Directory.GetDirectories(MODULE_HOME);
                foreach (string m in moduledirs)
                {
                    if (Path.GetFileName(m).Equals(id))
                    {
                        Directory.Delete(m, true);
                        break;
                    }
                }
            }
        }

    }
}