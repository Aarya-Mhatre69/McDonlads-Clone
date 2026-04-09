"use client";

import { useState, useEffect } from "react";
import { fetchCoupons, type ApiCoupon } from "@/lib/api";

// Format discount text for each coupon type
function formatDiscount(c: ApiCoupon): string {
  if (c.discountType === "flat")         return `₹${c.discount} OFF`;
  if (c.discountType === "percent")      return `${c.discount}% OFF`;
  if (c.discountType === "free_delivery") return "FREE DELIVERY";
  return `₹${c.discount} OFF`;
}

function formatDiscountColor(c: ApiCoupon): string {
  if (c.discountType === "flat")          return "#DA291C";
  if (c.discountType === "percent")       return "#15803d";
  if (c.discountType === "free_delivery") return "#1d4ed8";
  return "#DA291C";
}

// Skeleton loader for a coupon card
function CouponSkeleton() {
  return (
    <div className="coupon-card" aria-hidden="true" style={{ pointerEvents: "none" }}>
      <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
        <div style={{ width: "70px", height: "42px", background: "#e4e4e7", borderRadius: "8px" }} className="skeleton" />
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "8px" }}>
          <div style={{ height: "14px", width: "80%", background: "#e4e4e7", borderRadius: "6px" }} className="skeleton" />
          <div style={{ height: "11px", width: "60%", background: "#e4e4e7", borderRadius: "6px" }} className="skeleton" />
        </div>
      </div>
    </div>
  );
}

interface CouponSectionProps {
  /** If true, renders as a compact inline list (for cart page) */
  compact?: boolean;
}

export default function CouponSection({ compact = false }: CouponSectionProps) {
  const [coupons, setCoupons]   = useState<ApiCoupon[]>([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState<string | null>(null);
  const [copied, setCopied]     = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function loadCoupons() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetchCoupons();
        if (!cancelled) setCoupons(res.data);
      } catch (err) {
        if (!cancelled) setError((err as Error).message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadCoupons();
    return () => { cancelled = true; };
  }, []);

  function handleCopy(code: string) {
    navigator.clipboard.writeText(code).catch(() => {
      // Fallback for older browsers
      const el = document.createElement("textarea");
      el.value = code;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
    });
    setCopied(code);
    setTimeout(() => setCopied(null), 2000);
  }

  if (error) {
    return null; // Silently hide coupon section on error — not critical
  }

  return (
    <div id="coupon-section" className={compact ? "coupon-section-compact" : "coupon-section"}>
      {!compact && (
        <div className="coupon-section-header">
          <div>
            <h2 className="coupon-section-title">
              🎟️ <span>Available</span> Offers
            </h2>
            <p className="coupon-section-subtitle">
              Tap a code to copy it, then apply at checkout.
            </p>
          </div>
        </div>
      )}

      {compact && (
        <p className="coupon-compact-label">🎟️ Available Coupons</p>
      )}

      {/* Loading */}
      {loading && (
        <div className={compact ? "coupon-grid-compact" : "coupon-grid"}>
          {Array.from({ length: compact ? 2 : 4 }).map((_, i) => (
            <CouponSkeleton key={i} />
          ))}
        </div>
      )}

      {/* Coupon cards */}
      {!loading && (
        <div className={compact ? "coupon-grid-compact" : "coupon-grid"}>
          {coupons.map((c) => (
            <button
              key={c.id}
              id={`coupon-${c.id}`}
              className="coupon-card"
              onClick={() => handleCopy(c.code)}
              aria-label={`Copy coupon code ${c.code}: ${c.description}`}
              type="button"
            >
              {/* Discount badge */}
              <div
                className="coupon-badge"
                style={{ background: `${formatDiscountColor(c)}15`, color: formatDiscountColor(c), borderColor: `${formatDiscountColor(c)}30` }}
              >
                {formatDiscount(c)}
              </div>

              {/* Details */}
              <div className="coupon-info">
                <span className="coupon-code">{c.code}</span>
                <span className="coupon-desc">{c.description}</span>
                <span className="coupon-min">Min. order ₹{c.minOrderValue}</span>
              </div>

              {/* Copy feedback */}
              <div className="coupon-copy">
                {copied === c.code ? (
                  <span className="coupon-copied" aria-live="polite">✓ Copied!</span>
                ) : (
                  <span className="coupon-copy-icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                    </svg>
                    Copy
                  </span>
                )}
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
