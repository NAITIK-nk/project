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
    <header className="sticky top-0 z-50 backdrop-blur-lg bg-transparent shadow-lg border border-gray-200/20 rounded-b-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">

          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <Watch className="h-8 w-8 text-black group-hover:text-gray-800 transition-colors drop-shadow-md" />
            <span className="text-2xl font-bold text-black tracking-wider drop-shadow-md">SAMAY</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-6 backdrop-blur-md px-6 py-2 rounded-full shadow-sm border border-gray-200/10">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`relative py-2 px-1 text-sm font-medium transition-colors duration-300 drop-shadow-sm text-outline-white ${
                  isActive(link.path)
                    ? 'text-black font-semibold'
                    : 'text-gray-800 hover:text-black'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Right Actions */}
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="hidden md:flex items-center space-x-3">
                <div className="flex items-center space-x-2 px-4 py-2 rounded-full backdrop-blur-md text-black border border-gray-200/20 shadow-sm">
                  <User className="h-5 w-5 drop-shadow-sm" />
                  <span className="text-sm font-medium drop-shadow-sm">
                    {user?.name || user?.email?.split('@')[0]}
                  </span>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 px-4 py-2 rounded-full backdrop-blur-md text-black hover:text-gray-800 transition-all border border-gray-200/20 shadow-sm hover:shadow-md"
                >
                  <LogOut className="h-5 w-5 drop-shadow-sm" />
                  <span className="text-sm font-medium drop-shadow-sm">Logout</span>
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="hidden md:flex items-center space-x-2 px-4 py-2 rounded-full backdrop-blur-md text-black hover:text-gray-800 transition-all border border-gray-200/20 shadow-sm hover:shadow-md"
              >
                <User className="h-5 w-5 drop-shadow-sm" />
                <span className="text-sm font-medium drop-shadow-sm">Login</span>
              </Link>
            )}

            {/* Cart */}
            <Link
              to="/cart"
              className="relative flex items-center space-x-1 text-black hover:text-gray-800 transition-colors drop-shadow-sm"
            >
              <ShoppingBag className="h-5 w-5 drop-shadow-sm" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-black text-white rounded-full text-xs w-5 h-5 flex items-center justify-center shadow-md">
                  {cartItemsCount}
                </span>
              )}
            </Link>

            {/* Favorites */}
            <Link
              to="/favorites"
              className="relative flex items-center space-x-1 text-black hover:text-gray-800 transition-colors drop-shadow-sm"
            >
              <Heart className="h-5 w-5 drop-shadow-sm" />
              {favoriteItemsCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center shadow-md">
                  {favoriteItemsCount}
                </span>
              )}
            </Link>

            {/* Mobile Toggle */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-md text-black hover:text-gray-800 transition-colors backdrop-blur-sm border border-gray-200/10"
            >
              {isMenuOpen ? <X className="h-6 w-6 drop-shadow-sm" /> : <Menu className="h-6 w-6 drop-shadow-sm" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200/20 backdrop-blur-lg rounded-b-xl">
            <div className="py-4 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block px-3 py-2 text-base font-medium drop-shadow-sm text-outline-white ${
                    isActive(link.path)
                      ? 'text-black bg-black/10 font-semibold'
                      : 'text-gray-800 hover:text-black hover:bg-gray-500/5'
                  }`}
                >
                  {link.name}
                </Link>
              ))}

              {/* Auth in mobile */}
              {isAuthenticated ? (
                <>
                  <div className="px-3 py-2 text-base font-medium text-gray-800 border-b border-gray-200/20 drop-shadow-sm text-outline-white">
                    <div className="flex items-center space-x-2">
                      <User className="h-5 w-5" />
                      <span>{user?.name || user?.email?.split('@')[0]}</span>
                    </div>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-3 py-2 text-base font-medium text-gray-800 hover:text-black hover:bg-gray-500/5 rounded-md transition-colors drop-shadow-sm text-outline-white"
                  >
                    <div className="flex items-center space-x-2">
                      <LogOut className="h-5 w-5" />
                      <span>Logout</span>
                    </div>
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="block px-3 py-2 text-base font-medium text-gray-800 hover:text-black hover:bg-gray-500/5 rounded-md transition-colors drop-shadow-sm text-outline-white"
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
