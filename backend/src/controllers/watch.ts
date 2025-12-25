import { Request, Response } from "express";
import WatchModel from "../models/watch.model";

export const getAllWatches = async (_req: Request, res: Response) => {
  const watches = await WatchModel.find().lean();
  return res.json(watches);
};