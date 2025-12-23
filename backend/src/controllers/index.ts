import { Request, Response } from "express";

export const ping = (req: Request, res: Response) => {
  res.json({ message: "pong", timestamp: new Date().toISOString() });
};

export * from "./auth";
export * from "./favorite";

