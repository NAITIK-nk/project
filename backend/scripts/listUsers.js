import dotenv from 'dotenv';
import mongoose from 'mongoose';
import User from '../models/User.js';
import connectDB from '../config/db.js';

dotenv.config();

const listUsers = async () => {
  try {
    // Connect to database
    await connectDB();
    
    // Get all users
    const users = await User.find({}, 'email name role createdAt');
    
    if (users.length === 0) {
      console.log('📭 No users found in database.');
      process.exit(0);
    }

    console.log(`\n📋 Found ${users.length} user(s) in database:\n`);
    console.log('─'.repeat(70));
    
    users.forEach((user, index) => {
      console.log(`\n${index + 1}. Email: ${user.email}`);
      console.log(`   Name: ${user.name || 'N/A'}`);
      console.log(`   Role: ${user.role || 'user'}`);
      console.log(`   ID: ${user._id}`);
      console.log(`   Created: ${user.createdAt}`);
    });
    
    console.log('\n' + '─'.repeat(70));
    console.log('\n💡 To update a user to admin, run:');
    console.log('   npm run update-admin <email>');
    console.log('\n   Example: npm run update-admin admin@gmail.com\n');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error listing users:', error.message);
    process.exit(1);
  }
};

listUsers();
