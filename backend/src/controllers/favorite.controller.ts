import { Request, Response } from "express";
import FavoriteModel from "../models/favorite.model";
import ProductModel from "../models/product.model";

interface AuthRequest extends Request {
  userId?: string;
}

export const getFavorites = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId;
    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const favorites = await FavoriteModel.find({ userId })
      .populate("productId")
      .sort({ createdAt: -1 });

    res.json(favorites.map((fav) => fav.productId));
  } catch (err) {
    console.error("Get favorites error:", err);
    res.status(500).json({ error: "Failed to fetch favorites" });
  }
};

export const addFavorite = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId;
    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const { productId } = req.body;

    if (!productId) {
      return res.status(400).json({ error: "Product ID is required" });
    }

    const product = await ProductModel.findById(productId);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    // Check if already favorited
    const existing = await FavoriteModel.findOne({ userId, productId });
    if (existing) {
      return res.json({ message: "Product already in favorites", product });
    }

    await FavoriteModel.create({ userId, productId });
    res.status(201).json({ message: "Product added to favorites", product });
  } catch (err: any) {
    console.error("Add favorite error:", err);
    if (err.code === 11000) {
      return res.status(409).json({ error: "Product already in favorites" });
    }
    res.status(500).json({ error: "Failed to add favorite" });
  }
};

export const removeFavorite = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId;
    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const { productId } = req.params;

    const favorite = await FavoriteModel.findOneAndDelete({ userId, productId });
    if (!favorite) {
      return res.status(404).json({ error: "Favorite not found" });
    }

    res.json({ message: "Product removed from favorites" });
  } catch (err) {
    console.error("Remove favorite error:", err);
    res.status(500).json({ error: "Failed to remove favorite" });
  }
};

export const checkFavorite = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId;
    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const { productId } = req.params;

    const favorite = await FavoriteModel.findOne({ userId, productId });
    res.json({ isFavorite: !!favorite });
  } catch (err) {
    console.error("Check favorite error:", err);
    res.status(500).json({ error: "Failed to check favorite" });
  }
};

