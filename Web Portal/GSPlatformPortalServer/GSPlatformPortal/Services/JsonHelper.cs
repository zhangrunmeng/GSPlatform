using System;
using System.IO;
using System.Text;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Collections;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace FileUploadTest.Services
{
    public class JSONHelper
    {
        public static JObject getJSONFromFile(String jsonFile)
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
            return (JObject)JsonConvert.DeserializeObject(sb.ToString());
        }

        public static string getSimpleValue(JObject jobj, string key)
        {
            return jobj != null ? jobj.GetValue(key).ToString() : "";
        }

    }
}