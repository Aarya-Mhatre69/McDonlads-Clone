// ─── backend/routes/outletRoutes.js ──────────────────────────────────────────
// Handles all /api/outlets routes

const express = require("express");
const router  = express.Router();
const outlets = require("../data/outlets");

// ── GET /api/outlets ──────────────────────────────────────────────────────────
// Returns all outlets.
// Optional query params:
//   ?status=open | closed
//   ?sortBy=distance | deliveryTime | rating

router.get("/", (req, res) => {
  const { status, sortBy } = req.query;

  let result = [...outlets];

  // Filter by open/closed status
  if (status) {
    const s = status.toLowerCase();
    if (s !== "open" && s !== "closed") {
      return res.status(400).json({
        success: false,
        message: 'Invalid status. Use "open" or "closed".',
      });
    }
    result = result.filter((o) => o.status === s);
  }

  // Sort results
  if (sortBy) {
    switch (sortBy.toLowerCase()) {
      case "distance":
        result.sort((a, b) => a.distance - b.distance);
        break;
      case "deliverytime":
        result.sort((a, b) => a.deliveryTime - b.deliveryTime);
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      default:
        return res.status(400).json({
          success: false,
          message: 'Invalid sortBy value. Use "distance", "deliveryTime", or "rating".',
        });
    }
  }

  return res.status(200).json({
    success: true,
    count: result.length,
    data: result,
  });
});

// ── GET /api/outlets/:id ──────────────────────────────────────────────────────
// Returns a single outlet by ID

router.get("/:id", (req, res) => {
  const outlet = outlets.find((o) => o.id === req.params.id);

  if (!outlet) {
    return res.status(404).json({
      success: false,
      message: `Outlet with id '${req.params.id}' not found.`,
    });
  }

  return res.status(200).json({
    success: true,
    data: outlet,
  });
});

module.exports = router;
