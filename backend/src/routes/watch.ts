import { Router } from "express";
import { getAllWatches } from "../controllers/watch";

const router = Router();
router.get("/", getAllWatches);
export default router;