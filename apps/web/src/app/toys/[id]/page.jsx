import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import useUser from "@/utils/useUser";
import {
  Star,
  ShoppingCart,
  Heart,
  User,
  Mail,
  CheckCircle,
} from "lucide-react";

export default function ToyDetailsPage({ params }) {
  const { id } = params;
  const { data: user, loading: userLoading } = useUser();
  const [showTryForm, setShowTryForm] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "" });
  const [showSuccess, setShowSuccess] = useState(false);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!userLoading && !user) {
      window.location.href =
        "/account/signin?callbackUrl=" +
        encodeURIComponent(window.location.pathname);
    }
  }, [user, userLoading]);

  // Fetch toy details
  const {
    data: toyData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["toy", id],
    queryFn: async () => {
      const response = await fetch(`/api/toys/${id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch toy details");
      }
      return response.json();
    },
    enabled: !!id && !!user, // Only fetch if we have an ID and user is authenticated
  });

  const handleTryNow = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      alert("Please fill in all fields");
      return;
    }

    // Show success message
    setShowSuccess(true);
    setShowTryForm(false);
    setFormData({ name: "", email: "" });

    // Hide success message after 3 seconds
    setTimeout(() => {
      setShowSuccess(false);
    }, 3000);
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

  if (isLoading) {
    return (
      <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="animate-pulse">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="w-full h-96 bg-gray-200 rounded-2xl"></div>
              <div className="space-y-4">
                <div className="h-8 bg-gray-200 rounded w-3/4"></div>
                <div className="h-6 bg-gray-200 rounded w-1/2"></div>
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-red-600 mb-4">
            Toy Not Found
          </h1>
          <p className="text-gray-600 mb-8">
            The toy you're looking for doesn't exist or has been removed.
          </p>
          <a
            href="/toys"
            className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-full font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-300"
          >
            Browse All Toys
          </a>
        </div>
      </div>
    );
  }

  const toy = toyData?.toy;

  if (!toy) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-600 mb-4">
            Toy Not Found
          </h1>
          <a
            href="/toys"
            className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-full font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-300"
          >
            Browse All Toys
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Success Message */}
        {showSuccess && (
          <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 flex items-center space-x-2">
            <CheckCircle size={20} />
            <span>Try Now request submitted successfully!</span>
          </div>
        )}

        {/* Breadcrumb */}
        <nav className="mb-8">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <a href="/" className="hover:text-purple-600">
              Home
            </a>
            <span>/</span>
            <a href="/toys" className="hover:text-purple-600">
              Toys
            </a>
            <span>/</span>
            <span className="text-purple-600">{toy.toy_name}</span>
          </div>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Section */}
          <div className="space-y-4">
            <div className="relative">
              <img
                src={
                  toy.picture_url ||
                  "https://i.postimg.cc/8CqRzNzL/teddy-bear.jpg"
                }
                alt={toy.toy_name}
                className="w-full h-96 object-cover rounded-2xl shadow-lg"
              />
              <button className="absolute top-4 right-4 bg-white/90 hover:bg-white rounded-full p-3 transition-all">
                <Heart size={24} className="text-pink-500" />
              </button>
            </div>
          </div>

          {/* Details Section */}
          <div className="space-y-6">
            <div>
              <h1 className="text-4xl font-bold text-purple-800 mb-2">
                {toy.toy_name}
              </h1>
              <p className="text-xl text-gray-600">{toy.sub_category}</p>
            </div>

            {/* Rating */}
            <div className="flex items-center space-x-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={20}
                    className={`${
                      i < Math.floor(toy.rating)
                        ? "text-yellow-400 fill-current"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="text-lg text-gray-600">
                ({toy.rating} out of 5)
              </span>
            </div>

            {/* Price and Availability */}
            <div className="bg-purple-50 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-4xl font-bold text-purple-800">
                  ${toy.price}
                </span>
                <span className="text-lg text-gray-600">
                  {toy.available_quantity} available
                </span>
              </div>

              <div className="space-y-3">
                <button
                  onClick={() => setShowTryForm(true)}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 px-6 rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  <span>Try Now</span>
                  <ShoppingCart size={20} />
                </button>

                <button className="w-full border-2 border-purple-600 text-purple-600 py-4 px-6 rounded-xl font-semibold hover:bg-purple-600 hover:text-white transition-all duration-300">
                  Add to Wishlist
                </button>
              </div>
            </div>

            {/* Seller Info */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-purple-800 mb-4">
                Seller Information
              </h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <User size={20} className="text-purple-600" />
                  <span className="text-gray-700">{toy.seller_name}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail size={20} className="text-purple-600" />
                  <span className="text-gray-700">{toy.seller_email}</span>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-purple-800 mb-4">
                Description
              </h3>
              <p className="text-gray-700 leading-relaxed">{toy.description}</p>
            </div>
          </div>
        </div>

        {/* Try Now Form Modal */}
        {showTryForm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-8 max-w-md w-full">
              <h2 className="text-2xl font-bold text-purple-800 mb-6">
                Try {toy.toy_name}
              </h2>

              <form onSubmit={handleTryNow} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full px-4 py-3 border-2 border-purple-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors"
                    placeholder="Enter your name"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full px-4 py-3 border-2 border-purple-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors"
                    placeholder="Enter your email"
                    required
                  />
                </div>

                <div className="flex space-x-4 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowTryForm(false)}
                    className="flex-1 border-2 border-gray-300 text-gray-700 py-3 px-6 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-300"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-300"
                  >
                    Try Now
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
