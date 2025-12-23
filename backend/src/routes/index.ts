import { Router } from "express";
import { ping } from "../controllers";
import authRouter from "./auth";
import productRouter from "./product";
import cartRouter from "./cart";
import orderRouter from "./order";
import favoriteRouter from "./favorite";

const router = Router();

router.get("/ping", ping);

// Auth routes
router.use("/auth", authRouter);

// Product routes
router.use("/products", productRouter);

// Cart routes (requires authentication)
router.use("/cart", cartRouter);

// Order routes (requires authentication)
router.use("/orders", orderRouter);

// Favorite routes (requires authentication)
router.use("/favorites", favoriteRouter);

export default router;