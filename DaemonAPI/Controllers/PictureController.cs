using System;
using System.IO;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Mime;
using System.Threading.Tasks;
using System.Web.Http;
using DaemonAPI.Model;
using DaemonAPI.Model.Objects;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Primitives;

namespace DaemonAPI.Controllers
{
    [ApiController]
    [Microsoft.AspNetCore.Mvc.Route("[controller]")]
    public class PictureController : ControllerBase
    {
        private readonly DaemonMatrixDbContext _dbContext = new DaemonMatrixDbContext();

        [Microsoft.AspNetCore.Mvc.HttpGet]
        public Picture Get(int picId)
        {
            return _dbContext.Pictures.Include(x=>x.Tags).FirstOrDefault(x=>x.Id==picId);
        }

        [Microsoft.AspNetCore.Mvc.HttpGet]
        [Microsoft.AspNetCore.Mvc.Route("Unprocessed")]
        public int? GetUnprocessed()
        {
            return _dbContext.Pictures.Include(x => x.Tags).FirstOrDefault(x=>x.Tags.Count()==0)?.Id;
        }

        [Microsoft.AspNetCore.Mvc.HttpPost]
        [Microsoft.AspNetCore.Mvc.Route("New")]
        public void New(string url, bool video)
        {
            if (!(Request.Cookies.ContainsKey("pass") && Request.Cookies["pass"] == "Pandemonium"))
            {
                throw new HttpResponseException(HttpStatusCode.Unauthorized);
            }

            _dbContext.Pictures.Add(new Picture{Uri = url});
            _dbContext.SaveChanges();
        }

        [Microsoft.AspNetCore.Mvc.HttpDelete]
        public void Delete(int picId)
        {
            if (!(Request.Cookies.ContainsKey("pass") && Request.Cookies["pass"] == "Pandemonium"))
            {
                throw new HttpResponseException(HttpStatusCode.Unauthorized);
            }
            _dbContext.Pictures.Remove(_dbContext.Pictures.Find(picId));
            _dbContext.SaveChanges();
        }

    }
}