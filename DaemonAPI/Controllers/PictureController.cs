using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mime;
using System.Threading.Tasks;
using DaemonAPI.Model;
using DaemonAPI.Model.Objects;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace DaemonAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PictureController : ControllerBase
    {
        private readonly DaemonMatrixDbContext _dbContext = new DaemonMatrixDbContext();

        [HttpGet]
        public Picture Get(int picId)
        {
            return _dbContext.Pictures.Include(x=>x.Tags).FirstOrDefault(x=>x.Id==picId);
        }
        
        [HttpGet]
        [Route("Base64")]
        public string Base64(int picId)
        {
            byte[] imageArray = System.IO.File.ReadAllBytes("daemon/"+_dbContext.Pictures.FirstOrDefault(x=>x.Id==picId)?.Filename);
            return Convert.ToBase64String(imageArray);
        }

        [HttpGet]
        [Route("unprocessed")]
        public int? GetUnprocessed()
        {
            return _dbContext.Pictures.Include(x => x.Tags).FirstOrDefault(x=>x.Tags.Count()==0)?.Id;
        }
    }
}