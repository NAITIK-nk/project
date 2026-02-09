import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Favorite from '../models/Favorite.js';
import connectDB from '../config/db.js';

dotenv.config();

const fixFavoriteIndexes = async () => {
  try {
    // Connect to database
    await connectDB();
    
    console.log('🔧 Fixing Favorite collection indexes...\n');
    
    const collection = mongoose.connection.db.collection('favorites');
    
    // Get all indexes
    const indexes = await collection.indexes();
    console.log('Current indexes:', indexes.map(idx => ({ name: idx.name, keys: idx.key })));
    
    // Drop any old indexes with 'user' field
    const indexesToDrop = indexes.filter(idx => 
      idx.key && (idx.key.user || idx.name === 'user_1' || idx.name === 'user_-1')
    );
    
    if (indexesToDrop.length > 0) {
      console.log('\n⚠️  Found old indexes with "user" field:');
      indexesToDrop.forEach(idx => {
        console.log(`  - ${idx.name}: ${JSON.stringify(idx.key)}`);
      });
      
      for (const idx of indexesToDrop) {
        try {
          await collection.dropIndex(idx.name);
          console.log(`✅ Dropped index: ${idx.name}`);
        } catch (err) {
          console.warn(`⚠️  Could not drop index ${idx.name}:`, err.message);
        }
      }
    } else {
      console.log('\n✅ No old indexes with "user" field found');
    }
    
    // Ensure correct index exists
    try {
      await collection.createIndex({ userId: 1, productId: 1 }, { 
        unique: true,
        name: 'userId_productId_unique'
      });
      console.log('✅ Created/found correct index: userId_productId_unique');
    } catch (err) {
      if (err.code === 85 || err.code === 86) {
        console.log('✅ Correct index already exists');
      } else {
        console.warn('⚠️  Index creation issue:', err.message);
      }
    }
    
    // Remove any documents with null userId (if any exist)
    const deleted = await collection.deleteMany({ userId: null });
    if (deleted.deletedCount > 0) {
      console.log(`\n🗑️  Removed ${deleted.deletedCount} documents with null userId`);
    }
    
    console.log('\n✅ Index fix complete!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error fixing indexes:', error.message);
    process.exit(1);
  }
};

fixFavoriteIndexes();
