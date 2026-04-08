import type { Metadata } from "next";
import MenuList from "@/components/MenuList";

export const metadata: Metadata = {
  title: "Menu — McDonald's India",
  description:
    "Browse McDonald's India exclusive fusion menu — McAloo Tikki, McSpicy Paneer, Chicken Maharaja Mac and more. Order delivery or dine-in.",
};

export default function MenuPage() {
  return (
    <div
      className="min-h-screen page-enter"
      style={{ background: "#f8f8f8" }}
    >
      {/* ── Page Header ── */}
      <div
        className="menu-page-header"
        style={{
          background: "linear-gradient(135deg, #DA291C 0%, #b71c1c 100%)",
          padding: "60px 24px 40px",
          textAlign: "center",
        }}
      >
        <p
          style={{
            color: "#FFC72C",
            fontSize: "11px",
            fontWeight: 700,
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            marginBottom: "12px",
          }}
        >
          What's Cooking
        </p>
        <h1
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "clamp(48px, 8vw, 80px)",
            color: "#ffffff",
            lineHeight: 1,
            marginBottom: "12px",
          }}
        >
          Our Menu
        </h1>
        <p style={{ color: "rgba(255,255,255,0.75)", fontSize: "15px", maxWidth: "480px", margin: "0 auto" }}>
          Authentic Indian flavours meet McDonald's magic — pick your favourite.
        </p>
      </div>

      {/* ── Menu Content ── */}
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "32px 24px 80px" }}>
        <MenuList />
      </div>
    </div>
  );
}
