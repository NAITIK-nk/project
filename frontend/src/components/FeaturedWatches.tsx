import { ArrowRight, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

const FeaturedWatches = () => {
  const featuredWatches = [
    {
      id: 1,
      name: 'SAMAY Prestige Gold',
      price: 12500,
      originalPrice: 15000,
      image: 'https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?auto=compress&cs=tinysrgb&w=800',
      rating: 5,
      description: 'Exquisite 18K gold timepiece with Swiss automatic movement',
      isFeatured: true,
      isOnSale: true
    },
    {
      id: 2,
      name: 'SAMAY Classic Steel',
      price: 8900,
      image: 'https://images.pexels.com/photos/277390/pexels-photo-277390.jpeg?auto=compress&cs=tinysrgb&w=800',
      rating: 5,
      description: 'Timeless stainless steel design with precision engineering',
      isFeatured: true
    },
    {
      id: 3,
      name: 'SAMAY Midnight Black',
      price: 15000,
      image: 'https://images.pexels.com/photos/1697214/pexels-photo-1697214.jpeg?auto=compress&cs=tinysrgb&w=800',
      rating: 5,
      description: 'Bold black ceramic case with luminous markers',
      isFeatured: true
    },
    {
      id: 4,
      name: 'SAMAY Diamond Elite',
      price: 25000,
      image: 'https://images.pexels.com/photos/1697215/pexels-photo-1697215.jpeg?auto=compress&cs=tinysrgb&w=800',
      rating: 5,
      description: 'Ultimate luxury with diamond-set bezel and dial',
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
              <button className="w-full bg-gray-900 text-white py-3 rounded-md font-semibold hover:bg-yellow-600 transition-all duration-300 group flex items-center justify-center space-x-2">
                <span>View Details</span>
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </button>
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