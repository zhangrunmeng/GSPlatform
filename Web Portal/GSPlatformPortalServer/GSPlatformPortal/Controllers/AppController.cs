using GSPlatformPortal.Models;
using GSPlatformPortal.Services;
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

namespace GSPlatformPortal.Controllers
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
        [HttpPost]
        public async Task<HttpResponseMessage> getModuleInfo()
        {
            if (!Request.Content.IsMimeMultipartContent())
            {
                throw new HttpResponseException(HttpStatusCode.UnsupportedMediaType);
            }

            string root = AppManager.INSTALLED_MODULE_FOLDER;
            if (!Directory.Exists(root))
            {
                Directory.CreateDirectory(root);
            }
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
                Module module = null;
                foreach (var file in provider.FileData)
                {
                    FileInfo fileInfo = new FileInfo(file.LocalFileName);
                    module = AppManager.getModuleInfo(file.LocalFileName);
                }
                if (module != null)
                {
                    return Request.CreateResponse<Module>(module);
                }
                else
                {
                    return new HttpResponseMessage()
                    {
                        Content = new StringContent("Fail to get module info, check the zip file format please.")
                    };
                }
            }
            catch (System.Exception e)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, e);
            }
        }

        [Route("")]
        [HttpGet]
        public IEnumerable<Module> listModules()
        {
            IEnumerable<Module> modules = AppManager.listModules();
            return modules;
        }

        [Route("install/{fileDir}")]
        [HttpGet]
        public HttpResponseMessage installApp(string fileDir)
        {
            try
            {
                AppManager.installModule(null, fileDir);
                return new HttpResponseMessage
                {
                    Content = new StringContent("Success!")
                };
            }
            catch (Exception e)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, e);
            }
        }

        [HttpPost]
        [Route("install")]
        public async Task<HttpResponseMessage> installAppWithFile([FromUri]string localFile = null)
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
                catch (Exception e)
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
                if (!Directory.Exists(root))
                {
                    Directory.CreateDirectory(root);
                }
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
        public HttpResponseMessage Delete(string id)
        {
            if (id != null)
            {
                try
                {
                    AppManager.uninstallModule(id);
                }
                catch (System.Exception e)
                {
                    return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, e);
                }
            }
            return new HttpResponseMessage()
            {
                Content = new StringContent("Success")
            };
        }
    }
}