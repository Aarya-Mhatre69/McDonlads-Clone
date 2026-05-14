require("dotenv").config();

const express      = require("express");
const cors         = require("cors");
const helmet       = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const mongoose     = require("mongoose");

const { globalLimiter } = require("./middleware/rateLimiter");

const menuRoutes   = require("./routes/menuRoutes");
const outletRoutes = require("./routes/outletRoutes");
const couponRoutes = require("./routes/couponRoutes");
const orderRoutes  = require("./routes/orderRoutes");

const app  = express();
const PORT = process.env.PORT || 5000;

// ── Security headers ──────────────────────────────────────────────────────────
app.use(helmet({ contentSecurityPolicy: false })); // CSP managed by Next.js
app.set("trust proxy", 1);

// ── CORS ──────────────────────────────────────────────────────────────────────
const allowedOrigins = (process.env.ALLOWED_ORIGINS || "http://localhost:3000,http://localhost:3001").split(",");
app.use(cors({
  origin: (origin, cb) => {
    if (!origin || allowedOrigins.includes(origin)) return cb(null, true);
    cb(new Error("CORS: origin not allowed"));
  },
  methods:          ["GET", "POST", "PUT", "PATCH", "DELETE"],
  allowedHeaders:   ["Content-Type", "Authorization", "x-api-key", "x-user-id", "x-user-email", "x-user-name"],
  credentials:      true,
}));

// ── Body parsing ──────────────────────────────────────────────────────────────
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: false, limit: "10kb" }));

// ── NoSQL injection sanitization ──────────────────────────────────────────────
app.use(mongoSanitize({ replaceWith: "_" }));

// ── Global rate limiter ───────────────────────────────────────────────────────
app.use(globalLimiter);

// ── MongoDB via Mongoose ──────────────────────────────────────────────────────
const MONGODB_URI = process.env.MONGODB_URI;
if (MONGODB_URI) {
  mongoose
    .connect(MONGODB_URI, { dbName: process.env.MONGODB_DB || "mcdonald" })
    .then(() => console.log("✅  MongoDB (Mongoose) connected"))
    .catch(err => console.error("❌  MongoDB error:", err.message));

  mongoose.connection.on("disconnected", () => console.warn("⚠️  MongoDB disconnected"));
}

// ── Health check ──────────────────────────────────────────────────────────────
app.get("/api/health", (_req, res) => {
  res.status(200).json({
    success:   true,
    message:   "McDonald's India API is running",
    timestamp: new Date().toISOString(),
    version:   "1.0.0",
    db:        mongoose.connection.readyState === 1 ? "connected" : "disconnected",
  });
});

// ── API Routes ────────────────────────────────────────────────────────────────
app.use("/api/menu",    menuRoutes);
app.use("/api/outlets", outletRoutes);
app.use("/api/coupons", couponRoutes);
app.use("/api/orders",  orderRoutes);

// ── 404 ───────────────────────────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ success: false, message: `Route '${req.originalUrl}' not found.` });
});

// ── Global error handler ──────────────────────────────────────────────────────
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, _next) => {
  const status  = err.status || 500;
  const message = err.message || "Internal Server Error";
  console.error(`❌ [${status}] ${req.method} ${req.originalUrl} — ${message}`);
  res.status(status).json({
    success: false,
    message,
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
});

// ── Start ─────────────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log("\n🍔  McDonald's India API Server");
  console.log("─────────────────────────────────────────");
  console.log(`🚀  Running at:  http://localhost:${PORT}`);
  console.log(`📋  Health:      http://localhost:${PORT}/api/health`);
  console.log(`🍟  Menu:        http://localhost:${PORT}/api/menu`);
  console.log(`📍  Outlets:     http://localhost:${PORT}/api/outlets`);
  console.log(`🎟️   Coupons:     http://localhost:${PORT}/api/coupons`);
  console.log(`📦  Orders:      http://localhost:${PORT}/api/orders`);
  console.log("─────────────────────────────────────────\n");
});

module.exports = app;
