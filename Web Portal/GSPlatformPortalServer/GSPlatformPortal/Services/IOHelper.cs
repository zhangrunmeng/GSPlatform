using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading;
using System.Web;

namespace GSPlatformPortal.Services
{
    public class IOHelper
    {
        public static string readFile(string file)
        {
            if (!File.Exists(file))
                return null;
            StreamReader objReader = new StreamReader(file);
            StringBuilder sb = new StringBuilder();
            string sLine;
            while ((sLine = objReader.ReadLine()) != null)
            {
                sb.Append(sLine);
                sb.AppendLine();
            }
            objReader.Close();
            return sb.ToString();
        }

        public static void copyDir(string srcDir, string destDir, bool removeAfterCopy = true)
        {
            if (Directory.Exists(srcDir))
            {
                if (!Directory.Exists(destDir))
                {
                    Directory.CreateDirectory(destDir);
                }
                string[] files = Directory.GetFiles(srcDir);
                string destfile;
                foreach (string s in files)
                {
                    destfile = Path.Combine(destDir, Path.GetFileName(s));
                    File.Copy(s, destfile, true);
                }
                string[] dirs = Directory.GetDirectories(srcDir);
                string copydir;
                foreach (string s in dirs)
                {
                    copydir = Path.Combine(destDir, Path.GetFileName(s));
                    if (Directory.Exists(copydir))
                    {
                        Directory.Delete(copydir, true);
                    }
                    while (Directory.Exists(copydir))
                    {
                        Thread.Sleep(200);
                    }
                    Directory.Move(s, copydir);
                }
                if (removeAfterCopy)
                {
                    Directory.Delete(srcDir, true);
                }
            }
        }

    }
}