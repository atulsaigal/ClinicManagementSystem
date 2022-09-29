using ASP.NETCoreIdentityCustom.Models;
using Microsoft.EntityFrameworkCore;

namespace ASP.NETCoreIdentityCustom.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {

        }

        public DbSet<UserManagementModel> UserManagement { get; set; }

    }
}
