"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import LocationBar from "@/components/LocationBar";
import OutletList from "@/components/OutletList";

// ─────────────────────────────────────────────
// HERO SLIDES
// ─────────────────────────────────────────────
const slides = [
  { id: 1, tag: "Limited Time Offer", title: "Buddy Meal", subtitle: "Grab a Meal for Two", imageSrc: "", imageAlt: "Buddy Meal promotional image" },
  { id: 2, tag: "Happy Meal", title: "HURRY UP!", subtitle: "Fun awaits in your Happy Meal", imageSrc: "", imageAlt: "Happy Meal with Funny Domino" },
  { id: 3, tag: "New Launch", title: "McSpicy Paneer", subtitle: "Spice up your day, the desi way", imageSrc: "", imageAlt: "McSpicy Paneer burger" },
];

const promoItems = ["Limited Time: Buddy Meal @ ₹119", "McSpicy Paneer is back!", "Free delivery above ₹299", "Happy Meal with Funny Domino"];

const categories = ["McAloo Tikki", "McSpicy Paneer", "Masala Fries", "Mango Smoothie", "Piri Piri Wrap", "Soft Serve", "McVeggie"];

// ─────────────────────────────────────────────
// MENU PREVIEW DATA
// imageSrc: "" = blank placeholder
// imageSrc: "/images/item.png" = from /public
// ─────────────────────────────────────────────
const MENU_TABS = ["BURGERS & WRAPS", "SNACKS & SIDES", "DESSERTS", "BEVERAGES"] as const;
type MenuTab = typeof MENU_TABS[number];

type MenuItem = {
  id: string; name: string; tagline: string; description: string;
  servingSize: string; allergens: string; ingredients: string[];
  nutrition: { label: string; value: string }[];
  imageSrc: string; imageAlt: string; isVeg: boolean;
};

const MENU_ITEMS: Record<MenuTab, MenuItem[]> = {
  "BURGERS & WRAPS": [
    {
      id: "veg-surprise", name: "Veg Surprise Burger",
      tagline: "A surprise that will leave you wide-eyed.",
      description: "A scrumptious potato patty topped with a delectable Italian herb sauce and shredded onions placed between perfectly toasted buns.",
      servingSize: "132g", allergens: "Cereal containing gluten, Milk, Soya",
      ingredients: ["Regular Bun", "Italian mayo", "Shredded onion", "Herb Chilli Potato patty"],
      nutrition: [
        { label: "Energy", value: "313.44kCal" }, { label: "Protein", value: "5.71g" },
        { label: "Total Fat", value: "14.95g" }, { label: "Sat Fat", value: "3.73g" },
        { label: "Trans Fat", value: "0.14g" }, { label: "Cholesterols", value: "0.0mg" },
        { label: "Total Carbs.", value: "39.84g" }, { label: "Total Sugars", value: "5.66g" },
        { label: "Added Sugars", value: "1.64g" }, { label: "Sodium", value: "504.19mg" },
      ],
      imageSrc: "", imageAlt: "Veg Surprise Burger", isVeg: true,
    },
    {
      id: "mcaloo-tikki", name: "McAloo Tikki",
      tagline: "India's all-time favourite.",
      description: "A crispy potato and pea patty spiced with Indian herbs and spices, served with fresh lettuce and two tangy sauces.",
      servingSize: "120g", allergens: "Cereal containing gluten, Milk",
      ingredients: ["Aloo Tikki Patty", "Lettuce", "Tomato", "Eggless Mayo", "Tomato Ketchup"],
      nutrition: [
        { label: "Energy", value: "280kCal" }, { label: "Protein", value: "4.8g" },
        { label: "Total Fat", value: "11g" }, { label: "Sat Fat", value: "2.1g" },
        { label: "Trans Fat", value: "0.0g" }, { label: "Cholesterols", value: "0.0mg" },
        { label: "Total Carbs.", value: "38g" }, { label: "Total Sugars", value: "4g" },
        { label: "Added Sugars", value: "1.2g" }, { label: "Sodium", value: "480mg" },
      ],
      imageSrc: "", imageAlt: "McAloo Tikki Burger", isVeg: true,
    },
    {
      id: "mcspicy-paneer", name: "McSpicy Paneer",
      tagline: "Fiery. Crunchy. Unforgettable.",
      description: "A fiery crispy paneer patty packed with spicy habanero sauce, lettuce and a soft sesame bun.",
      servingSize: "154g", allergens: "Cereal containing gluten, Milk, Soya",
      ingredients: ["Paneer Patty", "Lettuce", "Habanero Sauce", "Sesame Bun", "Cheese Slice"],
      nutrition: [
        { label: "Energy", value: "421kCal" }, { label: "Protein", value: "13g" },
        { label: "Total Fat", value: "19g" }, { label: "Sat Fat", value: "5.2g" },
        { label: "Trans Fat", value: "0.1g" }, { label: "Cholesterols", value: "12mg" },
        { label: "Total Carbs.", value: "48g" }, { label: "Total Sugars", value: "6g" },
        { label: "Added Sugars", value: "1.8g" }, { label: "Sodium", value: "620mg" },
      ],
      imageSrc: "", imageAlt: "McSpicy Paneer Burger", isVeg: true,
    },
  ],
  "SNACKS & SIDES": [
    {
      id: "pizza-mcpuff", name: "Pizza McPuff®",
      tagline: "Something different. Something delicious.",
      description: "A blend of assorted vegetables; mozzarella cheese mixed with tomato sauce; and exotic spices stuffed in rectangle shaped savoury dough. Quick frozen.",
      servingSize: "87g", allergens: "Cereal containing gluten, Milk, Soya",
      ingredients: ["Assorted vegetables", "Refined wheat flour", "Pizza seasoning"],
      nutrition: [
        { label: "Energy", value: "228.21kCal" }, { label: "Protein", value: "5.45g" },
        { label: "Total Fat", value: "11.44g" }, { label: "Sat Fat", value: "5.72g" },
        { label: "Trans Fat", value: "0.09g" }, { label: "Cholesterols", value: "5.17mg" },
        { label: "Total Carbs.", value: "24.79g" }, { label: "Total Sugars", value: "2.73g" },
        { label: "Added Sugars", value: "0.35g" }, { label: "Sodium", value: "390.74mg" },
      ],
      imageSrc: "", imageAlt: "Pizza McPuff", isVeg: true,
    },
    {
      id: "masala-fries", name: "Masala Fries",
      tagline: "Classic fries with a bold Indian twist.",
      description: "Golden crispy fries tossed in a bold Indian spice blend with peri peri masala and chaat powder.",
      servingSize: "105g", allergens: "Cereal containing gluten",
      ingredients: ["Golden Fries", "Peri Peri Masala", "Chaat Powder", "Salt"],
      nutrition: [
        { label: "Energy", value: "315kCal" }, { label: "Protein", value: "3.8g" },
        { label: "Total Fat", value: "14g" }, { label: "Sat Fat", value: "2.3g" },
        { label: "Trans Fat", value: "0.0g" }, { label: "Cholesterols", value: "0.0mg" },
        { label: "Total Carbs.", value: "43g" }, { label: "Total Sugars", value: "0.5g" },
        { label: "Added Sugars", value: "0g" }, { label: "Sodium", value: "350mg" },
      ],
      imageSrc: "", imageAlt: "Masala Fries", isVeg: true,
    },
  ],
  "DESSERTS": [
    {
      id: "soft-serve", name: "Soft Serve",
      tagline: "Cool. Creamy. Classic.",
      description: "Our iconic soft serve is made with fresh dairy milk, swirled to perfection in a crispy cone — simple joy in every lick.",
      servingSize: "90g", allergens: "Milk",
      ingredients: ["Milk", "Sugar", "Cream", "Vanilla essence"],
      nutrition: [
        { label: "Energy", value: "140kCal" }, { label: "Protein", value: "3.5g" },
        { label: "Total Fat", value: "4g" }, { label: "Sat Fat", value: "2.5g" },
        { label: "Trans Fat", value: "0.0g" }, { label: "Cholesterols", value: "15mg" },
        { label: "Total Carbs.", value: "22g" }, { label: "Total Sugars", value: "18g" },
        { label: "Added Sugars", value: "14g" }, { label: "Sodium", value: "75mg" },
      ],
      imageSrc: "", imageAlt: "Soft Serve Cone", isVeg: true,
    },
  ],
  "BEVERAGES": [
    {
      id: "mango-smoothie", name: "Mango McCafé",
      tagline: "Fresh Alphonso mango, thick and tropical.",
      description: "Fresh Alphonso mango blended into a thick tropical shake with vanilla ice cream and chilled milk.",
      servingSize: "300ml", allergens: "Milk",
      ingredients: ["Alphonso Mango Pulp", "Milk", "Vanilla Ice Cream", "Sugar"],
      nutrition: [
        { label: "Energy", value: "260kCal" }, { label: "Protein", value: "5g" },
        { label: "Total Fat", value: "6g" }, { label: "Sat Fat", value: "3.5g" },
        { label: "Trans Fat", value: "0.0g" }, { label: "Cholesterols", value: "18mg" },
        { label: "Total Carbs.", value: "45g" }, { label: "Total Sugars", value: "40g" },
        { label: "Added Sugars", value: "22g" }, { label: "Sodium", value: "90mg" },
      ],
      imageSrc: "", imageAlt: "Mango McCafé Smoothie", isVeg: true,
    },
  ],
};

// ─────────────────────────────────────────────

export default function HomePage() {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [activeTab, setActiveTab] = useState<MenuTab>("BURGERS & WRAPS");
  const [activeItem, setActiveItem] = useState(0);

  const goTo = (index: number) => {
    if (animating) return;
    setAnimating(true);
    setTimeout(() => { setCurrent(index); setAnimating(false); }, 300);
  };
  const prev = () => goTo((current - 1 + slides.length) % slides.length);
  const next = () => goTo((current + 1) % slides.length);

  useEffect(() => { const t = setInterval(next, 5000); return () => clearInterval(t); }, [current]);
  useEffect(() => { setActiveItem(0); }, [activeTab]);

  const slide = slides[current];
  const tabItems = MENU_ITEMS[activeTab];
  const featured = tabItems[activeItem];

  return (
    <div style={{ fontFamily: "'Segoe UI', sans-serif", background: "#fff" }}>

      {/* ══════════════ HERO CAROUSEL ══════════════ */}
      <section style={{ background: "#FFC72C", minHeight: "88vh", display: "flex", alignItems: "stretch", overflow: "hidden", position: "relative" }}>

        {/* LEFT */}
        <div style={{ width: "42%", display: "flex", flexDirection: "column", justifyContent: "center", padding: "60px 48px 60px 64px", position: "relative", zIndex: 2 }}>
          <div style={{ width: 52, height: 52, background: "#DA291C", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 40, fontSize: 28, fontWeight: 900, color: "#FFC72C", fontFamily: "'Arial Black', sans-serif", letterSpacing: -2, flexShrink: 0 }}>M</div>
          <p style={{ color: "#DA291C", fontSize: 13, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 12, opacity: animating ? 0 : 1, transform: animating ? "translateY(8px)" : "translateY(0)", transition: "opacity 0.35s ease, transform 0.35s ease" }}>{slide.tag}</p>
          <h1 style={{ fontSize: "clamp(38px, 5vw, 68px)", fontWeight: 900, lineHeight: 1.05, color: "#DA291C", marginBottom: 16, fontFamily: "'Arial Black', 'Impact', sans-serif", textTransform: "uppercase", opacity: animating ? 0 : 1, transform: animating ? "translateY(12px)" : "translateY(0)", transition: "opacity 0.4s ease 0.05s, transform 0.4s ease 0.05s" }}>{slide.title}</h1>
          <p style={{ fontSize: "clamp(20px, 2.6vw, 34px)", fontWeight: 800, color: "#DA291C", lineHeight: 1.2, marginBottom: 48, opacity: animating ? 0 : 1, transform: animating ? "translateY(12px)" : "translateY(0)", transition: "opacity 0.4s ease 0.1s, transform 0.4s ease 0.1s" }}>{slide.subtitle}</p>
          <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
            <button onClick={prev} aria-label="Previous slide" style={{ width: 48, height: 48, borderRadius: "50%", border: "2px solid #DA291C", background: "transparent", color: "#DA291C", fontSize: 22, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, transition: "all 0.2s", lineHeight: 1 }} onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = "#DA291C"; (e.currentTarget as HTMLButtonElement).style.color = "#fff"; }} onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = "transparent"; (e.currentTarget as HTMLButtonElement).style.color = "#DA291C"; }}>‹</button>
            <button onClick={next} aria-label="Next slide" style={{ width: 48, height: 48, borderRadius: "50%", border: "none", background: "#fff", color: "#1a1a1a", fontSize: 22, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 2px 12px rgba(0,0,0,0.15)", fontWeight: 700, transition: "all 0.2s", lineHeight: 1 }}>›</button>
            <div style={{ display: "flex", gap: 6, marginLeft: 8 }}>
              {slides.map((_, i) => <button key={i} onClick={() => goTo(i)} aria-label={`Go to slide ${i + 1}`} style={{ width: i === current ? 22 : 8, height: 8, borderRadius: 4, background: i === current ? "#DA291C" : "rgba(218,41,28,0.35)", border: "none", cursor: "pointer", transition: "all 0.3s ease", padding: 0 }} />)}
            </div>
          </div>
        </div>

        {/* DIVIDERS */}
        <div style={{ position: "absolute", left: "41%", top: 0, bottom: 0, width: 6, background: "rgba(218,41,28,0.15)", zIndex: 3 }} />
        <div style={{ position: "absolute", left: "42.5%", top: 0, bottom: 0, width: 3, background: "rgba(218,41,28,0.08)", zIndex: 3 }} />

        {/* RIGHT */}
        <div style={{ flex: 1, position: "relative", overflow: "hidden" }}>
          {slide.imageSrc ? (
            <Image src={slide.imageSrc} alt={slide.imageAlt} fill style={{ objectFit: "cover", opacity: animating ? 0 : 1, transform: animating ? "scale(1.03)" : "scale(1)", transition: "opacity 0.4s ease, transform 0.4s ease" }} priority />
          ) : (
            <div style={{ width: "100%", height: "100%", background: "rgba(218,41,28,0.06)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 14 }}>
              <div style={{ width: 72, height: 72, borderRadius: "50%", border: "2px dashed rgba(218,41,28,0.3)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none"><path d="M21 15V19C21 20.1 20.1 21 19 21H5C3.9 21 3 20.1 3 19V15" stroke="rgba(218,41,28,0.35)" strokeWidth="2" strokeLinecap="round" /><path d="M17 8L12 3L7 8" stroke="rgba(218,41,28,0.35)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /><path d="M12 3V15" stroke="rgba(218,41,28,0.35)" strokeWidth="2" strokeLinecap="round" /></svg>
              </div>
              <p style={{ color: "rgba(218,41,28,0.4)", fontSize: 12, fontWeight: 600 }}>Set imageSrc in slides array</p>
            </div>
          )}
        </div>
      </section>

      {/* ══════════════ PROMO STRIP ══════════════ */}
      <div style={{ background: "#DA291C", padding: "13px 48px", display: "flex", alignItems: "center", overflowX: "auto", scrollbarWidth: "none" }}>
        {promoItems.map((text, i) => (
          <span key={i} style={{ display: "flex", alignItems: "center" }}>
            <span style={{ color: "#fff", fontSize: 13, fontWeight: 700, whiteSpace: "nowrap", letterSpacing: "0.04em" }}>{text}</span>
            {i < promoItems.length - 1 && <span style={{ color: "rgba(255,255,255,0.35)", margin: "0 32px", fontSize: 16 }}>|</span>}
          </span>
        ))}
      </div>

      {/* ══════════════ CATEGORY CHIPS ══════════════ */}
      <section style={{ background: "#fff", padding: "40px 64px 32px" }}>
        <p style={{ color: "#DA291C", fontSize: 11, fontWeight: 800, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 20 }}>What are you craving?</p>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          {categories.map((label) => (
            <a key={label} href="/menu" style={{ padding: "10px 22px", borderRadius: 50, border: "2px solid #ebebeb", background: "#fff", color: "#1a1a1a", fontSize: 14, fontWeight: 600, textDecoration: "none", transition: "all 0.2s ease" }} onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = "#FFC72C"; (e.currentTarget as HTMLAnchorElement).style.background = "#FFF8E1"; }} onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = "#ebebeb"; (e.currentTarget as HTMLAnchorElement).style.background = "#fff"; }}>{label}</a>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          MENU PREVIEW SECTION
          Exact replica of reference:
          - Category tab nav with VIEW MENU link
          - Item switcher pills
          - Split: left (name banner + details +
            nutrition pill), center (image), right
            (ingredients panel)
          - Big M watermark in background
      ══════════════════════════════════════════════ */}
      <section style={{ background: "#fff", borderTop: "1px solid #F0F0F0" }}>

        {/* Tab nav */}
        <div style={{ display: "flex", alignItems: "center", borderBottom: "1px solid #EBEBEB", padding: "0 64px", gap: 0, overflowX: "auto", scrollbarWidth: "none" }}>
          {MENU_TABS.map((tab) => (
            <button key={tab} onClick={() => setActiveTab(tab)} style={{ padding: "20px 20px 18px", fontSize: 13, fontWeight: 700, letterSpacing: "0.06em", color: activeTab === tab ? "#DA291C" : "#AAAAAA", background: "transparent", border: "none", borderBottom: activeTab === tab ? "3px solid #DA291C" : "3px solid transparent", cursor: "pointer", whiteSpace: "nowrap", transition: "all 0.2s ease", marginBottom: -1 }}>
              {tab}
            </button>
          ))}
          <div style={{ width: 1, height: 20, background: "#EBEBEB", margin: "0 8px", flexShrink: 0 }} />
          <a href="/menu" style={{ padding: "20px 20px 18px", fontSize: 13, fontWeight: 900, letterSpacing: "0.06em", color: "#1A1A1A", textDecoration: "none", whiteSpace: "nowrap", marginBottom: -1, borderBottom: "3px solid transparent" }}>VIEW MENU</a>
        </div>

        {/* Item switcher pills */}
        {tabItems.length > 1 && (
          <div style={{ padding: "16px 64px 0", display: "flex", gap: 8, flexWrap: "wrap" }}>
            {tabItems.map((item, i) => (
              <button key={item.id} onClick={() => setActiveItem(i)} style={{ padding: "6px 16px", borderRadius: 20, border: i === activeItem ? "none" : "1px solid #EBEBEB", background: i === activeItem ? "#FFC72C" : "#fff", color: i === activeItem ? "#1A1A1A" : "#666", fontSize: 12, fontWeight: 700, cursor: "pointer", transition: "all 0.15s" }}>
                {item.name}
              </button>
            ))}
          </div>
        )}

        {/* Main split layout */}
        <div style={{ display: "flex", alignItems: "stretch", minHeight: 500, position: "relative", overflow: "hidden" }}>

          {/* Big M watermark */}
          <div aria-hidden="true" style={{ position: "absolute", right: 160, top: -60, fontSize: 520, fontWeight: 900, color: "#FFC72C", fontFamily: "'Arial Black', sans-serif", lineHeight: 1, opacity: 0.1, userSelect: "none", pointerEvents: "none", zIndex: 0 }}>M</div>

          {/* LEFT: Item info */}
          <div style={{ width: "44%", padding: "40px 40px 40px 64px", display: "flex", flexDirection: "column", justifyContent: "center", position: "relative", zIndex: 1 }}>

            {/* Veg/Non-veg indicator */}
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
              <div style={{ width: 20, height: 20, border: `2px solid ${featured.isVeg ? "#16a34a" : "#DC2626"}`, borderRadius: 3, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div style={{ width: 10, height: 10, borderRadius: "50%", background: featured.isVeg ? "#16a34a" : "#DC2626" }} />
              </div>
              <span style={{ fontSize: 11, fontWeight: 600, color: featured.isVeg ? "#16a34a" : "#DC2626" }}>{featured.isVeg ? "Pure Veg" : "Non-Veg"}</span>
            </div>

            {/* Yellow name banner — bleeds to left edge like reference */}
            <div style={{ background: "#FFC72C", padding: "14px 28px 14px 64px", borderRadius: "0 32px 32px 0", marginLeft: -64, marginBottom: 24, alignSelf: "flex-start" }}>
              <h2 style={{ fontSize: "clamp(22px, 2.2vw, 30px)", fontWeight: 900, color: "#1A1A1A", fontFamily: "'Arial Black', sans-serif", margin: 0 }}>{featured.name}</h2>
            </div>

            <p style={{ fontSize: 15, fontWeight: 600, color: "#999", fontStyle: "italic", marginBottom: 12 }}>{featured.tagline}</p>
            <p style={{ fontSize: 14, color: "#444", lineHeight: 1.7, marginBottom: 16 }}>{featured.description}</p>
            <p style={{ fontSize: 14, color: "#1A1A1A", marginBottom: 12 }}><strong>Serving Size:</strong> {featured.servingSize}</p>
            <div style={{ marginBottom: 24 }}>
              <p style={{ fontSize: 14, fontWeight: 700, color: "#DA291C", marginBottom: 4 }}>Allergen Warning! Contains:</p>
              <p style={{ fontSize: 14, color: "#444" }}>{featured.allergens}</p>
            </div>

            {/* Nutrition pill — red rounded rectangle matching reference exactly */}
            <div style={{ background: "#DA291C", borderRadius: 32, padding: "16px 20px", display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "14px 0" }}>
              {featured.nutrition.map((n, i) => (
                <div key={n.label} style={{ textAlign: "center", borderRight: i % 5 !== 4 ? "1px solid rgba(255,255,255,0.2)" : "none", padding: "0 6px" }}>
                  <p style={{ fontSize: 9, color: "rgba(255,255,255,0.75)", marginBottom: 3, lineHeight: 1.2 }}>{n.label}</p>
                  <p style={{ fontSize: 12, fontWeight: 800, color: "#fff" }}>{n.value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CENTER: Food image */}
          <div style={{ flex: 1, position: "relative", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1 }}>
            {featured.imageSrc ? (
              <img src={featured.imageSrc} alt={featured.imageAlt} style={{ maxWidth: "88%", maxHeight: 400, objectFit: "contain", filter: "drop-shadow(0 24px 48px rgba(0,0,0,0.14))" }} />
            ) : (
              // Blank placeholder — set imageSrc in MENU_ITEMS to fill
              <div style={{ width: 300, height: 300, background: "#F7F7F7", borderRadius: "50%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 12 }}>
                <div style={{ width: 60, height: 60, borderRadius: "50%", border: "2px dashed #CCCCCC", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M21 15V19C21 20.1 20.1 21 19 21H5C3.9 21 3 20.1 3 19V15" stroke="#CCCCCC" strokeWidth="2" strokeLinecap="round" /><path d="M17 8L12 3L7 8" stroke="#CCCCCC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /><path d="M12 3V15" stroke="#CCCCCC" strokeWidth="2" strokeLinecap="round" /></svg>
                </div>
                <p style={{ color: "#CCCCCC", fontSize: 11, fontWeight: 600 }}>Set imageSrc in MENU_ITEMS</p>
              </div>
            )}
          </div>

          {/* RIGHT: Ingredients panel */}
          <div style={{ width: 180, background: "#FFF9E6", borderLeft: "1px solid rgba(255,199,44,0.3)", padding: "40px 20px", display: "flex", flexDirection: "column", gap: 6, zIndex: 1, flexShrink: 0 }}>
            <h4 style={{ fontSize: 14, fontWeight: 900, color: "#1A1A1A", marginBottom: 14 }}>Ingredients</h4>
            {featured.ingredients.map((ing, i) => (
              <p key={i} style={{ fontSize: 13, color: "#999", lineHeight: 1.6 }}>{ing}{i < featured.ingredients.length - 1 ? "," : ""}</p>
            ))}
          </div>
        </div>

        {/* View full menu CTA */}
        <div style={{ padding: "24px 64px 40px", borderTop: "1px solid #F0F0F0", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
          <p style={{ fontSize: 15, color: "#888", fontWeight: 500 }}>Explore all <strong style={{ color: "#1A1A1A" }}>50+ items</strong> on our full menu</p>
          <a href="/menu" style={{ padding: "12px 32px", borderRadius: 32, background: "#DA291C", color: "#fff", fontSize: 14, fontWeight: 800, textDecoration: "none", letterSpacing: "0.04em", transition: "background 0.2s" }} onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.background = "#b52018")} onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.background = "#DA291C")}>
            View Full Menu →
          </a>
        </div>
      </section>

      {/* ══════════════ LOCATION + OUTLETS ══════════════ */}
      <div style={{ background: "#FAFAFA", borderTop: "3px solid #FFC72C", paddingBottom: 80 }}>
        <LocationBar />
        <OutletList />
      </div>
    </div>
  );
}