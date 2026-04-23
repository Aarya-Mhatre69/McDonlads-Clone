"use client";

export type FilterCategory = "all" | "veg" | "nonveg" | "jain";

interface FilterBarProps {
  active: FilterCategory;
  onChange: (cat: FilterCategory) => void;
  counts: Record<FilterCategory, number>;
}

const FILTERS: { key: FilterCategory; label: string; dot?: string }[] = [
  { key: "all",    label: "All Items" },
  { key: "veg",    label: "Veg",      dot: "#22c55e" },
  { key: "nonveg", label: "Non-Veg",  dot: "#ef4444" },
  { key: "jain",   label: "Jain",     dot: "#f59e0b" },
];

export default function FilterBar({ active, onChange, counts }: FilterBarProps) {
  return (
    <div
      id="menu-filter-bar"
      className="menu-filter-bar"
      role="group"
      aria-label="Menu category filters"
    >
      {FILTERS.map(({ key, label, dot }) => (
        <button
          key={key}
          id={`filter-${key}`}
          onClick={() => onChange(key)}
          aria-pressed={active === key}
          className={`menu-filter-pill ${active === key ? "menu-filter-pill-active" : ""}`}
        >
          {dot && (
            <span style={{
              width: 7, height: 7, borderRadius: "50%",
              background: active === key ? (key === "veg" ? "#22c55e" : key === "nonveg" ? "#ef4444" : "#f59e0b") : dot,
              opacity: active === key ? 1 : 0.6,
              display: "inline-block",
            }} />
          )}
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