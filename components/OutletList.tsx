"use client";

import { useState } from "react";
import OutletCard, { type Outlet } from "./OutletCard";

const ALL_OUTLETS: Outlet[] = [
  { id:"connaught-place",  name:"McDonald's Connaught Place", area:"Connaught Place, New Delhi", distance:1.2, isOpen:true,  deliveryTime:22, rating:4.7, address:"N-10 Connaught Place, New Delhi 110001", tags:["McCafé","McDelivery"], imageUrl:"", phone:"8588839324", hours:"7 AM – 12 AM", dineIn:true,  delivery:true },
  { id:"bandra-west",      name:"McDonald's Bandra West",     area:"Bandra West, Mumbai",        distance:2.5, isOpen:true,  deliveryTime:25, rating:4.8, address:"Linking Road, Bandra West, Mumbai 400050", tags:["Drive-Thru","McCafé"], imageUrl:"", phone:"9999000001", hours:"8 AM – 1 AM",  dineIn:true,  delivery:true },
  { id:"koramangala",      name:"McDonald's Koramangala",     area:"Koramangala, Bengaluru",     distance:3.1, isOpen:true,  deliveryTime:30, rating:4.6, address:"5th Block, Koramangala, Bengaluru 560095", tags:["Drive-Thru","24/7"], imageUrl:"", phone:"9999000002", hours:"7 AM – 12 AM", dineIn:true,  delivery:true },
  { id:"anna-nagar",       name:"McDonald's Anna Nagar",      area:"Anna Nagar, Chennai",        distance:4.0, isOpen:true,  deliveryTime:15, rating:4.5, address:"2nd Avenue, Anna Nagar, Chennai 600040", tags:["McCafé"], imageUrl:"", phone:"9999000003", hours:"8 AM – 11 PM", dineIn:true,  delivery:false },
  { id:"salt-lake",        name:"McDonald's Salt Lake",       area:"Salt Lake Sector V, Kolkata",distance:5.3, isOpen:false, deliveryTime:35, rating:4.4, address:"Sector V, Salt Lake City, Kolkata 700091", tags:["McDelivery"], imageUrl:"", phone:"9999000004", hours:"9 AM – 11 PM", dineIn:false, delivery:true },
  { id:"jubilee-hills",    name:"McDonald's Jubilee Hills",   area:"Jubilee Hills, Hyderabad",   distance:2.8, isOpen:true,  deliveryTime:22, rating:4.9, address:"Road No. 36, Jubilee Hills, Hyderabad 500033", tags:["McCafé","McDelivery"], imageUrl:"", phone:"9999000005", hours:"8 AM – 12 AM", dineIn:true,  delivery:true },
  { id:"andheri-west",     name:"McDonald's Andheri West",    area:"Andheri West, Mumbai",       distance:1.8, isOpen:true,  deliveryTime:20, rating:4.3, address:"Shop 4, Versova Link Rd, near D-Mart, Andheri West, Mumbai 400053", tags:["24/7","Drive-Thru","McCafé"], imageUrl:"", phone:"9999000006", hours:"Open 24 Hours", dineIn:true,  delivery:true },
  { id:"cyber-hub",        name:"McDonald's Cyber Hub",       area:"DLF Cyber Hub, Gurugram",    distance:6.2, isOpen:true,  deliveryTime:28, rating:4.5, address:"Shop No. 12, Ground Floor, Cyber Hub, Gurugram 122002", tags:["McCafé","McDelivery"], imageUrl:"", phone:"9873186291", hours:"8 AM – 1 AM",  dineIn:true,  delivery:true },
  { id:"sector-29",        name:"McDonald's Sector 29",       area:"Sector 29, Gurugram",        distance:7.1, isOpen:true,  deliveryTime:32, rating:4.2, address:"SCO-36, Main Market, Sector-29, Gurugram 122001", tags:["McDelivery"], imageUrl:"", phone:"9999718921", hours:"7 AM – 12 AM", dineIn:true,  delivery:true },
];

const ALL_CITIES = ["All Cities", ...Array.from(new Set(ALL_OUTLETS.map(o => o.area.split(", ").slice(1).join(", ")))).sort()];
const SORT_OPTIONS = ["Nearest","Fastest","Rating"] as const;
type SortOption = typeof SORT_OPTIONS[number];
type FilterType = "all" | "dine-in" | "delivery";

function sortOutlets(outlets: Outlet[], by: SortOption) {
  const copy = [...outlets];
  if (by === "Nearest") return copy.sort((a,b) => a.distance - b.distance);
  if (by === "Fastest") return copy.sort((a,b) => a.deliveryTime - b.deliveryTime);
  return copy.sort((a,b) => b.rating - a.rating);
}

export default function OutletList() {
  const [city,      setCity]      = useState("All Cities");
  const [sort,      setSort]      = useState<SortOption>("Nearest");
  const [showOpen,  setShowOpen]  = useState(false);
  const [filter,    setFilter]    = useState<FilterType>("all");
  const [ddOpen,    setDdOpen]    = useState(false);
  const [search,    setSearch]    = useState("");

  const filtered = ALL_OUTLETS.filter(o => {
    const matchCity   = city === "All Cities" || o.area.includes(city.split(", ")[0]);
    const matchOpen   = !showOpen || o.isOpen;
    const matchFilter = filter === "all" || (filter === "dine-in" && o.dineIn) || (filter === "delivery" && o.delivery);
    const q = search.toLowerCase();
    const matchSearch = !q || o.name.toLowerCase().includes(q) || o.area.toLowerCase().includes(q) || o.address.toLowerCase().includes(q);
    return matchCity && matchOpen && matchFilter && matchSearch;
  });

  const sorted = sortOutlets(filtered, sort);

  return (
    <section style={{ background:"#FAFAFA", fontFamily:"'Outfit',sans-serif" }}>

      {/* ── City Selector Hero ── */}
      <div style={{ display:"flex", alignItems:"stretch", minHeight:400, borderBottom:"1px solid #EBEBEB" }}>
        {/* Left */}
        <div style={{ width:"38%", flexShrink:0, display:"flex", flexDirection:"column", justifyContent:"center", padding:"56px 56px", background:"#fff" }}>
          <h2 style={{ fontSize:"clamp(26px,2.8vw,40px)", fontWeight:900, color:"#1A1A1A", marginBottom:24, fontFamily:"'Barlow Condensed','Arial Black',sans-serif", textTransform:"uppercase" }}>Select City</h2>

          {/* Dropdown */}
          <div style={{ position:"relative", maxWidth:340 }}>
            <button
              onClick={() => setDdOpen(v => !v)}
              aria-haspopup="listbox"
              aria-expanded={ddOpen}
              style={{ width:"100%", padding:"14px 18px", borderRadius:32, border:"none", background:"#FFC72C", color:"#1A1A1A", fontSize:15, fontWeight:700, cursor:"pointer", display:"flex", alignItems:"center", gap:10, textAlign:"left", transition:"all 0.2s", boxShadow:"0 2px 12px rgba(255,199,44,0.3)" }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1A1A1A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink:0 }}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
              <span style={{ flex:1 }}>{city === "All Cities" ? "Select a City" : city}</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#1A1A1A" strokeWidth="2.5" strokeLinecap="round" style={{ flexShrink:0, transition:"transform 0.2s", transform:ddOpen?"rotate(180deg)":"rotate(0deg)" }}><polyline points="6 9 12 15 18 9"/></svg>
            </button>

            {ddOpen && (
              <ul role="listbox" style={{ position:"absolute", top:"calc(100% + 6px)", left:0, right:0, background:"#fff", border:"1px solid #EBEBEB", borderRadius:16, boxShadow:"0 8px 32px rgba(0,0,0,0.12)", zIndex:50, overflow:"hidden", listStyle:"none", padding:"6px 0", margin:0, maxHeight:280, overflowY:"auto" }}>
                {ALL_CITIES.map(c => (
                  <li key={c} role="option" aria-selected={city===c} onClick={() => { setCity(c); setDdOpen(false); }}
                    style={{ padding:"10px 18px", fontSize:14, fontWeight:city===c?700:500, color:city===c?"#DA291C":"#1A1A1A", background:city===c?"#FFF8E1":"transparent", cursor:"pointer", transition:"background 0.12s" }}
                    onMouseEnter={e => { if (city!==c) (e.currentTarget as HTMLLIElement).style.background="#F9F9F9"; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLLIElement).style.background=city===c?"#FFF8E1":"transparent"; }}>
                    {c}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {city === "All Cities" && (
            <div style={{ marginTop:18, padding:"12px 16px", background:"#DA291C", color:"#fff", borderRadius:12, fontSize:13, fontWeight:600, maxWidth:260, lineHeight:1.55, position:"relative" }}>
              Please select a city to find the nearest McDonald&apos;s store
              <div style={{ position:"absolute", top:-8, left:22, width:0, height:0, borderLeft:"8px solid transparent", borderRight:"8px solid transparent", borderBottom:"8px solid #DA291C" }} />
            </div>
          )}

          {city !== "All Cities" && (
            <p style={{ marginTop:16, fontSize:14, color:"#888", fontWeight:500 }}>
              Found <strong style={{ color:"#DA291C" }}>{sorted.length}</strong> outlet{sorted.length!==1?"s":""} in <strong style={{ color:"#1A1A1A" }}>{city}</strong>
            </p>
          )}
        </div>

        {/* Right placeholder */}
        <div style={{ flex:1, background:"linear-gradient(135deg, #FFF8E1 0%, #FFF3CC 100%)", display:"flex", alignItems:"center", justifyContent:"center", position:"relative", overflow:"hidden" }}>
          {/* Decorative dots */}
          {[{top:"15%",left:"8%",size:16,color:"#FFC72C",r:-25},{top:"60%",left:"12%",size:12,color:"#DA291C",r:15},{top:"30%",left:"22%",size:9,color:"#FFC72C",r:40},{top:"75%",left:"25%",size:14,color:"#DA291C",r:-10}].map((d,i) => (
            <div key={i} style={{ position:"absolute", top:d.top, left:d.left, width:d.size, height:d.size*0.55, background:d.color, borderRadius:3, transform:`rotate(${d.r}deg)`, opacity:0.5, pointerEvents:"none" }} />
          ))}
          <div style={{ textAlign:"center", zIndex:1 }}>
            <div style={{ width:80, height:80, background:"#FFC72C", borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 16px" }}>
              <span style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:44, fontWeight:900, color:"#DA291C", lineHeight:1 }}>M</span>
            </div>
            <p style={{ color:"#C8A84B", fontSize:14, fontWeight:600 }}>Restaurant Locator</p>
            <p style={{ color:"#D4AA5A", fontSize:12, marginTop:6 }}>Select a city to find stores near you</p>
          </div>
        </div>
      </div>

      {/* ── Controls bar ── */}
      <div style={{ background:"#fff", borderBottom:"1px solid #EBEBEB", padding:"14px 48px", display:"flex", alignItems:"center", gap:14, flexWrap:"wrap", position:"sticky", top:68, zIndex:20, boxShadow:"0 1px 8px rgba(0,0,0,0.04)" }}>
        {/* Search */}
        <div style={{ position:"relative", minWidth:220, flex:1, maxWidth:320 }}>
          <svg style={{ position:"absolute", left:12, top:"50%", transform:"translateY(-50%)", width:14, height:14, color:"#AAA", pointerEvents:"none" }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
          <input type="text" placeholder="Search city or outlet…" value={search} onChange={e => setSearch(e.target.value)}
            style={{ width:"100%", padding:"9px 12px 9px 34px", border:"1.5px solid #E8E8E8", borderRadius:22, fontSize:13, outline:"none", background:"#fff", color:"#1A1A1A", fontFamily:"'Outfit',sans-serif", transition:"border-color 0.2s" }}
            onFocus={e => (e.currentTarget.style.borderColor="#FFC72C")}
            onBlur={e => (e.currentTarget.style.borderColor="#E8E8E8")}
          />
          {search && <button onClick={() => setSearch("")} style={{ position:"absolute", right:12, top:"50%", transform:"translateY(-50%)", background:"none", border:"none", color:"#AAA", cursor:"pointer", fontSize:12 }}>✕</button>}
        </div>

        {/* Result count */}
        <p style={{ fontSize:13, color:"#888", fontWeight:500, marginRight:"auto" }}>
          <span style={{ color:"#1A1A1A", fontWeight:800 }}>{sorted.length}</span> outlet{sorted.length!==1?"s":""} found
        </p>

        {/* Filter: all/dine-in/delivery */}
        <div style={{ display:"flex", gap:6 }}>
          {(["all","dine-in","delivery"] as FilterType[]).map(f => (
            <button key={f} onClick={() => setFilter(f)} style={{ padding:"7px 14px", borderRadius:20, border:filter===f?"none":"1.5px solid #E8E8E8", background:filter===f?"#FFC72C":"#fff", color:filter===f?"#1A1A1A":"#666", fontSize:12, fontWeight:700, cursor:"pointer", transition:"all 0.15s", fontFamily:"'Outfit',sans-serif" }}>
              {f==="all"?"All" : f==="dine-in"?"Dine-In":"Delivery"}
            </button>
          ))}
        </div>

        {/* Open now toggle */}
        <label style={{ display:"flex", alignItems:"center", gap:8, fontSize:13, fontWeight:600, color:"#555", cursor:"pointer", userSelect:"none" }}>
          <span onClick={() => setShowOpen(v => !v)} style={{ width:38, height:22, borderRadius:11, background:showOpen?"#22c55e":"#D0D0D0", position:"relative", transition:"background 0.2s", cursor:"pointer", flexShrink:0, display:"block" }}>
            <span style={{ position:"absolute", top:3, left:showOpen?19:3, width:16, height:16, borderRadius:"50%", background:"#fff", transition:"left 0.2s", boxShadow:"0 1px 4px rgba(0,0,0,0.2)" }} />
          </span>
          Open Now
        </label>

        {/* Sort */}
        <div style={{ display:"flex", gap:6 }}>
          {SORT_OPTIONS.map(opt => (
            <button key={opt} onClick={() => setSort(opt)} style={{ padding:"7px 14px", borderRadius:20, border:sort===opt?"none":"1.5px solid #E8E8E8", background:sort===opt?"#1A1A1A":"#fff", color:sort===opt?"#fff":"#666", fontSize:12, fontWeight:700, cursor:"pointer", transition:"all 0.15s", fontFamily:"'Outfit',sans-serif" }}>{opt}</button>
          ))}
        </div>
      </div>

      {/* ── Outlet Grid ── */}
      <div style={{ padding:"40px 48px 80px" }}>
        {sorted.length === 0 ? (
          <div style={{ display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:"80px 24px", gap:16 }}>
            <div style={{ width:64, height:64, borderRadius:"50%", background:"#F5F5F5", display:"flex", alignItems:"center", justifyContent:"center" }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#CCC" strokeWidth="2" strokeLinecap="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
            </div>
            <p style={{ color:"#888", fontSize:15, fontWeight:600, fontFamily:"'Outfit',sans-serif" }}>No outlets match your filters.</p>
            <button onClick={() => { setCity("All Cities"); setShowOpen(false); setFilter("all"); setSearch(""); }}
              style={{ padding:"10px 24px", borderRadius:24, border:"none", background:"#FFC72C", color:"#1A1A1A", fontSize:13, fontWeight:800, cursor:"pointer", fontFamily:"'Outfit',sans-serif" }}>
              Clear Filters
            </button>
          </div>
        ) : (
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(300px, 1fr))", gap:22 }}>
            {sorted.map(outlet => <OutletCard key={outlet.id} outlet={outlet} />)}
          </div>
        )}
      </div>
    </section>
  );
}