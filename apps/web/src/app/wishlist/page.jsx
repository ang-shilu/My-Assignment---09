import { useState, useEffect } from "react";
import useUser from "@/utils/useUser";
import { Heart, Star, ShoppingCart, Trash2, Plus } from "lucide-react";

export default function WishlistPage() {
  const { data: user, loading: userLoading } = useUser();
  const [wishlistItems, setWishlistItems] = useState([]);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!userLoading && !user) {
      window.location.href =
        "/account/signin?callbackUrl=" +
        encodeURIComponent(window.location.pathname);
    }
  }, [user, userLoading]);

  // Mock wishlist data - in a real app, this would come from an API
  useEffect(() => {
    if (user) {
      // Simulate some wishlist items
      setWishlistItems([
        {
          id: 1,
          toy_name: "Lego Classic Bricks",
          price: 49.99,
          rating: 4.7,
          picture_url: "https://i.postimg.cc/Xqz8qJzL/lego-classic.jpg",
          sub_category: "Building Blocks",
          available_quantity: 75,
          added_date: "2024-01-15",
        },
        {
          id: 4,
          toy_name: "Teddy Bear Plush",
          price: 29.99,
          rating: 4.9,
          picture_url: "https://i.postimg.cc/8CqRzNzL/teddy-bear.jpg",
          sub_category: "Plush Toys",
          available_quantity: 100,
          added_date: "2024-01-10",
        },
      ]);
    }
  }, [user]);

  const removeFromWishlist = (toyId) => {
    setWishlistItems((items) => items.filter((item) => item.id !== toyId));
  };

  // Show loading while checking authentication
  if (userLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Don't render anything if user is not authenticated (will redirect)
  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-purple-800 mb-4">
            My Wishlist
          </h1>
          <p className="text-xl text-gray-600">
            Keep track of toys you love and want to try
          </p>
        </div>

        {/* Wishlist Content */}
        {wishlistItems.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-8xl mb-6">💝</div>
            <h2 className="text-3xl font-bold text-gray-600 mb-4">
              Your wishlist is empty
            </h2>
            <p className="text-xl text-gray-500 mb-8 max-w-2xl mx-auto">
              Start adding toys to your wishlist by clicking the heart icon on
              any toy you love!
            </p>
            <a
              href="/toys"
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105"
            >
              <Plus size={20} />
              <span>Browse Toys</span>
            </a>
          </div>
        ) : (
          <>
            {/* Stats */}
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-800 mb-2">
                    {wishlistItems.length}
                  </div>
                  <div className="text-gray-600">Items in Wishlist</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-800 mb-2">
                    $
                    {wishlistItems
                      .reduce((sum, item) => sum + item.price, 0)
                      .toFixed(2)}
                  </div>
                  <div className="text-gray-600">Total Value</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-800 mb-2">
                    {(
                      wishlistItems.reduce(
                        (sum, item) => sum + item.rating,
                        0,
                      ) / wishlistItems.length
                    ).toFixed(1)}
                  </div>
                  <div className="text-gray-600">Average Rating</div>
                </div>
              </div>
            </div>

            {/* Wishlist Items */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {wishlistItems.map((toy) => (
                <div
                  key={toy.id}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
                >
                  <div className="relative">
                    <img
                      src={toy.picture_url}
                      alt={toy.toy_name}
                      className="w-full h-48 object-cover"
                    />
                    <button
                      onClick={() => removeFromWishlist(toy.id)}
                      className="absolute top-4 right-4 bg-red-500 hover:bg-red-600 text-white rounded-full p-2 transition-all"
                    >
                      <Trash2 size={18} />
                    </button>
                    <div className="absolute top-4 left-4 bg-white/90 rounded-full p-2">
                      <Heart size={18} className="text-pink-500 fill-current" />
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-bold text-purple-800 mb-2">
                      {toy.toy_name}
                    </h3>
                    <p className="text-gray-600 mb-2">{toy.sub_category}</p>

                    <div className="flex items-center mb-3">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={16}
                            className={`${
                              i < Math.floor(toy.rating)
                                ? "text-yellow-400 fill-current"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="ml-2 text-sm text-gray-600">
                        ({toy.rating})
                      </span>
                    </div>

                    <div className="flex items-center justify-between mb-4">
                      <span className="text-2xl font-bold text-purple-800">
                        ${toy.price}
                      </span>
                      <span className="text-sm text-gray-500">
                        {toy.available_quantity} available
                      </span>
                    </div>

                    <div className="space-y-2">
                      <a
                        href={`/toys/${toy.id}`}
                        className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-300 flex items-center justify-center space-x-2"
                      >
                        <span>View Details</span>
                        <ShoppingCart size={18} />
                      </a>

                      <p className="text-xs text-gray-500 text-center">
                        Added on {new Date(toy.added_date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Actions */}
            <div className="text-center mt-12">
              <div className="space-y-4">
                <a
                  href="/toys"
                  className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105"
                >
                  <Plus size={20} />
                  <span>Add More Toys</span>
                </a>

                <div className="text-gray-500">
                  <p>Share your wishlist with family and friends!</p>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
