"use client";

export interface Outlet {
  id: string;
  name: string;
  area: string;
  distance: number;
  isOpen: boolean;
  deliveryTime: number;
  rating: number;
  imageUrl: string;
  address: string;
  tags: string[];
  phone?: string;
  hours?: string;
  dineIn?: boolean;
  delivery?: boolean;
}

interface OutletCardProps {
  outlet: Outlet;
}

export default function OutletCard({ outlet }: OutletCardProps) {
  return (
    <article
      id={`outlet-card-${outlet.id}`}
      aria-label={`${outlet.name} outlet`}
      style={{
        background: "#fff",
        borderRadius: 16,
        overflow: "hidden",
        border: "1px solid #E8E8E8",
        boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
        display: "flex",
        flexDirection: "column",
        transition: "box-shadow 0.22s ease, transform 0.22s ease",
        fontFamily: "'Outfit', sans-serif",
      }}
      onMouseEnter={e => {
        const el = e.currentTarget as HTMLElement;
        el.style.boxShadow = "0 8px 32px rgba(0,0,0,0.12)";
        el.style.transform = "translateY(-4px)";
      }}
      onMouseLeave={e => {
        const el = e.currentTarget as HTMLElement;
        el.style.boxShadow = "0 2px 12px rgba(0,0,0,0.06)";
        el.style.transform = "translateY(0)";
      }}
    >
      {/* Image */}
      <div style={{ width: "100%", height: 180, position: "relative", background: "#F5F5F5", flexShrink: 0, overflow: "hidden" }}>
        {outlet.imageUrl ? (
          <img src={outlet.imageUrl} alt={outlet.name} loading="lazy"
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform 0.4s ease" }}
            onMouseEnter={e => { (e.currentTarget as HTMLImageElement).style.transform = "scale(1.06)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLImageElement).style.transform = "scale(1)"; }}
          />
        ) : (
          <div style={{ width: "100%", height: "100%", background: "linear-gradient(135deg, #FFF8E1, #FFF3CC)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 10 }}>
            <div style={{ width: 52, height: 52, background: "#FFC72C", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: 28, fontWeight: 900, color: "#DA291C" }}>M</span>
            </div>
            <p style={{ color: "#C8A84B", fontSize: 11, fontWeight: 600 }}>McDonald&apos;s Restaurant</p>
          </div>
        )}

        {/* Open/Closed badge */}
        <span style={{ position: "absolute", top: 12, left: 12, padding: "4px 10px", borderRadius: 20, fontSize: 11, fontWeight: 700, background: outlet.isOpen ? "#22c55e" : "#DA291C", color: "#fff", letterSpacing: "0.03em" }}>
          {outlet.isOpen ? "● Open Now" : "● Closed"}
        </span>

        {/* Rating */}
        <span style={{ position: "absolute", top: 12, right: 12, padding: "4px 10px", borderRadius: 20, fontSize: 12, fontWeight: 800, background: "#FFC72C", color: "#1A1A1A", display: "flex", alignItems: "center", gap: 3 }}>
          ★ {outlet.rating.toFixed(1)}
        </span>
      </div>

      {/* Body */}
      <div style={{ padding: "16px 18px 18px", display: "flex", flexDirection: "column", flex: 1, gap: 9 }}>
        {/* Name + area */}
        <div>
          <h3 style={{ fontSize: 15, fontWeight: 800, color: "#1A1A1A", marginBottom: 3, lineHeight: 1.2 }}>{outlet.name}</h3>
          <p style={{ fontSize: 12, color: "#888", fontWeight: 500 }}>{outlet.area}</p>
        </div>

        {/* Address */}
        <p style={{ fontSize: 12, color: "#999", lineHeight: 1.55 }}>{outlet.address}</p>

        {/* Service info */}
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          {outlet.hours && (
            <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "#666" }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              <span>{outlet.hours}</span>
            </div>
          )}
          {(outlet.dineIn !== undefined || outlet.delivery !== undefined) && (
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
              {outlet.dineIn !== undefined && (
                <span style={{ fontSize: 11, fontWeight: 600, padding: "2px 9px", borderRadius: 99, background: outlet.dineIn ? "rgba(34,197,94,0.1)" : "rgba(0,0,0,0.05)", color: outlet.dineIn ? "#16a34a" : "#999", border: `1px solid ${outlet.dineIn ? "rgba(34,197,94,0.25)" : "#E8E8E8"}` }}>
                  Dine-In: {outlet.dineIn ? "Open" : "Closed"}
                </span>
              )}
              {outlet.delivery !== undefined && (
                <span style={{ fontSize: 11, fontWeight: 600, padding: "2px 9px", borderRadius: 99, background: outlet.delivery ? "rgba(255,199,44,0.1)" : "rgba(0,0,0,0.05)", color: outlet.delivery ? "#B8860B" : "#999", border: `1px solid ${outlet.delivery ? "rgba(255,199,44,0.3)" : "#E8E8E8"}` }}>
                  Delivery: {outlet.delivery ? "Open" : "Closed"}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Tags */}
        {outlet.tags.length > 0 && (
          <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
            {outlet.tags.map(tag => (
              <span key={tag} style={{ padding: "3px 9px", borderRadius: 20, fontSize: 10, fontWeight: 600, background: "#FFF8E1", color: "#B8860B", border: "1px solid #FFE082" }}>{tag}</span>
            ))}
          </div>
        )}

        {/* Divider */}
        <div style={{ height: 1, background: "#F0F0F0" }} />

        {/* Footer */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8, marginTop: "auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "#888", fontWeight: 500 }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#DA291C" strokeWidth="2.5" strokeLinecap="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
            <span>{outlet.distance} km</span>
            <span style={{ color: "#D8D8D8" }}>·</span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2.5" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            <span>{outlet.deliveryTime} mins</span>
          </div>
          <div style={{ display: "flex", gap: 7 }}>
            {outlet.phone && (
              <a href={`tel:${outlet.phone}`} style={{ padding: "7px 12px", borderRadius: 22, border: "1.5px solid #E8E8E8", background: "#fff", color: "#555", fontSize: 11, fontWeight: 700, textDecoration: "none", transition: "all 0.18s" }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.borderColor="#FFC72C"; el.style.color="#1A1A1A"; }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.borderColor="#E8E8E8"; el.style.color="#555"; }}>
                📞 Call
              </a>
            )}
            <a href={`/outlets/${outlet.id}`} id={`outlet-order-btn-${outlet.id}`} aria-label={`Order from ${outlet.name}`}
              style={{ padding: "7px 16px", borderRadius: 22, background: "#DA291C", color: "#fff", fontSize: 12, fontWeight: 800, textDecoration: "none", whiteSpace: "nowrap", transition: "background 0.2s" }}
              onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.background = "#b52018")}
              onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.background = "#DA291C")}>
              Order Now →
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}