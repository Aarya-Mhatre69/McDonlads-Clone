const mongoose = require("mongoose");

const OrderItemSchema = new mongoose.Schema(
  {
    id:       { type: String, required: true },
    name:     { type: String, required: true },
    price:    { type: Number, required: true, min: 0 },
    qty:      { type: Number, required: true, min: 1 },
    image:    { type: String, default: "" },
    category: { type: String, enum: ["veg", "nonveg", "jain"] },
  },
  { _id: false }
);

const OrderSchema = new mongoose.Schema(
  {
    userId:          { type: String, required: true, index: true },
    items:           { type: [OrderItemSchema], required: true, validate: { validator: v => v.length > 0, message: "Order must contain at least one item." } },
    deliveryMode:    { type: String, enum: ["delivery", "dine-in"], required: true },
    deliveryAddress: { type: String, default: "" },
    couponCode:      { type: String, default: null },
    discount:        { type: Number, default: 0, min: 0 },
    subtotal:        { type: Number, required: true, min: 0 },
    gst:             { type: Number, required: true, min: 0 },
    deliveryFee:     { type: Number, default: 0, min: 0 },
    totalAmount:     { type: Number, required: true, min: 0 },
    status: {
      type: String,
      enum: ["pending", "confirmed", "preparing", "out_for_delivery", "delivered", "cancelled"],
      default: "confirmed",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.models.Order || mongoose.model("Order", OrderSchema);
