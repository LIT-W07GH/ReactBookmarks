using System;
using System.Collections.Generic;
using System.Linq;
using Faker;
using ReactBookmarkManager.Data;

namespace ReactBookmarksManager.DummyDataPopulator
{
    public class FakeUrl
    {
        public string Title { get; set; }
        public string Url { get; set; }
    }

    class Program
    {
        private static string _connectionString =
            "Data Source=.\\sqlexpress;Initial Catalog=ReactBookmarkManager;Integrated Security=true;";

        private static List<FakeUrl> urls = new List<FakeUrl>();

        static void Main(string[] args)
        {
            PopulateUrls();
            var newUserIds = GenerateRandomUsers(40);
            foreach (var user in newUserIds)
            {
                AddThreeRandomUrls(user);
            }
        }

        private static void PopulateUrls()
        {
            urls.Add(new FakeUrl { Title = "The Lakewood Scoop", Url = "https://www.thelakewoodscoop.com" });
            urls.Add(new FakeUrl { Title = "Matzav", Url = "https://matzav.com/" });
            urls.Add(new FakeUrl { Title = "Vos Iz Neias", Url = "https://vosizneias.com/" });
            urls.Add(new FakeUrl { Title = "Github", Url = "https://github.com/" });
            urls.Add(new FakeUrl { Title = "Microsoft", Url = "https://www.microsoft.com" });
            urls.Add(new FakeUrl { Title = "StackOverflow", Url = "https://www.stackoverflow.com" });
            urls.Add(new FakeUrl { Title = "LIT - Lakewood Programming", Url = "https://www.lakewoodprogramming.com" });
            urls.Add(new FakeUrl { Title = "Simcha Spot", Url = "https://www.simchaspot.com" });
            urls.Add(new FakeUrl { Title = "Torah Anytime", Url = "https://www.torahanytime.com/" });
            urls.Add(new FakeUrl { Title = "My Zmanim", Url = "https://www.myzmanim.com/search.aspx" });
            urls.Add(new FakeUrl { Title = "Tomchei Shabbos Lakewood", Url = "https://www.familyfoodrelief.org/tomchei-dinner.php" });
            urls.Add(new FakeUrl { Title = "CDC Home Page", Url = "https://www.cdc.gov/" });
            urls.Add(new FakeUrl { Title = "Amazon Home Page", Url = "https://www.amazon.com/" });
        }

        private static List<int> GenerateRandomUsers(int amount)
        {
            var userRepo = new UserRepository(_connectionString);
            var userIds = new List<int>();

            for (int i = 1; i <= amount; i++)
            {
                var user = new User
                {
                    FirstName = Name.First(),
                    LastName = Name.Last(),
                    Email = Internet.Email(),
                };
                userRepo.AddUser(user, "112233");
                userIds.Add(user.Id);
                Console.WriteLine($"Added user: {user.FirstName} {user.LastName} - id {user.Id} - count: {i}");
            }

            return userIds;
        }

        private static void AddThreeRandomUrls(int userId)
        {
            Console.WriteLine($"Adding urls for {userId}");
            var three = urls.OrderBy(g => Guid.NewGuid()).Take(3).ToList();
            var bookmarksRepo = new BookmarksRepository(_connectionString);
            foreach (var url in three)
            {
                Console.WriteLine($"\tAdded url {url.Url}");
                bookmarksRepo.Add(new Bookmark
                {
                    Title = url.Title,
                    Url = url.Url,
                    UserId = userId
                });
            }
        }
    }
}
