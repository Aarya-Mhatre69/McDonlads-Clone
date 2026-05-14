const router    = require("express").Router();
const MenuItem  = require("../models/MenuItem");
const { MENU_ITEMS } = require("../data/menuItems");

// ── GET /api/menu ─────────────────────────────────────────────────────────────
router.get("/", async (req, res, next) => {
  try {
    const { category, search, popular } = req.query;

    const VALID_CATEGORIES = ["veg", "nonveg", "jain"];
    let items;

    try {
      // Attempt Mongoose query; fall back to static data if DB is empty
      const query = { isAvailable: { $ne: false } };
      if (category && VALID_CATEGORIES.includes(category)) query.category = category;
      if (popular === "true") query.isPopular = true;
      if (search) {
        const re = { $regex: search.trim(), $options: "i" };
        query.$or = [{ name: re }, { description: re }, { ingredients: re }];
      }
      items = await MenuItem.find(query).select("-__v").lean();
      if (!items.length) throw new Error("db_empty");
    } catch {
      items = MENU_ITEMS.filter(i => {
        if (category && VALID_CATEGORIES.includes(category) && i.category !== category) return false;
        if (popular === "true" && !i.isPopular) return false;
        if (search) {
          const q = search.toLowerCase();
          return (
            i.name.toLowerCase().includes(q) ||
            i.description.toLowerCase().includes(q) ||
            i.ingredients.some(ing => ing.toLowerCase().includes(q))
          );
        }
        return true;
      });
    }

    res.json({ success: true, count: items.length, data: items });
  } catch (err) { next(err); }
});

// ── GET /api/menu/popular ─────────────────────────────────────────────────────
router.get("/popular", async (_req, res, next) => {
  try {
    let items;
    try {
      items = await MenuItem.find({ isPopular: true, isAvailable: { $ne: false } }).select("-__v").lean();
      if (!items.length) throw new Error("db_empty");
    } catch {
      items = MENU_ITEMS.filter(i => i.isPopular);
    }
    res.json({ success: true, count: items.length, data: items });
  } catch (err) { next(err); }
});

// ── GET /api/menu/:id ─────────────────────────────────────────────────────────
router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    let item;

    try {
      item = await MenuItem.findOne({ $or: [{ _id: id }, { id }] }).select("-__v").lean();
    } catch {}

    if (!item) item = MENU_ITEMS.find(i => i.id === id);
    if (!item) return res.status(404).json({ success: false, message: "Menu item not found." });

    res.json({ success: true, data: item });
  } catch (err) { next(err); }
});

module.exports = router;
