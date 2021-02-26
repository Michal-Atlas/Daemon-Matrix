using System.Collections;
using System.Collections.Generic;
using System.Linq;
using DaemonAPI.Model;
using DaemonAPI.Model.Objects;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DaemonAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TagController : ControllerBase
    {
        private readonly DaemonMatrixDbContext _dbContext = new DaemonMatrixDbContext();
        [HttpGet]
        [Route("All")]
        public IEnumerable Get()
        {
            return _dbContext.Tags.OrderBy(x=>x.Name);
        }

        [HttpGet]
        [Route("Pictures")]
        public IEnumerable<Picture> PicturesByTag(int tagId)
        {
            return _dbContext.Tags.Include(t => t.Pictures).FirstOrDefault(x => x.Id == tagId)?.Pictures;
        }

        [HttpPost]
        public void AddNew(int tagId, int picId)
        {   
            _dbContext.Pictures.Find(picId).Tags.Add(_dbContext.Tags.Find(tagId));
            _dbContext.SaveChanges();
        }

        [HttpDelete]
        public void Delete(int tagId, int picId)
        {
            _dbContext.Pictures.Find(picId).Tags.Remove(_dbContext.Tags.Find(tagId));
            _dbContext.SaveChanges();
        }
    }
}