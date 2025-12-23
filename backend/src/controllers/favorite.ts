import { Response } from "express";
import FavoriteModel from "../models/favorite.model";
import { AuthRequest } from "../middleware/auth.middleware";

// GET /api/favorites
export const getFavorites = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId;
    if (!userId) return res.status(401).json({ error: "Unauthorized" });

    const fav = await FavoriteModel.findOne({ user: userId }).lean();
    return res.json({ products: fav?.products ?? [] });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "server error" });
  }
};

// POST /api/favorites  body: { productId, name?, metadata? }
export const addFavorite = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId;
    const { productId, name, metadata } = req.body;
    if (!userId) return res.status(401).json({ error: "Unauthorized" });
    if (!productId) return res.status(400).json({ error: "productId is required" });

    const update = { $addToSet: { products: { productId, name, metadata, addedAt: new Date() } } };
    const fav = await FavoriteModel.findOneAndUpdate({ user: userId }, update, {
      upsert: true,
      new: true,
      setDefaultsOnInsert: true
    });
    return res.status(200).json({ products: fav?.products ?? [] });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "server error" });
  }
};

// DELETE /api/favorites/:productId
export const removeFavorite = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId;
    const { productId } = req.params;
    if (!userId) return res.status(401).json({ error: "Unauthorized" });
    if (!productId) return res.status(400).json({ error: "productId is required" });

    const fav = await FavoriteModel.findOneAndUpdate({ user: userId }, { $pull: { products: { productId } } }, { new: true });
    return res.json({ products: fav?.products ?? [] });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "server error" });
  }
};