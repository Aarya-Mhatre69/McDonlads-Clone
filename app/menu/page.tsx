import type { Metadata } from "next";
import MenuList from "@/components/MenuList";

export const metadata: Metadata = {
  title: "Menu — McDonald's India",
  description: "Browse McDonald's India exclusive fusion menu — McAloo Tikki, McSpicy Paneer, Chicken Maharaja Mac and more.",
};

export default function MenuPage() {
  return (
    <div style={{ minHeight: "100vh", background: "#fff", fontFamily: "'Segoe UI', sans-serif" }}>

      {/* ══════════════════════════════════════
          PAGE HEADER — white, clean
      ══════════════════════════════════════ */}
      <div
        style={{
          background: "#fff",
          borderBottom: "1px solid #EBEBEB",
          padding: "48px 64px 0",
        }}
      >
        {/* Breadcrumb */}
        <p style={{ color: "#DA291C", fontSize: 11, fontWeight: 800, letterSpacing: "0.22em", textTransform: "uppercase", marginBottom: 12 }}>
          Our Menu
        </p>

        {/* Page title */}
        <h1
          style={{
            fontSize: "clamp(36px, 5vw, 56px)",
            fontWeight: 900,
            color: "#1A1A1A",
            fontFamily: "'Arial Black', sans-serif",
            lineHeight: 1,
            marginBottom: 8,
          }}
        >
          What would you like<br />
          <span style={{ color: "#DA291C" }}>today?</span>
        </h1>

        <p style={{ color: "#888", fontSize: 15, marginBottom: 32, maxWidth: 480 }}>
          Authentic Indian flavours meet McDonald's magic — pick your favourite.
        </p>
      </div>

      {/* ══════════════════════════════════════
          MENU CONTENT
      ══════════════════════════════════════ */}
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "32px 64px 80px" }}>
        <MenuList />
      </div>
    </div>
  );
}