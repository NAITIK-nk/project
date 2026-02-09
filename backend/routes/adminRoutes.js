import express from 'express';
import Product from '../models/Product.js';
import Order from '../models/Order.js';
import User from '../models/User.js';
import { requireAdmin } from '../middleware/adminAuth.js';

const router = express.Router();

// All admin routes require admin authentication
router.use(requireAdmin);

// GET /api/admin/stats - Get dashboard statistics
router.get('/stats', async (req, res) => {
  try {
    // Get total products count
    const totalProducts = await Product.countDocuments();
    
    // Calculate total store value (sum of all products' price * stock)
    const products = await Product.find({}, 'price stock');
    const totalStoreValue = products.reduce((sum, product) => {
      return sum + (product.price * (product.stock || 0));
    }, 0);
    
    // Get total orders count
    const totalOrders = await Order.countDocuments();
    
    // Get total users count
    const totalUsers = await User.countDocuments();
    
    // Get low stock products (stock < 10)
    const lowStockProducts = await Product.countDocuments({ stock: { $lt: 10 } });
    
    // Get total products in stock (sum of all stock)
    const totalStockQuantity = products.reduce((sum, product) => {
      return sum + (product.stock || 0);
    }, 0);
    
    // Get revenue from orders (sum of all order totals)
    const orders = await Order.find({}, 'totalAmount');
    const totalRevenue = orders.reduce((sum, order) => {
      return sum + (order.totalAmount || 0);
    }, 0);

    res.status(200).json({
      success: true,
      data: {
        totalProducts,
        totalStoreValue,
        totalOrders,
        totalUsers,
        lowStockProducts,
        totalStockQuantity,
        totalRevenue
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

export default router;
