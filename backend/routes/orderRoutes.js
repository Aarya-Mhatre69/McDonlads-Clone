// ─── backend/routes/orderRoutes.js ───────────────────────────────────────────
// Handles all /api/orders routes
// In-memory order store (resets on server restart).
// Replace with a real DB (MongoDB/PostgreSQL) in production.

const express = require("express");
const router  = express.Router();
const menuItems = require("../data/menu");

// Simple in-memory store
const orders = [];
let orderCounter = 1000; // Orders start from #1001

// ── Helpers ───────────────────────────────────────────────────────────────────
function generateOrderId() {
  orderCounter += 1;
  return `MCD-${orderCounter}`;
}

function validateCartItems(cart) {
  const errors = [];

  for (const cartItem of cart) {
    // Check required fields
    if (!cartItem.id || !cartItem.quantity) {
      errors.push(`Cart item missing 'id' or 'quantity'.`);
      continue;
    }

    // Check item exists in menu
    const menuItem = menuItems.find((m) => m.id === cartItem.id);
    if (!menuItem) {
      errors.push(`Item '${cartItem.id}' does not exist in the menu.`);
      continue;
    }

    // Check quantity is positive
    if (typeof cartItem.quantity !== "number" || cartItem.quantity < 1) {
      errors.push(`Quantity for '${cartItem.id}' must be at least 1.`);
    }
  }

  return errors;
}

// ── POST /api/orders ──────────────────────────────────────────────────────────
// Place a new order.
//
// Request body:
// {
//   cart: [
//     { id: "mcaloo-tikki", quantity: 2 },
//     { id: "masala-fries",  quantity: 1 }
//   ],
//   deliveryMode: "delivery" | "dine-in",
//   outletId: "andheri-west",       // required for dine-in
//   deliveryAddress: "...",          // required for delivery
//   customerName: "Nishan",
//   phone: "9876543210",
//   couponCode: "WELCOME50"          // optional
// }

router.post("/", (req, res) => {
  const {
    cart,
    deliveryMode,
    outletId,
    deliveryAddress,
    customerName,
    phone,
    couponCode,
  } = req.body;

  // ── 1. Cart must not be empty ─────────────────────────────────────────────
  if (!cart || !Array.isArray(cart) || cart.length === 0) {
    return res.status(400).json({
      success: false,
      message: "Cart is empty. Please add at least one item before placing an order.",
    });
  }

  // ── 2. Validate cart items ────────────────────────────────────────────────
  const cartErrors = validateCartItems(cart);
  if (cartErrors.length > 0) {
    return res.status(400).json({
      success: false,
      message: "Some cart items are invalid.",
      errors: cartErrors,
    });
  }

  // ── 3. Delivery mode validation ───────────────────────────────────────────
  if (!deliveryMode || !["delivery", "dine-in"].includes(deliveryMode)) {
    return res.status(400).json({
      success: false,
      message: 'deliveryMode must be "delivery" or "dine-in".',
    });
  }

  if (deliveryMode === "delivery" && !deliveryAddress) {
    return res.status(400).json({
      success: false,
      message: "deliveryAddress is required for delivery orders.",
    });
  }

  if (deliveryMode === "dine-in" && !outletId) {
    return res.status(400).json({
      success: false,
      message: "outletId is required for dine-in orders.",
    });
  }

  // ── 4. Customer info validation ───────────────────────────────────────────
  if (!customerName || typeof customerName !== "string" || customerName.trim().length < 2) {
    return res.status(400).json({
      success: false,
      message: "customerName must be at least 2 characters.",
    });
  }

  if (!phone || !/^\d{10}$/.test(phone)) {
    return res.status(400).json({
      success: false,
      message: "Phone must be a valid 10-digit Indian mobile number.",
    });
  }

  // ── 5. Build enriched order items with prices ─────────────────────────────
  const enrichedItems = cart.map((cartItem) => {
    const menuItem = menuItems.find((m) => m.id === cartItem.id);
    return {
      id: menuItem.id,
      name: menuItem.name,
      category: menuItem.category,
      price: menuItem.price,
      quantity: cartItem.quantity,
      lineTotal: menuItem.price * cartItem.quantity,
    };
  });

  const subtotal  = enrichedItems.reduce((sum, i) => sum + i.lineTotal, 0);
  const gst       = Math.round(subtotal * 0.05);
  const totalPrice = subtotal + gst;

  // ── 6. Create order record ────────────────────────────────────────────────
  const newOrder = {
    orderId:      generateOrderId(),
    status:       "confirmed",
    placedAt:     new Date().toISOString(),
    customerName: customerName.trim(),
    phone,
    deliveryMode,
    outletId:         deliveryMode === "dine-in" ? outletId : null,
    deliveryAddress:  deliveryMode === "delivery" ? deliveryAddress.trim() : null,
    couponCode:   couponCode || null,
    items:        enrichedItems,
    subtotal,
    gst,
    totalPrice,
    estimatedTime: deliveryMode === "delivery" ? "30-40 mins" : "15-20 mins",
  };

  orders.push(newOrder);

  return res.status(201).json({
    success: true,
    message: "Order placed successfully! 🎉",
    orderId:       newOrder.orderId,
    status:        newOrder.status,
    estimatedTime: newOrder.estimatedTime,
    totalPrice:    newOrder.totalPrice,
    placedAt:      newOrder.placedAt,
  });
});

// ── GET /api/orders ───────────────────────────────────────────────────────────
// List all in-memory orders (useful for testing / admin use)

router.get("/", (req, res) => {
  return res.status(200).json({
    success: true,
    count: orders.length,
    data: orders,
  });
});

// ── GET /api/orders/:orderId ──────────────────────────────────────────────────
// Get a single order by orderId

router.get("/:orderId", (req, res) => {
  const order = orders.find((o) => o.orderId === req.params.orderId);

  if (!order) {
    return res.status(404).json({
      success: false,
      message: `Order '${req.params.orderId}' not found.`,
    });
  }

  return res.status(200).json({
    success: true,
    data: order,
  });
});

module.exports = router;
