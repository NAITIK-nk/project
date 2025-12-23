import { Request, Response } from "express";
import UserModel from "../models/user.model";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

const JWT_SECRET = process.env.JWT_SECRET || "change_this_secret";

export const register = async (req: Request, res: Response) => {
  try {
    const { email, password, name } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    // Email format validation
    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "Please provide a valid email address" });
    }

    // Password length validation
    if (password.length < 6) {
      return res.status(400).json({ error: "Password must be at least 6 characters long" });
    }

    // Check if user already exists
    const existing = await UserModel.findOne({ email: email.toLowerCase() });
    if (existing) {
      return res.status(409).json({ error: "User with this email already exists" });
    }

    // Hash password
    const hashed = await bcrypt.hash(password, 10);

    // Create user
    const user = await UserModel.create({ 
      email: email.toLowerCase().trim(), 
      password: hashed, 
      name: name?.trim() 
    });

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "7d" });

    // Return user data (without password) and token
    return res.status(201).json({ 
      user: { 
        id: user._id, 
        email: user.email, 
        name: user.name 
      }, 
      token,
      message: "User registered successfully"
    });
  } catch (err: any) {
    console.error("Registration error:", err);
    console.error("Error details:", {
      message: err.message,
      name: err.name,
      code: err.code,
      stack: err.stack
    });
    
    // Handle MongoDB duplicate key error
    if (err.code === 11000) {
      return res.status(409).json({ error: "User with this email already exists" });
    }
    
    // Handle validation errors
    if (err.name === 'ValidationError') {
      const errors = Object.values(err.errors).map((e: any) => e.message);
      return res.status(400).json({ error: errors[0] || "Validation error" });
    }
    
    // Handle MongoDB connection errors
    if (err.name === 'MongoServerError' || err.name === 'MongoNetworkError' || err.name === 'MongooseError') {
      console.error("MongoDB connection issue:", err);
      console.error("MongoDB connection state:", mongoose.connection.readyState);
      return res.status(500).json({ 
        error: "Database connection error. Please make sure MongoDB is running.",
        details: process.env.NODE_ENV === 'development' ? err.message : undefined
      });
    }
    
    // Return detailed error in development, generic in production
    const errorMessage = process.env.NODE_ENV === 'development' 
      ? err.message || "Server error. Please try again later."
      : "Server error. Please try again later.";
    
    return res.status(500).json({ 
      error: errorMessage,
      ...(process.env.NODE_ENV === 'development' && { details: err.message })
    });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    
    // Validation
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    // Find user by email (case insensitive)
    const user = await UserModel.findOne({ email: email.toLowerCase().trim() });
    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // Compare password
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "7d" });
    
    return res.json({ 
      user: { 
        id: user._id, 
        email: user.email, 
        name: user.name 
      }, 
      token,
      message: "Login successful"
    });
  } catch (err: any) {
    console.error("Login error:", err);
    return res.status(500).json({ error: "Server error. Please try again later." });
  }
};