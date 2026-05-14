const router      = require("express").Router();
const Order       = require("../models/Order");
const requireAuth = require("../middleware/auth");
const { orderLimiter } = require("../middleware/rateLimiter");

const VALID_CATEGORIES = ["veg", "nonveg", "jain"];

function validateOrderBody(body) {
  const { items, deliveryMode } = body;
  if (!Array.isArray(items) || items.length === 0) return "Order must contain at least one item.";
  if (!["delivery", "dine-in"].includes(deliveryMode))   return "deliveryMode must be 'delivery' or 'dine-in'.";
  for (const item of items) {
    if (!item.id || typeof item.id !== "string")               return "Each item must have a valid id.";
    if (!item.name || typeof item.name !== "string")           return "Each item must have a name.";
    if (typeof item.price !== "number" || item.price < 0)      return "Each item must have a valid price.";
    if (typeof item.qty   !== "number" || item.qty   < 1)      return "Each item must have qty >= 1.";
    if (item.category && !VALID_CATEGORIES.includes(item.category)) return "Invalid item category.";
  }
  return null;
}

// ── POST /api/orders — create order (auth required) ───────────────────────────
router.post("/", requireAuth, orderLimiter, async (req, res, next) => {
  try {
    const error = validateOrderBody(req.body);
    if (error) return res.status(400).json({ success: false, message: error });

    const { items, deliveryMode, deliveryAddress, couponCode, discount } = req.body;

    const subtotal    = items.reduce((s, i) => s + i.price * i.qty, 0);
    const gst         = Math.round(subtotal * 0.05);
    const deliveryFee = deliveryMode === "delivery" && subtotal < 299 ? 49 : 0;
    const totalAmount = Math.max(0, subtotal + gst + deliveryFee - (Number(discount) || 0));

    const order = await Order.create({
      userId:          req.user.id,
      items,
      deliveryMode,
      deliveryAddress: (deliveryAddress || "").slice(0, 300),
      couponCode:      couponCode || null,
      discount:        Number(discount) || 0,
      subtotal,
      gst,
      deliveryFee,
      totalAmount,
    });

    res.status(201).json({
      success: true,
      message: "Order placed successfully!",
      data: {
        orderId:       order._id,
        status:        order.status,
        totalAmount:   order.totalAmount,
        estimatedTime: deliveryMode === "delivery" ? "30–45 mins" : "15–20 mins",
        placedAt:      order.createdAt,
      },
    });
  } catch (err) { next(err); }
});

// ── GET /api/orders — user's order history (auth required) ────────────────────
router.get("/", requireAuth, async (req, res, next) => {
  try {
    const page  = Math.max(1, parseInt(req.query.page) || 1);
    const limit = Math.min(50, parseInt(req.query.limit) || 10);

    const [orders, total] = await Promise.all([
      Order.find({ userId: req.user.id })
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .select("-__v")
        .lean(),
      Order.countDocuments({ userId: req.user.id }),
    ]);

    res.json({
      success: true,
      count:   orders.length,
      total,
      page,
      pages:   Math.ceil(total / limit),
      data:    orders,
    });
  } catch (err) { next(err); }
});

// ── GET /api/orders/:id — single order (auth required) ────────────────────────
router.get("/:id", requireAuth, async (req, res, next) => {
  try {
    const order = await Order.findOne({ _id: req.params.id, userId: req.user.id }).select("-__v").lean();
    if (!order) return res.status(404).json({ success: false, message: "Order not found." });
    res.json({ success: true, data: order });
  } catch (err) { next(err); }
});

// ── PATCH /api/orders/:id/cancel — cancel order ───────────────────────────────
router.patch("/:id/cancel", requireAuth, async (req, res, next) => {
  try {
    const order = await Order.findOne({ _id: req.params.id, userId: req.user.id });
    if (!order) return res.status(404).json({ success: false, message: "Order not found." });
    if (["delivered", "cancelled"].includes(order.status)) {
      return res.status(409).json({ success: false, message: `Cannot cancel an order that is already '${order.status}'.` });
    }
    order.status = "cancelled";
    await order.save();
    res.json({ success: true, message: "Order cancelled.", data: { orderId: order._id, status: order.status } });
  } catch (err) { next(err); }
});

module.exports = router;
