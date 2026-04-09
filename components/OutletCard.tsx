"use client";

export interface Outlet {
  id: string;
  name: string;
  area: string;
  distance: number;       // km
  isOpen: boolean;
  deliveryTime: number;   // minutes
  rating: number;         // out of 5
  imageUrl: string;       // set to "" for blank placeholder
  address: string;
  tags: string[];
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
        border: "1px solid #EBEBEB",
        boxShadow: "0 2px 16px rgba(0,0,0,0.06)",
        display: "flex",
        flexDirection: "column",
        transition: "box-shadow 0.2s ease, transform 0.2s ease",
        cursor: "pointer",
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 32px rgba(0,0,0,0.12)";
        (e.currentTarget as HTMLElement).style.transform = "translateY(-3px)";
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLElement).style.boxShadow = "0 2px 16px rgba(0,0,0,0.06)";
        (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
      }}
    >
      {/* ── IMAGE / PLACEHOLDER ── */}
      <div
        style={{
          width: "100%",
          height: 180,
          position: "relative",
          background: "#F5F5F5",
          flexShrink: 0,
          overflow: "hidden",
        }}
      >
        {outlet.imageUrl ? (
          <img
            src={outlet.imageUrl}
            alt={`${outlet.name} — McDonald's outlet`}
            loading="lazy"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
            }}
          />
        ) : (
          /* Blank placeholder — set imageUrl to fill */
          <div
            style={{
              width: "100%",
              height: "100%",
              background: "#F0F0F0",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 10,
            }}
          >
            <div
              style={{
                width: 56,
                height: 56,
                borderRadius: "50%",
                border: "2px dashed #C8C8C8",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path
                  d="M21 15V19C21 20.1 20.1 21 19 21H5C3.9 21 3 20.1 3 19V15"
                  stroke="#AAAAAA"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <path
                  d="M17 8L12 3L7 8"
                  stroke="#AAAAAA"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path d="M12 3V15" stroke="#AAAAAA" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
            <p style={{ color: "#AAAAAA", fontSize: 11, fontWeight: 600, letterSpacing: "0.04em" }}>
              Set imageUrl in outlet data
            </p>
          </div>
        )}

        {/* Open / Closed badge */}
        <span
          aria-label={outlet.isOpen ? "Open now" : "Currently closed"}
          style={{
            position: "absolute",
            top: 12,
            left: 12,
            padding: "4px 10px",
            borderRadius: 20,
            fontSize: 11,
            fontWeight: 700,
            background: outlet.isOpen ? "#27AE60" : "#DA291C",
            color: "#fff",
            letterSpacing: "0.03em",
          }}
        >
          {outlet.isOpen ? "● Open" : "● Closed"}
        </span>

        {/* Rating badge */}
        <span
          aria-label={`Rated ${outlet.rating} out of 5`}
          style={{
            position: "absolute",
            top: 12,
            right: 12,
            padding: "4px 10px",
            borderRadius: 20,
            fontSize: 12,
            fontWeight: 800,
            background: "#FFC72C",
            color: "#1A1A1A",
            display: "flex",
            alignItems: "center",
            gap: 3,
          }}
        >
          ★ {outlet.rating.toFixed(1)}
        </span>
      </div>

      {/* ── CARD BODY ── */}
      <div
        style={{
          padding: "16px 18px 18px",
          display: "flex",
          flexDirection: "column",
          flex: 1,
          gap: 10,
        }}
      >
        {/* Name + area */}
        <div>
          <h3
            style={{
              fontSize: 16,
              fontWeight: 800,
              color: "#1A1A1A",
              marginBottom: 3,
              lineHeight: 1.2,
              fontFamily: "'Arial Black', sans-serif",
            }}
          >
            {outlet.name}
          </h3>
          <p style={{ fontSize: 13, color: "#888", fontWeight: 500 }}>{outlet.area}</p>
        </div>

        {/* Address */}
        <p
          style={{
            fontSize: 12,
            color: "#999",
            lineHeight: 1.5,
          }}
        >
          {outlet.address}
        </p>

        {/* Tags */}
        {outlet.tags.length > 0 && (
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {outlet.tags.map((tag) => (
              <span
                key={tag}
                style={{
                  padding: "3px 10px",
                  borderRadius: 20,
                  fontSize: 11,
                  fontWeight: 600,
                  background: "#FFF8E1",
                  color: "#B8860B",
                  border: "1px solid #FFE082",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Divider */}
        <div style={{ height: 1, background: "#F0F0F0", margin: "2px 0" }} />

        {/* Footer: meta + CTA */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 8,
            marginTop: "auto",
          }}
        >
          {/* Distance + delivery time */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              fontSize: 12,
              color: "#888",
              fontWeight: 500,
            }}
          >
            {/* Pin icon */}
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#DA291C" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            <span>{outlet.distance} km</span>
            <span style={{ color: "#D0D0D0" }}>·</span>
            {/* Clock icon */}
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            <span>{outlet.deliveryTime} mins</span>
          </div>

          {/* Order Now CTA */}
          <a
            href={`/outlets/${outlet.id}`}
            id={`outlet-order-btn-${outlet.id}`}
            aria-label={`Order from ${outlet.name}`}
            style={{
              padding: "8px 18px",
              borderRadius: 24,
              background: "#DA291C",
              color: "#fff",
              fontSize: 12,
              fontWeight: 800,
              textDecoration: "none",
              whiteSpace: "nowrap",
              transition: "background 0.2s ease",
              letterSpacing: "0.02em",
            }}
            onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.background = "#b52018")}
            onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.background = "#DA291C")}
          >
            Order Now →
          </a>
        </div>
      </div>
    </article>
  );
}