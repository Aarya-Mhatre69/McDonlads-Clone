const router  = require("express").Router();
const coupons = require("../data/coupons");
const { authLimiter } = require("../middleware/rateLimiter");

const isExpired = c => new Date(c.validUntil) < new Date();

// ── GET /api/coupons ──────────────────────────────────────────────────────────
router.get("/", (_req, res) => {
  const active = coupons.filter(c => c.isActive && !isExpired(c));
  // Never expose maxUses internals
  const safe = active.map(({ maxUses, ...rest }) => rest);
  res.json({ success: true, count: safe.length, data: safe });
});

// ── POST /api/coupons/validate ────────────────────────────────────────────────
router.post("/validate", authLimiter, (req, res) => {
  const { code, orderTotal } = req.body;

  if (!code || typeof code !== "string") {
    return res.status(400).json({ success: false, message: "Coupon code is required." });
  }

  const coupon = coupons.find(c => c.code.toUpperCase() === code.trim().toUpperCase());

  if (!coupon || !coupon.isActive) {
    return res.status(404).json({ success: false, message: "Invalid coupon code." });
  }

  if (isExpired(coupon)) {
    return res.status(410).json({ success: false, message: "This coupon has expired." });
  }

  const total = Number(orderTotal) || 0;
  if (total < coupon.minOrderValue) {
    return res.status(422).json({
      success: false,
      message: `Minimum order of ₹${coupon.minOrderValue} required to use this coupon.`,
    });
  }

  let discountAmount = 0;
  if (coupon.discountType === "flat") {
    discountAmount = coupon.discount;
  } else if (coupon.discountType === "percent") {
    discountAmount = Math.round((total * coupon.discount) / 100);
    if (coupon.maxDiscount) discountAmount = Math.min(discountAmount, coupon.maxDiscount);
  }

  res.json({
    success: true,
    data: {
      code:           coupon.code,
      discountType:   coupon.discountType,
      discountAmount,
      description:    coupon.description,
      finalTotal:     Math.max(0, total - discountAmount),
    },
  });
});

module.exports = router;
