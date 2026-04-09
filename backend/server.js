// ─── backend/server.js ───────────────────────────────────────────────────────
// Main Express server entry point for McDonald's India API

const express = require("express");
const cors    = require("cors");

// ── Import route handlers ─────────────────────────────────────────────────────
const menuRoutes   = require("./routes/menuRoutes");
const outletRoutes = require("./routes/outletRoutes");
const couponRoutes = require("./routes/couponRoutes");
const orderRoutes  = require("./routes/orderRoutes");

// ── App setup ─────────────────────────────────────────────────────────────────
const app  = express();
const PORT = process.env.PORT || 5000;

// ── Middleware ────────────────────────────────────────────────────────────────
// Parse incoming JSON request bodies
app.use(express.json());

// Enable CORS — allows the Next.js frontend (localhost:3000) to call this API
app.use(cors({
  origin: [
    "http://localhost:3000",   // Next.js dev server
    "http://localhost:3001",   // alternate dev port
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

// ── Health check ──────────────────────────────────────────────────────────────
// GET /api/health → confirms the server is running
app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "McDonald's India API is running 🍔",
    timestamp: new Date().toISOString(),
    version: "1.0.0",
  });
});

// ── API Routes ────────────────────────────────────────────────────────────────
app.use("/api/menu",    menuRoutes);
app.use("/api/outlets", outletRoutes);
app.use("/api/coupons", couponRoutes);
app.use("/api/orders",  orderRoutes);

// ── 404 handler — catches any unknown routes ──────────────────────────────────
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route '${req.originalUrl}' not found on this server.`,
  });
});

// ── Global error handler ──────────────────────────────────────────────────────
// Catches any unhandled errors thrown inside route handlers
app.use((err, req, res, _next) => {
  console.error("❌ Server Error:", err.message);
  res.status(500).json({
    success: false,
    message: "Internal Server Error. Please try again later.",
    error: process.env.NODE_ENV === "development" ? err.message : undefined,
  });
});

// ── Start server ──────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log("\n🍔  McDonald's India API Server");
  console.log("─────────────────────────────────────");
  console.log(`🚀  Running at: http://localhost:${PORT}`);
  console.log(`📋  Health:     http://localhost:${PORT}/api/health`);
  console.log(`🍟  Menu:       http://localhost:${PORT}/api/menu`);
  console.log(`📍  Outlets:    http://localhost:${PORT}/api/outlets`);
  console.log(`🎟️   Coupons:    http://localhost:${PORT}/api/coupons`);
  console.log(`📦  Orders:     http://localhost:${PORT}/api/orders`);
  console.log("─────────────────────────────────────\n");
});

module.exports = app;
