import { Schema, model, Document } from "mongoose";

export interface IProduct extends Document {
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  brand: string;
  gender: string;
  isOnSale?: boolean;
  description?: string;
  stock?: number;
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true, trim: true },
    price: { type: Number, required: true, min: 0 },
    originalPrice: { type: Number, min: 0 },
    image: { type: String, required: true },
    category: { 
      type: String, 
      required: true,
      enum: ['Luxury', 'Classic', 'Sport'],
      trim: true 
    },
    brand: { 
      type: String, 
      required: true,
      enum: ['SAMAY', 'Omega', 'Rolex', 'Seiko', 'Titan', 'Casio', 'Fossil', 'Tissot', 'Hublot'],
      trim: true 
    },
    gender: { 
      type: String, 
      required: true,
      enum: ['Men', 'Women', 'Unisex'],
      trim: true 
    },
    isOnSale: { type: Boolean, default: false },
    description: { type: String, trim: true },
    stock: { type: Number, default: 0, min: 0 },
  },
  {
    timestamps: true,
  }
);

const ProductModel = model<IProduct>("Product", ProductSchema);

export default ProductModel;

