import { Schema, model, Types, Document } from "mongoose";

export interface IFavoriteProduct {
  productId: string;
  name?: string;
  metadata?: any;
  addedAt?: Date;
}

export interface IFavorite extends Document {
  user: Types.ObjectId;
  products: IFavoriteProduct[];
}

const FavoriteSchema = new Schema<IFavorite>(
  {
    user: { type: Schema.Types.ObjectId, required: true, ref: "ApropeteUser", unique: true },
    products: [
      {
        productId: { type: String, required: true },
        name: { type: String },
        metadata: { type: Schema.Types.Mixed },
        addedAt: { type: Date, default: () => new Date() }
      }
    ]
  },
  { collection: "favorite" }
);

const FavoriteModel = model<IFavorite>("Favorite", FavoriteSchema);
export default FavoriteModel;

