  /* eslint-disable react-refresh/only-export-components */
  import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

  interface User {
    id: string;
    email: string;
    name?: string;
    role?: 'user' | 'admin';
  }

  interface AuthContextType {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    isAdmin: boolean;
    login: (email: string, password: string) => Promise<void>;
    register: (email: string, password: string, name: string) => Promise<void>;
    logout: () => void;
    loading: boolean;
  }

  const AuthContext = createContext<AuthContextType | undefined>(undefined);

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

  export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    // Load user and token from localStorage on mount
    useEffect(() => {
      const storedToken = localStorage.getItem('token');
      const storedUser = localStorage.getItem('user');

      if (storedToken && storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser);
          setToken(storedToken);
          setUser(parsedUser);
        } catch (error) {
          console.error('[AuthContext] Error parsing stored user:', error);
          localStorage.removeItem('token');
          localStorage.removeItem('user');
        }
      }
      setLoading(false);
    }, []);

    const login = async (email: string, password: string) => {
      try {
        const response = await fetch(`${API_URL}/auth/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        });

        const text = await response.text();
        let data;
        try {
          data = JSON.parse(text);
        } catch {
          throw new Error(`Server error: ${text || response.statusText}`);
        }

        if (!response.ok) {
          throw new Error(data.error || `Login failed: ${response.status} ${response.statusText}`);
        }

        if (!data.user || !data.user.role) {
          data.user = { ...data.user, role: 'user' };
        }

        setToken(data.token);
        setUser(data.user);
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        
        localStorage.removeItem('cartItems');
        localStorage.removeItem('favorites');
      } catch (error: unknown) {
        console.error('Login error:', error);
        if (error instanceof Error) {
          throw new Error(error.message || 'Login failed. Please check your connection and try again.');
        }
        throw new Error('Login failed. Please check your connection and try again.');
      }
    };

    const register = async (email: string, password: string, name: string) => {
      try {
        const response = await fetch(`${API_URL}/auth/register`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password, name }),
        });

        const text = await response.text();
        let data;
        try {
          data = JSON.parse(text);
        } catch {
          throw new Error(`Server error: ${text || response.statusText}`);
        }

        if (!response.ok) {
          throw new Error(data.error || `Registration failed: ${response.status} ${response.statusText}`);
        }

        if (!data.user || !data.user.role) {
          data.user = { ...data.user, role: 'user' };
        }

        setToken(data.token);
        setUser(data.user);
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        
        localStorage.removeItem('cartItems');
        localStorage.removeItem('favorites');
      } catch (error: unknown) {
        console.error('Registration error:', error);
        if (error instanceof Error) {
          throw new Error(error.message || 'Registration failed. Please check your connection and try again.');
        }
        throw new Error('Registration failed. Please check your connection and try again.');
      }
    };

    const logout = () => {
      setUser(null);
      setToken(null);
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('cartItems');
      localStorage.removeItem('favorites');
    };

    const calculateIsAdmin = () => {
      if (user?.role === 'admin') return true;
      
      try {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          const parsed = JSON.parse(storedUser);
          return parsed?.role === 'admin';
        }
      } catch (e) {
        console.error('[AuthContext] Error checking localStorage for admin:', e);
      }
      
      return false;
    };

    const isAdminValue = calculateIsAdmin();

    const value: AuthContextType = {
      user,
      token,
      isAuthenticated: !!token && !!user,
      isAdmin: isAdminValue,
      login,
      register,
      logout,
      loading,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
  };

  export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
      throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
  };

