// src/components/FavoritesPage.tsx

import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Frown } from 'lucide-react';
import { Product } from '../App'; // Import the Product interface

interface FavoritesPageProps {
  products: Product[];
  favorites: Set<number>;
  toggleFavorite: (productId: number) => void;
  addToCart: (product: Omit<Product, 'category' | 'brand' | 'isOnSale' | 'originalPrice' | 'gender' | 'quantity'>) => void;
}

const FavoritesPage: React.FC<FavoritesPageProps> = ({ products, favorites, toggleFavorite, addToCart }) => {
  const favoriteProducts = products.filter(product => favorites.has(product.id));

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Your Favorites</h1>
          <p className="text-xl text-gray-600">The timepieces you love, all in one place.</p>
        </div>

        {favoriteProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {favoriteProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-lg shadow-lg overflow-hidden group">
                <div className="relative aspect-square overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <button
                    onClick={() => toggleFavorite(product.id)}
                    className="absolute top-4 right-4 p-2 bg-white/80 rounded-full text-red-500 hover:bg-white transition-colors"
                    aria-label="Remove from Favorites"
                  >
                    <Heart className="h-6 w-6 fill-current" />
                  </button>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{product.name}</h3>
                  <div className="flex items-center space-x-2 mb-4">
                    <span className="text-2xl font-bold text-yellow-600">
                      ₹{product.price.toLocaleString()}
                    </span>
                    {product.originalPrice && (
                      <span className="text-lg text-gray-500 line-through">
                        ₹{product.originalPrice.toLocaleString()}
                      </span>
                    )}
                  </div>
                  <button
                    onClick={() => addToCart(product)}
                    className="w-full bg-gray-900 text-white py-3 rounded-md hover:bg-yellow-600 transition-colors duration-300 flex items-center justify-center space-x-2"
                  >
                    <ShoppingCart className="h-5 w-5" />
                    <span>Add to Cart</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <Frown className="h-16 w-16 mx-auto text-gray-400 mb-4" />
            <h2 className="text-2xl font-semibold text-gray-800">No Favorites Yet</h2>
            <p className="text-gray-500 mt-2 mb-6">
              Click the heart icon on any product to save it to your favorites.
            </p>
            <Link
              to="/products"
              className="inline-block bg-yellow-500 text-white font-bold py-3 px-6 rounded-lg hover:bg-yellow-600 transition-colors"
            >
              Explore Products
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default FavoritesPage;
