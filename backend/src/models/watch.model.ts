import { Schema, model, Document } from "mongoose";

export interface IWatch extends Document {
  id: string;
  brand: string;
  name: string;
  price: number;
  image: string; // e.g. "/images/rolex-1.jpg"
  // optional extra fields...
}

const WatchSchema = new Schema<IWatch>({
  id: { type: String, required: true, unique: true },
  brand: { type: String, required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true }, // store *path only*
}, {
  collection: "watches",
  timestamps: false
});

export default model<IWatch>("Watch", WatchSchema);