import jwt from 'jsonwebtoken';
import User from '../models/User.js';

// Middleware to verify JWT token and attach user to request
export const authenticate = async (req, res, next) => {
  try {
    // Get token from header
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'No token provided or invalid format'
      });
    }

    const token = authHeader.substring(7); // Remove 'Bearer ' prefix

    // For demo token, we'll extract userId from request body or query if available
    // In production, you'd verify the JWT token here
<<<<<<< HEAD
    if (token === 'demo-token') {
      req.userId = req.body.userId || req.query.userId;
      
      if (!req.userId) {
        return res.status(401).json({
          success: false,
          message: 'User ID required. Please ensure userId is included in request.'
        });
      }

      const user = await User.findById(req.userId);
      if (!user) {
        return res.status(401).json({
          success: false,
          message: 'User not found'
        });
      }

      req.user = user;
      return next();
    }
=======
      if (token === 'demo-token') {
        req.userId = req.body.userId || req.query.userId;
        
        if (!req.userId) {
          return res.status(401).json({
            success: false,
            message: 'User ID required. Please ensure userId is included in request.'
          });
        }

        const user = await User.findById(req.userId);
        if (!user) {
          return res.status(401).json({
            success: false,
            message: 'User not found'
          });
        }

        req.user = user;
        return next();
      }
>>>>>>> 2d2447836291bb1712f79b1df66c3981ea700cf6
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
      req.userId = decoded.userId || decoded.id;
      
      const user = await User.findById(req.userId);
      if (!user) {
        return res.status(401).json({
          success: false,
          message: 'User not found'
        });
      }

      req.user = user;
      next();
    } catch (jwtError) {
      return res.status(401).json({
        success: false,
        message: 'Invalid or expired token'
      });
    }
  } catch (error) {
    console.error('Auth middleware error:', error);
    return res.status(500).json({
      success: false,
      message: 'Authentication error'
    });
  }
};

// Optional: Middleware that doesn't require auth but extracts userId if token exists
export const optionalAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.substring(7);
      
      if (token === 'demo-token') {
        req.userId = req.body.userId || req.query.userId;
        if (req.userId) {
          const user = await User.findById(req.userId);
          if (user) {
            req.user = user;
          }
        }
      } else {
        try {
          const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
          req.userId = decoded.userId || decoded.id;
          const user = await User.findById(req.userId);
          if (user) {
            req.user = user;
          }
        } catch (jwtError) {
          // Token invalid, but continue without auth
        }
      }
    }
    
    next();
  } catch (error) {
    console.error('[optionalAuth] Error in optionalAuth middleware:', error);
    next();
  }
};
