import { Home, Search, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <div className="text-9xl font-bold text-purple-200 mb-4">404</div>
          <h1 className="text-4xl font-bold text-purple-800 mb-4">
            Oops! Toy Not Found
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            The page you're looking for seems to have wandered off to the toy
            box. Let's help you find your way back!
          </p>
        </div>

        <div className="space-y-4">
          <a
            href="/"
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 px-6 rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-300 flex items-center justify-center space-x-2"
          >
            <Home size={20} />
            <span>Go Home</span>
          </a>

          <a
            href="/toys"
            className="w-full border-2 border-purple-600 text-purple-600 py-4 px-6 rounded-xl font-semibold hover:bg-purple-600 hover:text-white transition-all duration-300 flex items-center justify-center space-x-2"
          >
            <Search size={20} />
            <span>Browse Toys</span>
          </a>

          <button
            onClick={() => window.history.back()}
            className="w-full text-gray-600 py-4 px-6 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-300 flex items-center justify-center space-x-2"
          >
            <ArrowLeft size={20} />
            <span>Go Back</span>
          </button>
        </div>

        <div className="mt-12">
          <div className="text-6xl mb-4">🧸</div>
          <p className="text-gray-500">
            Don't worry, even the best toys sometimes get lost!
          </p>
        </div>
      </div>
    </div>
  );
}
