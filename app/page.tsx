"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import LocationBar from "@/components/LocationBar";
import OutletList from "@/components/OutletList";

// ─────────────────────────────────────────────
// HERO SLIDES
// ─────────────────────────────────────────────
const slides = [
  { id: 1, tag: "Limited Time Offer", title: "Buddy Meal", subtitle: "Grab a Meal for Two", imageSrc: "/image/Budy meal.jpg", imageAlt: "Buddy Meal promotional image" },
  { id: 2, tag: "Happy Meal", title: "HURRY UP!", subtitle: "Fun awaits in your Happy Meal", imageSrc: "/image/happy-meal.png", imageAlt: "Happy Meal with Funny Domino" },
  { id: 3, tag: "New Launch", title: "McSpicy Paneer", subtitle: "Spice up your day, the desi way", imageSrc: "/image/Mcspicy paneer.jpg", imageAlt: "McSpicy Paneer burger" },
];

const promoItems = ["Limited Time: Buddy Meal @ ₹119", "McSpicy Paneer is back!", "Free delivery above ₹299", "Happy Meal with Funny Domino"];

// ─────────────────────────────────────────────
// CATEGORY CAROUSEL DATA
// ─────────────────────────────────────────────
const categories = [
  { label: "McVeggie", imageSrc: "/image/mcvegie.jpg", active: false },
  { label: "McChicken", imageSrc: "/image/McChicken.png", active: true },
  { label: "Fillet-O-Fish", imageSrc: "/image/fillet_o_fish.jpeg", active: false },
  { label: "McAloo Tikki", imageSrc: "/image/McAloo-tikki.jpg", active: false },
  { label: "McSpicy Paneer", imageSrc: "/image/Mcspicy paneer.jpg", active: false },
  { label: "Masala Fries", imageSrc: "/image/masala fries.jpg", active: false },
  { label: "Soft Serve", imageSrc: "", active: false },
];

const CARDS_VISIBLE = 3;

// ─────────────────────────────────────────────
// MENU PREVIEW DATA
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
      imageSrc: "/image/mcvegie.jpg", imageAlt: "Veg Surprise Burger", isVeg: true,
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
      imageSrc: "/image/McAloo-tikki.jpg", imageAlt: "McAloo Tikki Burger", isVeg: true,
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
      imageSrc: "/image/Mcspicy paneer.jpg", imageAlt: "McSpicy Paneer Burger", isVeg: true,
    },
  ],
  "SNACKS & SIDES": [
    {
      id: "pizza-mcpuff", name: "Pizza McPuff®",
      tagline: "Something different. Something delicious.",
      description: "A blend of assorted vegetables; mozzarella cheese mixed with tomato sauce; and exotic spices stuffed in rectangle shaped savoury dough.",
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
      imageSrc: "/image/masala fries.jpg", imageAlt: "Masala Fries", isVeg: true,
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
// NEWS & HIGHLIGHTS DATA
// imageSrc: "" → grey placeholder shown
// imageSrc: "/images/news/article1.jpg" → from /public
// ─────────────────────────────────────────────
type NewsArticle = {
  id: string;
  category: string;
  title: string;
  date: string;
  imageSrc: string;
  imageAlt: string;
  href: string;
};

const NEWS_FEATURED: NewsArticle = {
  id: "featured",
  category: "NEWS",
  title: "McDonald's to hire 5,000 people, double stores in North, East India",
  date: "February 10, 2023",
  imageSrc: "", // Set to: "/images/news/featured.jpg"
  imageAlt: "McDonald's store exterior at night",
  href: "#",
};

const NEWS_CARDS: NewsArticle[] = [
  {
    id: "n1",
    category: "NEWS",
    title: "McDonald's India – North & East strikes a chord with its new campaign \"We Get It\"",
    date: "January 20, 2023",
    imageSrc: "", // Set to: "/images/news/campaign.jpg"
    imageAlt: "McDonald's We Get It campaign",
    href: "#",
  },
  {
    id: "n2",
    category: "NEWS",
    title: "McDonald's eyes 5-fold rise in no. of city outlets",
    date: "December 15, 2022",
    imageSrc: "", // Set to: "/images/news/outlets.jpg"
    imageAlt: "McDonald's outlet",
    href: "#",
  },
  {
    id: "n3",
    category: "NEWS",
    title: "McDonald's India North and East to set up global music platform",
    date: "November 28, 2022",
    imageSrc: "", // Set to: "/images/news/music.jpg"
    imageAlt: "McDonald's music platform",
    href: "#",
  },
];

const LATEST_NEWS = [
  { title: "Kartik Aaryan becomes the face of McDonald's India", date: "January 20, 2023", href: "#" },
  { title: "Veg Surprise Burger makes a comeback to McDonald's India", date: "December 1, 2022", href: "#" },
  { title: "McDonald's India Adds This Classic Appetiser To Its Menu", date: "November 15, 2022", href: "#" },
];

// ─────────────────────────────────────────────
// CONFETTI DOT PATTERN (rendered as CSS background)
// ─────────────────────────────────────────────
const confettiStyle = {
  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60'%3E%3Cellipse cx='10' cy='8' rx='3' ry='5' fill='%23FFC72C' transform='rotate(-30 10 8)'/%3E%3Cellipse cx='40' cy='20' rx='2.5' ry='4' fill='%23FFC72C' transform='rotate(20 40 20)'/%3E%3Cellipse cx='25' cy='45' rx='3' ry='5' fill='%23FFC72C' transform='rotate(-15 25 45)'/%3E%3Cellipse cx='55' cy='50' rx='2' ry='3.5' fill='%23FFC72C' transform='rotate(40 55 50)'/%3E%3Cellipse cx='5' cy='40' rx='2' ry='3' fill='%23FFC72C' transform='rotate(-45 5 40)'/%3E%3Cellipse cx='48' cy='5' rx='2.5' ry='4' fill='%23FFC72C' transform='rotate(15 48 5)'/%3E%3C/svg%3E")`,
  backgroundSize: "60px 60px",
};

// ─────────────────────────────────────────────

export default function HomePage() {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [activeTab, setActiveTab] = useState<MenuTab>("BURGERS & WRAPS");
  const [activeItem, setActiveItem] = useState(0);
  const [catIndex, setCatIndex] = useState(0);
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [subscribing, setSubscribing] = useState(false);
  const [hoveredNews, setHoveredNews] = useState<string | null>(null);
  const [hoveredLatest, setHoveredLatest] = useState<number | null>(null);

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

  const handleSubscribe = async () => {
    if (email.includes("@") && !subscribing) {
      setSubscribing(true);
      try {
        const res = await fetch("/api/subscribe", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email })
        });
        if (res.ok) {
          setSubscribed(true);
          setTimeout(() => setSubscribed(false), 3000);
          setEmail("");
        } else {
          const data = await res.json();
          alert(data.message || "Subscription failed");
        }
      } catch (err) {
        alert("Network error");
      } finally {
        setSubscribing(false);
      }
    }
  };

  return (
    <div style={{ fontFamily: "'Segoe UI', sans-serif", background: "#fff" }}>

      {/* ══════════════ HERO CAROUSEL ══════════════ */}
      <section style={{ background: "#FFC72C", minHeight: "88vh", display: "flex", alignItems: "stretch", overflow: "hidden", position: "relative" }}>
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
        <div style={{ position: "absolute", left: "41%", top: 0, bottom: 0, width: 6, background: "rgba(218,41,28,0.15)", zIndex: 3 }} />
        <div style={{ position: "absolute", left: "42.5%", top: 0, bottom: 0, width: 3, background: "rgba(218,41,28,0.08)", zIndex: 3 }} />
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

      {/* ══════════════ CATEGORY CAROUSEL ══════════════ */}
      <section style={{ background: "#fff", padding: "40px 64px 32px" }}>
        <p style={{ color: "#DA291C", fontSize: 11, fontWeight: 800, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 24 }}>
          What are you craving?
        </p>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ flex: 1, overflow: "hidden" }}>
            <div style={{ display: "flex", gap: 12, transform: `translateX(calc(-${catIndex} * (100% / ${CARDS_VISIBLE} + ${12 / CARDS_VISIBLE}px)))`, transition: "transform 0.38s cubic-bezier(0.4,0,0.2,1)" }}>
              {categories.map((cat) => (
                <a key={cat.label} href="/menu" style={{ minWidth: `calc(${100 / CARDS_VISIBLE}% - ${(12 * (CARDS_VISIBLE - 1)) / CARDS_VISIBLE}px)`, flexShrink: 0, display: "flex", alignItems: "center", gap: 18, padding: "14px 20px", borderRadius: 10, border: "1.5px solid #E8E8E8", background: "#fff", textDecoration: "none", transition: "border-color 0.2s, box-shadow 0.2s", cursor: "pointer", boxSizing: "border-box" }} onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = "#FFC72C"; (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 2px 14px rgba(255,199,44,0.22)"; }} onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = "#E8E8E8"; (e.currentTarget as HTMLAnchorElement).style.boxShadow = "none"; }}>
                  <div style={{ width: 80, height: 60, flexShrink: 0 }}>
                    {cat.imageSrc ? (
                      <img src={cat.imageSrc} alt={cat.label} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
                    ) : (
                      <div style={{ width: "100%", height: "100%", background: "#F5F5F5", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="18" height="18" rx="3" stroke="#CCC" strokeWidth="1.5" /><circle cx="8.5" cy="8.5" r="1.5" stroke="#CCC" strokeWidth="1.5" /><path d="M21 15L16 10L5 21" stroke="#CCC" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                      </div>
                    )}
                  </div>
                  <span style={{ fontSize: 15, fontWeight: 700, color: cat.active ? "#DA291C" : "#1A1A1A", lineHeight: 1.3, whiteSpace: "nowrap" }}>{cat.label}</span>
                </a>
              ))}
            </div>
          </div>
          <div style={{ display: "flex", gap: 10, flexShrink: 0 }}>
            <button onClick={() => setCatIndex(Math.max(0, catIndex - 1))} disabled={catIndex === 0} aria-label="Previous categories" style={{ width: 48, height: 48, borderRadius: "50%", border: "1.5px solid #DCDCDC", background: "#fff", color: catIndex === 0 ? "#CCCCCC" : "#1A1A1A", fontSize: 22, fontWeight: 700, lineHeight: 1, cursor: catIndex === 0 ? "default" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.2s" }}>‹</button>
            <button onClick={() => setCatIndex(Math.min(categories.length - CARDS_VISIBLE, catIndex + 1))} disabled={catIndex >= categories.length - CARDS_VISIBLE} aria-label="Next categories" style={{ width: 48, height: 48, borderRadius: "50%", border: "none", background: catIndex >= categories.length - CARDS_VISIBLE ? "#D0D0D0" : "#1A1A1A", color: "#fff", fontSize: 22, fontWeight: 700, lineHeight: 1, cursor: catIndex >= categories.length - CARDS_VISIBLE ? "default" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.2s" }}>›</button>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          MENU PREVIEW SECTION
      ══════════════════════════════════════════════ */}
      <section style={{ background: "#fff", borderTop: "1px solid #F0F0F0" }}>
        <div style={{ display: "flex", alignItems: "center", borderBottom: "1px solid #EBEBEB", padding: "0 64px", gap: 0, overflowX: "auto", scrollbarWidth: "none" }}>
          {MENU_TABS.map((tab) => (
            <button key={tab} onClick={() => setActiveTab(tab)} style={{ padding: "20px 20px 18px", fontSize: 13, fontWeight: 700, letterSpacing: "0.06em", color: activeTab === tab ? "#DA291C" : "#AAAAAA", background: "transparent", border: "none", borderBottom: activeTab === tab ? "3px solid #DA291C" : "3px solid transparent", cursor: "pointer", whiteSpace: "nowrap", transition: "all 0.2s ease", marginBottom: -1 }}>
              {tab}
            </button>
          ))}
          <div style={{ width: 1, height: 20, background: "#EBEBEB", margin: "0 8px", flexShrink: 0 }} />
          <a href="/menu" style={{ padding: "20px 20px 18px", fontSize: 13, fontWeight: 900, letterSpacing: "0.06em", color: "#1A1A1A", textDecoration: "none", whiteSpace: "nowrap", marginBottom: -1, borderBottom: "3px solid transparent" }}>VIEW MENU</a>
        </div>
        {tabItems.length > 1 && (
          <div style={{ padding: "16px 64px 0", display: "flex", gap: 8, flexWrap: "wrap" }}>
            {tabItems.map((item, i) => (
              <button key={item.id} onClick={() => setActiveItem(i)} style={{ padding: "6px 16px", borderRadius: 20, border: i === activeItem ? "none" : "1px solid #EBEBEB", background: i === activeItem ? "#FFC72C" : "#fff", color: i === activeItem ? "#1A1A1A" : "#666", fontSize: 12, fontWeight: 700, cursor: "pointer", transition: "all 0.15s" }}>{item.name}</button>
            ))}
          </div>
        )}
        <div style={{ display: "flex", alignItems: "stretch", minHeight: 500, position: "relative", overflow: "hidden" }}>
          <div aria-hidden="true" style={{ position: "absolute", right: 160, top: -60, fontSize: 520, fontWeight: 900, color: "#FFC72C", fontFamily: "'Arial Black', sans-serif", lineHeight: 1, opacity: 0.1, userSelect: "none", pointerEvents: "none", zIndex: 0 }}>M</div>
          <div style={{ width: "44%", padding: "40px 40px 40px 64px", display: "flex", flexDirection: "column", justifyContent: "center", position: "relative", zIndex: 1 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
              <div style={{ width: 20, height: 20, border: `2px solid ${featured.isVeg ? "#16a34a" : "#DC2626"}`, borderRadius: 3, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div style={{ width: 10, height: 10, borderRadius: "50%", background: featured.isVeg ? "#16a34a" : "#DC2626" }} />
              </div>
              <span style={{ fontSize: 11, fontWeight: 600, color: featured.isVeg ? "#16a34a" : "#DC2626" }}>{featured.isVeg ? "Pure Veg" : "Non-Veg"}</span>
            </div>
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
            <div style={{ background: "#DA291C", borderRadius: 32, padding: "16px 20px", display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "14px 0" }}>
              {featured.nutrition.map((n, i) => (
                <div key={n.label} style={{ textAlign: "center", borderRight: i % 5 !== 4 ? "1px solid rgba(255,255,255,0.2)" : "none", padding: "0 6px" }}>
                  <p style={{ fontSize: 9, color: "rgba(255,255,255,0.75)", marginBottom: 3, lineHeight: 1.2 }}>{n.label}</p>
                  <p style={{ fontSize: 12, fontWeight: 800, color: "#fff" }}>{n.value}</p>
                </div>
              ))}
            </div>
          </div>
          <div style={{ flex: 1, position: "relative", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1 }}>
            {featured.imageSrc ? (
              <img src={featured.imageSrc} alt={featured.imageAlt} style={{ maxWidth: "88%", maxHeight: 400, objectFit: "contain", filter: "drop-shadow(0 24px 48px rgba(0,0,0,0.14))" }} />
            ) : (
              <div style={{ width: 300, height: 300, background: "#F7F7F7", borderRadius: "50%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 12 }}>
                <div style={{ width: 60, height: 60, borderRadius: "50%", border: "2px dashed #CCCCCC", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M21 15V19C21 20.1 20.1 21 19 21H5C3.9 21 3 20.1 3 19V15" stroke="#CCCCCC" strokeWidth="2" strokeLinecap="round" /><path d="M17 8L12 3L7 8" stroke="#CCCCCC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /><path d="M12 3V15" stroke="#CCCCCC" strokeWidth="2" strokeLinecap="round" /></svg>
                </div>
                <p style={{ color: "#CCCCCC", fontSize: 11, fontWeight: 600 }}>Set imageSrc in MENU_ITEMS</p>
              </div>
            )}
          </div>
          <div style={{ width: 180, background: "#FFF9E6", borderLeft: "1px solid rgba(255,199,44,0.3)", padding: "40px 20px", display: "flex", flexDirection: "column", gap: 6, zIndex: 1, flexShrink: 0 }}>
            <h4 style={{ fontSize: 14, fontWeight: 900, color: "#1A1A1A", marginBottom: 14 }}>Ingredients</h4>
            {featured.ingredients.map((ing, i) => (
              <p key={i} style={{ fontSize: 13, color: "#999", lineHeight: 1.6 }}>{ing}{i < featured.ingredients.length - 1 ? "," : ""}</p>
            ))}
          </div>
        </div>
        <div style={{ padding: "24px 64px 40px", borderTop: "1px solid #F0F0F0", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
          <p style={{ fontSize: 15, color: "#888", fontWeight: 500 }}>Explore all <strong style={{ color: "#1A1A1A" }}>50+ items</strong> on our full menu</p>
          <a href="/menu" style={{ padding: "12px 32px", borderRadius: 32, background: "#DA291C", color: "#fff", fontSize: 14, fontWeight: 800, textDecoration: "none", letterSpacing: "0.04em", transition: "background 0.2s" }} onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.background = "#b52018")} onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.background = "#DA291C")}>
            View Full Menu →
          </a>
        </div>
      </section>

      {/* ══════════════ McDELIVERY SECTION ══════════════ */}
      <section style={{ display: "flex", minHeight: "92vh", overflow: "hidden" }}>
        <div style={{ width: "50%", background: "#fff", display: "flex", flexDirection: "column", justifyContent: "center", padding: "64px 56px", position: "relative" }}>
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 80, overflow: "hidden" }}>
            <svg viewBox="0 0 800 80" preserveAspectRatio="none" style={{ width: "100%", height: "100%" }}>
              <path d="M0,0 L0,40 Q100,80 200,40 Q300,0 400,40 Q500,80 600,40 Q700,0 800,40 L800,0 Z" fill="#FFC72C" />
            </svg>
          </div>
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 32 }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 10 }}>
              <div style={{ width: 72, height: 72, background: "#DA291C", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
                <span style={{ fontSize: 32, fontWeight: 900, color: "#FFC72C", fontFamily: "'Arial Black', sans-serif", lineHeight: 1 }}>M</span>
                <svg style={{ position: "absolute", top: -4, left: -4, width: 80, height: 80 }} viewBox="0 0 80 80">
                  <circle cx="40" cy="40" r="37" fill="none" stroke="#DA291C" strokeWidth="2" strokeDasharray="4 4" />
                </svg>
              </div>
              <p style={{ fontSize: 22, fontWeight: 800, color: "#1A1A1A", fontFamily: "'Arial Black', sans-serif", margin: 0, letterSpacing: "-0.5px" }}>McDelivery<span style={{ fontSize: 14 }}>.</span></p>
            </div>
            <div style={{ width: 80, height: 80, position: "relative", display: "flex", alignItems: "flex-end" }}>
              <div style={{ width: 64, height: 72, background: "#F5C842", borderRadius: "6px 6px 4px 4px", display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
                <div style={{ position: "absolute", top: -14, left: "50%", transform: "translateX(-50%)", width: 28, height: 16, border: "4px solid #DA291C", borderBottom: "none", borderRadius: "14px 14px 0 0", background: "transparent" }} />
                <div style={{ width: 36, height: 36, background: "#DA291C", borderRadius: 4, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ fontSize: 20, fontWeight: 900, color: "#FFC72C", fontFamily: "'Arial Black', sans-serif", lineHeight: 1 }}>M</span>
                </div>
              </div>
            </div>
          </div>
          <h2 style={{ fontSize: "clamp(34px, 4vw, 54px)", fontWeight: 900, color: "#1A1A1A", fontFamily: "'Arial Black', sans-serif", lineHeight: 1.1, marginBottom: 20 }}>Order for<br />Home-Delivered Smiles</h2>
          <p style={{ fontSize: 16, fontWeight: 600, color: "#C8A84B", marginBottom: 20 }}>We deliver to your doorstep</p>
          <p style={{ fontSize: 15, color: "#444", lineHeight: 1.75, marginBottom: 40, maxWidth: 420 }}>
            McDelivery allows you to experience delicious McDonald&apos;s food from the comfort of your sofa at home or cubicle in office. All orders are delivered quickly and efficiently, allowing you the peace of mind to know that smiles-inducing food is never too far.
          </p>
          <a href="https://www.mcdelivery.co.in" target="_blank" rel="noopener noreferrer" style={{ display: "inline-block", padding: "16px 48px", borderRadius: 40, background: "#DA291C", color: "#fff", fontSize: 15, fontWeight: 900, textDecoration: "none", letterSpacing: "0.08em", width: "fit-content", transition: "background 0.2s" }} onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.background = "#b52018")} onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.background = "#DA291C")}>
            ORDER NOW
          </a>
        </div>
        <div style={{ flex: 1, background: "#FFC72C", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "48px 40px", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: "12%", right: "14%", width: 200, height: 200, background: "rgba(255,255,255,0.18)", borderRadius: "50%", zIndex: 0 }} />
          <div style={{ position: "absolute", top: "18%", right: "20%", width: 120, height: 120, background: "rgba(255,255,255,0.22)", borderRadius: "50%", zIndex: 0 }} />
          <div style={{ textAlign: "center", marginBottom: 36, zIndex: 2, position: "relative" }}>
            <p style={{ fontSize: "clamp(18px, 2vw, 26px)", fontWeight: 800, color: "#1A1A1A", lineHeight: 1.3, margin: 0 }}>When it comes to making your day</p>
            <p style={{ fontSize: "clamp(20px, 2.2vw, 28px)", fontWeight: 900, color: "#DA291C", fontFamily: "'Arial Black', sans-serif", lineHeight: 1.2, margin: 0 }}>Nothing gets in our way!</p>
          </div>
          <div style={{ zIndex: 2, position: "relative", width: "100%", maxWidth: 460 }}>
            <svg viewBox="0 0 460 280" style={{ width: "100%", height: "auto" }} xmlns="http://www.w3.org/2000/svg">
              <line x1="10" y1="178" x2="68" y2="178" stroke="#DA291C" strokeWidth="3" strokeLinecap="round" opacity="0.5" />
              <line x1="2" y1="196" x2="72" y2="196" stroke="#DA291C" strokeWidth="2" strokeLinecap="round" opacity="0.35" />
              <line x1="18" y1="212" x2="74" y2="212" stroke="#DA291C" strokeWidth="1.5" strokeLinecap="round" opacity="0.25" />
              <line x1="20" y1="234" x2="440" y2="234" stroke="rgba(0,0,0,0.12)" strokeWidth="2" />
              <circle cx="128" cy="224" r="40" fill="#1A1A1A" /><circle cx="128" cy="224" r="28" fill="#333" /><circle cx="128" cy="224" r="11" fill="#555" />
              {[0, 45, 90, 135].map(a => (<line key={a} x1={128 + 11 * Math.cos(a * Math.PI / 180)} y1={224 + 11 * Math.sin(a * Math.PI / 180)} x2={128 + 28 * Math.cos(a * Math.PI / 180)} y2={224 + 28 * Math.sin(a * Math.PI / 180)} stroke="#555" strokeWidth="2" />))}
              <circle cx="348" cy="224" r="40" fill="#1A1A1A" /><circle cx="348" cy="224" r="28" fill="#333" /><circle cx="348" cy="224" r="11" fill="#555" />
              {[0, 45, 90, 135].map(a => (<line key={a} x1={348 + 11 * Math.cos(a * Math.PI / 180)} y1={224 + 11 * Math.sin(a * Math.PI / 180)} x2={348 + 28 * Math.cos(a * Math.PI / 180)} y2={224 + 28 * Math.sin(a * Math.PI / 180)} stroke="#555" strokeWidth="2" />))}
              <path d="M118,224 L118,172 Q122,132 168,126 L262,120 Q306,118 328,142 L368,190 L348,224 Z" fill="#DA291C" />
              <path d="M118,200 L262,190 L328,200 L348,224 L118,224 Z" fill="#B52018" />
              <path d="M128,175 Q160,150 220,145 L262,142 L268,152 Q215,156 165,180 Z" fill="rgba(255,255,255,0.12)" />
              <path d="M328,142 Q360,140 378,162 L368,190 L328,165 Z" fill="#DA291C" />
              <path d="M336,148 Q358,148 372,165 L365,175 L336,158 Z" fill="#C02020" />
              <ellipse cx="375" cy="170" rx="11" ry="9" fill="#FFF9C4" stroke="#C02020" strokeWidth="1.5" /><ellipse cx="375" cy="170" rx="6" ry="5" fill="#FFFDE7" />
              <rect x="148" y="195" width="120" height="10" rx="4" fill="#B52018" />
              <path d="M122,205 Q100,205 88,212 L84,218 L90,220 Q102,214 122,215 Z" fill="#777" /><ellipse cx="83" cy="219" rx="5" ry="3" fill="#555" />
              <line x1="340" y1="142" x2="356" y2="116" stroke="#1A1A1A" strokeWidth="6" strokeLinecap="round" />
              <ellipse cx="358" cy="113" rx="10" ry="6" fill="#1A1A1A" transform="rotate(-20,358,113)" /><ellipse cx="344" cy="120" rx="10" ry="6" fill="#1A1A1A" transform="rotate(-20,344,120)" />
              <rect x="130" y="82" width="82" height="72" rx="6" fill="#FFC72C" stroke="#E8A020" strokeWidth="2" />
              <rect x="137" y="89" width="68" height="58" rx="4" fill="#FFD740" />
              <line x1="130" y1="102" x2="212" y2="102" stroke="#E8A020" strokeWidth="1.5" />
              <text x="171" y="130" textAnchor="middle" fontSize="28" fontWeight="900" fontFamily="Arial Black, Arial, sans-serif" fill="#DA291C">M</text>
              <text x="171" y="143" textAnchor="middle" fontSize="8" fontWeight="700" fontFamily="Arial, sans-serif" fill="#DA291C" letterSpacing="0.5">McDelivery</text>
              <line x1="171" y1="89" x2="171" y2="154" stroke="#E8A020" strokeWidth="1.5" strokeDasharray="3 2" />
              <rect x="214" y="98" width="46" height="62" rx="12" fill="#DA291C" /><line x1="237" y1="100" x2="237" y2="158" stroke="#C02020" strokeWidth="2" />
              <ellipse cx="237" cy="88" rx="26" ry="24" fill="#C02020" />
              <path d="M213,93 Q237,105 261,93 L261,98 Q237,112 213,98 Z" fill="#1A1A1A" />
              <path d="M215,86 Q237,96 259,86" stroke="#4FC3F7" strokeWidth="3.5" fill="none" strokeLinecap="round" />
              <path d="M218,90 Q237,99 256,90" stroke="rgba(79,195,247,0.4)" strokeWidth="1.5" fill="none" strokeLinecap="round" />
              <rect x="231" y="66" width="12" height="5" rx="2" fill="#B52018" />
              <path d="M252,118 Q290,108 340,122" stroke="#DA291C" strokeWidth="13" strokeLinecap="round" fill="none" />
              <path d="M252,118 Q290,108 340,122" stroke="#C02020" strokeWidth="6" strokeLinecap="round" fill="none" />
              <ellipse cx="341" cy="123" rx="11" ry="7" fill="#1A1A1A" />
              <path d="M220,120 Q205,130 200,148" stroke="#DA291C" strokeWidth="13" strokeLinecap="round" fill="none" />
              <path d="M218,158 L205,194 L222,194 L228,158 Z" fill="#1A1A1A" />
              <path d="M238,158 L228,194 L245,194 L248,158 Z" fill="#1A1A1A" />
              <ellipse cx="213" cy="196" rx="16" ry="7" fill="#222" /><ellipse cx="236" cy="196" rx="16" ry="7" fill="#222" />
            </svg>
          </div>
          <div style={{ width: "88%", height: 4, background: "rgba(0,0,0,0.1)", borderRadius: 2, marginTop: 4, zIndex: 2, position: "relative" }} />
        </div>
      </section>

      {/* ══════════════ LOCATION + OUTLETS ══════════════ */}
      <div style={{ background: "#FAFAFA", borderTop: "3px solid #FFC72C", paddingBottom: 80 }}>
        <LocationBar />
        <OutletList />
      </div>

      {/* ══════════════════════════════════════════════
          NEWS & HIGHLIGHTS SECTION
      ══════════════════════════════════════════════ */}
      <section style={{ background: "#fff", padding: "72px 64px 80px", position: "relative", overflow: "hidden", ...confettiStyle }}>

        {/* Section Title */}
        <h2 style={{ fontSize: "clamp(28px, 3.5vw, 46px)", fontWeight: 900, color: "#1A1A1A", fontFamily: "'Arial Black', sans-serif", marginBottom: 48, position: "relative", zIndex: 1 }}>
          News &amp; Highlights
        </h2>

        {/* Featured Article */}
        <div style={{ display: "flex", gap: 0, marginBottom: 56, position: "relative", zIndex: 1 }}>
          {/* Yellow spotted card */}
          <div style={{ flex: "0 0 640px", background: "#FFC72C", borderRadius: 8, padding: 20, position: "relative", overflow: "visible", ...confettiStyle }}>
            {/* Image */}
            <div style={{ width: "100%", aspectRatio: "4/3", borderRadius: 4, overflow: "hidden", position: "relative" }}>
              {NEWS_FEATURED.imageSrc ? (
                <img src={NEWS_FEATURED.imageSrc} alt={NEWS_FEATURED.imageAlt} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              ) : (
                <div style={{ width: "100%", height: "100%", background: "rgba(0,0,0,0.25)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 10 }}>
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="18" height="18" rx="3" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" /><circle cx="8.5" cy="8.5" r="1.5" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" /><path d="M21 15L16 10L5 21" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 11, fontWeight: 600 }}>Set imageSrc in NEWS_FEATURED</p>
                </div>
              )}
            </div>
          </div>

          {/* White text card overlapping */}
          <div
            style={{ background: "#F2F2F2", borderRadius: 4, padding: "36px 40px", display: "flex", flexDirection: "column", justifyContent: "center", maxWidth: 460, marginLeft: -40, marginTop: 40, marginBottom: -16, alignSelf: "flex-start", boxShadow: "0 4px 24px rgba(0,0,0,0.08)", cursor: "pointer", transition: "box-shadow 0.2s, transform 0.2s", transform: hoveredNews === "featured" ? "translateY(-4px)" : "translateY(0)" }}
            onMouseEnter={() => setHoveredNews("featured")}
            onMouseLeave={() => setHoveredNews(null)}
          >
            <h3 style={{ fontSize: "clamp(18px, 1.8vw, 24px)", fontWeight: 900, color: "#1A1A1A", lineHeight: 1.3, marginBottom: 24, fontFamily: "'Arial Black', sans-serif" }}>
              {NEWS_FEATURED.title}
            </h3>
            <a href={NEWS_FEATURED.href} style={{ color: "#DA291C", fontSize: 15, fontWeight: 800, textDecoration: "none", letterSpacing: "0.02em", display: "flex", alignItems: "center", gap: 6 }}
              onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.gap = "10px"}
              onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.gap = "6px"}>
              Read more <span style={{ transition: "transform 0.2s" }}>→</span>
            </a>
          </div>
        </div>

        {/* 3 News Cards + Latest News sidebar */}
        <div style={{ display: "flex", gap: 28, position: "relative", zIndex: 1, alignItems: "flex-start" }}>

          {/* 3 cards */}
          <div style={{ display: "flex", gap: 20, flex: 1 }}>
            {NEWS_CARDS.map((article) => (
              <a key={article.id} href={article.href} style={{ flex: 1, background: "#FFC72C", borderRadius: 8, overflow: "hidden", textDecoration: "none", display: "flex", flexDirection: "column", transition: "transform 0.2s, box-shadow 0.2s", transform: hoveredNews === article.id ? "translateY(-6px)" : "translateY(0)", boxShadow: hoveredNews === article.id ? "0 12px 32px rgba(0,0,0,0.14)" : "0 2px 8px rgba(0,0,0,0.06)" }}
                onMouseEnter={() => setHoveredNews(article.id)}
                onMouseLeave={() => setHoveredNews(null)}>
                {/* Card Image */}
                <div style={{ width: "100%", aspectRatio: "16/10", position: "relative", overflow: "hidden" }}>
                  {article.imageSrc ? (
                    <img src={article.imageSrc} alt={article.imageAlt} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.4s", transform: hoveredNews === article.id ? "scale(1.06)" : "scale(1)" }} />
                  ) : (
                    <div style={{ width: "100%", height: "100%", background: "rgba(0,0,0,0.3)", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 8 }}>
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="18" height="18" rx="3" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" /><circle cx="8.5" cy="8.5" r="1.5" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" /><path d="M21 15L16 10L5 21" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                      <p style={{ color: "rgba(255,255,255,0.55)", fontSize: 10, fontWeight: 600 }}>Set imageSrc in NEWS_CARDS</p>
                    </div>
                  )}
                  {/* NEWS badge */}
                  <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "#DA291C", padding: "6px 16px" }}>
                    <span style={{ color: "#fff", fontSize: 12, fontWeight: 900, letterSpacing: "0.1em" }}>NEWS</span>
                  </div>
                </div>
                {/* Card text */}
                <div style={{ padding: "20px 18px 24px", background: "#FFC72C", flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                  <p style={{ fontSize: 14, fontWeight: 800, color: "#1A1A1A", lineHeight: 1.45, marginBottom: 16 }}>{article.title}</p>
                  <span style={{ color: "#DA291C", fontSize: 13, fontWeight: 800, display: "flex", alignItems: "center", gap: 5 }}>Read more <span>→</span></span>
                </div>
              </a>
            ))}
          </div>

          {/* Latest News sidebar */}
          <div style={{ width: 300, flexShrink: 0 }}>
            <p style={{ fontSize: 13, fontWeight: 900, letterSpacing: "0.15em", color: "#1A1A1A", textTransform: "uppercase", marginBottom: 20, paddingBottom: 12, borderBottom: "2px solid #1A1A1A" }}>Latest News</p>
            {LATEST_NEWS.map((item, i) => (
              <a key={i} href={item.href} style={{ display: "block", padding: "18px 0", borderBottom: "1px solid #E8E8E8", textDecoration: "none", transition: "all 0.2s" }}
                onMouseEnter={() => setHoveredLatest(i)}
                onMouseLeave={() => setHoveredLatest(null)}>
                <p style={{ fontSize: 14, fontWeight: 700, color: hoveredLatest === i ? "#DA291C" : "#1A1A1A", lineHeight: 1.45, marginBottom: 6, transition: "color 0.2s" }}>{item.title}</p>
                <p style={{ fontSize: 12, color: "#999", fontWeight: 500 }}>{item.date}</p>
              </a>
            ))}
            <a href="#" style={{ display: "inline-block", marginTop: 20, padding: "10px 28px", borderRadius: 24, border: "2px solid #1A1A1A", fontSize: 13, fontWeight: 800, color: "#1A1A1A", textDecoration: "none", transition: "all 0.2s" }}
              onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = "#1A1A1A"; (e.currentTarget as HTMLAnchorElement).style.color = "#fff"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = "transparent"; (e.currentTarget as HTMLAnchorElement).style.color = "#1A1A1A"; }}>
              View All News
            </a>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          SPECIAL OFFERS & NEWSLETTER SECTION
      ══════════════════════════════════════════════ */}
      <section style={{ background: "#f2f2f2", position: "relative", overflow: "hidden", minHeight: 380, display: "flex", alignItems: "stretch" }}>

        {/* Left yellow blob */}
        <div style={{ position: "absolute", left: -80, top: -80, width: 620, height: 620, background: "#FFC72C", borderRadius: "50%", zIndex: 0, ...confettiStyle }} />

        {/* Content */}
        <div style={{ position: "relative", zIndex: 1, padding: "72px 64px 80px", maxWidth: 600, display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <h2 style={{ fontSize: "clamp(28px, 3.5vw, 46px)", fontWeight: 900, color: "#1A1A1A", fontFamily: "'Arial Black', sans-serif", lineHeight: 1.15, marginBottom: 16 }}>
            Special Offers<br />&amp; News
          </h2>
          <p style={{ fontSize: 15, color: "#333", lineHeight: 1.7, marginBottom: 32, maxWidth: 380 }}>
            Subscribe now for news, promotions and more delivered right to your inbox.
          </p>

          {/* Email input */}
          <div style={{ display: "flex", gap: 0, marginBottom: 32, maxWidth: 500 }}>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              onKeyDown={e => e.key === "Enter" && handleSubscribe()}
              placeholder="Enter your email address"
              style={{ flex: 1, padding: "16px 24px", borderRadius: "40px 0 0 40px", border: "none", fontSize: 14, fontWeight: 500, outline: "none", background: "#fff", color: "#1A1A1A", boxShadow: "inset 0 0 0 1.5px #E0E0E0" }}
            />
            <button
              onClick={handleSubscribe}
              disabled={subscribing}
              style={{ padding: "16px 32px", borderRadius: "0 40px 40px 0", border: "none", background: subscribed ? "#16a34a" : "#DA291C", color: "#fff", fontSize: 13, fontWeight: 900, letterSpacing: "0.1em", cursor: subscribing ? "wait" : "pointer", transition: "background 0.25s", whiteSpace: "nowrap" }}
            >
              {subscribing ? "WAIT..." : subscribed ? "✓ SUBSCRIBED!" : "SUBSCRIBE"}
            </button>
          </div>

          {/* Social links */}
          <div style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
            <span style={{ fontSize: 13, fontWeight: 800, color: "#1A1A1A" }}>Follow us on:</span>
            {[
              { label: "Facebook", icon: "f", href: "#" },
              { label: "Instagram", icon: "📷", href: "#" },
              { label: "YouTube", icon: "▶", href: "#" },
              { label: "LinkedIn", icon: "in", href: "#" },
              { label: "X", icon: "✕", href: "#" },
            ].map((s) => (
              <a key={s.label} href={s.href} aria-label={s.label} style={{ width: 38, height: 38, borderRadius: "50%", border: "2px solid #1A1A1A", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 900, color: "#1A1A1A", textDecoration: "none", transition: "all 0.2s" }}
                onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = "#1A1A1A"; (e.currentTarget as HTMLAnchorElement).style.color = "#FFC72C"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = "transparent"; (e.currentTarget as HTMLAnchorElement).style.color = "#1A1A1A"; }}>
                {s.icon}
              </a>
            ))}
          </div>
          <p style={{ marginTop: 16, fontSize: 13, color: "#555", fontWeight: 500 }}>
            Email: <a href="mailto:info@mcdonaldsindia.com" style={{ color: "#1A1A1A", fontWeight: 700, textDecoration: "none" }}>info@mcdonaldsindia.com</a>
          </p>
        </div>

        {/* Right side: Happy Meal character placeholder */}
        <div style={{ flex: 1, position: "relative", display: "flex", alignItems: "flex-end", justifyContent: "center", zIndex: 1 }}>
          {/* SVG Happy Meal box characters */}
          <svg viewBox="0 0 400 320" style={{ width: "100%", maxWidth: 440, height: "auto", position: "absolute", bottom: 0 }} xmlns="http://www.w3.org/2000/svg">
            {/* Character 1 - left */}
            <g transform="translate(60, 30)">
              {/* Box body */}
              <rect x="20" y="80" width="100" height="110" rx="8" fill="#DA291C" />
              {/* Handle arc */}
              <path d="M40,80 Q70,50 100,80" fill="none" stroke="#FFC72C" strokeWidth="8" strokeLinecap="round" />
              {/* Face area - white cutout */}
              <rect x="28" y="88" width="84" height="56" rx="4" fill="#fff" opacity="0.12" />
              {/* Eyes */}
              <circle cx="50" cy="108" r="10" fill="white" />
              <circle cx="90" cy="108" r="10" fill="white" />
              <circle cx="53" cy="110" r="5" fill="#1A1A1A" />
              <circle cx="93" cy="110" r="5" fill="#1A1A1A" />
              <circle cx="55" cy="108" r="2" fill="white" />
              <circle cx="95" cy="108" r="2" fill="white" />
              {/* Smile */}
              <path d="M45,128 Q70,148 95,128" fill="none" stroke="white" strokeWidth="4" strokeLinecap="round" />
              {/* Tongue */}
              <ellipse cx="70" cy="140" rx="12" ry="8" fill="#FF6B6B" />
              {/* Legs */}
              <rect x="38" y="190" width="18" height="30" rx="4" fill="#1A1A1A" />
              <rect x="84" y="190" width="18" height="30" rx="4" fill="#1A1A1A" />
              {/* Shoes */}
              <ellipse cx="47" cy="222" rx="16" ry="8" fill="#222" />
              <ellipse cx="93" cy="222" rx="16" ry="8" fill="#222" />
              {/* Right arm raised */}
              <path d="M120,100 Q155,70 165,55" stroke="#DA291C" strokeWidth="14" strokeLinecap="round" fill="none" />
              <path d="M155,58 Q162,42 172,50 Q165,62 155,65 Z" fill="#FFDAB9" />
              {/* Left arm */}
              <path d="M20,115 Q-10,125 -18,135" stroke="#DA291C" strokeWidth="14" strokeLinecap="round" fill="none" />
              <ellipse cx="-18" cy="138" rx="9" ry="6" fill="#FFDAB9" transform="rotate(20,-18,138)" />
              {/* M logo on box */}
              <text x="70" y="78" textAnchor="middle" fontSize="18" fontWeight="900" fontFamily="Arial Black, sans-serif" fill="#FFC72C">M</text>
            </g>

            {/* Character 2 - right, slightly bigger */}
            <g transform="translate(200, 10)">
              <rect x="20" y="90" width="110" height="120" rx="8" fill="#DA291C" />
              <path d="M38,90 Q75,55 112,90" fill="none" stroke="#FFC72C" strokeWidth="9" strokeLinecap="round" />
              <circle cx="55" cy="118" r="11" fill="white" />
              <circle cx="99" cy="118" r="11" fill="white" />
              <circle cx="58" cy="121" r="6" fill="#1A1A1A" />
              <circle cx="102" cy="121" r="6" fill="#1A1A1A" />
              <circle cx="60" cy="118" r="2.5" fill="white" />
              <circle cx="104" cy="118" r="2.5" fill="white" />
              <path d="M50,140 Q77,164 104,140" fill="none" stroke="white" strokeWidth="4.5" strokeLinecap="round" />
              <ellipse cx="77" cy="154" rx="14" ry="9" fill="#FF6B6B" />
              <rect x="38" y="210" width="20" height="32" rx="5" fill="#1A1A1A" />
              <rect x="90" y="210" width="20" height="32" rx="5" fill="#1A1A1A" />
              <ellipse cx="48" cy="244" rx="18" ry="9" fill="#222" />
              <ellipse cx="100" cy="244" rx="18" ry="9" fill="#222" />
              {/* Both arms out */}
              <path d="M130,110 Q165,90 178,82" stroke="#DA291C" strokeWidth="15" strokeLinecap="round" fill="none" />
              <ellipse cx="180" cy="80" rx="10" ry="7" fill="#FFDAB9" transform="rotate(-20,180,80)" />
              <path d="M20,120 Q-18,102 -30,94" stroke="#DA291C" strokeWidth="15" strokeLinecap="round" fill="none" />
              <ellipse cx="-32" cy="92" rx="10" ry="7" fill="#FFDAB9" transform="rotate(20,-32,92)" />
              <text x="75" y="88" textAnchor="middle" fontSize="20" fontWeight="900" fontFamily="Arial Black, sans-serif" fill="#FFC72C">M</text>
            </g>

            {/* Fries in front */}
            <g transform="translate(30, 210) rotate(-20)">
              <rect x="0" y="10" width="12" height="55" rx="3" fill="#FFC72C" />
              <rect x="15" y="0" width="12" height="65" rx="3" fill="#FFD740" />
              <rect x="30" y="8" width="12" height="50" rx="3" fill="#FFC72C" />
            </g>
          </svg>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          FOOTER
      ══════════════════════════════════════════════ */}
      <footer style={{ background: "#1A1A1A", color: "#fff", position: "relative", overflow: "hidden" }}>

        {/* Yellow top stripe */}
        <div style={{ height: 6, background: "#FFC72C", width: "100%" }} />

        {/* Top footer: links */}
        <div style={{ padding: "64px 64px 48px", display: "grid", gridTemplateColumns: "1.6fr 1fr 1fr 1fr 1fr", gap: "32px 24px", borderBottom: "1px solid rgba(255,255,255,0.1)" }}>

          {/* Brand column */}
          <div>
            <div style={{ width: 60, height: 60, background: "#DA291C", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20, fontSize: 32, fontWeight: 900, color: "#FFC72C", fontFamily: "'Arial Black', sans-serif" }}>M</div>
            <p style={{ fontSize: 14, color: "rgba(255,255,255,0.6)", lineHeight: 1.75, maxWidth: 240, marginBottom: 24 }}>
              McDonald&apos;s India (North &amp; East). Serving smiles since 1996. Fresh food. Every time.
            </p>
            <div style={{ display: "flex", gap: 10 }}>
              {["f", "📷", "▶", "in", "✕"].map((icon, i) => (
                <a key={i} href="#" style={{ width: 36, height: 36, borderRadius: "50%", background: "rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, color: "#fff", textDecoration: "none", transition: "background 0.2s" }}
                  onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.background = "#DA291C"}
                  onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.background = "rgba(255,255,255,0.1)"}>
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Menu column */}
          <div>
            <p style={{ fontSize: 12, fontWeight: 900, letterSpacing: "0.18em", color: "#FFC72C", textTransform: "uppercase", marginBottom: 20 }}>Our Menu</p>
            {["Burgers & Wraps", "Snacks & Sides", "Beverages", "Desserts", "Happy Meal", "McCafé", "Value Picks"].map(link => (
              <a key={link} href="#" style={{ display: "block", fontSize: 13, color: "rgba(255,255,255,0.6)", textDecoration: "none", marginBottom: 10, transition: "color 0.2s" }}
                onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.color = "#FFC72C"}
                onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.6)"}>
                {link}
              </a>
            ))}
          </div>

          {/* Quick Links */}
          <div>
            <p style={{ fontSize: 12, fontWeight: 900, letterSpacing: "0.18em", color: "#FFC72C", textTransform: "uppercase", marginBottom: 20 }}>Quick Links</p>
            {["McDelivery", "Find a Restaurant", "Offers & Coupons", "Gift Cards", "Nutritional Info", "Allergen Info", "Corporate Catering"].map(link => (
              <a key={link} href="#" style={{ display: "block", fontSize: 13, color: "rgba(255,255,255,0.6)", textDecoration: "none", marginBottom: 10, transition: "color 0.2s" }}
                onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.color = "#FFC72C"}
                onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.6)"}>
                {link}
              </a>
            ))}
          </div>

          {/* Company */}
          <div>
            <p style={{ fontSize: 12, fontWeight: 900, letterSpacing: "0.18em", color: "#FFC72C", textTransform: "uppercase", marginBottom: 20 }}>Company</p>
            {["About Us", "Our History", "Sustainability", "Quality & Safety", "Careers", "Media Centre", "Investor Relations"].map(link => (
              <a key={link} href="#" style={{ display: "block", fontSize: 13, color: "rgba(255,255,255,0.6)", textDecoration: "none", marginBottom: 10, transition: "color 0.2s" }}
                onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.color = "#FFC72C"}
                onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.6)"}>
                {link}
              </a>
            ))}
          </div>

          {/* Contact */}
          <div>
            <p style={{ fontSize: 12, fontWeight: 900, letterSpacing: "0.18em", color: "#FFC72C", textTransform: "uppercase", marginBottom: 20 }}>Contact</p>
            <div style={{ marginBottom: 16 }}>
              <p style={{ fontSize: 12, color: "rgba(255,255,255,0.45)", marginBottom: 4 }}>Customer Care</p>
              <p style={{ fontSize: 13, color: "rgba(255,255,255,0.85)", fontWeight: 600 }}>1800-103-0000</p>
            </div>
            <div style={{ marginBottom: 16 }}>
              <p style={{ fontSize: 12, color: "rgba(255,255,255,0.45)", marginBottom: 4 }}>Email</p>
              <a href="mailto:info@mcdonaldsindia.com" style={{ fontSize: 13, color: "#FFC72C", textDecoration: "none", fontWeight: 600 }}>info@mcdonaldsindia.com</a>
            </div>
            <div style={{ marginBottom: 24 }}>
              <p style={{ fontSize: 12, color: "rgba(255,255,255,0.45)", marginBottom: 4 }}>Headquartered in</p>
              <p style={{ fontSize: 13, color: "rgba(255,255,255,0.85)" }}>New Delhi, India</p>
            </div>
            {/* App download badges */}
            <p style={{ fontSize: 12, fontWeight: 700, color: "rgba(255,255,255,0.5)", marginBottom: 10 }}>Get the App</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {["App Store", "Google Play"].map(store => (
                <a key={store} href="#" style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 14px", borderRadius: 8, border: "1px solid rgba(255,255,255,0.2)", textDecoration: "none", background: "rgba(255,255,255,0.05)", transition: "background 0.2s" }}
                  onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.background = "rgba(255,255,255,0.1)"}
                  onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.background = "rgba(255,255,255,0.05)"}>
                  <span style={{ fontSize: 18 }}>{store === "App Store" ? "🍎" : "▶"}</span>
                  <div>
                    <p style={{ fontSize: 9, color: "rgba(255,255,255,0.5)", lineHeight: 1 }}>Download on the</p>
                    <p style={{ fontSize: 12, fontWeight: 700, color: "#fff", lineHeight: 1.4 }}>{store}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ padding: "24px 64px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
          <p style={{ fontSize: 12, color: "rgba(255,255,255,0.35)" }}>
            © {new Date().getFullYear()} McDonald's. All rights reserved. McDonald's India (Connaught Plaza Restaurants Pvt. Ltd.)
          </p>
          <div style={{ display: "flex", gap: 24 }}>
            {["Privacy Policy", "Terms of Use", "Cookie Policy", "Accessibility"].map(link => (
              <a key={link} href="#" style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", textDecoration: "none", transition: "color 0.2s" }}
                onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.color = "#FFC72C"}
                onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.4)"}>
                {link}
              </a>
            ))}
          </div>
        </div>

        {/* Giant M watermark */}
        <div aria-hidden="true" style={{ position: "absolute", right: -40, bottom: -80, fontSize: 380, fontWeight: 900, color: "rgba(255,199,44,0.04)", fontFamily: "'Arial Black', sans-serif", lineHeight: 1, userSelect: "none", pointerEvents: "none" }}>M</div>
      </footer>

    </div>
  );
}