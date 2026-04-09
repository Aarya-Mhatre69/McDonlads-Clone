"use client";

import { useState } from "react";
import OutletCard, { type Outlet } from "./OutletCard";

// ─────────────────────────────────────────────────────────
// OUTLET DATA
// Set imageUrl to a path like "/images/andheri.jpg" or
// an external URL. Leave "" for a blank placeholder slot.
// ─────────────────────────────────────────────────────────
const ALL_OUTLETS: Outlet[] = [
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
    imageUrl: "", // ← add your image path here
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
    imageUrl: "",
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
    imageUrl: "",
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
    imageUrl: "",
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
    imageUrl: "",
  },

  {
    id: "connaught",
    name: "McDonald's Connaught Place",
    area: "Connaught Place, New Delhi",
    distance: 1.8,
    isOpen: true,
    deliveryTime: 22,
    rating: 4.7,
    address: "Block A, Connaught Place, New Delhi 110001",
    tags: ["McCafé", "McDelivery"],
    imageUrl: "",
  },
  {
    id: "koramangala",
    name: "McDonald's Koramangala",
    area: "Koramangala, Bengaluru",
    distance: 3.1,
    isOpen: true,
    deliveryTime: 30,
    rating: 4.6,
    address: "5th Block, Koramangala, Bengaluru 560095",
    tags: ["Drive-Thru", "24/7"],
    imageUrl: "",
  },
  {
    id: "jubilee-hills",
    name: "McDonald's Jubilee Hills",
    area: "Jubilee Hills, Hyderabad",
    distance: 2.8,
    isOpen: false,
    deliveryTime: 22,
    rating: 4.9,
    address: "Road No. 36, Jubilee Hills, Hyderabad 500033",
    tags: ["McCafé", "McDelivery"],
    imageUrl: "",
  },
];

// ─────────────────────────────────────────────────────────
// CITIES derived from outlet data (for dropdown)
// ─────────────────────────────────────────────────────────
const ALL_CITIES = ["All Cities", ...Array.from(new Set(ALL_OUTLETS.map(o => o.area.split(", ").pop() as string))).sort()];

const SORT_OPTIONS = ["Nearest", "Fastest", "Rating"] as const;
type SortOption = (typeof SORT_OPTIONS)[number];

function sortOutlets(outlets: Outlet[], by: SortOption): Outlet[] {
  const copy = [...outlets];
  if (by === "Nearest") return copy.sort((a, b) => a.distance - b.distance);
  if (by === "Fastest") return copy.sort((a, b) => a.deliveryTime - b.deliveryTime);
  if (by === "Rating") return copy.sort((a, b) => b.rating - a.rating);
  return copy;
}

export default function OutletList() {
  const [city, setCity] = useState("All Cities");
  const [sort, setSort] = useState<SortOption>("Nearest");
  const [showOpen, setShowOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const filtered = ALL_OUTLETS.filter(o => {
    const matchCity = city === "All Cities" || o.area.includes(city);
    const matchOpen = !showOpen || o.isOpen;
    return matchCity && matchOpen;
  });
  const sorted = sortOutlets(filtered, sort);

  return (
    <section
      id="outlet-list-section"
      aria-label="Nearby outlets"
      style={{ background: "#fff" }}
    >
      {/* ══════════════════════════════════════
          SELECT CITY HERO — matches reference
      ══════════════════════════════════════ */}
      <div
        style={{
          display: "flex",
          alignItems: "stretch",
          minHeight: 480,
          borderBottom: "1px solid #EBEBEB",
        }}
      >
        {/* LEFT: City selector */}
        <div
          style={{
            width: "38%",
            flexShrink: 0,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "60px 56px",
            background: "#fff",
          }}
        >
          <h2
            style={{
              fontSize: "clamp(28px, 3vw, 44px)",
              fontWeight: 900,
              color: "#1A1A1A",
              marginBottom: 28,
              fontFamily: "'Arial Black', sans-serif",
              lineHeight: 1.1,
            }}
          >
            Select City
          </h2>

          {/* Custom dropdown */}
          <div style={{ position: "relative", maxWidth: 340 }}>
            <button
              onClick={() => setDropdownOpen(v => !v)}
              aria-haspopup="listbox"
              aria-expanded={dropdownOpen}
              style={{
                width: "100%",
                padding: "14px 20px",
                borderRadius: 32,
                border: "none",
                background: "#FFC72C",
                color: city === "All Cities" ? "#999" : "#1A1A1A",
                fontSize: 16,
                fontWeight: 700,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 10,
                textAlign: "left",
                transition: "background 0.2s",
              }}
            >
              {/* Pin icon */}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1A1A1A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <span style={{ flex: 1 }}>
                {city === "All Cities" ? "Select a City" : city}
              </span>
              {/* Chevron */}
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#1A1A1A"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ flexShrink: 0, transition: "transform 0.2s", transform: dropdownOpen ? "rotate(180deg)" : "rotate(0deg)" }}
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>

            {/* Dropdown list */}
            {dropdownOpen && (
              <ul
                role="listbox"
                style={{
                  position: "absolute",
                  top: "calc(100% + 6px)",
                  left: 0,
                  right: 0,
                  background: "#fff",
                  border: "1px solid #EBEBEB",
                  borderRadius: 16,
                  boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
                  zIndex: 50,
                  overflow: "hidden",
                  listStyle: "none",
                  padding: "6px 0",
                  margin: 0,
                }}
              >
                {ALL_CITIES.map(c => (
                  <li
                    key={c}
                    role="option"
                    aria-selected={city === c}
                    onClick={() => { setCity(c); setDropdownOpen(false); }}
                    style={{
                      padding: "11px 20px",
                      fontSize: 14,
                      fontWeight: city === c ? 700 : 500,
                      color: city === c ? "#DA291C" : "#1A1A1A",
                      background: city === c ? "#FFF8E1" : "transparent",
                      cursor: "pointer",
                      transition: "background 0.15s",
                    }}
                    onMouseEnter={e => { if (city !== c) (e.currentTarget as HTMLLIElement).style.background = "#F9F9F9"; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLLIElement).style.background = city === c ? "#FFF8E1" : "transparent"; }}
                  >
                    {c}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Tooltip hint — matches reference "Please select a city" callout */}
          {city === "All Cities" && (
            <div
              style={{
                marginTop: 20,
                padding: "12px 18px",
                background: "#DA291C",
                color: "#fff",
                borderRadius: 12,
                fontSize: 13,
                fontWeight: 600,
                maxWidth: 260,
                lineHeight: 1.5,
                position: "relative",
              }}
            >
              Please select a city to find the nearest McDonald's store
              {/* Arrow */}
              <div
                style={{
                  position: "absolute",
                  top: -8,
                  left: 24,
                  width: 0,
                  height: 0,
                  borderLeft: "8px solid transparent",
                  borderRight: "8px solid transparent",
                  borderBottom: "8px solid #DA291C",
                }}
              />
            </div>
          )}
        </div>

        {/* RIGHT: Hero image placeholder */}
        <div
          style={{
            flex: 1,
            position: "relative",
            overflow: "hidden",
            background: "#F8F8F8",
          }}
        >
          {/*
           * ── HERO IMAGE SLOT ──────────────────────────────
           * Replace the placeholder below with your image:
           *   <img src="/images/outlets-hero.jpg" alt="McDonald's restaurants" style={{ width:"100%", height:"100%", objectFit:"cover" }} />
           * Or use next/image:
           *   <Image src="/images/outlets-hero.jpg" alt="..." fill style={{ objectFit:"cover" }} />
           * ────────────────────────────────────────────────
           */}
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 14,
            }}
          >
            <div
              style={{
                width: 72,
                height: 72,
                borderRadius: "50%",
                border: "2px dashed #C8C8C8",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                <path d="M21 15V19C21 20.1 20.1 21 19 21H5C3.9 21 3 20.1 3 19V15" stroke="#AAAAAA" strokeWidth="2" strokeLinecap="round" />
                <path d="M17 8L12 3L7 8" stroke="#AAAAAA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M12 3V15" stroke="#AAAAAA" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
            <p style={{ color: "#AAAAAA", fontSize: 12, fontWeight: 600, letterSpacing: "0.04em" }}>
              Add hero image here
            </p>
          </div>

          {/* Confetti-style decorative dots (matches reference aesthetic) */}
          {[
            { top: "12%", left: "8%", size: 14, color: "#FFC72C", rotate: 20 },
            { top: "25%", left: "15%", size: 10, color: "#DA291C", rotate: -10 },
            { top: "60%", left: "6%", size: 18, color: "#27AE60", rotate: 45 },
            { top: "75%", left: "20%", size: 12, color: "#2980B9", rotate: -30 },
            { top: "40%", left: "25%", size: 8, color: "#FFC72C", rotate: 15 },
          ].map((dot, i) => (
            <div
              key={i}
              style={{
                position: "absolute",
                top: dot.top,
                left: dot.left,
                width: dot.size,
                height: dot.size * 0.5,
                background: dot.color,
                borderRadius: 2,
                transform: `rotate(${dot.rotate}deg)`,
                opacity: 0.35,
                pointerEvents: "none",
              }}
            />
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════════
          CONTROLS BAR
      ══════════════════════════════════════ */}
      <div
        style={{
          background: "#fff",
          borderBottom: "1px solid #F0F0F0",
          padding: "16px 56px",
          display: "flex",
          alignItems: "center",
          gap: 12,
          flexWrap: "wrap",
          position: "sticky",
          top: 68,
          zIndex: 20,
        }}
      >
        {/* Result count */}
        <p style={{ fontSize: 13, color: "#888", fontWeight: 500, marginRight: "auto" }}>
          <span style={{ color: "#1A1A1A", fontWeight: 800 }}>{sorted.length}</span> outlet{sorted.length !== 1 ? "s" : ""} found
          {city !== "All Cities" && <span> in <span style={{ color: "#DA291C", fontWeight: 700 }}>{city}</span></span>}
        </p>

        {/* Open Now toggle */}
        <label
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            fontSize: 13,
            fontWeight: 600,
            color: "#555",
            cursor: "pointer",
            userSelect: "none",
          }}
        >
          <span
            onClick={() => setShowOpen(v => !v)}
            style={{
              width: 38,
              height: 22,
              borderRadius: 11,
              background: showOpen ? "#27AE60" : "#D0D0D0",
              position: "relative",
              transition: "background 0.2s",
              cursor: "pointer",
              flexShrink: 0,
            }}
          >
            <span
              style={{
                position: "absolute",
                top: 3,
                left: showOpen ? 19 : 3,
                width: 16,
                height: 16,
                borderRadius: "50%",
                background: "#fff",
                transition: "left 0.2s",
                boxShadow: "0 1px 4px rgba(0,0,0,0.2)",
              }}
            />
          </span>
          Open Now
        </label>

        {/* Sort pills */}
        <div style={{ display: "flex", gap: 6 }} role="radiogroup" aria-label="Sort outlets">
          {SORT_OPTIONS.map(opt => (
            <button
              key={opt}
              role="radio"
              aria-checked={sort === opt}
              onClick={() => setSort(opt)}
              style={{
                padding: "7px 16px",
                borderRadius: 20,
                border: sort === opt ? "none" : "1px solid #EBEBEB",
                background: sort === opt ? "#FFC72C" : "#fff",
                color: sort === opt ? "#1A1A1A" : "#666",
                fontSize: 12,
                fontWeight: 700,
                cursor: "pointer",
                transition: "all 0.15s ease",
              }}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════════
          OUTLET GRID
      ══════════════════════════════════════ */}
      <div style={{ padding: "40px 56px 80px" }}>
        {sorted.length === 0 ? (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: "80px 24px",
              gap: 16,
            }}
          >
            <div
              style={{
                width: 64,
                height: 64,
                borderRadius: "50%",
                background: "#F5F5F5",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#AAAAAA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
            </div>
            <p style={{ color: "#888", fontSize: 15, fontWeight: 600 }}>No outlets match your filters.</p>
            <button
              onClick={() => { setCity("All Cities"); setShowOpen(false); }}
              style={{
                padding: "10px 24px",
                borderRadius: 24,
                border: "none",
                background: "#FFC72C",
                color: "#1A1A1A",
                fontSize: 13,
                fontWeight: 800,
                cursor: "pointer",
              }}
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
              gap: 24,
            }}
          >
            {sorted.map(outlet => (
              <OutletCard key={outlet.id} outlet={outlet} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}