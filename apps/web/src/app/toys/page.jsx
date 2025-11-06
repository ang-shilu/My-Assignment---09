import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Search, Filter, Star, ShoppingCart, Heart } from "lucide-react";

export default function ToysPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  // Fetch toys with search and filter
  const {
    data: toysData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["toys", searchTerm, selectedCategory],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (searchTerm) params.append("search", searchTerm);
      if (selectedCategory) params.append("category", selectedCategory);
      params.append("limit", "50");

      const response = await fetch(`/api/toys?${params.toString()}`);
      if (!response.ok) {
        throw new Error("Failed to fetch toys");
      }
      return response.json();
    },
  });

  const categories = [
    "Building Blocks",
    "Dolls",
    "Vehicles",
    "Plush Toys",
    "Puzzles",
    "Electronics",
    "Arts & Crafts",
    "Musical Instruments",
  ];

  const handleSearch = (e) => {
    e.preventDefault();
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-purple-800 mb-4">All Toys</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover amazing toys from local sellers in your community
          </p>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <form onSubmit={handleSearch} className="flex-1">
              <div className="relative">
                <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search for toys..."
                  className="w-full pl-10 pr-4 py-3 border-2 border-purple-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors"
                />
              </div>
            </form>

            {/* Category Filter */}
            <div className="flex gap-4">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-3 border-2 border-purple-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors bg-white"
              >
                <option value="">All Categories</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>

              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center space-x-2 px-4 py-3 border-2 border-purple-200 rounded-xl hover:border-purple-500 transition-colors"
              >
                <Filter size={20} />
                <span>Filters</span>
              </button>
            </div>
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Price Range
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none">
                    <option value="">Any Price</option>
                    <option value="0-25">$0 - $25</option>
                    <option value="25-50">$25 - $50</option>
                    <option value="50-100">$50 - $100</option>
                    <option value="100+">$100+</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Rating
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none">
                    <option value="">Any Rating</option>
                    <option value="4+">4+ Stars</option>
                    <option value="3+">3+ Stars</option>
                    <option value="2+">2+ Stars</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Availability
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none">
                    <option value="">Any Availability</option>
                    <option value="in-stock">In Stock</option>
                    <option value="low-stock">Low Stock</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Results Count */}
        {toysData && (
          <div className="mb-6">
            <p className="text-gray-600">
              Showing {toysData.toys?.length || 0} toys
              {searchTerm && ` for "${searchTerm}"`}
              {selectedCategory && ` in ${selectedCategory}`}
            </p>
          </div>
        )}

        {/* Loading State */}
        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(12)].map((_, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-lg p-6 animate-pulse"
              >
                <div className="w-full h-48 bg-gray-200 rounded-xl mb-4"></div>
                <div className="h-6 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded mb-4"></div>
                <div className="flex justify-between items-center">
                  <div className="h-6 bg-gray-200 rounded w-20"></div>
                  <div className="h-8 bg-gray-200 rounded w-24"></div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-red-600 mb-4">
              Oops! Something went wrong
            </h2>
            <p className="text-gray-600 mb-8">
              We couldn't load the toys. Please try again.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-full font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-300"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Toys Grid */}
        {!isLoading && !error && toysData && (
          <>
            {toysData.toys?.length === 0 ? (
              <div className="text-center py-12">
                <h2 className="text-2xl font-bold text-gray-600 mb-4">
                  No toys found
                </h2>
                <p className="text-gray-500 mb-8">
                  Try adjusting your search terms or filters to find what you're
                  looking for.
                </p>
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedCategory("");
                  }}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-full font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-300"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {toysData.toys.map((toy) => (
                  <div
                    key={toy.id}
                    className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 overflow-hidden"
                  >
                    <div className="relative">
                      <img
                        src={
                          toy.picture_url ||
                          "https://i.postimg.cc/8CqRzNzL/teddy-bear.jpg"
                        }
                        alt={toy.toy_name}
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute top-4 right-4 bg-white/90 rounded-full p-2">
                        <Heart size={18} className="text-pink-500" />
                      </div>
                      {toy.available_quantity < 10 && (
                        <div className="absolute top-4 left-4 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                          Low Stock
                        </div>
                      )}
                    </div>

                    <div className="p-4">
                      <h3 className="text-lg font-bold text-purple-800 mb-1 line-clamp-2">
                        {toy.toy_name}
                      </h3>
                      <p className="text-gray-600 text-sm mb-2">
                        {toy.sub_category}
                      </p>

                      <div className="flex items-center mb-2">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              size={14}
                              className={`${
                                i < Math.floor(toy.rating)
                                  ? "text-yellow-400 fill-current"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="ml-1 text-xs text-gray-600">
                          ({toy.rating})
                        </span>
                      </div>

                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xl font-bold text-purple-800">
                          ${toy.price}
                        </span>
                        <span className="text-xs text-gray-500">
                          {toy.available_quantity} left
                        </span>
                      </div>

                      <a
                        href={`/toys/${toy.id}`}
                        className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-2 px-4 rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-300 flex items-center justify-center space-x-2 text-sm"
                      >
                        <span>View More</span>
                        <ShoppingCart size={16} />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {/* Load More Button (if needed) */}
        {!isLoading && !error && toysData?.toys?.length >= 50 && (
          <div className="text-center mt-12">
            <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105">
              Load More Toys
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
