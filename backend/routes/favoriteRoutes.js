import express from 'express';
import Favorite from '../models/Favorite.js';
import { optionalAuth } from '../middleware/auth.js';
import mongoose from 'mongoose';

const router = express.Router();

// GET /api/favorites/user/:userId - Get favorites for a specific user
router.get('/user/:userId', optionalAuth, async (req, res) => {
  try {
    const { userId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid user ID format'
      });
    }

    const favorites = await Favorite.find({ userId: new mongoose.Types.ObjectId(userId) });
    
    res.status(200).json({
      success: true,
      count: favorites.length,
      data: favorites
    });
  } catch (error) {
    console.error('[GET /api/favorites/user/:userId] Error:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// GET /api/favorites - Get all favorites (admin only, optional)
router.get('/', async (req, res) => {
  try {
    const favorites = await Favorite.find().populate('userId', 'name email').populate('productId');
    res.status(200).json({
      success: true,
      count: favorites.length,
      data: favorites
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// GET /api/favorites/:id - Get favorite by ID
router.get('/:id', async (req, res) => {
  try {
    const favorite = await Favorite.findById(req.params.id).populate('userId', 'name email').populate('productId');
    if (!favorite) {
      return res.status(404).json({
        success: false,
        message: 'Favorite not found'
      });
    }
    res.status(200).json({
      success: true,
      data: favorite
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// POST /api/favorites/toggle - Toggle favorite (add if not exists, remove if exists)
router.post('/toggle', optionalAuth, async (req, res) => {
  const userIdFromToken = req.userId;
<<<<<<< HEAD
    const { userId: userIdFromBody, productId } = req.body;
    
=======
  const { userId: userIdFromBody, productId } = req.body;
  
>>>>>>> 2d2447836291bb1712f79b1df66c3981ea700cf6
  try {
    const userId = userIdFromToken || userIdFromBody;

    if (!userId || !productId) {
      return res.status(400).json({
        success: false,
        message: 'userId and productId are required'
      });
    }

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid userId format'
      });
    }

    const normalizedProductId = String(productId);
<<<<<<< HEAD
    
=======

>>>>>>> 2d2447836291bb1712f79b1df66c3981ea700cf6
    const existingFavorite = await Favorite.findOne({ 
      userId: new mongoose.Types.ObjectId(userId), 
      productId: normalizedProductId
    });
    
    if (existingFavorite) {
      await Favorite.findByIdAndDelete(existingFavorite._id);
      return res.status(200).json({
        success: true,
        data: null,
        message: 'Favorite removed',
        isFavorite: false
      });
    } else {
      const favorite = new Favorite({
        userId: new mongoose.Types.ObjectId(userId),
        productId: normalizedProductId
      });
      
      const doubleCheck = await Favorite.findOne({ 
        userId: new mongoose.Types.ObjectId(userId), 
        productId: normalizedProductId
      });
      
      if (doubleCheck) {
        await Favorite.findByIdAndDelete(doubleCheck._id);
        return res.status(200).json({
          success: true,
          data: null,
          message: 'Favorite removed',
          isFavorite: false
        });
      }
      
      const savedFavorite = await favorite.save();
      
      return res.status(201).json({
        success: true,
        data: savedFavorite,
        message: 'Favorite added',
        isFavorite: true
      });
    }
  } catch (error) {
    if (error.code === 11000) {
      try {
        const finalUserId = userIdFromToken || userIdFromBody;
        const normalizedProductId = productId ? String(productId) : null;
        
        if (!finalUserId || !normalizedProductId) {
          return res.status(400).json({
            success: false,
            message: 'Missing userId or productId'
          });
        }
        
        const existing = await Favorite.findOneAndDelete({
          userId: new mongoose.Types.ObjectId(finalUserId),
          productId: normalizedProductId
        });
        
        if (existing) {
          return res.status(200).json({
            success: true,
            data: null,
            message: 'Favorite removed (was duplicate)',
            isFavorite: false
          });
        } else {
          return res.status(200).json({
            success: true,
            data: null,
            message: 'Favorite already exists (removed)',
            isFavorite: false
          });
        }
      } catch (findError) {
        console.error('[POST /api/favorites/toggle] Error handling duplicate:', findError);
        return res.status(400).json({
          success: false,
          message: 'Product already in favorites',
          error: 'DUPLICATE_ENTRY',
          details: error.keyValue
        });
      }
    }
    
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        error: 'VALIDATION_ERROR',
        details: error.errors
      });
    }
    
    console.error('[POST /api/favorites/toggle] Error:', error);
    return res.status(400).json({
      success: false,
      message: error.message || 'Failed to toggle favorite',
      error: 'UNKNOWN_ERROR'
    });
  }
});

// POST /api/favorites - Add favorite
router.post('/', optionalAuth, async (req, res) => {
  try {
    const { userId, productId } = req.body;

    if (!userId || !productId) {
      return res.status(400).json({
        success: false,
        message: 'userId and productId are required'
      });
    }

    const existing = await Favorite.findOne({ 
      userId: new mongoose.Types.ObjectId(userId), 
      productId: String(productId) 
    });
    if (existing) {
      return res.status(200).json({
        success: true,
        data: existing,
        message: 'Product already in favorites'
      });
    }

    const favorite = new Favorite({ 
      userId: new mongoose.Types.ObjectId(userId), 
      productId: String(productId) 
    });
    const savedFavorite = await favorite.save();
    
    res.status(201).json({
      success: true,
      data: savedFavorite
    });
  } catch (error) {
    console.error('[POST /api/favorites] Error:', error);
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'Product already in favorites'
      });
    }
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
});

// POST /api/favorites/remove - Remove favorite by userId and productId
router.post('/remove', optionalAuth, async (req, res) => {
  try {
    const { userId, productId } = req.body;

    if (!userId || !productId) {
      return res.status(400).json({
        success: false,
        message: 'userId and productId are required'
      });
    }

    const favorite = await Favorite.findOneAndDelete({ 
      userId: new mongoose.Types.ObjectId(userId), 
      productId: String(productId) 
    });
    if (!favorite) {
      return res.status(404).json({
        success: false,
        message: 'Favorite not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Favorite removed successfully'
    });
  } catch (error) {
    console.error('[DELETE /api/favorites/remove] Error:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// DELETE /api/favorites/:id - Delete favorite by ID
router.delete('/:id', async (req, res) => {
  try {
    const favorite = await Favorite.findByIdAndDelete(req.params.id);
    if (!favorite) {
      return res.status(404).json({
        success: false,
        message: 'Favorite not found'
      });
    }
    res.status(200).json({
      success: true,
      message: 'Favorite deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

export default router;
