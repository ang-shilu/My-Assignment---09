import { useState } from "react";
import useUser from "@/utils/useUser";
import { Menu, X, User, LogOut } from "lucide-react";

export default function Navbar() {
  const { data: user, loading } = useUser();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  return (
    <nav className="bg-white shadow-lg border-b-4 border-purple-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="/" className="flex items-center">
              <span className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                ToyTopia
              </span>
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <a
                href="/"
                className="text-purple-800 hover:text-pink-600 px-3 py-2 rounded-md text-lg font-semibold transition-colors"
              >
                Home
              </a>
              <a
                href="/toys"
                className="text-purple-800 hover:text-pink-600 px-3 py-2 rounded-md text-lg font-semibold transition-colors"
              >
                All Toys
              </a>
              {user && (
                <>
                  <a
                    href="/wishlist"
                    className="text-purple-800 hover:text-pink-600 px-3 py-2 rounded-md text-lg font-semibold transition-colors"
                  >
                    Wishlist
                  </a>
                  <a
                    href="/profile"
                    className="text-purple-800 hover:text-pink-600 px-3 py-2 rounded-md text-lg font-semibold transition-colors"
                  >
                    My Profile
                  </a>
                </>
              )}
            </div>
          </div>

          {/* User Menu */}
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6">
              {loading ? (
                <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse"></div>
              ) : user ? (
                <div className="relative">
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center space-x-2 text-purple-800 hover:text-pink-600 transition-colors"
                    onMouseEnter={() => setShowUserMenu(true)}
                    onMouseLeave={() => setShowUserMenu(false)}
                  >
                    {user.image ? (
                      <img
                        src={user.image}
                        alt={user.name}
                        className="w-8 h-8 rounded-full border-2 border-purple-300"
                      />
                    ) : (
                      <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
                        <User size={16} className="text-white" />
                      </div>
                    )}
                  </button>

                  {showUserMenu && (
                    <div
                      className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-purple-100"
                      onMouseEnter={() => setShowUserMenu(true)}
                      onMouseLeave={() => setShowUserMenu(false)}
                    >
                      <div className="px-4 py-2 text-sm text-gray-700 border-b border-gray-100">
                        <p className="font-semibold">{user.name}</p>
                        <p className="text-gray-500">{user.email}</p>
                      </div>
                      <a
                        href="/profile"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-purple-50 transition-colors"
                      >
                        My Profile
                      </a>
                      <a
                        href="/account/logout"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-purple-50 transition-colors"
                      >
                        <div className="flex items-center space-x-2">
                          <LogOut size={16} />
                          <span>Sign Out</span>
                        </div>
                      </a>
                    </div>
                  )}
                </div>
              ) : (
                <a
                  href="/account/signin"
                  className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-full font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105"
                >
                  Login
                </a>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-purple-800 hover:text-pink-600 p-2"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-purple-50 rounded-lg mt-2">
              <a
                href="/"
                className="text-purple-800 hover:text-pink-600 block px-3 py-2 rounded-md text-base font-medium"
              >
                Home
              </a>
              <a
                href="/toys"
                className="text-purple-800 hover:text-pink-600 block px-3 py-2 rounded-md text-base font-medium"
              >
                All Toys
              </a>
              {user && (
                <>
                  <a
                    href="/wishlist"
                    className="text-purple-800 hover:text-pink-600 block px-3 py-2 rounded-md text-base font-medium"
                  >
                    Wishlist
                  </a>
                  <a
                    href="/profile"
                    className="text-purple-800 hover:text-pink-600 block px-3 py-2 rounded-md text-base font-medium"
                  >
                    My Profile
                  </a>
                </>
              )}
              <div className="pt-4 pb-3 border-t border-purple-200">
                {loading ? (
                  <div className="flex items-center px-3">
                    <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse"></div>
                    <div className="ml-3 w-20 h-4 bg-gray-200 rounded animate-pulse"></div>
                  </div>
                ) : user ? (
                  <div className="flex items-center px-3">
                    {user.image ? (
                      <img
                        src={user.image}
                        alt={user.name}
                        className="w-8 h-8 rounded-full border-2 border-purple-300"
                      />
                    ) : (
                      <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
                        <User size={16} className="text-white" />
                      </div>
                    )}
                    <div className="ml-3">
                      <div className="text-base font-medium text-purple-800">
                        {user.name}
                      </div>
                      <div className="text-sm text-gray-500">{user.email}</div>
                    </div>
                  </div>
                ) : (
                  <div className="px-3">
                    <a
                      href="/account/signin"
                      className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-full font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-300 inline-block"
                    >
                      Login
                    </a>
                  </div>
                )}
                {user && (
                  <div className="mt-3 px-3">
                    <a
                      href="/account/logout"
                      className="text-purple-800 hover:text-pink-600 block px-3 py-2 rounded-md text-base font-medium"
                    >
                      Sign Out
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
