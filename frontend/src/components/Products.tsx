import React, { useState, useRef, useEffect, useMemo } from 'react';
import { ShoppingCart, Heart, Eye, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

import rawWatchesData from '../data/watches.json';

interface WatchData {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  category: string;
  gender: string;
  image: string;
  isOnSale?: boolean;
}

interface BrandBlock {
  brand: string;
  watches: WatchData[];
}

const watchesData = rawWatchesData as BrandBlock[];

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  brand: string;
  gender: string;
  isOnSale?: boolean;
}

interface ProductsProps {
  addToCart: (product: Omit<Product, 'category' | 'brand' | 'isOnSale' | 'originalPrice' | 'gender'>) => void;
  favorites: Set<number>;
  toggleFavorite: (productId: number) => void;
}

const useReveal = (rootMargin = '0px 0px -10% 0px') => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { root: null, threshold: 0.15, rootMargin }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [rootMargin]);
  return { ref, visible };
};

const Products: React.FC<ProductsProps> = ({ addToCart, favorites, toggleFavorite }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedBrand, setSelectedBrand] = useState('All');
  const [selectedGender, setSelectedGender] = useState('All');
  
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isBrandOpen, setIsBrandOpen] = useState(false);
  const [isGenderOpen, setIsGenderOpen] = useState(false);
  
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const handleAddToCart = (product: Omit<Product, 'category' | 'brand' | 'isOnSale' | 'originalPrice' | 'gender'>) => {
    if (!isAuthenticated) {
      // Redirect to login with return path
      navigate('/login', { state: { from: { pathname: '/products' } } });
      return;
    }
    addToCart(product);
  };

  const handleToggleFavorite = (productId: number) => {
    if (!isAuthenticated) {
      // Redirect to login with return path
      navigate('/login', { state: { from: { pathname: '/products' } } });
      return;
    }
    toggleFavorite(productId);
  };

  const products: Product[] = useMemo(() => {
    let counter = 1;
    return watchesData.flatMap((brandBlock) =>
      brandBlock.watches.map((watch) => ({
        id: counter++,
        name: watch.name,
        price: watch.price,
        originalPrice: watch.originalPrice,
        image: watch.image,
        category: watch.category,
        brand: brandBlock.brand,
        gender: watch.gender,
        isOnSale: watch.isOnSale,
      }))
    );
  }, []);

  const categories = useMemo(() => {
    const unique = new Set<string>(['All']);
    products.forEach((p) => unique.add(p.category));
    return Array.from(unique);
  }, [products]);

  const brands = useMemo(() => {
    const unique = new Set<string>(['All']);
    watchesData.forEach((b) => unique.add(b.brand));
    return Array.from(unique);
  }, []);

  const genders = useMemo(() => {
    const unique = new Set<string>(['All']);
    products.forEach((p) => unique.add(p.gender));
    return Array.from(unique);
  }, [products]);

  const filteredProducts = products.filter(product => {
    const categoryMatch = selectedCategory === 'All' || product.category === selectedCategory;
    const brandMatch = selectedBrand === 'All' || product.brand === selectedBrand;
    const genderMatch = selectedGender === 'All' || product.gender === selectedGender;
    return categoryMatch && brandMatch && genderMatch;
  });

  const SmoothAccordion = ({ title, options, selectedValue, onSelect, isOpen, onToggle }: any) => {
    const contentRef = useRef<HTMLDivElement>(null);
    const [maxHeight, setMaxHeight] = useState('0px');

    useEffect(() => {
      if (contentRef.current) {
        setMaxHeight(isOpen ? `${contentRef.current.scrollHeight}px` : '0px');
      }
    }, [isOpen]);

    return (
      <div className="relative">
        <div className="relative z-10">
          <button
            onClick={onToggle}
            className="w-full px-4 py-3 bg-white hover:bg-gray-50 flex justify-between items-center text-left font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-yellow-500 rounded-lg transition-all duration-200 border border-gray-200 shadow-sm"
          >
            <span className="truncate">{title}: {selectedValue}</span>
            <div className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`}>
              <ChevronDown className="h-5 w-5 flex-shrink-0" />
            </div>
          </button>
          <div
            className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-b-lg shadow-lg overflow-hidden transition-all duration-300 ease-in-out"
            style={{
              maxHeight: maxHeight,
              opacity: isOpen ? 1 : 0,
              transform: isOpen ? 'translateY(0)' : 'translateY(-10px)',
              visibility: isOpen ? 'visible' : 'hidden'
            }}
          >
            <div ref={contentRef} className="p-2">
              <div className="max-h-48 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                {options.map((option: string, index: number) => (
                  <button
                    key={option}
                    onClick={() => {
                      onSelect(option);
                      onToggle();
                    }}
                    className={`w-full text-left px-3 py-2 rounded-md transition-all duration-150 hover:bg-gray-50 flex justify-between items-center ${
                      selectedValue === option
                        ? 'bg-yellow-50 text-yellow-800 font-medium border-l-2 border-yellow-500'
                        : 'text-gray-700 hover:text-gray-900'
                    }`}
                    style={{ animationDelay: `${index * 30}ms` }}
                  >
                    <span>{option}</span>
                    {selectedValue === option && (
                      <div className="w-2 h-2 bg-yellow-500 rounded-full flex-shrink-0"></div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Section reveal
  const { ref: headRef, visible: headVisible } = useReveal();
  // Cards container ref for staggered reveal
  const gridRef = useRef<HTMLDivElement | null>(null);
  const [visibleCards, setVisibleCards] = useState<Record<number, boolean>>({});

  useEffect(() => {
    if (!gridRef.current) return;
    const cards = Array.from(gridRef.current.querySelectorAll<HTMLDivElement>('[data-card]'));
    const obs = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const idx = Number((entry.target as HTMLElement).dataset.index);
            setVisibleCards(v => ({ ...v, [idx]: true }));
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -5% 0px' }
    );
    cards.forEach(c => obs.observe(c));
    return () => obs.disconnect();
  }, [filteredProducts.length]);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Heading reveal */}
        <div
          ref={headRef}
          className="text-center mb-12 transition-all duration-700"
          style={{
            opacity: headVisible ? 1 : 0,
            transform: headVisible ? 'translateY(0px)' : 'translateY(20px)'
          }}
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Collection</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover the finest selection of luxury timepieces, each crafted with precision and elegance.
          </p>
        </div>

        {/* Filters */}
        <div className="bg-gray-25 rounded-lg p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Filters</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6" style={{ minHeight: '60px' }}>
            <SmoothAccordion
              title="Category"
              options={categories}
              selectedValue={selectedCategory}
              onSelect={setSelectedCategory}
              isOpen={isCategoryOpen}
              onToggle={() => {
                setIsCategoryOpen(!isCategoryOpen);
                setIsBrandOpen(false);
                setIsGenderOpen(false);
              }}
            />
            <SmoothAccordion
              title="Brand"
              options={brands}
              selectedValue={selectedBrand}
              onSelect={setSelectedBrand}
              isOpen={isBrandOpen}
              onToggle={() => {
                setIsBrandOpen(!isBrandOpen);
                setIsCategoryOpen(false);
                setIsGenderOpen(false);
              }}
            />
            <SmoothAccordion
              title="Gender"
              options={genders}
              selectedValue={selectedGender}
              onSelect={setSelectedGender}
              isOpen={isGenderOpen}
              onToggle={() => {
                setIsGenderOpen(!isGenderOpen);
                setIsCategoryOpen(false);
                setIsBrandOpen(false);
              }}
            />
          </div>

          <div className="mt-8 text-right">
            <span className="text-sm text-gray-600 bg-white px-3 py-1 rounded-full border">
              Showing {filteredProducts.length} of {products.length} products
            </span>
          </div>
        </div>

        {/* Cards */}
        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredProducts.map((product, i) => {
            const isFavorite = favorites.has(product.id);
            const isVisible = !!visibleCards[i];

            return (
              <div
                key={product.id}
                data-card
                data-index={i}
                className="bg-white rounded-lg shadow-lg overflow-hidden group hover:shadow-xl transition-shadow duration-300 will-change-transform"
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0px) scale(1)' : 'translateY(20px) scale(0.98)',
                  transition: `opacity 700ms ease ${i * 60}ms, transform 700ms cubic-bezier(.22,.61,.36,1) ${i * 60}ms`
                }}
              >
                <div className="relative aspect-square overflow-hidden">
                  {product.isOnSale && (
                    <span className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium z-10">
                      Sale
                    </span>
                  )}
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 will-change-transform"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                    <button className="p-3 bg-white rounded-full hover:bg-gray-100 transition-colors" aria-label="View Product">
                      <Eye className="h-5 w-5 text-gray-700" />
                    </button>
                    <button
                      className="p-3 bg-white rounded-full hover:bg-gray-100 transition-colors"
                      onClick={() => handleToggleFavorite(product.id)}
                      aria-label="Toggle Favorite"
                    >
                      <Heart className={`h-5 w-5 transition-all duration-300 ${isFavorite ? 'text-red-500 fill-current' : 'text-gray-700'}`} />
                    </button>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{product.name}</h3>
                  <div className="flex items-center gap-2 mb-4">
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
                    onClick={() =>
                      handleAddToCart({
                        id: product.id,
                        name: product.name,
                        price: product.price,
                        image: product.image
                      })
                    }
                    className="w-full bg-gray-900 text-white py-3 rounded-md hover:bg-yellow-600 transition-colors duration-300 flex items-center justify-center gap-2"
                  >
                    <ShoppingCart className="h-5 w-5" />
                    <span>Add to Cart</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No products found matching your criteria.</p>
          </div>
        )}
      </div>

      <style>{`
        .scrollbar-thin::-webkit-scrollbar { width: 4px; }
        .scrollbar-thumb-gray-300::-webkit-scrollbar-thumb { background-color: #d1d5db; border-radius: 2px; }
        .scrollbar-track-gray-100::-webkit-scrollbar-track { background-color: #f3f4f6; }
      `}</style>
    </div>
  );
};

export default Products;