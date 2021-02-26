using System.Collections;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace DaemonAPI.Model.Objects
{
    public class Tag
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        [JsonIgnore]
        public List<Picture> Pictures { get; set; }

        public Tag()
        {
            Pictures = new List<Picture>();
        }
    }
}