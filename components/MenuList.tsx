"use client";

import { useState, useMemo } from "react";
import { MENU_ITEMS, type MenuItem } from "@/data/menuItems";
import FilterBar, { type FilterCategory } from "./FilterBar";
import MenuCard from "./MenuCard";

interface Props {
  initialItems?: MenuItem[];
}

export default function MenuList({ initialItems }: Props) {
  const source = initialItems ?? MENU_ITEMS;

  const [activeFilter, setActiveFilter] = useState<FilterCategory>("all");
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    let items = source;
    if (activeFilter !== "all") items = items.filter(i => i.category === activeFilter);
    if (search.trim()) {
      const q = search.toLowerCase();
      items = items.filter(
        i =>
          i.name.toLowerCase().includes(q) ||
          i.description.toLowerCase().includes(q) ||
          i.ingredients.some(ing => ing.toLowerCase().includes(q))
      );
    }
    return items;
  }, [activeFilter, search, source]);

  const counts = useMemo(() => ({
    all:    source.length,
    veg:    source.filter(i => i.category === "veg").length,
    nonveg: source.filter(i => i.category === "nonveg").length,
    jain:   source.filter(i => i.category === "jain").length,
  } satisfies Record<FilterCategory, number>), [source]);

  return (
    <div id="menu-list">
      <div className="menu-search-wrap" role="search">
        <svg className="menu-search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <input
          id="menu-search-input"
          type="search"
          className="menu-search-input"
          placeholder="Search items, ingredients…"
          value={search}
          onChange={e => setSearch(e.target.value)}
          aria-label="Search menu items"
        />
        {search && (
          <button className="menu-search-clear" onClick={() => setSearch("")} aria-label="Clear search" type="button">
            ✕
          </button>
        )}
      </div>

      <FilterBar active={activeFilter} onChange={setActiveFilter} counts={counts} />

      <p className="menu-result-count" role="status" aria-live="polite">
        {filtered.length === 0
          ? "No items match your filter."
          : `Showing ${filtered.length} item${filtered.length !== 1 ? "s" : ""}`}
        {activeFilter !== "all" && ` in ${activeFilter}`}
        {search && ` matching "${search}"`}
      </p>

      {filtered.length === 0 ? (
        <div className="menu-empty" role="status">
          <span aria-hidden="true">🔍</span>
          <p>No items found. Try changing your filter or search.</p>
          <button onClick={() => { setActiveFilter("all"); setSearch(""); }} className="menu-reset-btn" type="button">
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="menu-grid" role="list">
          {filtered.map(item => (
            <div key={item.id} role="listitem">
              <MenuCard item={item} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
