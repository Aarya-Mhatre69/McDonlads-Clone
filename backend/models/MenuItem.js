const mongoose = require("mongoose");

const MenuItemSchema = new mongoose.Schema(
  {
    id:          { type: String, sparse: true, index: true },
    name:        { type: String, required: true, trim: true },
    category:    { type: String, enum: ["veg", "nonveg", "jain"], required: true },
    price:       { type: Number, required: true, min: 0 },
    ingredients: [{ type: String, trim: true }],
    spiceLevel:  { type: String, enum: ["low", "medium", "high"], default: "low" },
    image:       { type: String, default: "" },
    description: { type: String, default: "" },
    isPopular:   { type: Boolean, default: false },
    isAvailable: { type: Boolean, default: true },
  },
  { timestamps: true }
);

MenuItemSchema.index({ category: 1, isPopular: -1 });

module.exports = mongoose.models.MenuItem || mongoose.model("MenuItem", MenuItemSchema);
