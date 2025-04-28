using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using NullVoice.Models;

namespace NullVoice.Data
{
    public class NullVoiceContext : DbContext
    {
        public NullVoiceContext (DbContextOptions<NullVoiceContext> options)
            : base(options)
        {
        }

        public DbSet<Thought> Thought { get; set; } = default!;
    }
}
