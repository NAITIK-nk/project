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
import AdminRoute from './components/AdminRoute';
import { AuthProvider, useAuth } from './context/AuthContext';
import { api } from './utils/api';

// New pages
import BrandPage from './components/BrandPage';
import OrderSuccess from './pages/OrderSuccess';
import MyOrders from './pages/MyOrders';
import Compare from './pages/Compare';
import AdminDashboard from './components/AdminDashboard';
import AdminProducts from './components/AdminProducts';

import rolex1Image from './components/watchesimg/rolex-1.jpg';
import casio1Image from './components/watchesimg/casio-1.jpg';
import fossil1Image from './components/watchesimg/fossil-1.jpg';
import fossil2Image from './components/watchesimg/fossil-2.jpg';
import omega2Image from './components/watchesimg/omega-2.jpg';
import seiko1Image from './components/watchesimg/seiko-1.jpg';
import seiko2Image from './components/watchesimg/seiko-2.jpg';
import titan1Image from './components/watchesimg/titan-1.jpg';

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

// Inner component that has access to AuthContext
function AppContent() {
  const { user, isAuthenticated } = useAuth();
  const [loading, setLoading] = useState(true);
  
  // Load cart items from localStorage on initial render (fallback)
  // Don't load from localStorage on mount - always start fresh
  // Cart and favorites will be loaded from database when user logs in
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [favorites, setFavorites] = useState<Set<number>>(new Set());

  // Compare list (store selected products for comparison)
  const [compareList, setCompareList] = useState<Product[]>(() => {
    try { return JSON.parse(localStorage.getItem('compareList') || '[]'); } catch { return []; }
  });
  
  const products: Product[] = [
    { id: 1, name: 'Rolex Submariner', price: 9800, originalPrice: 10400, image: rolex1Image, category: 'Luxury', brand: 'Rolex', gender: 'Men', isOnSale: true },
    { id: 2, name: 'Fossil Grant Chronograph', price: 180, image: fossil1Image, category: 'Classic', brand: 'Fossil', gender: 'Men' },
    { id: 3, name: 'Omega Seamaster Diver 300M', price: 6500, image: omega2Image, category: 'Sport', brand: 'Omega', gender: 'Men' },
    { id: 4, name: 'Seiko Prospex Turtle', price: 520, image: seiko1Image, category: 'Sport', brand: 'Seiko', gender: 'Men' },
    { id: 5, name: 'Casio G-Shock Mudmaster', price: 380, originalPrice: 420, image: casio1Image, category: 'Sport', brand: 'Casio', gender: 'Men', isOnSale: true },
    { id: 6, name: 'Fossil Rose Gold Grant', price: 189, image: fossil2Image, category: 'Classic', brand: 'Fossil', gender: 'Women' },
    { id: 7, name: 'Titan Edge Ceramic', price: 420, image: titan1Image, category: 'Classic', brand: 'Titan', gender: 'Men' },
    { id: 8, name: 'Seiko Presage Cocktail Time', price: 470, image: seiko2Image, category: 'Classic', brand: 'Seiko', gender: 'Men' }
  ];

  // Loading screen effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isAuthenticated || !user) {
      setCartItems([]);
      setFavorites(new Set());
      localStorage.removeItem('cartItems');
      localStorage.removeItem('favorites');
    }
  }, [isAuthenticated, user]);

  useEffect(() => {
    const fetchUserData = async () => {
      if (isAuthenticated && user?.id) {
        try {
          localStorage.removeItem('cartItems');
          localStorage.removeItem('favorites');
          
          try {
            const cartResponse = await api.get<{ success: boolean; data: any }>(`/carts/user/${user.id}`);
            if (cartResponse.success && cartResponse.data?.items) {
              const backendItems = cartResponse.data.items;
              const frontendItems: CartItem[] = backendItems.map((item: any) => ({
                id: typeof item.productId === 'string' ? parseInt(item.productId) || item.productId : item.productId,
                name: item.name,
                price: item.price,
                image: item.image,
                quantity: item.quantity
              }));
              setCartItems(frontendItems);
            } else {
              setCartItems([]);
            }
          } catch (cartError) {
            console.error('[App] Failed to fetch cart from database:', cartError);
            setCartItems([]);
          }

          try {
            const favoritesResponse = await api.get<{ success: boolean; data: any[] }>(`/favorites/user/${user.id}`);
            if (favoritesResponse.success && Array.isArray(favoritesResponse.data)) {
              const favoriteIds = new Set<number>(
                favoritesResponse.data.map((fav: any) => {
                  const productId = fav.productId;
                  return typeof productId === 'string' ? parseInt(productId) || productId : productId;
                })
              );
              setFavorites(favoriteIds);
            } else {
              setFavorites(new Set());
            }
          } catch (favoritesError) {
            console.error('[App] Failed to fetch favorites from database:', favoritesError);
            setFavorites(new Set());
          }
        } catch (error) {
          console.error('[App] Error fetching user data:', error);
        }
      }
    };

    fetchUserData();
  }, [isAuthenticated, user?.id]);

  const addToCart = async (product: Omit<CartItem, 'quantity'>) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });

    if (isAuthenticated && user?.id) {
      try {
        const response = await api.post(`/carts/add`, {
          userId: user.id,
          productId: product.id.toString(),
          name: product.name,
          price: product.price,
          image: product.image,
          quantity: 1
        });
        
        if (response.ok) {
          const result = await response.json();
          if (!result.success) {
            console.error('[App] Failed to add product to cart:', result.message);
          }
        } else {
          const errorText = await response.text();
          console.error('[App] Failed to add product to cart:', errorText);
        }
      } catch (error) {
        console.error('[App] Error adding product to cart in database:', error);
      }
    }
  };

  const updateQuantity = async (id: number, quantity: number) => {
    if (quantity === 0) {
      setCartItems(prevItems => prevItems.filter(item => item.id !== id));
    } else {
      setCartItems(prevItems =>
        prevItems.map(item => (item.id === id ? { ...item, quantity } : item))
      );
    }

    if (isAuthenticated && user?.id) {
<<<<<<< HEAD
        try {
          const response = await api.put(`/carts/update`, {
            userId: user.id,
            productId: id.toString(),
            quantity
          });
          
          if (response.ok) {
            const result = await response.json();
          if (!result.success) {
              console.error('[App] Failed to update cart quantity:', result.message);
            }
          } else {
            const errorText = await response.text();
            console.error('[App] Failed to update cart quantity:', errorText);
=======
      try {
        const response = await api.put(`/carts/update`, {
          userId: user.id,
          productId: id.toString(),
          quantity
        });
        
        if (response.ok) {
          const result = await response.json();
          if (!result.success) {
            console.error('[App] Failed to update cart quantity:', result.message);
          }
        } else {
          const errorText = await response.text();
          console.error('[App] Failed to update cart quantity:', errorText);
>>>>>>> 2d2447836291bb1712f79b1df66c3981ea700cf6
        }
      } catch (error) {
        console.error('[App] Error updating cart quantity in database:', error);
      }
    }
  };

  const removeFromCart = async (id: number) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));

    if (isAuthenticated && user?.id) {
<<<<<<< HEAD
        try {
          const response = await api.post(`/carts/remove`, {
            userId: user.id,
            productId: id.toString()
          });
          
          if (response.ok) {
            const result = await response.json();
          if (!result.success) {
              console.error('[App] Failed to remove product from cart:', result.message);
            }
          } else {
            const errorText = await response.text();
            console.error('[App] Failed to remove product from cart:', errorText);
=======
      try {
        const response = await api.post(`/carts/remove`, {
          userId: user.id,
          productId: id.toString()
        });
        
        if (response.ok) {
          const result = await response.json();
          if (!result.success) {
            console.error('[App] Failed to remove product from cart:', result.message);
          }
        } else {
          const errorText = await response.text();
          console.error('[App] Failed to remove product from cart:', errorText);
>>>>>>> 2d2447836291bb1712f79b1df66c3981ea700cf6
        }
      } catch (error) {
        console.error('[App] Error removing product from cart in database:', error);
      }
    }
  };

  const toggleFavorite = async (productId: number) => {
    const wasFavorite = favorites.has(productId);
    setFavorites(prevFavorites => {
      const newFavorites = new Set(prevFavorites);
      try {
        const tsRaw = localStorage.getItem('favoriteTimestamps');
        const ts = tsRaw ? JSON.parse(tsRaw) : {};
        if (newFavorites.has(productId)) {
          newFavorites.delete(productId);
          delete ts[productId];
        } else {
          newFavorites.add(productId);
          ts[productId] = new Date().toISOString();
        }
        localStorage.setItem('favoriteTimestamps', JSON.stringify(ts));
      } catch (e) {
        console.error('Failed to update favorite timestamps', e);
      }
      return newFavorites;
    });

    if (isAuthenticated && user?.id) {
<<<<<<< HEAD
        try {
          const response = await api.post(`/favorites/toggle`, {
            userId: user.id,
            productId: productId.toString()
          });
          
          if (response.ok) {
            const result = await response.json();
          if (!result.success) {
              console.error('[App] Failed to toggle favorite:', result.message);
              setFavorites(prevFavorites => {
                const newFavorites = new Set(prevFavorites);
                if (wasFavorite) {
                  newFavorites.add(productId);
                } else {
                  newFavorites.delete(productId);
                }
                return newFavorites;
              });
            }
          } else {
            const errorText = await response.text();
            console.error('[App] Failed to toggle favorite:', errorText);
=======
      try {
        const response = await api.post(`/favorites/toggle`, {
          userId: user.id,
          productId: productId.toString()
        });
        
        if (response.ok) {
          const result = await response.json();
          if (!result.success) {
            console.error('[App] Failed to toggle favorite:', result.message);
            setFavorites(prevFavorites => {
              const newFavorites = new Set(prevFavorites);
              if (wasFavorite) {
                newFavorites.add(productId);
              } else {
                newFavorites.delete(productId);
              }
              return newFavorites;
            });
          }
        } else {
          const errorText = await response.text();
          console.error('[App] Failed to toggle favorite:', errorText);
>>>>>>> 2d2447836291bb1712f79b1df66c3981ea700cf6
          setFavorites(prevFavorites => {
            const newFavorites = new Set(prevFavorites);
            if (wasFavorite) {
              newFavorites.add(productId);
            } else {
              newFavorites.delete(productId);
            }
            return newFavorites;
          });
        }
      } catch (error) {
        console.error('[App] Error toggling favorite in database:', error);
        setFavorites(prevFavorites => {
          const newFavorites = new Set(prevFavorites);
          if (wasFavorite) {
            newFavorites.add(productId);
          } else {
            newFavorites.delete(productId);
          }
          return newFavorites;
        });
      }
    }
  };

  const toggleCompare = (product: Product) => {
    setCompareList(prev => {
      const exists = prev.find((p: Product) => p.id === product.id);
      let next: Product[];
      if (exists) {
        next = prev.filter((p: Product) => p.id !== product.id);
      } else {
        next = [...prev, product].slice(0, 3);
      }
      try { localStorage.setItem('compareList', JSON.stringify(next)); } catch { }
      return next;
    });
  };

  if (loading) {
    return <LoadingScreen />;
  }

  return (
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
                  addToCart={addToCart}
                  favorites={favorites}
                  toggleFavorite={toggleFavorite}
                  toggleCompare={toggleCompare}
                  compareList={compareList}
                />
              }
            />
            <Route path="/brands" element={<Brands />} />
            <Route path="/brands/:brandName" element={<BrandPage addToCart={addToCart} favorites={favorites} toggleFavorite={toggleFavorite} />} />
            <Route path="/order-success" element={<OrderSuccess />} />
            <Route path="/compare" element={<Compare />} />
            <Route path="/my-orders" element={<ProtectedRoute><MyOrders /></ProtectedRoute>} />
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
            
            {/* Admin Routes */}
            <Route
              path="/admin"
              element={
                <AdminRoute>
                  <AdminDashboard />
                </AdminRoute>
              }
            />
            <Route
              path="/admin/products"
              element={
                <AdminRoute>
                  <AdminProducts />
                </AdminRoute>
              }
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
