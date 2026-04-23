"use client";

import { useState } from "react";
import type { MenuItem } from "@/data/menuItems";
import { useCart } from "@/context/CartContext";

interface MenuCardProps {
  item: MenuItem;
}

const SPICE_CONFIG = {
  low:    { label:"Mild",   color:"#16a34a", bg:"rgba(22,163,74,0.08)",   dots:1 },
  medium: { label:"Medium", color:"#d97706", bg:"rgba(217,119,6,0.08)",   dots:2 },
  high:   { label:"Hot",    color:"#DC2626", bg:"rgba(220,38,38,0.08)",   dots:3 },
};

const CATEGORY_COLOR: Record<string, string> = {
  veg:    "#16a34a",
  nonveg: "#DC2626",
  jain:   "#d97706",
};

export default function MenuCard({ item }: MenuCardProps) {
  const { addItem, items, increment } = useCart();
  const [added, setAdded] = useState(false);

  const cartEntry = items.find(i => i.id === item.id);
  const spice = SPICE_CONFIG[item.spiceLevel] ?? SPICE_CONFIG.low;

  function handleAdd() {
    if (cartEntry) increment(item.id);
    else addItem({ id:item.id, name:item.name, price:item.price, image:item.image });
    setAdded(true);
    setTimeout(() => setAdded(false), 900);
  }

  return (
    <article
      id={`menu-card-${item.id}`}
      className="menu-card"
      aria-label={`${item.name}, ₹${item.price}`}
    >
      {/* ── Image ── */}
      <div className="menu-card-image-wrap">
        {item.image ? (
          <img src={item.image} alt={item.name} className="menu-card-image" loading="lazy" />
        ) : (
          /* Placeholder when no image set */
          <div style={{ width:"100%", height:"100%", background:"linear-gradient(135deg,#FFF8E1,#FFFDF5)", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:8 }}>
            <div style={{ width:52, height:52, borderRadius:"50%", background:"#FFC72C", display:"flex", alignItems:"center", justifyContent:"center" }}>
              <span style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:28, fontWeight:900, color:"#DA291C", lineHeight:1 }}>M</span>
            </div>
            <span style={{ fontSize:11, color:"#C8A84B", fontFamily:"'Outfit',sans-serif", fontWeight:600 }}>No image set</span>
          </div>
        )}

        {/* Veg / Non-Veg / Jain dot — FSSAI style */}
        <div
          className="menu-card-category-dot"
          style={{ borderColor:CATEGORY_COLOR[item.category], color:CATEGORY_COLOR[item.category] }}
          title={item.category === "veg" ? "Pure Veg" : item.category === "nonveg" ? "Non-Veg" : "Jain"}
        >
          <span style={{ background:CATEGORY_COLOR[item.category] }} className="menu-card-category-dot-inner" />
        </div>

        {/* Popular badge */}
        {item.isPopular && (
          <span className="menu-card-popular-badge">★ Popular</span>
        )}
      </div>

      {/* ── Body ── */}
      <div className="menu-card-body">
        <h3 className="menu-card-name">{item.name}</h3>
        <p className="menu-card-desc">{item.description}</p>

        {/* Ingredient chips */}
        {item.ingredients?.length > 0 && (
          <div className="menu-card-ingredients">
            {item.ingredients.slice(0, 3).map(ing => (
              <span key={ing} className="menu-card-ingredient">{ing}</span>
            ))}
            {item.ingredients.length > 3 && (
              <span className="menu-card-ingredient menu-card-ingredient-more">
                +{item.ingredients.length - 3}
              </span>
            )}
          </div>
        )}

        {/* Spice level */}
        <div className="menu-card-spice" style={{ background:spice.bg, border:`1px solid ${spice.color}22` }}>
          <span className="menu-card-spice-dots" aria-hidden="true">
            {[0,1,2].map(i => (
              <span key={i} style={{ background: i < spice.dots ? spice.color : "#E8E8E8" }} className="menu-card-spice-dot" />
            ))}
          </span>
          <span style={{ color:spice.color }} className="menu-card-spice-label">{spice.label}</span>
        </div>

        {/* Footer */}
        <div className="menu-card-footer">
          <div className="menu-card-price-wrap">
            <span className="menu-card-price">₹{item.price}</span>
            {cartEntry && (
              <span className="menu-card-in-cart" aria-live="polite">{cartEntry.quantity} in cart</span>
            )}
          </div>
          <button
            id={`add-to-cart-${item.id}`}
            onClick={handleAdd}
            className={`menu-card-add-btn ${added ? "menu-card-add-btn-flash" : ""}`}
            aria-label={cartEntry ? `Add another ${item.name}` : `Add ${item.name} to cart`}
          >
            {added ? "✓ Added" : cartEntry ? "Add More" : "Add +"}
          </button>
        </div>
      </div>
    </article>
  );
}