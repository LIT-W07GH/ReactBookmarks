using Microsoft.EntityFrameworkCore;

namespace ReactBookmarkManager.Data
{
    public class BookmarkManagerContext : DbContext
    {
        private readonly string _connectionString;

        public BookmarkManagerContext(string connectionString)
        {
            _connectionString = connectionString;
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(_connectionString);
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Bookmark> Bookmarks { get; set; }

        public DbQuery<TopBookmark> TopBookmarks { get; set; }
    }
}