// ─── backend/routes/couponRoutes.js ──────────────────────────────────────────
// Handles all /api/coupons routes

const express = require("express");
const router  = express.Router();
const coupons = require("../data/coupons");

// ── GET /api/coupons ──────────────────────────────────────────────────────────
// Returns all active coupons
// Optional query param: ?all=true → returns both active and inactive

router.get("/", (req, res) => {
  const { all } = req.query;

  const result = all === "true"
    ? coupons
    : coupons.filter((c) => c.isActive);

  return res.status(200).json({
    success: true,
    count: result.length,
    data: result,
  });
});

// ── POST /api/coupons/validate ─────────────────────────────────────────────────
// Validates a coupon code against a given cart total
//
// Request body:
//   { code: "WELCOME50", orderTotal: 250 }
//
// Response on success:
//   { success: true, discountAmount: 50, finalTotal: 200, coupon: {...} }

router.post("/validate", (req, res) => {
  const { code, orderTotal } = req.body;

  // ── Basic input validation ───────────────────────────────────────────────────
  if (!code || typeof code !== "string") {
    return res.status(400).json({
      success: false,
      message: "Coupon code is required.",
    });
  }

  if (orderTotal === undefined || orderTotal === null || isNaN(Number(orderTotal))) {
    return res.status(400).json({
      success: false,
      message: "A valid orderTotal (number) is required.",
    });
  }

  const total = Number(orderTotal);

  // ── Find coupon ──────────────────────────────────────────────────────────────
  const coupon = coupons.find(
    (c) => c.code.toUpperCase() === code.trim().toUpperCase()
  );

  if (!coupon) {
    return res.status(404).json({
      success: false,
      message: "Invalid coupon code.",
    });
  }

  if (!coupon.isActive) {
    return res.status(400).json({
      success: false,
      message: "This coupon is no longer active.",
    });
  }

  // ── Minimum order check ──────────────────────────────────────────────────────
  if (total < coupon.minOrderValue) {
    return res.status(400).json({
      success: false,
      message: `Minimum order value of ₹${coupon.minOrderValue} required to use this coupon.`,
    });
  }

  // ── Calculate discount ───────────────────────────────────────────────────────
  let discountAmount = 0;

  if (coupon.discountType === "flat") {
    discountAmount = coupon.discount;
  } else if (coupon.discountType === "percent") {
    discountAmount = Math.round((total * coupon.discount) / 100);
    // Apply max discount cap if defined
    if (coupon.maxDiscount) {
      discountAmount = Math.min(discountAmount, coupon.maxDiscount);
    }
  } else if (coupon.discountType === "free_delivery") {
    discountAmount = 0; // handled on frontend (removes delivery fee)
  }

  const finalTotal = Math.max(0, total - discountAmount);

  return res.status(200).json({
    success: true,
    message: "Coupon applied successfully!",
    discountAmount,
    finalTotal,
    coupon: {
      id: coupon.id,
      code: coupon.code,
      description: coupon.description,
      discountType: coupon.discountType,
    },
  });
});

module.exports = router;
