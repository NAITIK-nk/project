import dotenv from 'dotenv';
import mongoose from 'mongoose';
import User from '../models/User.js';
import connectDB from '../config/db.js';

dotenv.config();

const updateUserToAdmin = async () => {
  try {
    // Connect to database
    await connectDB();
    
    const email = process.argv[2];
    
    if (!email) {
      console.error('❌ Please provide an email address');
      console.log('Usage: node scripts/updateUserToAdmin.js <email>');
      process.exit(1);
    }

    // Find and update user
    const user = await User.findOne({ email });
    
    if (!user) {
      console.error(`❌ User with email "${email}" not found!`);
      process.exit(1);
    }

    if (user.role === 'admin') {
      console.log(`✅ User "${email}" is already an admin!`);
      console.log('Please logout and login again to refresh your session.');
      process.exit(0);
    }

    // Update user to admin
    user.role = 'admin';
    await user.save();

    console.log(`✅ Successfully updated user "${email}" to admin role!`);
    console.log(`📧 Email: ${email}`);
    console.log(`👤 Name: ${user.name}`);
    console.log(`🆔 User ID: ${user._id}`);
    console.log('\n⚠️  IMPORTANT: You must logout and login again in the frontend!');
    console.log('The role will only be available after you login again.');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error updating user:', error.message);
    process.exit(1);
  }
};

updateUserToAdmin();
