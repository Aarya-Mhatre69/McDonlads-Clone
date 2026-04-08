"use client";

export type FilterCategory = "all" | "veg" | "nonveg" | "jain";

interface FilterBarProps {
  active: FilterCategory;
  onChange: (cat: FilterCategory) => void;
  counts: Record<FilterCategory, number>;
}

const FILTERS: { key: FilterCategory; label: string; icon: string }[] = [
  { key: "all",    label: "All Items",  icon: "🍔" },
  { key: "veg",    label: "Veg",        icon: "🥗" },
  { key: "nonveg", label: "Non-Veg",    icon: "🍗" },
  { key: "jain",   label: "Jain",       icon: "🌿" },
];

export default function FilterBar({ active, onChange, counts }: FilterBarProps) {
  return (
    <div
      id="menu-filter-bar"
      className="menu-filter-bar"
      role="group"
      aria-label="Menu category filters"
    >
      {FILTERS.map(({ key, label, icon }) => (
        <button
          key={key}
          id={`filter-${key}`}
          onClick={() => onChange(key)}
          aria-pressed={active === key}
          className={`menu-filter-pill ${active === key ? "menu-filter-pill-active" : ""}`}
        >
          <span className="menu-filter-icon" aria-hidden="true">{icon}</span>
          <span>{label}</span>
          <span
            className={`menu-filter-count ${active === key ? "menu-filter-count-active" : ""}`}
            aria-label={`${counts[key]} items`}
          >
            {counts[key]}
          </span>
        </button>
      ))}
    </div>
  );
}
