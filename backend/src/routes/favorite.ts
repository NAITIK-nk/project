import { Router } from "express";
import { requireAuth } from "../middleware/auth.middleware";
import { getFavorites, addFavorite, removeFavorite } from "../controllers/favorite";

const router = Router();

// require authentication for all favorite routes
router.use(requireAuth);

router.get("/", getFavorites);
router.post("/", addFavorite);           // { productId, name?, metadata? }
router.delete("/:productId", removeFavorite);

export default router;

