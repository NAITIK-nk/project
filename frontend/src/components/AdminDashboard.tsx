import React, { useState, useEffect } from 'react';
import { BarChart3, Package, ShoppingCart, Users, DollarSign, AlertTriangle, TrendingUp } from 'lucide-react';
import { api } from '../utils/api';

interface DashboardStats {
  totalProducts: number;
  totalStoreValue: number;
  totalOrders: number;
  totalUsers: number;
  lowStockProducts: number;
  totalStockQuantity: number;
  totalRevenue: number;
}

const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.get<{ success: boolean; data: DashboardStats }>('/admin/stats');
      if (response.success) {
        setStats(response.data);
      } else {
        setError('Failed to fetch statistics');
      }
    } catch (err: any) {
      console.error('Error fetching stats:', err);
      setError(err.message || 'Failed to fetch statistics');
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <AlertTriangle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={fetchStats}
            className="px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Overview of your store's performance and statistics</p>
        </div>

        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {/* Total Products */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Products</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{stats.totalProducts}</p>
                </div>
                <div className="bg-blue-100 p-3 rounded-full">
                  <Package className="h-8 w-8 text-blue-600" />
                </div>
              </div>
            </div>

            {/* Total Store Value */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Store Value</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{formatCurrency(stats.totalStoreValue)}</p>
                </div>
                <div className="bg-green-100 p-3 rounded-full">
                  <DollarSign className="h-8 w-8 text-green-600" />
                </div>
              </div>
            </div>

            {/* Total Orders */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Orders</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{stats.totalOrders}</p>
                </div>
                <div className="bg-purple-100 p-3 rounded-full">
                  <ShoppingCart className="h-8 w-8 text-purple-600" />
                </div>
              </div>
            </div>

            {/* Total Users */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Users</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{stats.totalUsers}</p>
                </div>
                <div className="bg-orange-100 p-3 rounded-full">
                  <Users className="h-8 w-8 text-orange-600" />
                </div>
              </div>
            </div>

            {/* Low Stock Products */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Low Stock Products</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{stats.lowStockProducts}</p>
                  <p className="text-xs text-gray-500 mt-1">Stock &lt; 10</p>
                </div>
                <div className="bg-red-100 p-3 rounded-full">
                  <AlertTriangle className="h-8 w-8 text-red-600" />
                </div>
              </div>
            </div>

            {/* Total Stock Quantity */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Stock Quantity</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{stats.totalStockQuantity}</p>
                </div>
                <div className="bg-indigo-100 p-3 rounded-full">
                  <BarChart3 className="h-8 w-8 text-indigo-600" />
                </div>
              </div>
            </div>

            {/* Total Revenue */}
            <div className="bg-white rounded-lg shadow-md p-6 md:col-span-2 lg:col-span-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                  <p className="text-4xl font-bold text-gray-900 mt-2">{formatCurrency(stats.totalRevenue)}</p>
                  <p className="text-xs text-gray-500 mt-1">From all completed orders</p>
                </div>
                <div className="bg-yellow-100 p-4 rounded-full">
                  <TrendingUp className="h-10 w-10 text-yellow-600" />
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Quick Actions</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <a
              href="/admin/products"
              className="block p-4 border-2 border-gray-200 rounded-lg hover:border-gray-900 transition-colors text-center"
            >
              <Package className="h-6 w-6 mx-auto mb-2 text-gray-700" />
              <p className="font-medium text-gray-900">Manage Products</p>
              <p className="text-sm text-gray-600 mt-1">Add, edit, or remove products</p>
            </a>
            <button
              onClick={fetchStats}
              className="p-4 border-2 border-gray-200 rounded-lg hover:border-gray-900 transition-colors text-center"
            >
              <BarChart3 className="h-6 w-6 mx-auto mb-2 text-gray-700" />
              <p className="font-medium text-gray-900">Refresh Stats</p>
              <p className="text-sm text-gray-600 mt-1">Update dashboard data</p>
            </button>
            <a
              href="/orders"
              className="block p-4 border-2 border-gray-200 rounded-lg hover:border-gray-900 transition-colors text-center"
            >
              <ShoppingCart className="h-6 w-6 mx-auto mb-2 text-gray-700" />
              <p className="font-medium text-gray-900">View Orders</p>
              <p className="text-sm text-gray-600 mt-1">Manage customer orders</p>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
