import { ArrowRight, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

// Local watch images
import rolex1Image from './watchesimg/rolex-1.jpg';
import fossil1Image from './watchesimg/fossil-1.jpg';
import omega2Image from './watchesimg/omega-2.jpg';
import seiko1Image from './watchesimg/seiko-1.jpg';

const FeaturedWatches = () => {
  const featuredWatches = [
    {
      id: 1,
      name: 'Rolex Submariner',
      price: 9800,
      originalPrice: 10400,
      image: rolex1Image,
      rating: 5,
      description: 'Iconic diving watch with robust construction and classic design',
      isFeatured: true,
      isOnSale: true
    },
    {
      id: 2,
      name: 'Fossil Grant Chronograph',
      price: 180,
      image: fossil1Image,
      rating: 5,
      description: 'Classic chronograph with refined detailing and leather strap',
      isFeatured: true
    },
    {
      id: 3,
      name: 'Omega Seamaster Diver 300M',
      price: 6500,
      image: omega2Image,
      rating: 5,
      description: 'Professional dive watch built for precision and reliability',
      isFeatured: true
    },
    {
      id: 4,
      name: 'Seiko Prospex Turtle',
      price: 520,
      image: seiko1Image,
      rating: 5,
      description: 'Durable sport watch with vintage-inspired case and modern movement',
      isFeatured: true
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Collection</h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Discover our most coveted timepieces, each representing the pinnacle of Swiss craftsmanship and design excellence.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {featuredWatches.map((watch) => (
          <div key={watch.id} className="group relative bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
            {/* Image Container */}
            <div className="relative aspect-square overflow-hidden bg-gray-100">
              {watch.isOnSale && (
                <span className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium z-10">
                  Sale
                </span>
              )}
              {watch.isFeatured && (
                <span className="absolute top-4 right-4 bg-yellow-600 text-white px-3 py-1 rounded-full text-sm font-medium z-10">
                  Featured
                </span>
              )}
              <img
                src={watch.image}
                alt={watch.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300"></div>
            </div>

            {/* Content */}
            <div className="p-6">
              {/* Rating */}
              <div className="flex items-center space-x-1 mb-2">
                {[...Array(watch.rating)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                ))}
                <span className="text-sm text-gray-500 ml-2">({watch.rating}.0)</span>
              </div>

              {/* Name */}
              <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-yellow-600 transition-colors">
                {watch.name}
              </h3>

              {/* Description */}
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                {watch.description}
              </p>

              {/* Price */}
              <div className="flex items-center space-x-2 mb-4">
                <span className="text-2xl font-bold text-yellow-600">
                  ₹{watch.price.toLocaleString()}
                </span>
                {watch.originalPrice && (
                  <span className="text-lg text-gray-500 line-through">
                    ₹{watch.originalPrice.toLocaleString()}
                  </span>
                )}
              </div>

              {/* CTA Button */}
              <Link to={`/product/${watch.id}`} className="w-full inline-flex bg-gray-900 text-white py-3 rounded-md font-semibold hover:bg-yellow-600 transition-all duration-300 group items-center justify-center space-x-2">
                <span>View Details</span>
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
          </div>
        ))}
      </div>

      {/* View All Link */}
      <div className="text-center mt-12">
        <Link
          to="/products"
          className="inline-flex items-center space-x-2 text-yellow-600 font-semibold text-lg hover:text-yellow-700 transition-colors group"
        >
          <span>View All Timepieces</span>
          <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
};

export default FeaturedWatches;