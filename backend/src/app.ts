import express from "express";
import cors from "cors";
import routes from "./routes";
import path from "path";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve images at http://localhost:4000/images/<filename>
app.use(
  "/images",
  express.static(path.join(__dirname, "..", "public", "images"), {
    maxAge: "30d" // cache images for 30 days in browsers
  })
);

// Request logging middleware (for debugging)
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Routes
app.use("/api", routes);

// Health check
app.get("/", (req, res) => {
  res.json({ message: "SAMAY Watch Store API is running" });
});

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error("Unhandled error:", err);
  res.status(err.status || 500).json({
    error: err.message || "Internal server error",
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

export default app;

