import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const router = express.Router();

/* ===================== REGISTER ===================== */
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Name, email, and password are required' });
    }

    if (password.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters long' });
    }

    const existing = await User.findOne({ email: email.toLowerCase().trim() });
    if (existing) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const user = await User.create({ 
      name: name.trim(), 
      email: email.toLowerCase().trim(), 
      password 
    });

    if (!user.role) {
      user.role = 'user';
      await user.save();
    }

    const token = jwt.sign(
      { userId: user._id.toString(), email: user.email, role: user.role },
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
    if (err.code === 11000) {
      return res.status(400).json({ error: 'User already exists' });
    }
    res.status(500).json({ error: 'Server error' });
  }
});

/* ===================== LOGIN ===================== */
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const user = await User.findOne({ email: email.toLowerCase().trim() });

    if (!user) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    // Fix malformed role field if exists
    if (user[' role ']) {
      user.role = user[' role '];
      delete user[' role '];
      await user.save();
    }

    // Ensure role exists
    if (!user.role || (user.role !== 'user' && user.role !== 'admin')) {
      user.role = 'user';
      await user.save();
    }

    const token = jwt.sign(
      { userId: user._id.toString(), email: user.email, role: user.role },
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
