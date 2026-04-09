"use client";

import { useState } from "react";

const OUTLETS = [
  {
    id: "mcd-connaught",
    city: "New Delhi",
    name: "Connaught Place",
    address: "Block A, Connaught Place, New Delhi 110001",
    hours: "7 AM – 12 AM",
    dineIn: true,
    delivery: true,
    rating: 4.7,
    distance: "1.2 km",
    wait: "20 min",
    color: "#DA291C",
  },
  {
    id: "mcd-bandra",
    city: "Mumbai",
    name: "Bandra West",
    address: "Linking Road, Bandra West, Mumbai 400050",
    hours: "8 AM – 1 AM",
    dineIn: true,
    delivery: true,
    rating: 4.8,
    distance: "2.5 km",
    wait: "25 min",
    color: "#FFC72C",
  },
  {
    id: "mcd-koramangala",
    city: "Bengaluru",
    name: "Koramangala",
    address: "5th Block, Koramangala, Bengaluru 560095",
    hours: "7 AM – 12 AM",
    dineIn: true,
    delivery: true,
    rating: 4.6,
    distance: "3.1 km",
    wait: "30 min",
    color: "#27AE60",
  },
  {
    id: "mcd-anna-nagar",
    city: "Chennai",
    name: "Anna Nagar",
    address: "2nd Avenue, Anna Nagar, Chennai 600040",
    hours: "8 AM – 11 PM",
    dineIn: true,
    delivery: false,
    rating: 4.5,
    distance: "4.0 km",
    wait: "15 min",
    color: "#9B59B6",
  },
  {
    id: "mcd-salt-lake",
    city: "Kolkata",
    name: "Salt Lake Sector V",
    address: "Sector V, Salt Lake City, Kolkata 700091",
    hours: "9 AM – 11 PM",
    dineIn: false,
    delivery: true,
    rating: 4.4,
    distance: "5.3 km",
    wait: "35 min",
    color: "#2980B9",
  },
  {
    id: "mcd-jubilee",
    city: "Hyderabad",
    name: "Jubilee Hills",
    address: "Road No. 36, Jubilee Hills, Hyderabad 500033",
    hours: "8 AM – 12 AM",
    dineIn: true,
    delivery: true,
    rating: 4.9,
    distance: "2.8 km",
    wait: "22 min",
    color: "#E67E22",
  },
];

type FilterType = "all" | "dine-in" | "delivery";

export default function OutletsPage() {
  const [filter, setFilter] = useState<FilterType>("all");
  const [search, setSearch] = useState("");

  const filtered = OUTLETS.filter((o) => {
    const matchFilter =
      filter === "all" ||
      (filter === "dine-in" && o.dineIn) ||
      (filter === "delivery" && o.delivery);
    const q = search.toLowerCase();
    const matchSearch =
      !q ||
      o.name.toLowerCase().includes(q) ||
      o.city.toLowerCase().includes(q) ||
      o.address.toLowerCase().includes(q);
    return matchFilter && matchSearch;
  });

  return (
    <div className="min-h-screen" style={{ background: "#0F0F0F" }}>
      {/* ════════════════ HERO BANNER ════════════════ */}
      <section
        className="relative overflow-hidden flex items-end"
        style={{ minHeight: "340px", paddingBottom: "60px" }}
      >
        {/* Layered radial glows */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 20% 50%, rgba(218,41,28,0.18) 0%, transparent 70%), radial-gradient(ellipse 60% 80% at 80% 30%, rgba(255,199,44,0.13) 0%, transparent 65%), #0F0F0F",
          }}
        />

        {/* Grid pattern */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.8) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.8) 1px,transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />

        {/* Floating pin emoji — decorative */}
        <div
          className="absolute right-8 top-8 text-[120px] opacity-[0.06] select-none pointer-events-none"
          aria-hidden="true"
          style={{ filter: "blur(2px)" }}
        >
          📍
        </div>
        <div
          className="absolute right-48 bottom-12 text-[60px] opacity-[0.05] select-none pointer-events-none"
          aria-hidden="true"
          style={{ filter: "blur(1px)", transform: "rotate(-15deg)" }}
        >
          📍
        </div>

        {/* Hero content */}
        <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 w-full">
          {/* Breadcrumb */}
          <p className="text-[11px] font-semibold tracking-[0.3em] uppercase mb-5" style={{ color: "#FFC72C" }}>
            Find Us · Across India
          </p>

          <h1
            className="text-white leading-none mb-4"
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "clamp(52px, 9vw, 100px)",
            }}
          >
            Our{" "}
            <span
              style={{
                WebkitTextStroke: "2px #FFC72C",
                color: "transparent",
              }}
            >
              Outlets
            </span>
          </h1>

          <p className="text-[#6B6B78] text-base max-w-xl leading-relaxed mb-8">
            Discover McDonald&apos;s India restaurants near you — dine in, take away or order delivery from your favourite outlet.
          </p>

          {/* Stat pills */}
          <div className="flex flex-wrap gap-3">
            {[
              { label: "Cities", value: "6+" },
              { label: "Outlets", value: "50+" },
              { label: "Avg Rating", value: "4.6 ★" },
              { label: "Open Now", value: "48" },
            ].map((s) => (
              <div
                key={s.label}
                className="flex items-center gap-2.5 px-4 py-2 rounded-full"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <span className="font-black text-white text-sm">{s.value}</span>
                <span className="text-[#5A5A68] text-xs font-medium">{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom fade */}
        <div
          className="absolute bottom-0 left-0 right-0 h-20 pointer-events-none"
          style={{ background: "linear-gradient(to bottom, transparent, #0F0F0F)" }}
        />
      </section>

      {/* ════════════════ SEARCH + FILTER BAR ════════════════ */}
      <div
        className="sticky z-30"
        style={{
          top: "68px",
          background: "rgba(15,15,15,0.92)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-3 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">

          {/* Search */}
          <div className="relative flex-1 max-w-sm">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#5A5A68] pointer-events-none text-sm">
              🔍
            </span>
            <input
              type="text"
              placeholder="Search city or outlet…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 rounded-xl text-sm text-white placeholder-[#4A4A58] outline-none transition-all duration-200"
              style={{
                background: "#1A1A1A",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
              onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(255,199,44,0.4)")}
              onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)")}
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#5A5A68] hover:text-white transition-colors text-xs"
              >
                ✕
              </button>
            )}
          </div>

          {/* Filter pills */}
          <div className="flex gap-2">
            {(["all", "dine-in", "delivery"] as FilterType[]).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className="px-4 py-2 rounded-xl text-xs font-bold capitalize transition-all duration-200 whitespace-nowrap"
                style={
                  filter === f
                    ? {
                        background: "linear-gradient(135deg,#FFC72C,#FFB800)",
                        color: "#1A1A1A",
                        border: "1px solid transparent",
                      }
                    : {
                        background: "#1A1A1A",
                        color: "#6B6B78",
                        border: "1px solid rgba(255,255,255,0.08)",
                      }
                }
              >
                {f === "all" ? "🗺 All" : f === "dine-in" ? "🍽 Dine-In" : "🛵 Delivery"}
              </button>
            ))}
          </div>

          {/* Result count */}
          <span className="text-[#4A4A58] text-xs font-medium ml-auto hidden sm:block whitespace-nowrap">
            {filtered.length} outlet{filtered.length !== 1 ? "s" : ""} found
          </span>
        </div>
      </div>

      {/* ════════════════ OUTLET GRID ════════════════ */}
      <main className="max-w-7xl mx-auto px-5 sm:px-8 py-10">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <span className="text-6xl opacity-40">📍</span>
            <p className="text-[#4A4A58] text-base font-medium">No outlets match your search.</p>
            <button
              onClick={() => { setSearch(""); setFilter("all"); }}
              className="mt-1 px-5 py-2 rounded-xl text-sm font-bold text-[#1A1A1A] transition hover:opacity-90"
              style={{ background: "linear-gradient(135deg,#FFC72C,#FFB800)" }}
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {filtered.map((outlet, i) => (
              <OutletCard key={outlet.id} outlet={outlet} index={i} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

/* ─────────────────── OUTLET CARD ─────────────────── */
function OutletCard({
  outlet,
  index,
}: {
  outlet: (typeof OUTLETS)[0];
  index: number;
}) {
  const isOpen = true; // for demo, all open

  return (
    <div
      id={outlet.id}
      className="group relative flex flex-col rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1.5"
      style={{
        background: "#161616",
        border: "1px solid rgba(255,255,255,0.07)",
        boxShadow: "0 2px 20px rgba(0,0,0,0.35)",
        animationDelay: `${index * 60}ms`,
      }}
    >
      {/* Coloured top accent bar */}
      <div
        className="h-1 w-full transition-all duration-300 group-hover:h-[3px]"
        style={{ background: `linear-gradient(90deg, ${outlet.color}, ${outlet.color}88)` }}
      />

      {/* Card body */}
      <div className="flex flex-col flex-1 p-5 gap-4">

        {/* Top row: city badge + status + rating */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex flex-col gap-1.5">
            <span
              className="inline-block px-2.5 py-0.5 rounded-lg text-[10px] font-bold tracking-widest uppercase"
              style={{
                background: `${outlet.color}18`,
                color: outlet.color,
                border: `1px solid ${outlet.color}30`,
              }}
            >
              {outlet.city}
            </span>
            <h2 className="text-white font-bold text-[17px] leading-snug group-hover:text-[#FFC72C] transition-colors duration-200">
              {outlet.name}
            </h2>
          </div>

          {/* Rating badge */}
          <div
            className="flex-shrink-0 flex items-center gap-1 px-2.5 py-1.5 rounded-xl"
            style={{
              background: "rgba(255,199,44,0.1)",
              border: "1px solid rgba(255,199,44,0.2)",
            }}
          >
            <span style={{ color: "#FFC72C", fontSize: 12 }}>★</span>
            <span className="text-white font-bold text-[13px]">{outlet.rating}</span>
          </div>
        </div>

        {/* Address */}
        <p className="text-[#5A5A68] text-sm leading-relaxed" style={{ minHeight: 38 }}>
          {outlet.address}
        </p>

        {/* Meta rows */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 text-[#5A5A68] text-xs">
            <span>🕐</span>
            <span>{outlet.hours}</span>
            <span className="ml-auto flex items-center gap-1">
              <span
                className="inline-block w-1.5 h-1.5 rounded-full"
                style={{ background: isOpen ? "#27AE60" : "#DA291C" }}
              />
              <span style={{ color: isOpen ? "#27AE60" : "#DA291C" }} className="font-semibold">
                {isOpen ? "Open" : "Closed"}
              </span>
            </span>
          </div>

          <div className="flex items-center gap-3 text-[#5A5A68] text-xs">
            <span className="flex items-center gap-1">
              <span>📍</span>
              <span>{outlet.distance}</span>
            </span>
            <span className="flex items-center gap-1">
              <span>⏱</span>
              <span>{outlet.wait} wait</span>
            </span>
          </div>
        </div>

        {/* Service badges */}
        <div className="flex gap-2">
          {outlet.dineIn && (
            <span
              className="px-2.5 py-1 rounded-lg text-[11px] font-semibold"
              style={{
                background: "rgba(39,174,96,0.12)",
                color: "#27AE60",
                border: "1px solid rgba(39,174,96,0.2)",
              }}
            >
              🍽 Dine-In
            </span>
          )}
          {outlet.delivery && (
            <span
              className="px-2.5 py-1 rounded-lg text-[11px] font-semibold"
              style={{
                background: "rgba(255,199,44,0.1)",
                color: "#FFC72C",
                border: "1px solid rgba(255,199,44,0.2)",
              }}
            >
              🛵 Delivery
            </span>
          )}
          {!outlet.dineIn && !outlet.delivery && (
            <span className="px-2.5 py-1 rounded-lg text-[11px] font-semibold text-[#5A5A68]"
              style={{ background: "#1E1E1E", border: "1px solid rgba(255,255,255,0.06)" }}>
              Takeaway Only
            </span>
          )}
        </div>

        {/* Divider */}
        <div style={{ height: 1, background: "rgba(255,255,255,0.05)" }} />

        {/* CTA buttons */}
        <div className="flex gap-2 mt-auto">
          <button
            className="flex-1 py-2.5 rounded-xl text-sm font-bold text-white transition-all duration-200 hover:opacity-80"
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            📍 Directions
          </button>
          <button
            className="flex-1 py-2.5 rounded-xl text-sm font-bold text-[#1A1A1A] transition-all duration-200 hover:opacity-90 hover:scale-[1.02]"
            style={{ background: "linear-gradient(135deg,#FFC72C,#FFB800)" }}
          >
            Order Now →
          </button>
        </div>
      </div>

      {/* Hover glow border */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{ boxShadow: `inset 0 0 0 1px ${outlet.color}30` }}
      />
    </div>
  );
}
