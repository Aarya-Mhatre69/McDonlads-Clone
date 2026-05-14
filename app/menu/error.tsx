"use client";

export default function MenuError({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div style={{ minHeight: "60vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 20, padding: "40px 24px", fontFamily: "'Outfit',sans-serif", textAlign: "center" }}>
      <div style={{ width: 80, height: 80, borderRadius: "50%", background: "rgba(218,41,28,0.08)", border: "2px dashed rgba(218,41,28,0.25)", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#DA291C" strokeWidth="1.8" strokeLinecap="round">
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
      </div>

      <div>
        <h2 style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: 32, fontWeight: 900, color: "#1A1A1A", marginBottom: 8 }}>
          Something went wrong
        </h2>
        <p style={{ fontSize: 14, color: "#888", maxWidth: 320, lineHeight: 1.6, margin: "0 auto" }}>
          {error.message || "We couldn't load the menu. Please try again."}
        </p>
      </div>

      <button
        onClick={reset}
        style={{ padding: "12px 28px", background: "#DA291C", color: "#fff", border: "none", borderRadius: 12, fontSize: 14, fontWeight: 800, cursor: "pointer", fontFamily: "'Outfit',sans-serif", letterSpacing: "0.04em", transition: "all 0.2s" }}
        onMouseEnter={e => (e.currentTarget.style.background = "#b52018")}
        onMouseLeave={e => (e.currentTarget.style.background = "#DA291C")}
      >
        Try Again
      </button>
    </div>
  );
}
