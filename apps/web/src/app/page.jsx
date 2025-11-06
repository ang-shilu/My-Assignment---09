import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  ChevronLeft,
  ChevronRight,
  Star,
  ShoppingCart,
  Users,
  Heart,
  Sparkles,
} from "lucide-react";

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Fetch popular toys
  const { data: toysData, isLoading } = useQuery({
    queryKey: ["toys", "popular"],
    queryFn: async () => {
      const response = await fetch("/api/toys?limit=6");
      if (!response.ok) {
        throw new Error("Failed to fetch toys");
      }
      return response.json();
    },
  });

  const slides = [
    {
      title: "Welcome to ToyTopia!",
      subtitle: "Discover Amazing Toys from Local Sellers",
      description:
        "Find the perfect toys for your kids while supporting your local community",
      image: "https://i.postimg.cc/9fKLmNzX/barbie-dreamhouse.jpg",
      cta: "Explore Toys",
    },
    {
      title: "Quality Toys, Happy Kids",
      subtitle: "Curated Selection of Premium Toys",
      description:
        "Every toy is carefully selected to ensure safety, fun, and educational value",
      image: "https://i.postimg.cc/Xqz8qJzL/lego-classic.jpg",
      cta: "Shop Now",
    },
    {
      title: "Support Local Sellers",
      subtitle: "Connect with Your Community",
      description:
        "Help local toy sellers thrive while finding unique and special toys",
      image: "https://i.postimg.cc/T1XqYzJL/hotwheels-track.jpg",
      cta: "Meet Sellers",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Slider */}
      <section className="relative h-[600px] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20 z-10"></div>

        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-transform duration-500 ease-in-out ${
              index === currentSlide
                ? "translate-x-0"
                : index < currentSlide
                  ? "-translate-x-full"
                  : "translate-x-full"
            }`}
          >
            <div
              className="w-full h-full bg-cover bg-center"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <div className="absolute inset-0 bg-black/40"></div>
            </div>

            <div className="absolute inset-0 flex items-center justify-center z-20">
              <div className="text-center text-white max-w-4xl px-4">
                <h1 className="text-5xl md:text-7xl font-bold mb-4 animate-fade-in">
                  {slide.title}
                </h1>
                <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-yellow-300">
                  {slide.subtitle}
                </h2>
                <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
                  {slide.description}
                </p>
                <a
                  href="/toys"
                  className="inline-block bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105"
                >
                  {slide.cta}
                </a>
              </div>
            </div>
          </div>
        ))}

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 z-30 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-all"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 z-30 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-all"
        >
          <ChevronRight size={24} />
        </button>

        {/* Slide Indicators */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-30 flex space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentSlide ? "bg-white" : "bg-white/50"
              }`}
            />
          ))}
        </div>
      </section>

      {/* Popular Toys Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-purple-800 mb-4">
              Popular Toys
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover the most loved toys in our community, handpicked by
              families just like yours
            </p>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, index) => (
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
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {toysData?.toys?.map((toy) => (
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
                      <Heart size={20} className="text-pink-500" />
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

                    <a
                      href={`/toys/${toy.id}`}
                      className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-300 flex items-center justify-center space-x-2"
                    >
                      <span>View More</span>
                      <ShoppingCart size={18} />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <a
              href="/toys"
              className="inline-block bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105"
            >
              View All Toys
            </a>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-purple-800 mb-4">
              Why Choose ToyTopia?
            </h2>
            <p className="text-xl text-gray-600">
              We're more than just a toy store - we're a community
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-purple-50 to-pink-50">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="text-white" size={32} />
              </div>
              <h3 className="text-2xl font-bold text-purple-800 mb-4">
                Local Community
              </h3>
              <p className="text-gray-600">
                Support local toy sellers and connect with families in your
                neighborhood
              </p>
            </div>

            <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-purple-50 to-pink-50">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="text-white" size={32} />
              </div>
              <h3 className="text-2xl font-bold text-purple-800 mb-4">
                Quality Guaranteed
              </h3>
              <p className="text-gray-600">
                Every toy is carefully selected for safety, fun, and educational
                value
              </p>
            </div>

            <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-purple-50 to-pink-50">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="text-white" size={32} />
              </div>
              <h3 className="text-2xl font-bold text-purple-800 mb-4">
                Made with Love
              </h3>
              <p className="text-gray-600">
                Each toy comes with the personal touch and care of local sellers
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-purple-600 to-pink-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to Start Shopping?
          </h2>
          <p className="text-xl text-purple-100 mb-8">
            Join thousands of happy families who have found their perfect toys
            on ToyTopia
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/account/signup"
              className="bg-white text-purple-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105"
            >
              Sign Up Now
            </a>
            <a
              href="/toys"
              className="border-2 border-white text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white hover:text-purple-600 transition-all duration-300 transform hover:scale-105"
            >
              Browse Toys
            </a>
          </div>
        </div>
      </section>

      <style jsx global>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
      `}</style>
    </div>
  );
}
