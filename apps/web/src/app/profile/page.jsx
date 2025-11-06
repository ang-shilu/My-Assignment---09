import { useState, useEffect } from "react";
import useUser from "@/utils/useUser";
import { User, Mail, Camera, Save, Edit3, CheckCircle } from "lucide-react";

export default function ProfilePage() {
  const { data: user, loading: userLoading, refetch } = useUser();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ name: "", image: "" });
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState("");

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!userLoading && !user) {
      window.location.href =
        "/account/signin?callbackUrl=" +
        encodeURIComponent(window.location.pathname);
    }
  }, [user, userLoading]);

  // Initialize form data when user data is loaded
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        image: user.image || "",
      });
    }
  }, [user]);

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Update user profile using Firebase's updateProfile method
      // Since we're using the Anything auth system, we'll make an API call to update the profile
      const response = await fetch("/api/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          image: formData.image,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update profile");
      }

      // Refetch user data to get updated information
      await refetch();

      setIsEditing(false);
      setShowSuccess(true);

      // Hide success message after 3 seconds
      setTimeout(() => {
        setShowSuccess(false);
      }, 3000);
    } catch (err) {
      setError("Failed to update profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      name: user?.name || "",
      image: user?.image || "",
    });
    setIsEditing(false);
    setError("");
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
      <div className="max-w-4xl mx-auto">
        {/* Success Message */}
        {showSuccess && (
          <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 flex items-center space-x-2">
            <CheckCircle size={20} />
            <span>Profile updated successfully!</span>
          </div>
        )}

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-purple-800 mb-4">
            My Profile
          </h1>
          <p className="text-xl text-gray-600">
            Manage your ToyTopia account information
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
              <div className="relative inline-block mb-6">
                {user.image || formData.image ? (
                  <img
                    src={isEditing ? formData.image : user.image}
                    alt={user.name}
                    className="w-32 h-32 rounded-full border-4 border-purple-300 object-cover"
                  />
                ) : (
                  <div className="w-32 h-32 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center border-4 border-purple-300">
                    <User size={48} className="text-white" />
                  </div>
                )}
                {isEditing && (
                  <div className="absolute bottom-0 right-0 bg-purple-600 rounded-full p-2">
                    <Camera size={16} className="text-white" />
                  </div>
                )}
              </div>

              <h2 className="text-2xl font-bold text-purple-800 mb-2">
                {isEditing ? formData.name || "Your Name" : user.name}
              </h2>
              <p className="text-gray-600 mb-6">{user.email}</p>

              {!isEditing && (
                <button
                  onClick={() => setIsEditing(true)}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-300 flex items-center space-x-2 mx-auto"
                >
                  <Edit3 size={18} />
                  <span>Edit Profile</span>
                </button>
              )}
            </div>
          </div>

          {/* Profile Information */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-purple-800 mb-6">
                Profile Information
              </h3>

              {isEditing ? (
                <form onSubmit={handleSave} className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="w-full px-4 py-3 border-2 border-purple-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors"
                      placeholder="Enter your full name"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={user.email}
                      disabled
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl bg-gray-50 text-gray-500"
                    />
                    <p className="text-sm text-gray-500 mt-1">
                      Email cannot be changed
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Photo URL
                    </label>
                    <input
                      type="url"
                      value={formData.image}
                      onChange={(e) =>
                        setFormData({ ...formData, image: e.target.value })
                      }
                      className="w-full px-4 py-3 border-2 border-purple-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors"
                      placeholder="Enter photo URL"
                    />
                  </div>

                  {error && (
                    <div className="bg-red-50 border border-red-200 rounded-xl p-3 text-red-600 text-sm">
                      {error}
                    </div>
                  )}

                  <div className="flex space-x-4">
                    <button
                      type="button"
                      onClick={handleCancel}
                      className="flex-1 border-2 border-gray-300 text-gray-700 py-3 px-6 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-300"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={loading}
                      className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-50"
                    >
                      <Save size={18} />
                      <span>{loading ? "Saving..." : "Save Changes"}</span>
                    </button>
                  </div>
                </form>
              ) : (
                <div className="space-y-6">
                  <div className="flex items-center space-x-4 p-4 bg-purple-50 rounded-xl">
                    <User size={24} className="text-purple-600" />
                    <div>
                      <p className="text-sm font-semibold text-gray-700">
                        Full Name
                      </p>
                      <p className="text-lg text-purple-800">
                        {user.name || "Not provided"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 p-4 bg-purple-50 rounded-xl">
                    <Mail size={24} className="text-purple-600" />
                    <div>
                      <p className="text-sm font-semibold text-gray-700">
                        Email Address
                      </p>
                      <p className="text-lg text-purple-800">{user.email}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 p-4 bg-purple-50 rounded-xl">
                    <Camera size={24} className="text-purple-600" />
                    <div>
                      <p className="text-sm font-semibold text-gray-700">
                        Profile Photo
                      </p>
                      <p className="text-lg text-purple-800">
                        {user.image
                          ? "Custom photo set"
                          : "Using default avatar"}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Account Stats */}
            <div className="mt-8 bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-purple-800 mb-6">
                Account Activity
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl">
                  <div className="text-3xl font-bold text-purple-800 mb-2">
                    0
                  </div>
                  <div className="text-gray-600">Toys Tried</div>
                </div>

                <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl">
                  <div className="text-3xl font-bold text-purple-800 mb-2">
                    0
                  </div>
                  <div className="text-gray-600">Wishlist Items</div>
                </div>

                <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl">
                  <div className="text-3xl font-bold text-purple-800 mb-2">
                    0
                  </div>
                  <div className="text-gray-600">Reviews Written</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
