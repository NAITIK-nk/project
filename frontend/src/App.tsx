import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoadingScreen from './components/LoadingScreen';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import Products from './components/Products';
import Brands from './components/Brands';
import Services from './components/Services';
import Contact from './components/Contact';
import Login from './components/Login';
import Cart from './components/Cart';
import About from './components/About';
import FavoritesPage from './components/FavoritesPage';
import Payment from './components/Payment';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';

import volexMidnightImage from './components/watchesimg/volexx.png';
import roseGoldImage from './components/watchesimg/rosegold.png';

export interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

export interface Product {
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

function App() {
  const [loading, setLoading] = useState(true);
  
  // Load cart items from localStorage on initial render
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const savedCart = localStorage.getItem('cartItems');
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
      console.error('Failed to load cart from localStorage:', error);
      return [];
    }
  });
  
  const [favorites, setFavorites] = useState<Set<number>>(() => {
    try {
      const savedFavorites = localStorage.getItem('favorites');
      return savedFavorites ? new Set(JSON.parse(savedFavorites)) : new Set();
    } catch (error) {
      console.error('Failed to load favorites from localStorage:', error);
      return new Set();
    }
  });
  
  const products: Product[] = [
    { id: 1, name: 'SAMAY Prestige Gold', price: 12500, originalPrice: 15000, image: 'https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?auto=compress&cs=tinysrgb&w=800', category: 'Luxury', brand: 'SAMAY', gender: 'Men', isOnSale: true },
    { id: 2, name: 'SAMAY Classic Steel', price: 8900, image: 'https://images.pexels.com/photos/277390/pexels-photo-277390.jpeg?auto=compress&cs=tinysrgb&w=800', category: 'Classic', brand: 'SAMAY', gender: 'Men' },
    { id: 3, name: 'SAMAY Midnight Black', price: 15000, image: volexMidnightImage, category: 'Sport', brand: 'SAMAY', gender: 'Women' },
    { id: 4, name: 'SAMAY Diamond Elite', price: 25000, image: 'https://images.pexels.com/photos/1697215/pexels-photo-1697215.jpeg?auto=compress&cs=tinysrgb&w=800', category: 'Luxury', brand: 'SAMAY', gender: 'Women' },
    { id: 5, name: 'SAMAY Ocean Blue', price: 11500, originalPrice: 13000, image: 'https://images.pexels.com/photos/1034063/pexels-photo-1034063.jpeg?auto=compress&cs=tinysrgb&w=800', category: 'Sport', brand: 'SAMAY', gender: 'Men', isOnSale: true },
    { id: 6, name: 'SAMAY Rose Gold Heritage', price: 18900, image: roseGoldImage, category: 'Classic', brand: 'SAMAY', gender: 'Women' },
    { id: 7, name: 'SAMAY Titanium Pro', price: 22000, image: 'https://images.pexels.com/photos/125779/pexels-photo-125779.jpeg?auto=compress&cs=tinysrgb&w=800', category: 'Sport', brand: 'SAMAY', gender: 'Men' },
    { id: 8, name: 'SAMAY Vintage Collection', price: 9500, image: 'https://images.pexels.com/photos/1034064/pexels-photo-1034064.jpeg?auto=compress&cs=tinysrgb&w=800', category: 'Classic', brand: 'SAMAY', gender: 'Women' }
  ];

  // Loading screen effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  // Persist cart to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
    } catch (error) {
      console.error('Failed to save cart to localStorage:', error);
    }
  }, [cartItems]);

  // Persist favorites to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem('favorites', JSON.stringify(Array.from(favorites)));
    } catch (error) {
      console.error('Failed to save favorites to localStorage:', error);
    }
  }, [favorites]);

  const addToCart = (product: Omit<CartItem, 'quantity'>) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
  };

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity === 0) {
      setCartItems(prevItems => prevItems.filter(item => item.id !== id));
    } else {
      setCartItems(prevItems =>
        prevItems.map(item => (item.id === id ? { ...item, quantity } : item))
      );
    }
  };

  const removeFromCart = (id: number) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  const toggleFavorite = (productId: number) => {
    setFavorites(prevFavorites => {
      const newFavorites = new Set(prevFavorites);
      if (newFavorites.has(productId)) {
        newFavorites.delete(productId);
      } else {
        newFavorites.add(productId);
      }
      return newFavorites;
    });
  };


  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-white flex flex-col">
          <Header
            cartItemsCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
            favoriteItemsCount={favorites.size}
          />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route
                path="/products"
                element={
                  <Products
                    {...({ products, addToCart, favorites, toggleFavorite } as any)}
                  />
                }
              />
              <Route path="/brands" element={<Brands />} />
              <Route path="/services" element={<Services />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/about" element={<About />} />
              <Route path="/login" element={<Login />} />
              
              {/* Protected Routes */}
              <Route
                path="/cart"
                element={
                  <ProtectedRoute>
                    <Cart
                      items={cartItems}
                      updateQuantity={updateQuantity}
                      removeFromCart={removeFromCart}
                    />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/payment"
                element={
                  <ProtectedRoute>
                    <Payment />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/favorites"
                element={
                  <ProtectedRoute>
                    <FavoritesPage
                      products={products}
                      favorites={favorites}
                      toggleFavorite={toggleFavorite}
                      addToCart={addToCart}
                    />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
