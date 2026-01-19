import dotenv from 'dotenv';
import mongoose from 'mongoose';
import User from '../models/User.js';
import connectDB from '../config/db.js';

dotenv.config();

const createAdmin = async () => {
  try {
    // Connect to database
    await connectDB();
    
    const email = process.argv[2] || 'admin@samay.com';
    const password = process.argv[3] || 'admin123';
    const name = process.argv[4] || 'Admin User';

    // Check if admin already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      if (existingUser.role === 'admin') {
        console.log(`✅ Admin user with email "${email}" already exists!`);
        process.exit(0);
      } else {
        // Update existing user to admin
        existingUser.role = 'admin';
        existingUser.password = password; // Will be hashed by pre-save hook
        await existingUser.save();
        console.log(`✅ Updated existing user "${email}" to admin role!`);
        console.log(`📧 Email: ${email}`);
        console.log(`🔑 Password: ${password}`);
        process.exit(0);
      }
    }

    // Create new admin user
    const admin = await User.create({
      name,
      email,
      password,
      role: 'admin'
    });

    console.log('✅ Admin user created successfully!');
    console.log(`📧 Email: ${email}`);
    console.log(`🔑 Password: ${password}`);
    console.log(`👤 Name: ${name}`);
    console.log(`🆔 User ID: ${admin._id}`);
    console.log('\n💡 You can now login with these credentials at /login');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error creating admin user:', error.message);
    process.exit(1);
  }
};

createAdmin();
