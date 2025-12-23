import dotenv from "dotenv";
dotenv.config();

import app from "./app";
import { connectDB } from "./db";

const PORT = process.env.PORT ? Number(process.env.PORT) : 4000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
  });
}).catch(err => {
  console.error("Failed to start server:", err);
  process.exit(1);
});