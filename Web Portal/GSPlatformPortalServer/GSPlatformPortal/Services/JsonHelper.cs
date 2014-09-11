using System;
using System.IO;
using System.Text;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Collections;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace GSPlatformPortal.Services
{
    public class JSONHelper
    {
        public static T getJSONFromFile<T>(string jsonFile)
        {
            if (!File.Exists(jsonFile))
                return default(T);
            StreamReader objReader = new StreamReader(jsonFile);
            StringBuilder sb = new StringBuilder();
            string sLine;
            while ((sLine = objReader.ReadLine()) != null)
            {
                sb.Append(sLine);
                sb.AppendLine();
            }
            objReader.Close();
            return (T)JsonConvert.DeserializeObject<T>(sb.ToString());
        }

        public static Object getJSONFromFile(string jsonFile, Type type)
        {
            if (!File.Exists(jsonFile))
                return null;
            StreamReader objReader = new StreamReader(jsonFile);
            StringBuilder sb = new StringBuilder();
            string sLine;
            while ((sLine = objReader.ReadLine()) != null)
            {
                sb.Append(sLine);
                sb.AppendLine();
            }
            objReader.Close();
            return JsonConvert.DeserializeObject(sb.ToString(), type);
        }

        public static string getSimpleValue(JObject jobj, string key)
        {
            return jobj != null ? jobj.GetValue(key).ToString() : "";
        }

    }
}