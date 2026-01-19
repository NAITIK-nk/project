import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const router = express.Router();

/* ===================== REGISTER ===================== */
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

<<<<<<< HEAD
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Name, email, and password are required' });
    }

    if (password.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters long' });
    }

    const existing = await User.findOne({ email: email.toLowerCase().trim() });
=======
    const existing = await User.findOne({ email });
>>>>>>> 2d2447836291bb1712f79b1df66c3981ea700cf6
    if (existing) {
      return res.status(400).json({ error: 'User already exists' });
    }

<<<<<<< HEAD
    const user = await User.create({ 
      name: name.trim(), 
      email: email.toLowerCase().trim(), 
      password 
    });
=======
    const user = await User.create({ name, email, password });
>>>>>>> 2d2447836291bb1712f79b1df66c3981ea700cf6

    if (!user.role) {
      user.role = 'user';
      await user.save();
    }

    const token = jwt.sign(
<<<<<<< HEAD
      { userId: user._id.toString(), email: user.email, role: user.role },
=======
      { userId: user._id, email: user.email, role: user.role },
>>>>>>> 2d2447836291bb1712f79b1df66c3981ea700cf6
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '7d' }
    );

    const userResponse = {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      role: user.role
    };

    res.json({ token, user: userResponse });
  } catch (err) {
    console.error('[REGISTER] Error:', err);
<<<<<<< HEAD
    if (err.code === 11000) {
      return res.status(400).json({ error: 'User already exists' });
    }
=======
>>>>>>> 2d2447836291bb1712f79b1df66c3981ea700cf6
    res.status(500).json({ error: 'Server error' });
  }
});

/* ===================== LOGIN ===================== */
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

<<<<<<< HEAD
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const user = await User.findOne({ email: email.toLowerCase().trim() });
=======
    const user = await User.findOne({ email });
>>>>>>> 2d2447836291bb1712f79b1df66c3981ea700cf6

    if (!user) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

<<<<<<< HEAD
    // Fix malformed role field if exists
=======
>>>>>>> 2d2447836291bb1712f79b1df66c3981ea700cf6
    if (user[' role ']) {
      user.role = user[' role '];
      delete user[' role '];
      await user.save();
    }

<<<<<<< HEAD
    // Ensure role exists
    if (!user.role || (user.role !== 'user' && user.role !== 'admin')) {
=======
    if (!user.role) {
>>>>>>> 2d2447836291bb1712f79b1df66c3981ea700cf6
      user.role = 'user';
      await user.save();
    }

    const token = jwt.sign(
<<<<<<< HEAD
      { userId: user._id.toString(), email: user.email, role: user.role },
=======
      { userId: user._id, email: user.email, role: user.role },
>>>>>>> 2d2447836291bb1712f79b1df66c3981ea700cf6
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '7d' }
    );

    const userResponse = {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      role: user.role
    };

    res.json({ token, user: userResponse });
  } catch (err) {
    console.error('[LOGIN] Error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
