import mongoose from 'mongoose';

const favoriteSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  productId: {
    type: String, // Store as string to handle numeric IDs from frontend reliably
    required: true
  }
}, {
  timestamps: true,
  collection: 'favorites'
});

// Composite unique index: one user can have many favorites, but each (userId, productId) pair is unique
// Drop existing index if it exists and recreate to ensure it works with String type
favoriteSchema.index({ userId: 1, productId: 1 }, { 
  unique: true,
  name: 'userId_productId_unique'
});

const Favorite = mongoose.model('Favorite', favoriteSchema);

// Ensure index is properly created on model initialization
Favorite.collection.createIndex({ userId: 1, productId: 1 }, { 
  unique: true,
  name: 'userId_productId_unique',
  background: true 
}).catch(err => {
  // If index already exists, that's fine
  if (err.code !== 85 && err.code !== 86) { // 85 = IndexOptionsConflict, 86 = IndexKeySpecsConflict
    console.warn('[Favorite Model] Index creation warning:', err.message);
  }
});

export default Favorite;
