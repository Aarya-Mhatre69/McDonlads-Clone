// ─── backend/data/coupons.js ─────────────────────────────────────────────────
// Mock coupon / promo code data

const coupons = [
  {
    id: "cpn-001",
    code: "WELCOME50",
    discount: 50,             // flat ₹50 off
    discountType: "flat",     // "flat" | "percent"
    description: "₹50 off on your first order above ₹199",
    minOrderValue: 199,
    maxUses: 1,               // per user
    validUntil: "2026-12-31",
    isActive: true,
  },
  {
    id: "cpn-002",
    code: "INDIA20",
    discount: 20,             // 20% off
    discountType: "percent",
    description: "20% off on all Veg items (max ₹80 discount)",
    minOrderValue: 149,
    maxDiscount: 80,
    maxUses: null,            // unlimited
    validUntil: "2026-06-30",
    isActive: true,
  },
  {
    id: "cpn-003",
    code: "MCSPICY",
    discount: 30,
    discountType: "flat",
    description: "₹30 off when you buy McSpicy Paneer or McSpicy Chicken",
    minOrderValue: 149,
    maxUses: null,
    validUntil: "2026-05-15",
    isActive: true,
  },
  {
    id: "cpn-004",
    code: "JAIN10",
    discount: 10,
    discountType: "percent",
    description: "10% off on all Jain menu items",
    minOrderValue: 99,
    maxDiscount: 40,
    maxUses: null,
    validUntil: "2026-12-31",
    isActive: true,
  },
  {
    id: "cpn-005",
    code: "FREEDEL",
    discount: 0,
    discountType: "free_delivery",
    description: "Free delivery on orders above ₹299",
    minOrderValue: 299,
    maxUses: null,
    validUntil: "2026-08-31",
    isActive: false,          // currently inactive (example)
  },
];

module.exports = coupons;
