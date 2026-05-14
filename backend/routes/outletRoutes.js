const router = require("express").Router();
const Outlet  = require("../models/Outlet");
const { OUTLETS } = require("../data/outlets");

// ── GET /api/outlets ──────────────────────────────────────────────────────────
router.get("/", async (req, res, next) => {
  try {
    const { city, dineIn, delivery, open, search } = req.query;
    let outlets;

    try {
      const query = {};
      if (city)          query.city     = { $regex: city.trim(), $options: "i" };
      if (open === "true") query.isOpen  = true;
      if (dineIn === "true")   query.dineIn   = true;
      if (delivery === "true") query.delivery = true;
      if (search) {
        const re = { $regex: search.trim(), $options: "i" };
        query.$or = [{ name: re }, { city: re }, { address: re }];
      }
      outlets = await Outlet.find(query).select("-__v").lean();
      if (!outlets.length) throw new Error("db_empty");
    } catch {
      outlets = OUTLETS.filter(o => {
        if (city     && o.city.toLowerCase() !== city.toLowerCase()) return false;
        if (dineIn   === "true" && !o.dineIn)   return false;
        if (delivery === "true" && !o.delivery) return false;
        if (search) {
          const q = search.toLowerCase();
          return o.name.toLowerCase().includes(q) || o.city.toLowerCase().includes(q) || o.address.toLowerCase().includes(q);
        }
        return true;
      });
    }

    res.json({ success: true, count: outlets.length, data: outlets });
  } catch (err) { next(err); }
});

// ── GET /api/outlets/cities ───────────────────────────────────────────────────
router.get("/cities", async (_req, res, next) => {
  try {
    let cities;
    try {
      cities = await Outlet.distinct("city");
      if (!cities.length) throw new Error("db_empty");
    } catch {
      cities = [...new Set(OUTLETS.map(o => o.city))].sort();
    }
    res.json({ success: true, data: cities });
  } catch (err) { next(err); }
});

// ── GET /api/outlets/:id ──────────────────────────────────────────────────────
router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    let outlet;

    try {
      outlet = await Outlet.findOne({ $or: [{ _id: id }, { id }] }).select("-__v").lean();
    } catch {}

    if (!outlet) outlet = OUTLETS.find(o => o.id === id);
    if (!outlet) return res.status(404).json({ success: false, message: "Outlet not found." });

    res.json({ success: true, data: outlet });
  } catch (err) { next(err); }
});

module.exports = router;
