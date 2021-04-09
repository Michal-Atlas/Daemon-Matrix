using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Web.Http;
using DaemonAPI.Model;
using DaemonAPI.Model.Objects;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DaemonAPI.Controllers
{
    [ApiController]
    [Microsoft.AspNetCore.Mvc.Route("[controller]")]
    public class TagController : ControllerBase
    {
        private readonly DaemonMatrixDbContext _dbContext = new DaemonMatrixDbContext();
        [Microsoft.AspNetCore.Mvc.HttpGet]
        [Microsoft.AspNetCore.Mvc.Route("All")]
        public IEnumerable Get()
        {
            if (!(Request.Cookies.ContainsKey("pass") && Request.Cookies["pass"] == "Pandemonium"))
            {
                throw new HttpResponseException(HttpStatusCode.Unauthorized);
            }
            return _dbContext.Tags.OrderBy(x=>x.Name);
        }

        [Microsoft.AspNetCore.Mvc.HttpGet]
        [Microsoft.AspNetCore.Mvc.Route("Pictures")]
        public IEnumerable<Picture> PicturesByTag(int tagId)
        {
            if (tagId == 0)
            {
                return _dbContext.Pictures.Where(x => x.Tags.Count == 0);
            }

            if (_dbContext.Tags.Include(x=>x.SubTags).FirstOrDefault(x=>x.Id == tagId).SubTags.Count == 0)
            {
                return _dbContext.Tags.Include(t => t.Pictures).FirstOrDefault(x => x.Id == tagId)?.Pictures;
            }
            else
            {
                return _dbContext.Tags.Include(x => x.SubTags).FirstOrDefault(x => x.Id == tagId).SubTags
                    .SelectMany(x => PicturesByTag(x.Id)).Distinct();
            }
        }

        [Microsoft.AspNetCore.Mvc.HttpPost]
        public void AddNew(int tagId, int picId)
        {   
            if (!(Request.Cookies.ContainsKey("pass") && Request.Cookies["pass"] == "Pandemonium"))
            {
                throw new HttpResponseException(HttpStatusCode.Unauthorized);
            }
            _dbContext.Pictures.Find(picId).Tags.Add(_dbContext.Tags.Find(tagId));
            _dbContext.SaveChanges();
        }

        [Microsoft.AspNetCore.Mvc.HttpDelete]
        public void Delete(int tagId, int picId)
        {
            if (!(Request.Cookies.ContainsKey("pass") && Request.Cookies["pass"] == "Pandemonium"))
            {
                throw new HttpResponseException(HttpStatusCode.Unauthorized);
            }
            _dbContext.Pictures.Include(x=>x.Tags).FirstOrDefault(x=>x.Id==picId)?.Tags.Remove(_dbContext.Tags.Find(tagId));
            _dbContext.SaveChanges();
        }

        [Microsoft.AspNetCore.Mvc.HttpPost]
        [Microsoft.AspNetCore.Mvc.Route("Edit")]
        public void Create(string name)
        {
            if (!(Request.Cookies.ContainsKey("pass") && Request.Cookies["pass"] == "Pandemonium"))
            {
                throw new HttpResponseException(HttpStatusCode.Unauthorized);
            }
            _dbContext.Tags.Add(new Tag {Name = name});
            _dbContext.SaveChanges();
        }
        
        [Microsoft.AspNetCore.Mvc.HttpDelete]
        [Microsoft.AspNetCore.Mvc.Route("Edit")]
        public void Delete(int tagId)
        {
            if (!(Request.Cookies.ContainsKey("pass") && Request.Cookies["pass"] == "Pandemonium"))
            {
                throw new HttpResponseException(HttpStatusCode.Unauthorized);
            }
            _dbContext.Tags.Remove(_dbContext.Tags.Find(tagId));
            _dbContext.SaveChanges();
        }

        [Microsoft.AspNetCore.Mvc.HttpGet]
        [Microsoft.AspNetCore.Mvc.Route("Name")]
        public string Name(int tagId)
        {
            return _dbContext.Tags.Find(tagId).Name;
        }
    }
}