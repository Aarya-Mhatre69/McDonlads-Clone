"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

const OUTLETS = [
  { id:"mcd-connaught",   city:"New Delhi",  name:"Connaught Place",   address:"N-10 Connaught Place, New Delhi 110001",            hours:"7 AM – 12 AM", dineIn:true,  delivery:true,  rating:4.7, distance:"1.2 km", wait:"20 min", phone:"8588839324" },
  { id:"mcd-bandra",      city:"Mumbai",     name:"Bandra West",       address:"Linking Road, Bandra West, Mumbai 400050",          hours:"8 AM – 1 AM",  dineIn:true,  delivery:true,  rating:4.8, distance:"2.5 km", wait:"25 min", phone:"9999000001" },
  { id:"mcd-koramangala", city:"Bengaluru",  name:"Koramangala",       address:"5th Block, Koramangala, Bengaluru 560095",          hours:"7 AM – 12 AM", dineIn:true,  delivery:true,  rating:4.6, distance:"3.1 km", wait:"30 min", phone:"9999000002" },
  { id:"mcd-anna-nagar",  city:"Chennai",    name:"Anna Nagar",        address:"2nd Avenue, Anna Nagar, Chennai 600040",           hours:"8 AM – 11 PM", dineIn:true,  delivery:false, rating:4.5, distance:"4.0 km", wait:"15 min", phone:"9999000003" },
  { id:"mcd-salt-lake",   city:"Kolkata",    name:"Salt Lake Sector V",address:"Sector V, Salt Lake City, Kolkata 700091",         hours:"9 AM – 11 PM", dineIn:false, delivery:true,  rating:4.4, distance:"5.3 km", wait:"35 min", phone:"9999000004" },
  { id:"mcd-jubilee",     city:"Hyderabad",  name:"Jubilee Hills",     address:"Road No. 36, Jubilee Hills, Hyderabad 500033",     hours:"8 AM – 12 AM", dineIn:true,  delivery:true,  rating:4.9, distance:"2.8 km", wait:"22 min", phone:"9999000005" },
  { id:"mcd-cyber-hub",   city:"Gurugram",   name:"DLF Cyber Hub",     address:"Shop No. 12, Ground Floor, Cyber Hub, Gurugram",  hours:"8 AM – 1 AM",  dineIn:true,  delivery:true,  rating:4.5, distance:"6.2 km", wait:"28 min", phone:"9873186291" },
  { id:"mcd-andheri",     city:"Mumbai",     name:"Andheri West",      address:"Shop 4, Versova Link Rd, near D-Mart, Mumbai",    hours:"Open 24 Hours",dineIn:true,  delivery:true,  rating:4.3, distance:"1.8 km", wait:"20 min", phone:"9999000006" },
  { id:"mcd-sector-29",   city:"Gurugram",   name:"Sector 29",         address:"SCO-36, Main Market, Sector-29, Gurugram 122001", hours:"7 AM – 12 AM", dineIn:true,  delivery:true,  rating:4.2, distance:"7.1 km", wait:"32 min", phone:"9999718921" },
];

const ALL_CITIES = ["All Cities", ...Array.from(new Set(OUTLETS.map(o => o.city))).sort()];
type FilterType = "all" | "dine-in" | "delivery";

/* ── Cursor component ── */
function SiteCursor() {
  const dot  = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let raf: number;
    let mx = -100, my = -100, rx = -100, ry = -100;

    const onMove = (e: MouseEvent) => { mx = e.clientX; my = e.clientY; };
    window.addEventListener("mousemove", onMove);

    const loop = () => {
      rx += (mx - rx) * 0.13;
      ry += (my - ry) * 0.13;
      if (dot.current) {
        dot.current.style.left  = mx + "px";
        dot.current.style.top   = my + "px";
      }
      if (ring.current) {
        ring.current.style.left = rx + "px";
        ring.current.style.top  = ry + "px";
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div ref={dot} style={{
        position:"fixed", width:10, height:10,
        background:"#DA291C", borderRadius:"50%",
        pointerEvents:"none", zIndex:99999,
        transform:"translate(-50%,-50%)",
        transition:"width 0.18s, height 0.18s",
      }} />
      <div ref={ring} style={{
        position:"fixed", width:32, height:32,
        border:"1.5px solid rgba(218,41,28,0.45)",
        borderRadius:"50%",
        pointerEvents:"none", zIndex:99998,
        transform:"translate(-50%,-50%)",
        transition:"width 0.3s cubic-bezier(0.16,1,0.3,1), height 0.3s cubic-bezier(0.16,1,0.3,1)",
      }} />
    </>
  );
}

export default function OutletsPage() {
  const [filter,   setFilter]   = useState<FilterType>("all");
  const [search,   setSearch]   = useState("");
  const [city,     setCity]     = useState("All Cities");
  const [ddOpen,   setDdOpen]   = useState(false);
  const [showOpen, setShowOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const filtered = OUTLETS.filter(o => {
    const matchCity   = city === "All Cities" || o.city === city;
    const matchFilter = filter === "all" || (filter === "dine-in" && o.dineIn) || (filter === "delivery" && o.delivery);
    const matchOpen   = !showOpen || true; // all demo outlets are open
    const q = search.toLowerCase();
    const matchSearch = !q || o.name.toLowerCase().includes(q) || o.city.toLowerCase().includes(q) || o.address.toLowerCase().includes(q);
    return matchCity && matchFilter && matchOpen && matchSearch;
  });

  return (
    <div style={{ fontFamily:"'Outfit',sans-serif", background:"#FAFAFA", minHeight:"100vh" }}>

      {/* Custom cursor — desktop only */}
      {!isMobile && <SiteCursor />}

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800;900&family=Barlow+Condensed:ital,wght@0,700;0,800;0,900;1,800;1,900&display=swap');
        ${!isMobile ? "*, *::before, *::after { cursor: none !important; }" : ""}

        .oc-card {
          background: #fff;
          border-radius: 16px;
          overflow: hidden;
          border: 1px solid #EBEBEB;
          box-shadow: 0 2px 12px rgba(0,0,0,0.05);
          display: flex;
          flex-direction: column;
          transition: box-shadow 0.22s ease, transform 0.22s ease, border-color 0.22s;
        }
        .oc-card:hover {
          box-shadow: 0 10px 36px rgba(0,0,0,0.11);
          transform: translateY(-4px);
          border-color: #FFC72C;
        }
        .oc-card:hover .oc-top-bar { height: 5px; }

        .oc-top-bar {
          height: 3px;
          background: linear-gradient(90deg, #DA291C, #FFC72C);
          transition: height 0.22s;
          flex-shrink: 0;
        }

        .oc-order-btn {
          padding: 9px 18px;
          border-radius: 22px;
          background: #DA291C;
          color: #fff;
          font-size: 12px;
          font-weight: 800;
          text-decoration: none;
          white-space: nowrap;
          transition: background 0.18s, transform 0.18s;
          border: none;
          cursor: none;
          font-family: 'Outfit', sans-serif;
          letter-spacing: 0.03em;
        }
        .oc-order-btn:hover { background: #b52018; transform: scale(1.04); }

        .oc-dir-btn {
          padding: 9px 14px;
          border-radius: 22px;
          background: #fff;
          color: #555;
          font-size: 12px;
          font-weight: 700;
          border: 1.5px solid #E8E8E8;
          cursor: none;
          transition: all 0.18s;
          font-family: 'Outfit', sans-serif;
        }
        .oc-dir-btn:hover { border-color: #FFC72C; color: #1A1A1A; background: #FFF8E1; }

        .filter-pill {
          padding: 8px 18px;
          border-radius: 22px;
          font-size: 12px;
          font-weight: 700;
          cursor: none;
          transition: all 0.15s;
          font-family: 'Outfit', sans-serif;
          white-space: nowrap;
          border: 1.5px solid #E8E8E8;
        }
        .filter-pill.active { background: #DA291C; color: #fff; border-color: #DA291C; }
        .filter-pill:not(.active) { background: #fff; color: #666; }
        .filter-pill:not(.active):hover { border-color: #DA291C; color: #DA291C; }

        .search-input {
          width: 100%;
          padding: 10px 14px 10px 38px;
          border: 1.5px solid #E8E8E8;
          border-radius: 24px;
          font-size: 13px;
          outline: none;
          background: #fff;
          color: #1A1A1A;
          font-family: 'Outfit', sans-serif;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .search-input:focus {
          border-color: #FFC72C;
          box-shadow: 0 0 0 3px rgba(255,199,44,0.1);
        }
        .search-input::placeholder { color: #AAAAAA; }

        .city-dd-btn {
          width: 100%;
          padding: 13px 18px;
          border-radius: 28px;
          border: none;
          background: #FFC72C;
          color: #1A1A1A;
          font-size: 15px;
          font-weight: 700;
          cursor: none;
          display: flex;
          align-items: center;
          gap: 10px;
          transition: all 0.2s;
          box-shadow: 0 2px 12px rgba(255,199,44,0.3);
          font-family: 'Outfit', sans-serif;
        }
        .city-dd-btn:hover { background: #FFD54F; box-shadow: 0 4px 20px rgba(255,199,44,0.4); }

        .toggle-track {
          width: 40px; height: 22px;
          border-radius: 11px;
          background: #D0D0D0;
          position: relative;
          transition: background 0.2s;
          cursor: none;
          flex-shrink: 0;
          display: inline-block;
        }
        .toggle-track.on { background: #22c55e; }
        .toggle-thumb {
          position: absolute; top: 3px; left: 3px;
          width: 16px; height: 16px;
          border-radius: 50%; background: #fff;
          transition: left 0.2s;
          box-shadow: 0 1px 4px rgba(0,0,0,0.2);
        }
        .toggle-track.on .toggle-thumb { left: 21px; }

        @media (max-width: 640px) {
          .outlet-grid { grid-template-columns: 1fr !important; }
          .controls-bar { padding: 12px 16px !important; flex-wrap: wrap; }
          .city-hero-left { padding: 40px 24px !important; }
        }
      `}</style>

      {/* ══════ PAGE HEADER ══════ */}
      <div style={{ background:"#fff", borderBottom:"1px solid #EBEBEB", padding:"80px 48px 40px", position:"relative", overflow:"hidden" }}>
        {/* background M */}
        <div aria-hidden="true" style={{ position:"absolute", right:-20, top:"50%", transform:"translateY(-50%)", fontFamily:"'Barlow Condensed',sans-serif", fontSize:"clamp(180px,25vw,360px)", fontWeight:900, fontStyle:"italic", color:"rgba(255,199,44,0.07)", lineHeight:1, userSelect:"none", pointerEvents:"none" }}>M</div>

        <div style={{ maxWidth:1280, margin:"0 auto", position:"relative", zIndex:1 }}>
          <p style={{ color:"#DA291C", fontSize:11, fontWeight:800, letterSpacing:"0.25em", textTransform:"uppercase", marginBottom:14, fontFamily:"'Outfit',sans-serif" }}>Find Us · Across India</p>
          <h1 style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:"clamp(52px,8vw,96px)", fontWeight:900, fontStyle:"italic", color:"#1A1A1A", lineHeight:0.9, marginBottom:16, letterSpacing:"-0.02em" }}>
            Our <span style={{ WebkitTextStroke:"2.5px #DA291C", color:"transparent" }}>Restaurants</span>
          </h1>
          <p style={{ color:"#888", fontSize:15, maxWidth:520, lineHeight:1.7, marginBottom:32, fontFamily:"'Outfit',sans-serif" }}>
            Discover McDonald&apos;s India restaurants near you — dine in, take away or order delivery from your favourite outlet.
          </p>

          {/* Stat pills */}
          <div style={{ display:"flex", flexWrap:"wrap", gap:10 }}>
            {[{label:"Cities",value:"10+"},{label:"Outlets",value:"400+"},{label:"Avg Rating",value:"4.6 ★"},{label:"Open 24/7",value:"Select Outlets"}].map(s => (
              <div key={s.label} style={{ display:"flex", alignItems:"center", gap:8, padding:"8px 18px", borderRadius:99, background:"#F5F5F5", border:"1px solid #EBEBEB" }}>
                <span style={{ fontWeight:800, color:"#1A1A1A", fontSize:13, fontFamily:"'Outfit',sans-serif" }}>{s.value}</span>
                <span style={{ color:"#999", fontSize:12, fontFamily:"'Outfit',sans-serif" }}>{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ══════ CITY SELECTOR + HERO ══════ */}
      <div style={{ display:"flex", alignItems:"stretch", minHeight:340, borderBottom:"1px solid #EBEBEB", background:"#fff" }}>
        {/* Left — city picker */}
        <div className="city-hero-left" style={{ width:"38%", flexShrink:0, display:"flex", flexDirection:"column", justifyContent:"center", padding:"48px 56px", background:"#fff", borderRight:"1px solid #EBEBEB" }}>
          <h2 style={{ fontSize:"clamp(24px,2.6vw,38px)", fontWeight:900, color:"#1A1A1A", marginBottom:22, fontFamily:"'Barlow Condensed','Arial Black',sans-serif", textTransform:"uppercase" }}>Select City</h2>

          <div style={{ position:"relative", maxWidth:320 }}>
            <button className="city-dd-btn" onClick={() => setDdOpen(v => !v)} aria-expanded={ddOpen}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#1A1A1A" strokeWidth="2.5" strokeLinecap="round" style={{ flexShrink:0 }}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
              <span style={{ flex:1, textAlign:"left" }}>{city === "All Cities" ? "Select a City" : city}</span>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#1A1A1A" strokeWidth="2.5" strokeLinecap="round" style={{ flexShrink:0, transition:"transform 0.2s", transform:ddOpen?"rotate(180deg)":"rotate(0)" }}><polyline points="6 9 12 15 18 9"/></svg>
            </button>

            {ddOpen && (
              <ul style={{ position:"absolute", top:"calc(100% + 6px)", left:0, right:0, background:"#fff", border:"1px solid #EBEBEB", borderRadius:16, boxShadow:"0 10px 40px rgba(0,0,0,0.12)", zIndex:60, overflow:"hidden", listStyle:"none", padding:"6px 0", margin:0, maxHeight:280, overflowY:"auto" }}>
                {ALL_CITIES.map(c => (
                  <li key={c} role="option" onClick={() => { setCity(c); setDdOpen(false); }}
                    style={{ padding:"10px 18px", fontSize:14, fontWeight:city===c?700:500, color:city===c?"#DA291C":"#1A1A1A", background:city===c?"#FFF8E1":"transparent", cursor:"none", transition:"background 0.12s", fontFamily:"'Outfit',sans-serif" }}
                    onMouseEnter={e => { if(city!==c)(e.currentTarget as HTMLLIElement).style.background="#F9F9F9"; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLLIElement).style.background=city===c?"#FFF8E1":"transparent"; }}>
                    {c}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Tooltip */}
          {city === "All Cities" && (
            <div style={{ marginTop:18, padding:"11px 16px", background:"#DA291C", color:"#fff", borderRadius:12, fontSize:13, fontWeight:600, maxWidth:260, lineHeight:1.55, position:"relative", fontFamily:"'Outfit',sans-serif" }}>
              Please select a city to find the nearest McDonald&apos;s store
              <div style={{ position:"absolute", top:-8, left:22, width:0, height:0, borderLeft:"8px solid transparent", borderRight:"8px solid transparent", borderBottom:"8px solid #DA291C" }} />
            </div>
          )}
          {city !== "All Cities" && (
            <p style={{ marginTop:14, fontSize:14, color:"#888", fontFamily:"'Outfit',sans-serif" }}>
              <strong style={{ color:"#DA291C" }}>{filtered.length}</strong> outlet{filtered.length!==1?"s":""} in <strong style={{ color:"#1A1A1A" }}>{city}</strong>
            </p>
          )}
        </div>

        {/* Right — decorative */}
        <div style={{ flex:1, background:"linear-gradient(135deg, #FFF8E1 0%, #FFFDF5 100%)", display:"flex", alignItems:"center", justifyContent:"center", position:"relative", overflow:"hidden" }}>
          {/* Confetti dots */}
          {[{t:"12%",l:"8%",s:18,c:"#FFC72C",r:-25},{t:"65%",l:"10%",s:13,c:"#DA291C",r:18},{t:"35%",l:"22%",s:10,c:"#FFC72C",r:40},{t:"78%",l:"28%",s:15,c:"#DA291C",r:-12},{t:"20%",l:"35%",s:8,c:"#FFC72C",r:30}].map((d,i) => (
            <div key={i} style={{ position:"absolute", top:d.t, left:d.l, width:d.s, height:d.s*0.5, background:d.c, borderRadius:3, transform:`rotate(${d.r}deg)`, opacity:0.45, pointerEvents:"none" }} />
          ))}
          <div style={{ textAlign:"center", zIndex:1, position:"relative" }}>
            <div style={{ width:88, height:88, background:"#FFC72C", borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 16px", boxShadow:"0 8px 32px rgba(255,199,44,0.35)" }}>
              <span style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:50, fontWeight:900, color:"#DA291C", lineHeight:1 }}>M</span>
            </div>
            <p style={{ color:"#C8A84B", fontSize:15, fontWeight:700, fontFamily:"'Outfit',sans-serif" }}>Restaurant Locator</p>
            <p style={{ color:"#D4AA5A", fontSize:12, marginTop:6, fontFamily:"'Outfit',sans-serif" }}>Over 400+ outlets across India</p>
          </div>
        </div>
      </div>

      {/* ══════ CONTROLS BAR ══════ */}
      <div className="controls-bar" style={{ background:"#fff", borderBottom:"1px solid #EBEBEB", padding:"14px 48px", display:"flex", alignItems:"center", gap:14, flexWrap:"wrap", position:"sticky", top:73, zIndex:30, boxShadow:"0 2px 8px rgba(0,0,0,0.04)" }}>

        {/* Search */}
        <div style={{ position:"relative", minWidth:200, flex:1, maxWidth:300 }}>
          <svg style={{ position:"absolute", left:13, top:"50%", transform:"translateY(-50%)", width:14, height:14, color:"#AAAAAA", pointerEvents:"none" }} viewBox="0 0 24 24" fill="none" stroke="#AAAAAA" strokeWidth="2.5" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
          <input className="search-input" type="text" placeholder="Search outlet or city…" value={search} onChange={e => setSearch(e.target.value)} />
          {search && <button onClick={() => setSearch("")} style={{ position:"absolute", right:13, top:"50%", transform:"translateY(-50%)", background:"none", border:"none", color:"#AAA", fontSize:11 }}>✕</button>}
        </div>

        {/* Result count */}
        <p style={{ fontSize:13, color:"#888", marginRight:"auto", fontFamily:"'Outfit',sans-serif", whiteSpace:"nowrap" }}>
          <span style={{ color:"#1A1A1A", fontWeight:800 }}>{filtered.length}</span> outlet{filtered.length!==1?"s":""} found
        </p>

        {/* Filter pills */}
        <div style={{ display:"flex", gap:8 }}>
          {(["all","dine-in","delivery"] as FilterType[]).map(f => (
            <button key={f} className={`filter-pill ${filter===f?"active":""}`} onClick={() => setFilter(f)}>
              {f==="all"?"All Outlets":f==="dine-in"?"Dine-In Only":"Delivery Only"}
            </button>
          ))}
        </div>

        {/* Open now */}
        <label style={{ display:"flex", alignItems:"center", gap:9, fontSize:13, fontWeight:600, color:"#555", userSelect:"none", fontFamily:"'Outfit',sans-serif" }}>
          <span className={`toggle-track ${showOpen?"on":""}`} onClick={() => setShowOpen(v => !v)}>
            <span className="toggle-thumb" />
          </span>
          Open Now
        </label>
      </div>

      {/* ══════ OUTLET GRID ══════ */}
      <div style={{ maxWidth:1280, margin:"0 auto", padding:"40px 48px 80px" }}>
        {filtered.length === 0 ? (
          <div style={{ display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:"80px 24px", gap:16 }}>
            <div style={{ width:72, height:72, background:"#FFF8E1", borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", border:"2px dashed #FFC72C" }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#C8A84B" strokeWidth="2" strokeLinecap="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
            </div>
            <p style={{ color:"#888", fontSize:15, fontWeight:600, fontFamily:"'Outfit',sans-serif" }}>No outlets match your filters.</p>
            <button onClick={() => { setCity("All Cities"); setShowOpen(false); setFilter("all"); setSearch(""); }}
              style={{ padding:"10px 28px", borderRadius:24, border:"none", background:"#DA291C", color:"#fff", fontSize:13, fontWeight:800, fontFamily:"'Outfit',sans-serif" }}>
              Clear All Filters
            </button>
          </div>
        ) : (
          <div className="outlet-grid" style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(300px, 1fr))", gap:22 }}>
            {filtered.map((outlet, i) => (
              <OutletCard key={outlet.id} outlet={outlet} index={i} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── OUTLET CARD ─── */
function OutletCard({ outlet, index }: { outlet: typeof OUTLETS[0]; index: number }) {
  return (
    <article
      id={outlet.id}
      className="oc-card"
      aria-label={`${outlet.name} outlet`}
      style={{ animationDelay:`${index * 60}ms` }}
    >
      {/* Color top bar */}
      <div className="oc-top-bar" />

      {/* Image area */}
      <div style={{ width:"100%", height:160, background:"linear-gradient(135deg, #FFF8E1, #FFFDF5)", display:"flex", alignItems:"center", justifyContent:"center", position:"relative", overflow:"hidden", flexShrink:0 }}>
        {/* Decorative bg M */}
        <div style={{ position:"absolute", right:-10, top:"50%", transform:"translateY(-50%)", fontFamily:"'Barlow Condensed',sans-serif", fontSize:160, fontWeight:900, color:"rgba(255,199,44,0.1)", lineHeight:1, userSelect:"none", pointerEvents:"none", fontStyle:"italic" }}>M</div>
        <div style={{ textAlign:"center", position:"relative", zIndex:1 }}>
          <div style={{ width:56, height:56, background:"#FFC72C", borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 8px" }}>
            <span style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:32, fontWeight:900, color:"#DA291C", lineHeight:1 }}>M</span>
          </div>
          <p style={{ color:"#C8A84B", fontSize:11, fontWeight:600, fontFamily:"'Outfit',sans-serif" }}>McDonald&apos;s {outlet.city}</p>
        </div>

        {/* Open badge */}
        <span style={{ position:"absolute", top:12, left:12, padding:"4px 11px", borderRadius:20, fontSize:10, fontWeight:800, background:"#22c55e", color:"#fff", letterSpacing:"0.04em", fontFamily:"'Outfit',sans-serif" }}>
          ● Open Now
        </span>

        {/* Rating */}
        <span style={{ position:"absolute", top:12, right:12, padding:"4px 10px", borderRadius:20, fontSize:12, fontWeight:800, background:"#FFC72C", color:"#1A1A1A", display:"flex", alignItems:"center", gap:3, fontFamily:"'Outfit',sans-serif" }}>
          ★ {outlet.rating.toFixed(1)}
        </span>
      </div>

      {/* Body */}
      <div style={{ padding:"16px 18px 18px", display:"flex", flexDirection:"column", flex:1, gap:10 }}>
        {/* City badge + name */}
        <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", gap:8 }}>
          <div>
            <span style={{ display:"inline-block", padding:"2px 9px", borderRadius:8, fontSize:10, fontWeight:800, letterSpacing:"0.1em", textTransform:"uppercase", background:"#FFF8E1", color:"#DA291C", border:"1px solid rgba(218,41,28,0.18)", marginBottom:6, fontFamily:"'Outfit',sans-serif" }}>
              {outlet.city}
            </span>
            <h3 style={{ fontSize:15, fontWeight:800, color:"#1A1A1A", lineHeight:1.2, fontFamily:"'Outfit',sans-serif" }}>{outlet.name}</h3>
          </div>
        </div>

        {/* Address */}
        <p style={{ fontSize:12, color:"#999", lineHeight:1.55, fontFamily:"'Outfit',sans-serif" }}>{outlet.address}</p>

        {/* Hours + status */}
        <div style={{ display:"flex", alignItems:"center", gap:8, fontSize:12, color:"#777", fontFamily:"'Outfit',sans-serif" }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#AAA" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
          <span>{outlet.hours}</span>
        </div>

        {/* Dine-in / Delivery badges */}
        <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>
          {outlet.dineIn && (
            <span style={{ padding:"3px 10px", borderRadius:99, fontSize:11, fontWeight:700, background:"rgba(34,197,94,0.09)", color:"#16a34a", border:"1px solid rgba(34,197,94,0.22)", fontFamily:"'Outfit',sans-serif" }}>Dine-In: Open</span>
          )}
          {outlet.delivery && (
            <span style={{ padding:"3px 10px", borderRadius:99, fontSize:11, fontWeight:700, background:"rgba(255,199,44,0.1)", color:"#B8860B", border:"1px solid rgba(255,199,44,0.28)", fontFamily:"'Outfit',sans-serif" }}>Delivery: Open</span>
          )}
          {!outlet.dineIn && <span style={{ padding:"3px 10px", borderRadius:99, fontSize:11, fontWeight:700, background:"#F5F5F5", color:"#999", border:"1px solid #E8E8E8", fontFamily:"'Outfit',sans-serif" }}>Dine-In: Closed</span>}
          {!outlet.delivery && <span style={{ padding:"3px 10px", borderRadius:99, fontSize:11, fontWeight:700, background:"#F5F5F5", color:"#999", border:"1px solid #E8E8E8", fontFamily:"'Outfit',sans-serif" }}>Delivery: Closed</span>}
        </div>

        {/* Distance + wait */}
        <div style={{ display:"flex", alignItems:"center", gap:12, fontSize:12, color:"#888", fontFamily:"'Outfit',sans-serif" }}>
          <span style={{ display:"flex", alignItems:"center", gap:5 }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#DA291C" strokeWidth="2.5" strokeLinecap="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
            {outlet.distance}
          </span>
          <span style={{ color:"#D8D8D8" }}>·</span>
          <span style={{ display:"flex", alignItems:"center", gap:5 }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2.5" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            {outlet.wait} wait
          </span>
          {outlet.phone && (
            <>
              <span style={{ color:"#D8D8D8" }}>·</span>
              <a href={`tel:${outlet.phone}`} style={{ color:"#888", textDecoration:"none", transition:"color 0.2s" }}
                onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.color="#DA291C"}
                onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.color="#888"}>
                📞 {outlet.phone}
              </a>
            </>
          )}
        </div>

        {/* Divider */}
        <div style={{ height:1, background:"#F0F0F0" }} />

        {/* CTA buttons */}
        <div style={{ display:"flex", gap:8, marginTop:"auto" }}>
          <button className="oc-dir-btn" onClick={() => alert(`Directions to ${outlet.name}`)}>
            📍 Directions
          </button>
          <a href={`/menu`} className="oc-order-btn">Order Now →</a>
        </div>
      </div>
    </article>
  );
}