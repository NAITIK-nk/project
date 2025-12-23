import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/SAMAY";

export const connectDB = async () => {
  try {
    mongoose.set("strictQuery", false);
    
    // Connection options for better error handling
    const options = {
      serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
      socketTimeoutMS: 45000, // Close sockets after 45s of inactivity
    };
    
    await mongoose.connect(MONGODB_URI, options);
    console.log("✅ Connected to MongoDB:", MONGODB_URI);
    
    // Handle connection events
    mongoose.connection.on('error', (err) => {
      console.error("❌ MongoDB connection error:", err);
    });
    
    mongoose.connection.on('disconnected', () => {
      console.warn("⚠️  MongoDB disconnected. Attempting to reconnect...");
    });
    
    mongoose.connection.on('reconnected', () => {
      console.log("✅ MongoDB reconnected");
    });
    
  } catch (err: any) {
    console.error("❌ MongoDB connection error:", err);
    console.error("\n🔧 Troubleshooting steps:");
    console.error("1. Make sure MongoDB is running: mongod");
    console.error("2. Check connection string:", MONGODB_URI);
    console.error("3. Verify MongoDB is accessible on port 27017");
    console.error("4. Check if MongoDB service is running\n");
    process.exit(1);
  }
};

// Helper function to check if MongoDB is connected
export const isConnected = () => {
  return mongoose.connection.readyState === 1;
};

export default mongoose;