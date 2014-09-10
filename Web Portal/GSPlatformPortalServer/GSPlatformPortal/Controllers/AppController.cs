using FileUploadTest.Models;
using FileUploadTest.Services;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;

namespace FileUploadTest.Controllers
{
    [RoutePrefix("api/app")]
    public class AppController : ApiController
    {
        // GET api/<controller>
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/<controller>/5
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<controller>
        public void Post([FromBody]string value)
        {
        }

        [Route("")]
        [HttpGet]
        public IEnumerable<Module> listModules()
        {
            IEnumerable<Module> modules = AppManager.listModules();
            return modules;
        }

        [HttpPost]
        [Route("install")]
        public async Task<HttpResponseMessage> installApp([FromUri]string localFile = null)
        {
            if (localFile != null)
            {
                try
                {
                    AppManager.installModule(localFile);
                    return new HttpResponseMessage()
                    {
                        Content = new StringContent("Success!")
                    };
                }
                catch (System.Exception e)
                {
                    return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, e);
                }
            }
            else 
            {
                if (!Request.Content.IsMimeMultipartContent())
                {
                    throw new HttpResponseException(HttpStatusCode.UnsupportedMediaType);
                }

                string root = AppManager.INSTALLED_MODULE_FOLDER;
                var provider = new MultipartFormDataStreamProvider(root);

                try
                {
                    StringBuilder sb = new StringBuilder(); // Holds the response body

                    // Read the form data and return an async task.
                    await Request.Content.ReadAsMultipartAsync(provider);

                    // This illustrates how to get the form data.
                    foreach (var key in provider.FormData.AllKeys)
                    {
                        foreach (var val in provider.FormData.GetValues(key))
                        {
                            sb.Append(string.Format("{0}: {1}\n", key, val));
                        }
                    }

                    // This illustrates how to get the file names for uploaded files.
                    foreach (var file in provider.FileData)
                    {
                        FileInfo fileInfo = new FileInfo(file.LocalFileName);
                        AppManager.installModule(file.LocalFileName);
                        sb.Append(string.Format("Uploaded file: {0} ({1} bytes)\n", fileInfo.Name, fileInfo.Length));
                    }
                    return new HttpResponseMessage()
                    {
                        Content = new StringContent(sb.ToString())
                    };
                }
                catch (System.Exception e)
                {
                    return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, e);
                }
            }

            // Check if the request contains multipart/form-data.
            
        }

        // PUT api/<controller>/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/<controller>/5
        public void Delete(int id)
        {
        }
    }
}