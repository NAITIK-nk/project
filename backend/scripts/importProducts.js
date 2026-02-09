import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from '../models/Product.js';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/samay';

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('MongoDB Connected');
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    process.exit(1);
  }
};

const importProducts = async () => {
  try {
    await connectDB();

    // Read watches.json file
    const watchesPath = join(__dirname, '../../frontend/src/data/watches.json');
    const watchesData = JSON.parse(readFileSync(watchesPath, 'utf-8'));

    let importedCount = 0;
    let skippedCount = 0;

    for (const brandBlock of watchesData) {
      for (const watch of brandBlock.watches) {
        // Check if product already exists (by name and brand)
        const existing = await Product.findOne({
          name: watch.name,
          brand: brandBlock.brand
        });

        if (existing) {
          console.log(`⏭️  Skipped: ${watch.name} (${brandBlock.brand}) - already exists`);
          skippedCount++;
          continue;
        }

        // Create product in database
        const product = new Product({
          name: watch.name,
          price: watch.price,
          originalPrice: watch.originalPrice,
          image: watch.image,
          category: watch.category,
          brand: brandBlock.brand,
          gender: watch.gender,
          isOnSale: watch.isOnSale || false,
          stock: 50, // Default stock
          description: `${watch.name} by ${brandBlock.brand} - ${watch.category} watch for ${watch.gender}`
        });

        await product.save();
        console.log(`✅ Imported: ${watch.name} (${brandBlock.brand})`);
        importedCount++;
      }
    }

    console.log('\n📊 Import Summary:');
    console.log(`✅ Imported: ${importedCount} products`);
    console.log(`⏭️  Skipped: ${skippedCount} products (already exist)`);
    console.log(`📦 Total in database: ${await Product.countDocuments()} products`);

    process.exit(0);
  } catch (error) {
    console.error('❌ Error importing products:', error);
    process.exit(1);
  }
};

importProducts();
