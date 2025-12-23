import dotenv from "dotenv";
dotenv.config();

import { connectDB } from "../db";
import ProductModel from "../models/product.model";

const products = [
  {
    name: 'SAMAY Prestige Gold',
    price: 12500,
    originalPrice: 15000,
    image: 'https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Luxury',
    brand: 'SAMAY',
    gender: 'Men',
    isOnSale: true,
    description: 'Elegant gold timepiece with premium craftsmanship',
    stock: 10,
  },
  {
    name: 'SAMAY Classic Steel',
    price: 8900,
    image: 'https://images.pexels.com/photos/277390/pexels-photo-277390.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Classic',
    brand: 'SAMAY',
    gender: 'Men',
    description: 'Timeless steel design for the modern gentleman',
    stock: 15,
  },
  {
    name: 'SAMAY Midnight Black',
    price: 15000,
    image: 'https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Sport',
    brand: 'SAMAY',
    gender: 'Women',
    description: 'Sleek black sport watch for active lifestyles',
    stock: 8,
  },
  {
    name: 'SAMAY Diamond Elite',
    price: 25000,
    image: 'https://images.pexels.com/photos/1697215/pexels-photo-1697215.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Luxury',
    brand: 'SAMAY',
    gender: 'Women',
    description: 'Ultra-luxury timepiece with diamond accents',
    stock: 5,
  },
  {
    name: 'SAMAY Ocean Blue',
    price: 11500,
    originalPrice: 13000,
    image: 'https://images.pexels.com/photos/1034063/pexels-photo-1034063.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Sport',
    brand: 'SAMAY',
    gender: 'Men',
    isOnSale: true,
    description: 'Vibrant blue sport watch inspired by the ocean',
    stock: 12,
  },
  {
    name: 'SAMAY Rose Gold Heritage',
    price: 18900,
    image: 'https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Classic',
    brand: 'SAMAY',
    gender: 'Women',
    description: 'Heritage collection with rose gold finish',
    stock: 7,
  },
  {
    name: 'SAMAY Titanium Pro',
    price: 22000,
    image: 'https://images.pexels.com/photos/125779/pexels-photo-125779.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Sport',
    brand: 'SAMAY',
    gender: 'Men',
    description: 'Lightweight titanium construction for professionals',
    stock: 9,
  },
  {
    name: 'SAMAY Vintage Collection',
    price: 9500,
    image: 'https://images.pexels.com/photos/1034064/pexels-photo-1034064.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Classic',
    brand: 'SAMAY',
    gender: 'Women',
    description: 'Vintage-inspired design with modern reliability',
    stock: 11,
  },
];

const seedProducts = async () => {
  try {
    await connectDB();
    
    // Clear existing products
    await ProductModel.deleteMany({});
    console.log("🗑️  Cleared existing products");
    
    // Insert products
    const insertedProducts = await ProductModel.insertMany(products);
    console.log(`✅ Seeded ${insertedProducts.length} products`);
    
    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding products:", error);
    process.exit(1);
  }
};

seedProducts();

