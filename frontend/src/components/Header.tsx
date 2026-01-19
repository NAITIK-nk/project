import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, ShoppingBag, User, Watch, Heart, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface HeaderProps {
  cartItemsCount: number;
  favoriteItemsCount: number;
}

const Header: React.FC<HeaderProps> = ({ cartItemsCount, favoriteItemsCount }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMenuOpen(false);
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Products', path: '/products' },
    { name: 'Brands', path: '/brands' },
    { name: 'Services', path: '/services' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/10 border-b border-white/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex justify-between items-center py-4">

          {/* LOGO */}
          <Link to="/" className="flex items-center space-x-2 auto-contrast">
            <Watch className="h-8 w-8" />
            <span className="text-2xl font-bold tracking-wider">
              SAMAY
            </span>
          </Link>

          {/* DESKTOP NAV */}
          <nav className="hidden md:flex space-x-6 px-6 py-2 rounded-full backdrop-blur-md bg-white/5 border border-white/10 auto-contrast">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-sm font-medium transition ${
                  isActive(link.path) ? 'font-semibold' : ''
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* RIGHT ACTIONS */}
          <div className="flex items-center space-x-4 auto-contrast">

            {isAuthenticated ? (
              <>
                <div className="hidden md:flex items-center space-x-2 px-4 py-2 rounded-full backdrop-blur-md bg-white/5 border border-white/10">
                  <User className="h-5 w-5" />
                  <span className="text-sm">
                    {user?.name || user?.email?.split('@')[0]}
                  </span>
                </div>

                <button
                  onClick={handleLogout}
                  className="hidden md:flex items-center space-x-2 px-4 py-2 rounded-full backdrop-blur-md bg-white/5 border border-white/10"
                >
                  <LogOut className="h-5 w-5" />
                  <span className="text-sm">Logout</span>
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="hidden md:flex items-center space-x-2 px-4 py-2 rounded-full backdrop-blur-md bg-white/5 border border-white/10"
              >
                <User className="h-5 w-5" />
                <span className="text-sm">Login</span>
              </Link>
            )}

            {/* CART */}
            <Link to="/cart" className="relative">
              <ShoppingBag className="h-5 w-5" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-black text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {cartItemsCount}
                </span>
              )}
            </Link>

            {/* FAVORITES */}
            <Link to="/favorites" className="relative">
              <Heart className="h-5 w-5" />
              {favoriteItemsCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {favoriteItemsCount}
                </span>
              )}
            </Link>

            {/* MOBILE MENU */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-md backdrop-blur-md bg-white/5 border border-white/10"
            >
              {isMenuOpen ? <X /> : <Menu />}
            </button>

          </div>
        </div>

        {/* MOBILE NAV */}
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-2 auto-contrast">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsMenuOpen(false)}
                className="block px-3 py-2"
              >
                {link.name}
              </Link>
            ))}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
