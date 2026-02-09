import express from 'express';
import Cart from '../models/Cart.js';
import { optionalAuth } from '../middleware/auth.js';
import mongoose from 'mongoose';

const router = express.Router();

// GET /api/carts/user/:userId - Get cart for a specific user
router.get('/user/:userId', optionalAuth, async (req, res) => {
  try {
    const { userId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid user ID format'
      });
    }

    let cart = await Cart.findOne({ userId }).populate('items.productId');
    
    if (!cart) {
      cart = new Cart({
        userId,
        items: [],
        totalAmount: 0
      });
      await cart.save();
    }

    res.status(200).json({
      success: true,
      data: cart
    });
  } catch (error) {
    console.error('[GET /api/carts/user/:userId] Error:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// GET /api/carts - Get all carts (admin only, optional)
router.get('/', async (req, res) => {
  try {
    const carts = await Cart.find().populate('userId', 'name email').populate('items.productId');
    res.status(200).json({
      success: true,
      count: carts.length,
      data: carts
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// GET /api/carts/:id - Get cart by ID
router.get('/:id', async (req, res) => {
  try {
    const cart = await Cart.findById(req.params.id).populate('userId', 'name email').populate('items.productId');
    if (!cart) {
      return res.status(404).json({
        success: false,
        message: 'Cart not found'
      });
    }
    res.status(200).json({
      success: true,
      data: cart
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// POST /api/carts/add - Add item to cart (or increment quantity if exists)
router.post('/add', optionalAuth, async (req, res) => {
  try {
    const { userId, productId, name, price, image, quantity = 1 } = req.body;
<<<<<<< HEAD

=======
    
>>>>>>> 2d2447836291bb1712f79b1df66c3981ea700cf6
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: 'userId is required'
      });
    }

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid userId format'
      });
    }

    let cart = await Cart.findOne({ userId });
    
    if (!cart) {
      cart = new Cart({
        userId,
        items: [],
        totalAmount: 0
      });
    }

    const existingItemIndex = cart.items.findIndex(
      item => {
        const itemProductId = item.productId?.toString() || String(item.productId);
        const searchProductId = String(productId);
        return itemProductId === searchProductId;
      }
    );

    if (existingItemIndex >= 0) {
      cart.items[existingItemIndex].quantity += quantity;
    } else {
      cart.items.push({
        productId: String(productId),
        name,
        price,
        image,
        quantity
      });
    }

    cart.totalAmount = cart.items.reduce((total, item) => total + (item.price * item.quantity), 0);

    const savedCart = await cart.save();

    res.status(200).json({
      success: true,
      data: savedCart,
      message: existingItemIndex >= 0 ? 'Cart item quantity updated' : 'Item added to cart'
    });
  } catch (error) {
    console.error('[POST /api/carts/add] Error:', error);
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
});

// PUT /api/carts/update - Update cart item quantity
router.put('/update', optionalAuth, async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;
<<<<<<< HEAD

=======
    
>>>>>>> 2d2447836291bb1712f79b1df66c3981ea700cf6
    if (!userId || !productId || quantity === undefined) {
      return res.status(400).json({
        success: false,
        message: 'userId, productId, and quantity are required'
      });
    }

    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({
        success: false,
        message: 'Cart not found'
      });
    }

    const itemIndex = cart.items.findIndex(
      item => {
        const itemProductId = item.productId?.toString() || String(item.productId);
        const searchProductId = String(productId);
        return itemProductId === searchProductId;
      }
    );

    if (itemIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Item not found in cart'
      });
    }

    if (quantity <= 0) {
      cart.items.splice(itemIndex, 1);
    } else {
      cart.items[itemIndex].quantity = quantity;
    }

    cart.totalAmount = cart.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    const savedCart = await cart.save();

    res.status(200).json({
      success: true,
      data: savedCart
    });
  } catch (error) {
    console.error('[PUT /api/carts/update] Error:', error);
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
});

// POST /api/carts/remove - Remove item from cart
router.post('/remove', optionalAuth, async (req, res) => {
  try {
    const { userId, productId } = req.body;
<<<<<<< HEAD

=======
    
>>>>>>> 2d2447836291bb1712f79b1df66c3981ea700cf6
    if (!userId || !productId) {
      return res.status(400).json({
        success: false,
        message: 'userId and productId are required'
      });
    }

    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({
        success: false,
        message: 'Cart not found'
      });
    }

    cart.items = cart.items.filter(
      item => {
        const itemProductId = item.productId?.toString() || String(item.productId);
        const searchProductId = String(productId);
        return itemProductId !== searchProductId;
      }
    );

    cart.totalAmount = cart.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    const savedCart = await cart.save();

    res.status(200).json({
      success: true,
      data: savedCart,
      message: 'Item removed from cart'
    });
  } catch (error) {
    console.error('[DELETE /api/carts/remove] Error:', error);
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
});

// POST /api/carts - Create new cart
router.post('/', optionalAuth, async (req, res) => {
  try {
    const cart = new Cart(req.body);
    const savedCart = await cart.save();
    res.status(201).json({
      success: true,
      data: savedCart
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
});

// DELETE /api/carts/:id - Delete cart
router.delete('/:id', async (req, res) => {
  try {
    const cart = await Cart.findByIdAndDelete(req.params.id);
    if (!cart) {
      return res.status(404).json({
        success: false,
        message: 'Cart not found'
      });
    }
    res.status(200).json({
      success: true,
      message: 'Cart deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

export default router;
