using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace NullVoice.Models
{
    public class Thought
    {

        public int Id { get; set; }

        public string? Contents { get; set; }

        public DateOnly SentDate { get; set; }

    }
}
