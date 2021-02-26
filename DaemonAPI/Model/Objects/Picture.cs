using System.Collections;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace DaemonAPI.Model.Objects
{
    public class Picture
    {
        [Key]
        public int Id { get; set; }
        public string Filename { get; set; }
        public List<Tag> Tags { get; set; }

        public Picture()
        {
            Tags = new List<Tag>();
        }

    }
}