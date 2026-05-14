const mongoose = require("mongoose");

const OutletSchema = new mongoose.Schema(
  {
    id:       { type: String, sparse: true, index: true },
    name:     { type: String, required: true, trim: true },
    city:     { type: String, required: true, trim: true, index: true },
    address:  { type: String, required: true },
    phone:    { type: String, default: "" },
    hours:    { type: String, default: "" },
    rating:   { type: Number, min: 0, max: 5, default: 4.0 },
    distance: { type: String, default: "" },
    wait:     { type: String, default: "" },
    dineIn:   { type: Boolean, default: true },
    delivery: { type: Boolean, default: true },
    isOpen:   { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.models.Outlet || mongoose.model("Outlet", OutletSchema);
