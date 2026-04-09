// ─── backend/routes/menuRoutes.js ────────────────────────────────────────────
// Handles all /api/menu routes

const express = require("express");
const router  = express.Router();
const menuItems = require("../data/menu");

// ── GET /api/menu ─────────────────────────────────────────────────────────────
// Returns all menu items.
// Optional query params:
//   ?category=veg | nonveg | jain
//   ?spice=low | medium | high
//   ?search=<text>

router.get("/", (req, res) => {
  const { category, spice, search } = req.query;

  let result = [...menuItems];

  // Filter by category
  if (category) {
    const cat = category.toLowerCase();
    result = result.filter((item) => item.category === cat);
  }

  // Filter by spice level
  if (spice) {
    const lvl = spice.toLowerCase();
    result = result.filter((item) => item.spiceLevel === lvl);
  }

  // Filter by search query (name or description)
  if (search) {
    const q = search.toLowerCase();
    result = result.filter(
      (item) =>
        item.name.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.ingredients.some((ing) => ing.toLowerCase().includes(q))
    );
  }

  return res.status(200).json({
    success: true,
    count: result.length,
    data: result,
  });
});

// ── GET /api/menu/:id ─────────────────────────────────────────────────────────
// Returns a single menu item by ID

router.get("/:id", (req, res) => {
  const item = menuItems.find((m) => m.id === req.params.id);

  if (!item) {
    return res.status(404).json({
      success: false,
      message: `Menu item with id '${req.params.id}' not found.`,
    });
  }

  return res.status(200).json({
    success: true,
    data: item,
  });
});

module.exports = router;
