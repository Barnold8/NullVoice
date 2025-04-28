using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using NullVoice;

namespace NullVoice.Data
{
    public class NullVoiceContext : DbContext
    {
        public NullVoiceContext (DbContextOptions<NullVoiceContext> options)
            : base(options)
        {
        }

        public DbSet<NullVoice.Thought> Thought { get; set; } = default!;
    }
}
