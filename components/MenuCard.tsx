"use client";

import { useState } from "react";
import type { MenuItem } from "@/data/menuItems";
import { useCart } from "@/context/CartContext";

interface MenuCardProps {
  item: MenuItem;
}

// Spice level badge config
const SPICE_CONFIG = {
  low:    { label: "Mild",   color: "#15803d", bg: "#dcfce7", dots: 1 },
  medium: { label: "Medium", color: "#b45309", bg: "#fef3c7", dots: 2 },
  high:   { label: "Hot",    color: "#dc2626", bg: "#fee2e2", dots: 3 },
};

// Category dot color (veg = green, nonveg = red, jain = brown)
const CATEGORY_DOT: Record<string, string> = {
  veg:    "#16a34a",
  nonveg: "#dc2626",
  jain:   "#92400e",
};

export default function MenuCard({ item }: MenuCardProps) {
  const { addItem, items, increment } = useCart();
  const [added, setAdded] = useState(false);

  const cartEntry = items.find((i) => i.id === item.id);
  const spice = SPICE_CONFIG[item.spiceLevel];

  function handleAdd() {
    if (cartEntry) {
      increment(item.id);
    } else {
      addItem({ id: item.id, name: item.name, price: item.price, image: item.image });
    }
    // Flash animation
    setAdded(true);
    setTimeout(() => setAdded(false), 800);
  }

  return (
    <article
      id={`menu-card-${item.id}`}
      className="menu-card"
      aria-label={`${item.name}, ₹${item.price}`}
    >
      {/* ── Image ── */}
      <div className="menu-card-image-wrap">
        <img
          src={item.image}
          alt={item.name}
          className="menu-card-image"
          loading="lazy"
        />
        {/* Veg/Non-veg/Jain indicator */}
        <div
          className="menu-card-category-dot"
          style={{ borderColor: CATEGORY_DOT[item.category], color: CATEGORY_DOT[item.category] }}
          title={item.category === "veg" ? "Pure Veg" : item.category === "nonveg" ? "Non-Veg" : "Jain"}
          aria-label={item.category}
        >
          <span
            style={{ background: CATEGORY_DOT[item.category] }}
            className="menu-card-category-dot-inner"
          />
        </div>
        {/* Popular badge */}
        {item.isPopular && (
          <span className="menu-card-popular-badge" aria-label="Popular item">
            ⭐ Popular
          </span>
        )}
      </div>

      {/* ── Body ── */}
      <div className="menu-card-body">
        {/* Name */}
        <h3 className="menu-card-name">{item.name}</h3>

        {/* Description */}
        <p className="menu-card-desc">{item.description}</p>

        {/* Ingredients */}
        <div className="menu-card-ingredients">
          {item.ingredients.slice(0, 3).map((ing) => (
            <span key={ing} className="menu-card-ingredient">{ing}</span>
          ))}
          {item.ingredients.length > 3 && (
            <span className="menu-card-ingredient menu-card-ingredient-more">
              +{item.ingredients.length - 3} more
            </span>
          )}
        </div>

        {/* Spice level */}
        <div className="menu-card-spice" style={{ background: spice.bg }}>
          <span className="menu-card-spice-dots" aria-hidden="true">
            {Array.from({ length: 3 }).map((_, i) => (
              <span
                key={i}
                style={{ background: i < spice.dots ? spice.color : "#d4d4d8" }}
                className="menu-card-spice-dot"
              />
            ))}
          </span>
          <span style={{ color: spice.color }} className="menu-card-spice-label">
            {spice.label}
          </span>
        </div>

        {/* Footer: Price + Cart button */}
        <div className="menu-card-footer">
          <div className="menu-card-price-wrap">
            <span className="menu-card-price">₹{item.price}</span>
            {cartEntry && (
              <span className="menu-card-in-cart" aria-live="polite">
                {cartEntry.quantity} in cart
              </span>
            )}
          </div>
          <button
            id={`add-to-cart-${item.id}`}
            onClick={handleAdd}
            className={`menu-card-add-btn ${added ? "menu-card-add-btn-flash" : ""}`}
            aria-label={cartEntry ? `Add another ${item.name} to cart` : `Add ${item.name} to cart`}
          >
            {added ? "✓ Added!" : cartEntry ? `Add More` : "Add +"}
          </button>
        </div>
      </div>
    </article>
  );
}
