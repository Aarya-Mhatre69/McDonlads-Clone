"use client";

import { useState } from "react";
import OutletCard, { type Outlet } from "./OutletCard";

// ─── Dummy Data ────────────────────────────────────────────────────────────────
// Images: real McDonald's product/store photos via open CDN
const DUMMY_OUTLETS: Outlet[] = [
  {
    id: "andheri-west",
    name: "McDonald's Andheri West",
    area: "Andheri West, Mumbai",
    distance: 1.2,
    isOpen: true,
    deliveryTime: 20,
    rating: 4.3,
    address: "Shop 4, Versova Link Rd, near D-Mart, Andheri West, Mumbai 400053",
    tags: ["24/7", "Drive-Thru", "McCafé"],
    imageUrl:
      "https://images.unsplash.com/photo-1561758033-d89a9ad46330?w=600&auto=format&fit=crop&q=80",
  },
  {
    id: "bandra-kurla",
    name: "McDonald's Bandra Kurla",
    area: "BKC, Mumbai",
    distance: 3.5,
    isOpen: true,
    deliveryTime: 30,
    rating: 4.5,
    address: "Plot C-66, G Block, Bandra Kurla Complex, Mumbai 400051",
    tags: ["McCafé", "McDelivery"],
    imageUrl:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&auto=format&fit=crop&q=80",
  },
  {
    id: "lower-parel",
    name: "McDonald's Lower Parel",
    area: "Lower Parel, Mumbai",
    distance: 5.1,
    isOpen: true,
    deliveryTime: 35,
    rating: 4.1,
    address: "Phoenix Mills, Senapati Bapat Marg, Lower Parel, Mumbai 400013",
    tags: ["Drive-Thru", "McDelivery"],
    imageUrl:
      "https://images.unsplash.com/photo-1550547660-d9450f859349?w=600&auto=format&fit=crop&q=80",
  },
  {
    id: "powai",
    name: "McDonald's Powai",
    area: "Powai, Mumbai",
    distance: 7.8,
    isOpen: false,
    deliveryTime: 45,
    rating: 4.0,
    address: "R-City Mall, LBS Marg, Ghatkopar West, Mumbai 400086",
    tags: ["Mall", "McCafé"],
    imageUrl:
      "https://images.unsplash.com/photo-1586816001966-79b736744398?w=600&auto=format&fit=crop&q=80",
  },
  {
    id: "juhu",
    name: "McDonald's Juhu",
    area: "Juhu, Mumbai",
    distance: 4.3,
    isOpen: true,
    deliveryTime: 28,
    rating: 4.4,
    address: "Juhu Tara Rd, near JVPD Scheme, Juhu, Mumbai 400049",
    tags: ["24/7", "McDelivery"],
    imageUrl:
      "https://images.unsplash.com/photo-1551782450-a2132b4ba21d?w=600&auto=format&fit=crop&q=80",
  },
  {
    id: "malad",
    name: "McDonald's Malad",
    area: "Malad West, Mumbai",
    distance: 9.2,
    isOpen: true,
    deliveryTime: 40,
    rating: 3.9,
    address: "Inorbit Mall, New Link Rd, Malad West, Mumbai 400064",
    tags: ["Mall", "Drive-Thru"],
    imageUrl:
      "https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?w=600&auto=format&fit=crop&q=80",
  },
];

const SORT_OPTIONS = ["Nearest", "Fastest", "Rating"] as const;
type SortOption = (typeof SORT_OPTIONS)[number];

function sortOutlets(outlets: Outlet[], by: SortOption): Outlet[] {
  const copy = [...outlets];
  if (by === "Nearest")  return copy.sort((a, b) => a.distance  - b.distance);
  if (by === "Fastest")  return copy.sort((a, b) => a.deliveryTime - b.deliveryTime);
  if (by === "Rating")   return copy.sort((a, b) => b.rating - a.rating);
  return copy;
}

export default function OutletList() {
  const [sort, setSort] = useState<SortOption>("Nearest");
  const [showOpen, setShowOpen] = useState(false);

  const filtered = showOpen
    ? DUMMY_OUTLETS.filter((o) => o.isOpen)
    : DUMMY_OUTLETS;
  const sorted = sortOutlets(filtered, sort);

  return (
    <section
      id="outlet-list-section"
      style={{ maxWidth: "1200px", margin: "0 auto", padding: "40px 24px 0" }}
      aria-label="Nearby outlets"
    >
      {/* Section header */}
      <div className="outlet-list-header">
        <div>
          <h2 className="outlet-list-title">
            <span className="outlet-list-title-accent">Nearby</span> Outlets
          </h2>
          <p className="outlet-list-subtitle">
            {sorted.length} McDonald's locations found near you
          </p>
        </div>

        {/* Controls */}
        <div className="outlet-controls" role="group" aria-label="Filter and sort outlets">
          {/* Open only toggle */}
          <label className="outlet-toggle-label" htmlFor="open-only-toggle">
            <input
              id="open-only-toggle"
              type="checkbox"
              className="sr-only"
              checked={showOpen}
              onChange={(e) => setShowOpen(e.target.checked)}
              aria-checked={showOpen}
            />
            <span className={`outlet-toggle-track ${showOpen ? "outlet-toggle-active" : ""}`}>
              <span className="outlet-toggle-thumb" />
            </span>
            Open Now
          </label>

          {/* Sort pills */}
          <div className="outlet-sort-group" role="radiogroup" aria-label="Sort outlets">
            {SORT_OPTIONS.map((opt) => (
              <button
                key={opt}
                id={`sort-${opt.toLowerCase()}`}
                role="radio"
                aria-checked={sort === opt}
                onClick={() => setSort(opt)}
                className={`outlet-sort-pill ${sort === opt ? "outlet-sort-pill-active" : ""}`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid */}
      {sorted.length === 0 ? (
        <div className="outlet-empty" role="status">
          <span aria-hidden="true">🔍</span>
          <p>No open outlets found right now. Try removing the filter.</p>
        </div>
      ) : (
        <div className="outlet-grid" role="list">
          {sorted.map((outlet) => (
            <div key={outlet.id} role="listitem">
              <OutletCard outlet={outlet} />
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
