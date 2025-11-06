import {
  Heart,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-purple-800 to-pink-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center mb-4">
              <span className="text-3xl font-bold text-white">ToyTopia</span>
            </div>
            <p className="text-purple-100 mb-4 max-w-md">
              Your vibrant online marketplace for kids' toys. Discover amazing
              toys and support local sellers in your community.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-purple-200 hover:text-white transition-colors"
              >
                <Facebook size={24} />
              </a>
              <a
                href="#"
                className="text-purple-200 hover:text-white transition-colors"
              >
                <Twitter size={24} />
              </a>
              <a
                href="#"
                className="text-purple-200 hover:text-white transition-colors"
              >
                <Instagram size={24} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="/"
                  className="text-purple-200 hover:text-white transition-colors"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="/toys"
                  className="text-purple-200 hover:text-white transition-colors"
                >
                  All Toys
                </a>
              </li>
              <li>
                <a
                  href="/categories"
                  className="text-purple-200 hover:text-white transition-colors"
                >
                  Categories
                </a>
              </li>
              <li>
                <a
                  href="/sellers"
                  className="text-purple-200 hover:text-white transition-colors"
                >
                  Local Sellers
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-2">
                <Mail size={16} />
                <span className="text-purple-200">hello@toytopia.com</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone size={16} />
                <span className="text-purple-200">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center space-x-2">
                <MapPin size={16} />
                <span className="text-purple-200">
                  123 Toy Street, Fun City
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-purple-600 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <span className="text-purple-200">Made with</span>
              <Heart size={16} className="text-pink-400" />
              <span className="text-purple-200">for kids and families</span>
            </div>
            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6">
              <a
                href="/privacy"
                className="text-purple-200 hover:text-white transition-colors text-sm"
              >
                Privacy Policy
              </a>
              <a
                href="/terms"
                className="text-purple-200 hover:text-white transition-colors text-sm"
              >
                Terms & Conditions
              </a>
              <span className="text-purple-200 text-sm">
                © 2024 ToyTopia. All rights reserved.
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
