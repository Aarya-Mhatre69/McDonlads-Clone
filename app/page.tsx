"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import LocationBar from "@/components/LocationBar";
import OutletList from "@/components/OutletList";

/* ─────────────── HERO SLIDES ─────────────── */
const slides = [
  { id:1, tag:"Limited Time Offer", title:"Buddy Meal",      subtitle:"Grab a Meal for Two",            imageSrc:"/image/Budy meal.jpg",      bg:"#FFC72C", textColor:"#DA291C", accentColor:"#DA291C" },
  { id:2, tag:"Happy Meal",         title:"HURRY UP!",        subtitle:"Fun awaits in your Happy Meal",  imageSrc:"/image/happy-meal.png",     bg:"#DA291C", textColor:"#1A1A1A", accentColor:"#FFC72C" },
  { id:3, tag:"New Launch",         title:"McSpicy Paneer",   subtitle:"Spice up your day, the desi way",imageSrc:"/image/Mcspicy paneer.jpg", bg:"#FFC72C", textColor:"#DA291C", accentColor:"#DA291C" },
  { id:4, tag:"Breakfast Menu",     title:"Start Your Day",   subtitle:"With McDonald's Breakfast",      imageSrc:"/image/happy-meal.png",     bg:"#DA291C", textColor:"#1A1A1A", accentColor:"#FFC72C" },
];

const promoItems = ["Limited Time: Buddy Meal @ ₹119", "McSpicy Paneer is back!", "Free delivery above ₹299", "Happy Meal with Funny Domino", "McCafé Subscription Deal – 61% More Savings", "Breakfast Menu Now Available"];

/* ─────────────── CATEGORY CAROUSEL ─────────────── */
const categories = [
  { label:"McVeggie",      imageSrc:"/image/mcvegie.jpg" },
  { label:"McChicken",     imageSrc:"/image/McChicken.png" },
  { label:"Fillet-O-Fish", imageSrc:"/image/fillet_o_fish.jpeg" },
  { label:"McAloo Tikki",  imageSrc:"/image/McAloo-tikki.jpg" },
  { label:"McSpicy Paneer",imageSrc:"/image/Mcspicy paneer.jpg" },
  { label:"Masala Fries",  imageSrc:"/image/masala fries.jpg" },
];

/* ─────────────── MENU TABS DATA ─────────────── */
const MENU_TABS = ["BURGERS & WRAPS","SNACKS & SIDES","DESSERTS","BEVERAGES"] as const;
type MenuTab = typeof MENU_TABS[number];

type MenuItem = {
  id:string; name:string; tagline:string; description:string;
  servingSize:string; allergens:string; ingredients:string[];
  nutrition:{label:string;value:string}[];
  imageSrc:string; imageAlt:string; isVeg:boolean;
};

const MENU_ITEMS: Record<MenuTab,MenuItem[]> = {
  "BURGERS & WRAPS":[
    { id:"veg-surprise", name:"Veg Surprise Burger", tagline:"A surprise that will leave you wide-eyed.", description:"A scrumptious potato patty topped with a delectable Italian herb sauce and shredded onions placed between perfectly toasted buns.", servingSize:"132g", allergens:"Cereal containing gluten, Milk, Soya", ingredients:["Regular Bun","Italian mayo","Shredded onion","Herb Chilli Potato patty"], nutrition:[{label:"Energy",value:"313.44kCal"},{label:"Protein",value:"5.71g"},{label:"Total Fat",value:"14.95g"},{label:"Sat Fat",value:"3.73g"},{label:"Trans Fat",value:"0.14g"},{label:"Cholesterol",value:"0.0mg"},{label:"Total Carbs",value:"39.84g"},{label:"Total Sugars",value:"5.66g"},{label:"Added Sugars",value:"1.64g"},{label:"Sodium",value:"504.19mg"}], imageSrc:"/image/mcvegie.jpg", imageAlt:"Veg Surprise Burger", isVeg:true },
    { id:"mcaloo-tikki", name:"McAloo Tikki Burger®", tagline:"The one that never goes out of f(l)avour.", description:"A golden fried vegetarian patty prepared with peas, potato and infused with aromatic spices. Clubbed with sliced tomatoes, shredded red onion, and tangy tomato mayonnaise.", servingSize:"146g", allergens:"Cereal containing gluten, Milk, Soya", ingredients:["Regular bun","Tom-Mayo sauce","Sliced tomatoes","Shredded onion","Aloo tikki patty"], nutrition:[{label:"Energy",value:"339.52kCal"},{label:"Protein",value:"8.50g"},{label:"Total Fat",value:"11.31g"},{label:"Sat Fat",value:"4.27g"},{label:"Trans Fat",value:"0.20g"},{label:"Cholesterol",value:"1.47mg"},{label:"Total Carbs",value:"50.27g"},{label:"Total Sugars",value:"7.05g"},{label:"Added Sugars",value:"4.07g"},{label:"Sodium",value:"545.34mg"}], imageSrc:"/image/McAloo-tikki.jpg", imageAlt:"McAloo Tikki", isVeg:true },
    { id:"mcspicy-paneer", name:"McSpicy Paneer®", tagline:"Let paneer surprise you.", description:"Crispy and spicy paneer patty with creamy tandoori sauce and crispy lettuce topping.", servingSize:"199g", allergens:"Cereal containing gluten, Milk, Soya", ingredients:["Quarter pounder bun","Shredded lettuce","Tandoori mayo","Spicy paneer patty"], nutrition:[{label:"Energy",value:"652.76kCal"},{label:"Protein",value:"20.29g"},{label:"Total Fat",value:"39.45g"},{label:"Sat Fat",value:"17.12g"},{label:"Trans Fat",value:"0.18g"},{label:"Cholesterol",value:"21.85mg"},{label:"Total Carbs",value:"52.33g"},{label:"Total Sugars",value:"8.35g"},{label:"Added Sugars",value:"5.27g"},{label:"Sodium",value:"1074.58mg"}], imageSrc:"/image/Mcspicy paneer.jpg", imageAlt:"McSpicy Paneer", isVeg:true },
    { id:"mcchicken", name:"McChicken®", tagline:"Familiarity breeds confidence.", description:"Batter & breaded chicken patty containing green peas, carrots, green beans, onion, potatoes, rice and spices, served in a bun with eggless mayonnaise and lettuce.", servingSize:"173g", allergens:"Cereal containing gluten, Milk, Soya", ingredients:["Quarter bun crown","Veg mayonnaise","Shredded lettuce","McChicken patty","Quarter bun heel"], nutrition:[{label:"Energy",value:"400.80kCal"},{label:"Protein",value:"15.66g"},{label:"Total Fat",value:"15.70g"},{label:"Sat Fat",value:"5.47g"},{label:"Trans Fat",value:"0.16g"},{label:"Cholesterol",value:"31.17mg"},{label:"Total Carbs",value:"47.98g"},{label:"Total Sugars",value:"5.53g"},{label:"Added Sugars",value:"4.49g"},{label:"Sodium",value:"766.33mg"}], imageSrc:"/image/McChicken.png", imageAlt:"McChicken", isVeg:false },
  ],
  "SNACKS & SIDES":[
    { id:"masala-fries", name:"Masala Fries", tagline:"Classic fries with a bold Indian twist.", description:"Golden crispy fries tossed in a bold Indian spice blend with peri peri masala and chaat powder.", servingSize:"105g", allergens:"Cereal containing gluten", ingredients:["Golden Fries","Peri Peri Masala","Chaat Powder","Salt"], nutrition:[{label:"Energy",value:"315kCal"},{label:"Protein",value:"3.8g"},{label:"Total Fat",value:"14g"},{label:"Sat Fat",value:"2.3g"},{label:"Trans Fat",value:"0.0g"},{label:"Cholesterol",value:"0.0mg"},{label:"Total Carbs",value:"43g"},{label:"Total Sugars",value:"0.5g"},{label:"Added Sugars",value:"0g"},{label:"Sodium",value:"350mg"}], imageSrc:"/image/masala fries.jpg", imageAlt:"Masala Fries", isVeg:true },
    { id:"pizza-mcpuff", name:"Pizza McPuff®", tagline:"Something different. Something delicious.", description:"A blend of assorted vegetables; mozzarella cheese mixed with tomato sauce; and exotic spices stuffed in rectangle shaped savoury dough.", servingSize:"87g", allergens:"Cereal containing gluten, Milk, Soya", ingredients:["Assorted vegetables","Refined wheat flour","Pizza seasoning"], nutrition:[{label:"Energy",value:"228.21kCal"},{label:"Protein",value:"5.45g"},{label:"Total Fat",value:"11.44g"},{label:"Sat Fat",value:"5.72g"},{label:"Trans Fat",value:"0.09g"},{label:"Cholesterol",value:"5.17mg"},{label:"Total Carbs",value:"24.79g"},{label:"Total Sugars",value:"2.73g"},{label:"Added Sugars",value:"0.35g"},{label:"Sodium",value:"390.74mg"}], imageSrc:"", imageAlt:"Pizza McPuff", isVeg:true },
  ],
  "DESSERTS":[
    { id:"soft-serve", name:"Soft Serve Cone®", tagline:"Delightfully basic.", description:"Creamy vanilla soft-serve on a cone.", servingSize:"81.29g", allergens:"Cereal containing gluten, Milk, Soya", ingredients:["Soft serve mix (100% dairy product)"], nutrition:[{label:"Energy",value:"85.73kCal"},{label:"Protein",value:"1.99g"},{label:"Total Fat",value:"1.82g"},{label:"Sat Fat",value:"1.31g"},{label:"Trans Fat",value:"0.05g"},{label:"Cholesterol",value:"4.75mg"},{label:"Total Carbs",value:"15.23g"},{label:"Total Sugars",value:"10.68g"},{label:"Added Sugars",value:"6.99g"},{label:"Sodium",value:"40.78mg"}], imageSrc:"", imageAlt:"Soft Serve Cone", isVeg:true },
  ],
  "BEVERAGES":[
    { id:"masala-chai", name:"Masala Chai®", tagline:"Spicy. Aromatic. Perfect.", description:"Masala chai is a smooth and spicy blend of natural tea extract, milk solids, black pepper, fennel, clove and cinnamon.", servingSize:"90ml / 150ml", allergens:"Milk", ingredients:["Tea extract","Milk solids","Black pepper","Fennel","Clove","Cinnamon"], nutrition:[{label:"Energy",value:"54.97kCal"},{label:"Protein",value:"0.80g"},{label:"Total Fat",value:"0.85g"},{label:"Sat Fat",value:"0.51g"},{label:"Trans Fat",value:"0.02g"},{label:"Cholesterol",value:"0.0mg"},{label:"Total Carbs",value:"11.02g"},{label:"Total Sugars",value:"8.79g"},{label:"Added Sugars",value:"7.98g"},{label:"Sodium",value:"4.13mg"}], imageSrc:"", imageAlt:"Masala Chai", isVeg:true },
  ],
};

/* ─────────────── NEWS DATA ─────────────── */
const NEWS_FEATURED = {
  id:"featured", category:"NEWS",
  title:"McDonald's to hire 5,000 people, double stores in North, East India",
  date:"February 10, 2023", imageSrc:"", href:"#",
};
const NEWS_CARDS = [
  { id:"n1", category:"NEWS", title:"McDonald's India – North & East strikes a chord with new campaign \"We Get It\"", date:"January 20, 2023", imageSrc:"", href:"#" },
  { id:"n2", category:"NEWS", title:"McDonald's eyes 5-fold rise in no. of city outlets", date:"December 15, 2022", imageSrc:"", href:"#" },
  { id:"n3", category:"NEWS", title:"McDonald's India North and East to set up global music platform", date:"November 28, 2022", imageSrc:"", href:"#" },
];
const LATEST_NEWS = [
  { title:"Kartik Aaryan becomes the face of McDonald's India", date:"January 20, 2023", href:"#" },
  { title:"Veg Surprise Burger makes a comeback to McDonald's India", date:"December 1, 2022", href:"#" },
  { title:"McDonald's India Adds This Classic Appetiser To Its Menu", date:"November 15, 2022", href:"#" },
];

/* ─────────────── COMPONENT ─────────────── */
export default function HomePage() {
  const [current,     setCurrent]     = useState(0);
  const [animating,   setAnimating]   = useState(false);
  const [activeTab,   setActiveTab]   = useState<MenuTab>("BURGERS & WRAPS");
  const [activeItem,  setActiveItem]  = useState(0);
  const [catIndex,    setCatIndex]    = useState(0);
  const [email,       setEmail]       = useState("");
  const [subscribed,  setSubscribed]  = useState(false);
  const [marqueePaused, setMarqueePaused] = useState(false);

  const CARDS_VISIBLE = 3;

  const goTo = (i:number) => {
    if (animating) return;
    setAnimating(true);
    setTimeout(() => { setCurrent(i); setAnimating(false); }, 320);
  };
  const prev = () => goTo((current - 1 + slides.length) % slides.length);
  const next = () => goTo((current + 1) % slides.length);

  useEffect(() => { const t = setInterval(next, 5000); return () => clearInterval(t); }, [current]);
  useEffect(() => { setActiveItem(0); }, [activeTab]);

  const slide = slides[current];
  const tabItems = MENU_ITEMS[activeTab];
  const featured = tabItems[activeItem];

  return (
    <div id="homepage-root" style={{ fontFamily:"'Outfit', sans-serif", background:"#fff", overflowX:"hidden" }}>

      {/* ── Cursor fix: forces cursor:none on every child of this page ── */}
      <style>{`
        @media (hover: hover) and (pointer: fine) {
          #homepage-root, #homepage-root * { cursor: none !important; }
        }
        .news-sm-card { transition: transform 0.22s cubic-bezier(0.16,1,0.3,1), box-shadow 0.22s; }
        .news-sm-card:hover { transform: translateY(-6px) !important; box-shadow: 0 16px 40px rgba(0,0,0,0.13) !important; }
        .latest-link { display:block; padding:15px 0; border-bottom:1px solid #EBEBEB; text-decoration:none; transition:padding-left 0.18s; }
        .latest-link:hover { padding-left:8px; }
        .latest-link:hover .latest-title { color:#DA291C !important; }
      `}</style>

      {/* ══════════════ HERO CAROUSEL ══════════════ */}
      <section
        id="home"
        style={{
          background: slide.bg,
          minHeight:"88vh",
          display:"flex",
          alignItems:"stretch",
          overflow:"hidden",
          position:"relative",
          transition:"background 0.5s ease",
        }}
      >
        {/* Left panel */}
        <div style={{ width:"42%", display:"flex", flexDirection:"column", justifyContent:"center", padding:"80px 56px 80px 72px", position:"relative", zIndex:2 }}>
          {/* M Logo — colors invert on red slides */}
          <div style={{ width:52, height:52, background:slide.textColor, borderRadius:10, display:"flex", alignItems:"center", justifyContent:"center", marginBottom:36, flexShrink:0 }}>
            <span style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:30, fontWeight:900, color:slide.bg, lineHeight:1 }}>M</span>
          </div>

          <p
            key={`tag-${current}`}
            style={{ color:slide.textColor, fontSize:12, fontWeight:800, letterSpacing:"0.14em", textTransform:"uppercase", marginBottom:12, opacity:animating?0:1, transform:animating?"translateY(8px)":"translateY(0)", transition:"all 0.4s ease" }}
          >{slide.tag}</p>

          <h1
            key={`title-${current}`}
            style={{ fontSize:"clamp(40px, 5.5vw, 72px)", fontWeight:900, lineHeight:1.0, color:slide.textColor, marginBottom:16, fontFamily:"'Barlow Condensed','Arial Black',sans-serif", textTransform:"uppercase", fontStyle:"italic", opacity:animating?0:1, transform:animating?"translateY(14px)":"translateY(0)", transition:"all 0.45s ease 0.05s" }}
          >{slide.title}</h1>

          <p
            key={`sub-${current}`}
            style={{ fontSize:"clamp(18px, 2.4vw, 30px)", fontWeight:700, color:slide.textColor, lineHeight:1.25, marginBottom:44, opacity:animating?0:1, transform:animating?"translateY(14px)":"translateY(0)", transition:"all 0.45s ease 0.1s" }}
          >{slide.subtitle}</p>

          {/* Controls */}
          <div style={{ display:"flex", gap:12, alignItems:"center" }}>
            <button onClick={prev} aria-label="Previous" style={{ width:48, height:48, borderRadius:"50%", border:`2.5px solid ${slide.textColor}`, background:"transparent", color:slide.textColor, fontSize:24, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", fontWeight:700, transition:"all 0.2s" }}
              onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background=slide.textColor; (e.currentTarget as HTMLButtonElement).style.color=slide.bg; }}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background="transparent"; (e.currentTarget as HTMLButtonElement).style.color=slide.textColor; }}>‹</button>
            <button onClick={next} aria-label="Next" style={{ width:48, height:48, borderRadius:"50%", border:"none", background:"#fff", color:"#1a1a1a", fontSize:24, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", boxShadow:"0 3px 16px rgba(0,0,0,0.18)", fontWeight:700, transition:"all 0.2s" }}>›</button>
            <div style={{ display:"flex", gap:7, marginLeft:8 }}>
              {slides.map((_,i) => (
                <button key={i} onClick={() => goTo(i)} style={{ width:i===current?26:8, height:8, borderRadius:4, background:i===current?slide.textColor:`${slide.textColor}44`, border:"none", cursor:"pointer", transition:"all 0.35s ease", padding:0 }} />
              ))}
            </div>
          </div>
        </div>

        {/* Divider lines */}
        <div style={{ position:"absolute", left:"41.5%", top:0, bottom:0, width:5, background:"rgba(218,41,28,0.14)", zIndex:3 }} />

        {/* Right — image */}
        <div style={{ flex:1, position:"relative", overflow:"hidden" }}>
          {slide.imageSrc ? (
            <img src={slide.imageSrc} alt={slide.title} style={{ width:"100%", height:"100%", objectFit:"cover", opacity:animating?0:1, transform:animating?"scale(1.04)":"scale(1)", transition:"all 0.45s ease" }} />
          ) : (
            <div style={{ width:"100%", height:"100%", display:"flex", alignItems:"center", justifyContent:"center", background:"rgba(218,41,28,0.06)" }}>
              <span style={{ color:"rgba(218,41,28,0.3)", fontSize:14 }}>Add hero image</span>
            </div>
          )}
        </div>
      </section>

      {/* ══════════════ SCROLLING PROMO STRIP ══════════════ */}
      <div style={{ background:"#DA291C", padding:"12px 0", overflow:"hidden", borderTop:"1px solid rgba(0,0,0,0.1)" }}
        onMouseEnter={() => setMarqueePaused(true)}
        onMouseLeave={() => setMarqueePaused(false)}
      >
        <div style={{ display:"flex", animation:`marqueeScroll 24s linear infinite`, animationPlayState: marqueePaused ? "paused" : "running", width:"max-content" }}>
          <style>{`@keyframes marqueeScroll{from{transform:translateX(0)}to{transform:translateX(-50%)}}`}</style>
          {[...promoItems,...promoItems].map((text,i) => (
            <span key={i} style={{ display:"flex", alignItems:"center" }}>
              <span style={{ color:"#fff", fontSize:12, fontWeight:700, whiteSpace:"nowrap", letterSpacing:"0.08em", fontFamily:"'Outfit',sans-serif", padding:"0 32px" }}>{text}</span>
              <span style={{ color:"rgba(255,255,255,0.3)", fontSize:8 }}>◆</span>
            </span>
          ))}
        </div>
      </div>

      {/* ══════════════ WHAT ARE YOU CRAVING — Category Carousel ══════════════ */}
      <section style={{ background:"#fff", padding:"48px 72px 40px" }}>
        <p style={{ color:"#DA291C", fontSize:11, fontWeight:800, letterSpacing:"0.22em", textTransform:"uppercase", marginBottom:22, fontFamily:"'Outfit',sans-serif" }}>What are you craving?</p>
        <div style={{ display:"flex", alignItems:"center", gap:16 }}>
          <div style={{ flex:1, overflow:"hidden" }}>
            <div style={{ display:"flex", gap:14, transform:`translateX(calc(-${catIndex} * (100% / ${CARDS_VISIBLE} + 14px / ${CARDS_VISIBLE})))`, transition:"transform 0.4s cubic-bezier(0.4,0,0.2,1)" }}>
              {categories.map((cat) => (
                <Link key={cat.label} href="/menu" style={{ minWidth:`calc(${100/CARDS_VISIBLE}% - ${14*(CARDS_VISIBLE-1)/CARDS_VISIBLE}px)`, flexShrink:0, display:"flex", alignItems:"center", gap:16, padding:"13px 18px", borderRadius:12, border:"1.5px solid #EBEBEB", background:"#fff", textDecoration:"none", transition:"all 0.2s", cursor:"pointer", boxSizing:"border-box" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor="#FFC72C"; (e.currentTarget as HTMLAnchorElement).style.boxShadow="0 2px 16px rgba(255,199,44,0.2)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor="#EBEBEB"; (e.currentTarget as HTMLAnchorElement).style.boxShadow="none"; }}>
                  <div style={{ width:80, height:58, flexShrink:0 }}>
                    {cat.imageSrc ? <img src={cat.imageSrc} alt={cat.label} style={{ width:"100%", height:"100%", objectFit:"contain" }} /> : <div style={{ width:"100%", height:"100%", background:"#F5F5F5", borderRadius:8 }} />}
                  </div>
                  <span style={{ fontSize:14, fontWeight:700, color:"#1A1A1A", lineHeight:1.3, fontFamily:"'Outfit',sans-serif" }}>{cat.label}</span>
                </Link>
              ))}
            </div>
          </div>
          <div style={{ display:"flex", gap:10, flexShrink:0 }}>
            <button onClick={() => setCatIndex(Math.max(0, catIndex-1))} disabled={catIndex===0} style={{ width:48, height:48, borderRadius:"50%", border:"1.5px solid #D8D8D8", background:"#fff", color:catIndex===0?"#CCC":"#1A1A1A", fontSize:22, fontWeight:700, cursor:catIndex===0?"not-allowed":"pointer", display:"flex", alignItems:"center", justifyContent:"center", transition:"all 0.2s" }}>‹</button>
            <button onClick={() => setCatIndex(Math.min(categories.length-CARDS_VISIBLE, catIndex+1))} disabled={catIndex>=categories.length-CARDS_VISIBLE} style={{ width:48, height:48, borderRadius:"50%", border:"none", background:catIndex>=categories.length-CARDS_VISIBLE?"#D0D0D0":"#1A1A1A", color:"#fff", fontSize:22, fontWeight:700, cursor:catIndex>=categories.length-CARDS_VISIBLE?"not-allowed":"pointer", display:"flex", alignItems:"center", justifyContent:"center", transition:"all 0.2s" }}>›</button>
          </div>
        </div>
      </section>

      {/* ══════════════ MENU PREVIEW SECTION ══════════════ */}
      <section id="menu" style={{ background:"#fff", borderTop:"1px solid #F0F0F0" }}>
        {/* Tab row */}
        <div style={{ display:"flex", alignItems:"center", borderBottom:"1px solid #EBEBEB", padding:"0 72px", gap:0, overflowX:"auto", scrollbarWidth:"none" }}>
          {MENU_TABS.map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)} style={{ padding:"20px 22px 18px", fontSize:12.5, fontWeight:700, letterSpacing:"0.07em", color:activeTab===tab?"#DA291C":"#AAAAAA", background:"transparent", border:"none", borderBottom:activeTab===tab?"3px solid #DA291C":"3px solid transparent", cursor:"pointer", whiteSpace:"nowrap", transition:"all 0.2s", marginBottom:-1, fontFamily:"'Outfit',sans-serif" }}>{tab}</button>
          ))}
          <div style={{ width:1, height:20, background:"#EBEBEB", margin:"0 8px", flexShrink:0 }} />
          <Link href="/menu" style={{ padding:"20px 22px 18px", fontSize:12.5, fontWeight:900, letterSpacing:"0.07em", color:"#1A1A1A", textDecoration:"none", whiteSpace:"nowrap", marginBottom:-1, borderBottom:"3px solid transparent", fontFamily:"'Outfit',sans-serif" }}>VIEW MENU</Link>
        </div>

        {/* Sub-item tabs */}
        {tabItems.length > 1 && (
          <div style={{ padding:"16px 72px 0", display:"flex", gap:8, flexWrap:"wrap" }}>
            {tabItems.map((item,i) => (
              <button key={item.id} onClick={() => setActiveItem(i)} style={{ padding:"6px 16px", borderRadius:20, border:i===activeItem?"none":"1px solid #EBEBEB", background:i===activeItem?"#FFC72C":"#fff", color:i===activeItem?"#1A1A1A":"#666", fontSize:12, fontWeight:700, cursor:"pointer", transition:"all 0.15s", fontFamily:"'Outfit',sans-serif" }}>{item.name}</button>
            ))}
          </div>
        )}

        {/* Menu content */}
        <div style={{ display:"flex", alignItems:"stretch", minHeight:500, position:"relative", overflow:"hidden" }}>
          {/* Large background M */}
          <div aria-hidden="true" style={{ position:"absolute", right:120, top:-60, fontFamily:"'Barlow Condensed',sans-serif", fontSize:520, fontWeight:900, color:"#FFC72C", lineHeight:1, opacity:0.08, userSelect:"none", pointerEvents:"none", zIndex:0, fontStyle:"italic" }}>M</div>

          {/* Left: info */}
          <div style={{ width:"44%", padding:"40px 40px 40px 72px", display:"flex", flexDirection:"column", justifyContent:"center", position:"relative", zIndex:1 }}>
            <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:16 }}>
              <div style={{ width:20, height:20, border:`2px solid ${featured.isVeg?"#16a34a":"#DC2626"}`, borderRadius:3, display:"flex", alignItems:"center", justifyContent:"center" }}>
                <div style={{ width:10, height:10, borderRadius:"50%", background:featured.isVeg?"#16a34a":"#DC2626" }} />
              </div>
              <span style={{ fontSize:11, fontWeight:600, color:featured.isVeg?"#16a34a":"#DC2626", fontFamily:"'Outfit',sans-serif" }}>{featured.isVeg?"Pure Veg":"Non-Veg"}</span>
            </div>
            <div style={{ background:"#FFC72C", padding:"14px 28px 14px 72px", borderRadius:"0 32px 32px 0", marginLeft:-72, marginBottom:24, alignSelf:"flex-start" }}>
              <h2 style={{ fontSize:"clamp(22px,2.2vw,30px)", fontWeight:900, color:"#1A1A1A", fontFamily:"'Barlow Condensed','Arial Black',sans-serif", margin:0 }}>{featured.name}</h2>
            </div>
            <p style={{ fontSize:15, fontWeight:600, color:"#999", fontStyle:"italic", marginBottom:12, fontFamily:"'Outfit',sans-serif" }}>{featured.tagline}</p>
            <p style={{ fontSize:14, color:"#444", lineHeight:1.75, marginBottom:16, fontFamily:"'Outfit',sans-serif" }}>{featured.description}</p>
            <p style={{ fontSize:14, color:"#1A1A1A", marginBottom:12, fontFamily:"'Outfit',sans-serif" }}><strong>Serving Size:</strong> {featured.servingSize}</p>
            <div style={{ marginBottom:22 }}>
              <p style={{ fontSize:13, fontWeight:700, color:"#DA291C", marginBottom:4, fontFamily:"'Outfit',sans-serif" }}>Allergen Warning! Contains:</p>
              <p style={{ fontSize:13, color:"#444", fontFamily:"'Outfit',sans-serif" }}>{featured.allergens}</p>
            </div>
            {/* Nutrition grid */}
            <div style={{ background:"#DA291C", borderRadius:28, padding:"16px 18px", display:"grid", gridTemplateColumns:"repeat(5,1fr)", gap:"12px 0" }}>
              {featured.nutrition.map((n,i) => (
                <div key={n.label} style={{ textAlign:"center", borderRight:i%5!==4?"1px solid rgba(255,255,255,0.18)":"none", padding:"0 4px" }}>
                  <p style={{ fontSize:8.5, color:"rgba(255,255,255,0.72)", marginBottom:3, lineHeight:1.2, fontFamily:"'Outfit',sans-serif" }}>{n.label}</p>
                  <p style={{ fontSize:11, fontWeight:800, color:"#fff", fontFamily:"'Outfit',sans-serif" }}>{n.value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Center: image */}
          <div style={{ flex:1, position:"relative", display:"flex", alignItems:"center", justifyContent:"center", zIndex:1 }}>
            {featured.imageSrc ? (
              <img src={featured.imageSrc} alt={featured.imageAlt} style={{ maxWidth:"88%", maxHeight:400, objectFit:"contain", filter:"drop-shadow(0 24px 48px rgba(0,0,0,0.14))" }} />
            ) : (
              <div style={{ width:280, height:280, background:"#F7F7F7", borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center" }}>
                <span style={{ color:"#CCC", fontSize:12 }}>No image</span>
              </div>
            )}
          </div>

          {/* Right: ingredients */}
          <div style={{ width:170, background:"#FFF9E6", borderLeft:"1px solid rgba(255,199,44,0.3)", padding:"40px 18px", display:"flex", flexDirection:"column", gap:6, zIndex:1, flexShrink:0 }}>
            <h4 style={{ fontSize:13, fontWeight:900, color:"#1A1A1A", marginBottom:14, fontFamily:"'Outfit',sans-serif" }}>Ingredients</h4>
            {featured.ingredients.map((ing,i) => (
              <p key={i} style={{ fontSize:13, color:"#888", lineHeight:1.6, fontFamily:"'Outfit',sans-serif" }}>{ing}{i<featured.ingredients.length-1?",":""}</p>
            ))}
          </div>
        </div>

        {/* View full menu CTA */}
        <div style={{ padding:"22px 72px 40px", borderTop:"1px solid #F0F0F0", display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:16 }}>
          <p style={{ fontSize:14, color:"#888", fontWeight:500, fontFamily:"'Outfit',sans-serif" }}>Explore all <strong style={{ color:"#1A1A1A" }}>50+ items</strong> on our full menu</p>
          <Link href="/menu" style={{ padding:"12px 32px", borderRadius:32, background:"#DA291C", color:"#fff", fontSize:13, fontWeight:800, textDecoration:"none", letterSpacing:"0.04em", transition:"background 0.2s", fontFamily:"'Outfit',sans-serif" }}
            onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.background="#b52018")}
            onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.background="#DA291C")}>
            View Full Menu →
          </Link>
        </div>
      </section>

      {/* ══════════════ McDELIVERY SECTION ══════════════ */}
      <section id="mcdelivery" style={{ display:"flex", minHeight:"90vh", overflow:"hidden" }}>
        {/* Left: white */}
        <div style={{ width:"50%", background:"#fff", display:"flex", flexDirection:"column", justifyContent:"center", padding:"64px 56px", position:"relative" }}>
          {/* Yellow wave top */}
          <div style={{ position:"absolute", top:0, left:0, right:0, height:76, overflow:"hidden" }}>
            <svg viewBox="0 0 800 76" preserveAspectRatio="none" style={{ width:"100%", height:"100%" }}>
              <path d="M0,0 L0,38 Q100,76 200,38 Q300,0 400,38 Q500,76 600,38 Q700,0 800,38 L800,0 Z" fill="#FFC72C" />
            </svg>
          </div>
          <div style={{ marginTop:40 }}>
            <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:24 }}>
              <div style={{ width:68, height:68, background:"#DA291C", borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                <span style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:34, fontWeight:900, color:"#FFC72C", lineHeight:1 }}>M</span>
              </div>
              <div>
                <p style={{ fontSize:22, fontWeight:800, color:"#1A1A1A", margin:0, fontFamily:"'Barlow Condensed',sans-serif", letterSpacing:"-0.5px" }}>McDelivery<span style={{ fontSize:14 }}>.</span></p>
              </div>
            </div>
            <h2 style={{ fontSize:"clamp(32px,4vw,52px)", fontWeight:900, color:"#1A1A1A", fontFamily:"'Barlow Condensed','Arial Black',sans-serif", lineHeight:1.1, marginBottom:20, textTransform:"uppercase" }}>Order for<br />Home-Delivered Smiles</h2>
            <p style={{ fontSize:15, fontWeight:600, color:"#C8A84B", marginBottom:20, fontFamily:"'Outfit',sans-serif" }}>We deliver to your doorstep</p>
            <p style={{ fontSize:14, color:"#555", lineHeight:1.8, marginBottom:36, maxWidth:420, fontFamily:"'Outfit',sans-serif" }}>
              McDelivery allows you to experience delicious McDonald&apos;s food from the comfort of your sofa at home or cubicle in office. All orders are delivered quickly and efficiently.
            </p>
            <a href="https://www.mcdelivery.co.in" target="_blank" rel="noopener noreferrer" style={{ display:"inline-block", padding:"16px 48px", borderRadius:40, background:"#DA291C", color:"#fff", fontSize:14, fontWeight:900, textDecoration:"none", letterSpacing:"0.08em", transition:"background 0.2s", fontFamily:"'Outfit',sans-serif" }}
              onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.background="#b52018")}
              onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.background="#DA291C")}>
              ORDER NOW
            </a>
          </div>
        </div>

        {/* Right: yellow */}
        <div style={{ flex:1, background:"#FFC72C", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:"48px 40px", position:"relative", overflow:"hidden" }}>
          <div style={{ position:"absolute", top:"10%", right:"12%", width:220, height:220, background:"rgba(255,255,255,0.2)", borderRadius:"50%", zIndex:0 }} />
          <div style={{ position:"absolute", top:"18%", right:"20%", width:130, height:130, background:"rgba(255,255,255,0.24)", borderRadius:"50%", zIndex:0 }} />
          <div style={{ textAlign:"center", marginBottom:32, zIndex:2, position:"relative" }}>
            <p style={{ fontSize:"clamp(18px,2vw,24px)", fontWeight:800, color:"#1A1A1A", lineHeight:1.3, margin:0, fontFamily:"'Barlow Condensed',sans-serif" }}>When it comes to making your day</p>
            <p style={{ fontSize:"clamp(20px,2.2vw,28px)", fontWeight:900, color:"#DA291C", fontFamily:"'Barlow Condensed','Arial Black',sans-serif", lineHeight:1.2, margin:0, textTransform:"uppercase" }}>Nothing gets in our way!</p>
          </div>
          {/* Decorative delivery illustration area */}
          <div style={{ width:"90%", maxWidth:400, height:220, background:"rgba(218,41,28,0.08)", borderRadius:20, display:"flex", alignItems:"center", justifyContent:"center", zIndex:2, position:"relative", border:"2px dashed rgba(218,41,28,0.2)" }}>
            <span style={{ color:"rgba(218,41,28,0.4)", fontSize:13, fontFamily:"'Outfit',sans-serif" }}>Delivery illustration</span>
          </div>
        </div>
      </section>

      {/* ══════════════ RESTAURANTS / OUTLETS ══════════════ */}
      <section id="restaurants" style={{ background:"#FAFAFA", borderTop:"3px solid #FFC72C", paddingBottom:80 }}>
        <LocationBar />
        <OutletList />
      </section>

      {/* ══════════════ NEWS & HIGHLIGHTS ══════════════ */}
      <section id="news" style={{ background:"#fff", padding:"72px 64px 80px", position:"relative", overflow:"hidden" }}>

        {/* Confetti background — matches mcdindia.com exactly */}
        <div style={{ position:"absolute", inset:0, backgroundImage:`url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60'%3E%3Cellipse cx='10' cy='8' rx='3' ry='5' fill='%23FFC72C' opacity='0.55' transform='rotate(-30 10 8)'/%3E%3Cellipse cx='40' cy='20' rx='2.5' ry='4' fill='%23FFC72C' opacity='0.45' transform='rotate(20 40 20)'/%3E%3Cellipse cx='25' cy='45' rx='3' ry='5' fill='%23FFC72C' opacity='0.4' transform='rotate(-15 25 45)'/%3E%3Cellipse cx='55' cy='50' rx='2' ry='3' fill='%23FFC72C' opacity='0.35' transform='rotate(40 55 50)'/%3E%3C/svg%3E")`, backgroundSize:"60px 60px", pointerEvents:"none", zIndex:0 }} />

        <div style={{ position:"relative", zIndex:1, maxWidth:1280, margin:"0 auto" }}>

          {/* Section title */}
          <h2 style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:"clamp(36px,5vw,64px)", fontWeight:900, color:"#1A1A1A", textTransform:"uppercase", letterSpacing:"-0.01em", marginBottom:48, lineHeight:1 }}>
            News &amp; Highlights
          </h2>

          {/* ── FEATURED ARTICLE (big yellow card + overlapping grey text card) ── */}
          <div style={{ display:"flex", alignItems:"flex-start", gap:0, marginBottom:56, position:"relative" }}>

            {/* Yellow image card */}
            <div style={{ flexShrink:0, width:"min(600px, 55%)", background:"#FFC72C", borderRadius:10, padding:18, position:"relative", overflow:"hidden", boxShadow:"0 4px 20px rgba(0,0,0,0.08)" }}>
              {/* Inner image area */}
              <div style={{ width:"100%", aspectRatio:"4/3", borderRadius:6, overflow:"hidden", background:"rgba(218,41,28,0.18)", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:12, position:"relative" }}>
                {/* Placeholder M */}
                <div style={{ width:72, height:72, borderRadius:"50%", background:"rgba(218,41,28,0.2)", display:"flex", alignItems:"center", justifyContent:"center" }}>
                  <span style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:40, fontWeight:900, color:"rgba(218,41,28,0.5)", lineHeight:1 }}>M</span>
                </div>
                <p style={{ color:"rgba(218,41,28,0.4)", fontSize:12, fontFamily:"'Outfit',sans-serif", fontWeight:600 }}>Set imageSrc in NEWS_FEATURED</p>
              </div>
              {/* Confetti dots on card */}
              {[{t:"8%",l:"6%",s:12,r:-25},{t:"18%",l:"82%",s:9,r:20},{t:"75%",l:"4%",s:10,r:40},{t:"85%",l:"88%",s:8,r:-15}].map((d,i) => (
                <div key={i} style={{ position:"absolute", top:d.t, left:d.l, width:d.s, height:d.s*0.55, background:"rgba(218,41,28,0.28)", borderRadius:2, transform:`rotate(${d.r}deg)`, pointerEvents:"none" }} />
              ))}
            </div>

            {/* Overlapping grey text card */}
            <div
              className="news-card-featured"
              style={{ background:"#F2F2F2", borderRadius:8, padding:"36px 40px", display:"flex", flexDirection:"column", justifyContent:"center", maxWidth:420, marginLeft:-48, marginTop:48, alignSelf:"flex-start", boxShadow:"0 4px 24px rgba(0,0,0,0.1)", zIndex:2, position:"relative" }}
            >
              <span style={{ display:"inline-block", fontSize:10, fontWeight:900, letterSpacing:"0.2em", textTransform:"uppercase", color:"#DA291C", background:"rgba(218,41,28,0.08)", padding:"4px 10px", borderRadius:99, marginBottom:16, fontFamily:"'Outfit',sans-serif" }}>NEWS</span>
              <h3 style={{ fontSize:"clamp(17px,1.7vw,23px)", fontWeight:900, color:"#1A1A1A", lineHeight:1.35, marginBottom:20, fontFamily:"'Outfit',sans-serif" }}>
                {NEWS_FEATURED.title}
              </h3>
              <p style={{ fontSize:12, color:"#999", marginBottom:20, fontFamily:"'Outfit',sans-serif" }}>{NEWS_FEATURED.date}</p>
              <a href={NEWS_FEATURED.href} style={{ color:"#DA291C", fontSize:14, fontWeight:800, textDecoration:"none", letterSpacing:"0.02em", display:"inline-flex", alignItems:"center", gap:7, fontFamily:"'Outfit',sans-serif", transition:"gap 0.2s" }}
                onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.gap="12px"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.gap="7px"; }}>
                Read more <span>→</span>
              </a>
            </div>
          </div>

          {/* ── 3 SMALL CARDS + LATEST NEWS SIDEBAR ── */}
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr 280px", gap:20, alignItems:"start" }}>

            {/* 3 yellow cards */}
            {NEWS_CARDS.map(article => (
              <a key={article.id} href={article.href} className="news-sm-card"
                style={{ background:"#FFC72C", borderRadius:10, overflow:"hidden", textDecoration:"none", display:"flex", flexDirection:"column", boxShadow:"0 2px 8px rgba(0,0,0,0.06)" }}>
                {/* Image area */}
                <div style={{ width:"100%", aspectRatio:"16/9", background:"rgba(218,41,28,0.2)", display:"flex", alignItems:"flex-end", justifyContent:"flex-start", position:"relative", overflow:"hidden" }}>
                  {/* Placeholder M watermark */}
                  <div style={{ position:"absolute", right:-12, top:"50%", transform:"translateY(-50%)", fontFamily:"'Barlow Condensed',sans-serif", fontSize:90, fontWeight:900, color:"rgba(218,41,28,0.12)", lineHeight:1, userSelect:"none", fontStyle:"italic" }}>M</div>
                  {/* NEWS badge */}
                  <div style={{ position:"absolute", bottom:0, left:0, right:0, background:"#DA291C", padding:"6px 14px" }}>
                    <span style={{ color:"#fff", fontSize:10, fontWeight:900, letterSpacing:"0.14em", fontFamily:"'Outfit',sans-serif" }}>NEWS</span>
                  </div>
                </div>
                {/* Text */}
                <div style={{ padding:"18px 16px 20px", flex:1, display:"flex", flexDirection:"column", justifyContent:"space-between", gap:12 }}>
                  <p style={{ fontSize:13, fontWeight:800, color:"#1A1A1A", lineHeight:1.5, fontFamily:"'Outfit',sans-serif" }}>{article.title}</p>
                  <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
                    <p style={{ fontSize:11, color:"rgba(0,0,0,0.45)", fontFamily:"'Outfit',sans-serif" }}>{article.date}</p>
                    <span style={{ color:"#DA291C", fontSize:12, fontWeight:800, display:"flex", alignItems:"center", gap:4, fontFamily:"'Outfit',sans-serif" }}>Read more <span>→</span></span>
                  </div>
                </div>
              </a>
            ))}

            {/* Latest News sidebar */}
            <div style={{ background:"#fff", borderRadius:10, border:"1px solid #EBEBEB", overflow:"hidden" }}>
              {/* Sidebar header */}
              <div style={{ background:"#1A1A1A", padding:"14px 18px" }}>
                <p style={{ fontSize:11, fontWeight:900, letterSpacing:"0.2em", color:"#FFC72C", textTransform:"uppercase", margin:0, fontFamily:"'Outfit',sans-serif" }}>Latest News</p>
              </div>
              <div style={{ padding:"0 0 10px" }}>
                {LATEST_NEWS.map((item, i) => (
                  <a key={i} href={item.href} className="latest-link" style={{ display:"block", padding:"15px 18px", borderBottom: i < LATEST_NEWS.length - 1 ? "1px solid #F0F0F0" : "none", textDecoration:"none" }}>
                    <h4 className="latest-title" style={{ fontSize:13, fontWeight:700, color:"#1A1A1A", lineHeight:1.45, marginBottom:5, fontFamily:"'Outfit',sans-serif", transition:"color 0.18s" }}>{item.title}</h4>
                    <p style={{ fontSize:11, color:"#999", fontWeight:500, fontFamily:"'Outfit',sans-serif" }}>{item.date}</p>
                  </a>
                ))}
                <div style={{ padding:"12px 18px 4px" }}>
                  <a href="#" style={{ display:"inline-flex", alignItems:"center", gap:6, padding:"9px 18px", borderRadius:22, border:"2px solid #1A1A1A", fontSize:12, fontWeight:800, color:"#1A1A1A", textDecoration:"none", transition:"all 0.2s", fontFamily:"'Outfit',sans-serif" }}
                    onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background="#1A1A1A"; (e.currentTarget as HTMLAnchorElement).style.color="#FFC72C"; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background="transparent"; (e.currentTarget as HTMLAnchorElement).style.color="#1A1A1A"; }}>
                    View All
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                  </a>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ══════════════ SPECIAL OFFERS & NEWSLETTER ══════════════ */}
      <section id="offers" style={{ background:"#f2f2f2", position:"relative", overflow:"hidden", minHeight:380, display:"flex", alignItems:"stretch" }}>
        {/* Yellow blob */}
        <div style={{ position:"absolute", left:-80, top:-80, width:580, height:580, background:"#FFC72C", borderRadius:"50%", zIndex:0 }} />
        <div style={{ position:"relative", zIndex:1, padding:"72px 72px 80px", maxWidth:600, display:"flex", flexDirection:"column", justifyContent:"center" }}>
          <h2 style={{ fontSize:"clamp(28px,3.5vw,44px)", fontWeight:900, color:"#1A1A1A", fontFamily:"'Barlow Condensed','Arial Black',sans-serif", lineHeight:1.15, marginBottom:16, textTransform:"uppercase" }}>
            Special Offers<br />&amp; News
          </h2>
          <p style={{ fontSize:14, color:"#444", lineHeight:1.75, marginBottom:32, maxWidth:380, fontFamily:"'Outfit',sans-serif" }}>
            Subscribe now for news, promotions and more delivered right to your inbox.
          </p>
          <div style={{ display:"flex", gap:0, marginBottom:28, maxWidth:500 }}>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} onKeyDown={e => e.key==="Enter" && email.includes("@") && setSubscribed(true)} placeholder="Enter your email address"
              style={{ flex:1, padding:"15px 22px", borderRadius:"36px 0 0 36px", border:"none", fontSize:14, fontWeight:500, outline:"none", background:"#fff", color:"#1A1A1A", boxShadow:"inset 0 0 0 1.5px #E0E0E0", fontFamily:"'Outfit',sans-serif" }} />
            <button onClick={() => email.includes("@") && setSubscribed(true)} style={{ padding:"15px 30px", borderRadius:"0 36px 36px 0", border:"none", background:subscribed?"#16a34a":"#DA291C", color:"#fff", fontSize:12, fontWeight:900, letterSpacing:"0.1em", cursor:"pointer", transition:"background 0.25s", whiteSpace:"nowrap", fontFamily:"'Outfit',sans-serif" }}>
              {subscribed?"✓ SUBSCRIBED!":"SUBSCRIBE"}
            </button>
          </div>
          {/* Social icons */}
          <div style={{ display:"flex", alignItems:"center", gap:14, flexWrap:"wrap" }}>
            <span style={{ fontSize:12, fontWeight:800, color:"#1A1A1A", fontFamily:"'Outfit',sans-serif" }}>Follow us on:</span>
            {[{label:"Facebook",icon:"f"},{label:"Instagram",icon:"📷"},{label:"YouTube",icon:"▶"},{label:"LinkedIn",icon:"in"},{label:"X",icon:"✕"}].map(s => (
              <a key={s.label} href="#" aria-label={s.label} style={{ width:36, height:36, borderRadius:"50%", border:"2px solid #1A1A1A", display:"flex", alignItems:"center", justifyContent:"center", fontSize:13, fontWeight:900, color:"#1A1A1A", textDecoration:"none", transition:"all 0.2s" }}
                onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background="#1A1A1A"; (e.currentTarget as HTMLAnchorElement).style.color="#FFC72C"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background="transparent"; (e.currentTarget as HTMLAnchorElement).style.color="#1A1A1A"; }}>
                {s.icon}
              </a>
            ))}
          </div>
          <p style={{ marginTop:14, fontSize:12, color:"#555", fontFamily:"'Outfit',sans-serif" }}>
            Email: <a href="mailto:info@mcdonaldsindia.com" style={{ color:"#1A1A1A", fontWeight:700, textDecoration:"none" }}>info@mcdonaldsindia.com</a>
          </p>
        </div>
        {/* Right decorative area */}
        <div style={{ flex:1, position:"relative", display:"flex", alignItems:"flex-end", justifyContent:"center", zIndex:1 }}>
          <div style={{ width:"80%", maxWidth:380, height:300, display:"flex", alignItems:"center", justifyContent:"center", marginBottom:0 }}>
            <div style={{ textAlign:"center" }}>
              <div style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:120, fontWeight:900, color:"rgba(218,41,28,0.12)", lineHeight:1, fontStyle:"italic" }}>M</div>
              <p style={{ color:"rgba(0,0,0,0.2)", fontSize:12 }}>Add character illustration here</p>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════ FOOTER ══════════════ */}
      <footer style={{ background:"#1A1A1A", color:"#fff", position:"relative", overflow:"hidden" }}>
        {/* Yellow top stripe */}
        <div style={{ height:5, background:"#FFC72C", width:"100%" }} />

        <div style={{ padding:"60px 72px 48px", display:"grid", gridTemplateColumns:"1.6fr 1fr 1fr 1fr 1fr", gap:"32px 24px", borderBottom:"1px solid rgba(255,255,255,0.08)" }}>
          {/* Brand */}
          <div>
            <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:20 }}>
              <div style={{ width:52, height:52, background:"#DA291C", borderRadius:10, display:"flex", alignItems:"center", justifyContent:"center" }}>
                <span style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:28, fontWeight:900, color:"#FFC72C", lineHeight:1 }}>M</span>
              </div>
              <div>
                <div style={{ fontFamily:"'Outfit',sans-serif", fontSize:15, fontWeight:800, color:"#fff" }}>McDonald&apos;s</div>
                <div style={{ fontSize:10, color:"#FFC72C", letterSpacing:"0.2em", fontWeight:700, fontFamily:"'Outfit',sans-serif", textTransform:"uppercase" }}>India</div>
              </div>
            </div>
            <p style={{ fontSize:13, color:"rgba(255,255,255,0.5)", lineHeight:1.8, maxWidth:230, marginBottom:22, fontFamily:"'Outfit',sans-serif" }}>McDonald&apos;s India (North &amp; East). Serving smiles since 1996. Fresh food. Every time.</p>
            <div style={{ display:"flex", gap:9 }}>
              {["f","📷","▶","in","✕"].map((icon,i) => (
                <a key={i} href="#" style={{ width:34, height:34, borderRadius:"50%", background:"rgba(255,255,255,0.08)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:12, color:"#fff", textDecoration:"none", transition:"background 0.2s" }}
                  onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.background="#DA291C"}
                  onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.background="rgba(255,255,255,0.08)"}>
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {[
            { title:"Our Menu", links:["Burgers & Wraps","Snacks & Sides","Beverages","Desserts","Happy Meal","McCafé","Value Picks"] },
            { title:"Quick Links", links:["McDelivery","Find a Restaurant","Offers & Coupons","Gift Cards","Nutritional Info","Allergen Info","Corporate Catering"] },
            { title:"Company", links:["About Us","Our History","Sustainability","Quality & Safety","Careers","Media Centre","Investor Relations"] },
          ].map(col => (
            <div key={col.title}>
              <p style={{ fontSize:10, fontWeight:900, letterSpacing:"0.2em", color:"#FFC72C", textTransform:"uppercase", marginBottom:18, fontFamily:"'Outfit',sans-serif" }}>{col.title}</p>
              {col.links.map(link => (
                <a key={link} href="#" style={{ display:"block", fontSize:13, color:"rgba(255,255,255,0.5)", textDecoration:"none", marginBottom:10, transition:"color 0.2s", fontFamily:"'Outfit',sans-serif" }}
                  onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.color="#FFC72C"}
                  onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.color="rgba(255,255,255,0.5)"}>
                  {link}
                </a>
              ))}
            </div>
          ))}

          {/* Contact */}
          <div>
            <p style={{ fontSize:10, fontWeight:900, letterSpacing:"0.2em", color:"#FFC72C", textTransform:"uppercase", marginBottom:18, fontFamily:"'Outfit',sans-serif" }}>Contact</p>
            <div style={{ marginBottom:14 }}><p style={{ fontSize:11, color:"rgba(255,255,255,0.38)", marginBottom:3 }}>Customer Care</p><p style={{ fontSize:13, color:"rgba(255,255,255,0.8)", fontWeight:600, fontFamily:"'Outfit',sans-serif" }}>1800-103-0000</p></div>
            <div style={{ marginBottom:14 }}><p style={{ fontSize:11, color:"rgba(255,255,255,0.38)", marginBottom:3 }}>Email</p><a href="mailto:info@mcdonaldsindia.com" style={{ fontSize:13, color:"#FFC72C", textDecoration:"none", fontWeight:600, fontFamily:"'Outfit',sans-serif" }}>info@mcdonaldsindia.com</a></div>
            <div style={{ marginBottom:22 }}><p style={{ fontSize:11, color:"rgba(255,255,255,0.38)", marginBottom:3 }}>Headquartered</p><p style={{ fontSize:13, color:"rgba(255,255,255,0.7)", fontFamily:"'Outfit',sans-serif" }}>New Delhi, India</p></div>
            <p style={{ fontSize:11, fontWeight:700, color:"rgba(255,255,255,0.38)", marginBottom:8, fontFamily:"'Outfit',sans-serif" }}>Get the App</p>
            {["App Store","Google Play"].map(store => (
              <a key={store} href="#" style={{ display:"flex", alignItems:"center", gap:8, padding:"7px 12px", borderRadius:8, border:"1px solid rgba(255,255,255,0.15)", textDecoration:"none", background:"rgba(255,255,255,0.04)", transition:"background 0.2s", marginBottom:8 }}
                onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.background="rgba(255,255,255,0.1)"}
                onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.background="rgba(255,255,255,0.04)"}>
                <span style={{ fontSize:16 }}>{store==="App Store"?"🍎":"▶"}</span>
                <div><p style={{ fontSize:9, color:"rgba(255,255,255,0.4)", lineHeight:1, fontFamily:"'Outfit',sans-serif" }}>Download on the</p><p style={{ fontSize:11, fontWeight:700, color:"#fff", lineHeight:1.4, fontFamily:"'Outfit',sans-serif" }}>{store}</p></div>
              </a>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ padding:"22px 72px", display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:14 }}>
          <p style={{ fontSize:11, color:"rgba(255,255,255,0.3)", fontFamily:"'Outfit',sans-serif" }}>© {new Date().getFullYear()} McDonald&apos;s. All rights reserved. McDonald&apos;s India (Connaught Plaza Restaurants Pvt. Ltd.)</p>
          <div style={{ display:"flex", gap:22 }}>
            {["Privacy Policy","Terms of Use","Cookie Policy","Accessibility"].map(link => (
              <a key={link} href="#" style={{ fontSize:11, color:"rgba(255,255,255,0.35)", textDecoration:"none", transition:"color 0.2s", fontFamily:"'Outfit',sans-serif" }}
                onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.color="#FFC72C"}
                onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.color="rgba(255,255,255,0.35)"}>
                {link}
              </a>
            ))}
          </div>
        </div>

        {/* Giant M watermark */}
        <div aria-hidden="true" style={{ position:"absolute", right:-40, bottom:-80, fontFamily:"'Barlow Condensed',sans-serif", fontSize:360, fontWeight:900, color:"rgba(255,199,44,0.04)", lineHeight:1, userSelect:"none", pointerEvents:"none", fontStyle:"italic" }}>M</div>
      </footer>
    </div>
  );
}