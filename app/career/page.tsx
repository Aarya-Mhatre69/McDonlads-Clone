"use client";

import { useState } from "react";
import Link from "next/link";

const JOBS = [
  { id:1, title:"Crew Member", dept:"Operations", location:"Multiple Cities", type:"Full-Time / Part-Time", desc:"Join our crew and be the face of McDonald's. Serve smiles, learn fast, grow faster.", skills:["Customer Service","Teamwork","Food Safety","Communication"] },
  { id:2, title:"Shift Manager", dept:"Operations", location:"Delhi, Mumbai, Bengaluru", type:"Full-Time", desc:"Lead your shift, motivate the team, and ensure every customer leaves happy.", skills:["Leadership","Problem Solving","Team Management","Operations"] },
  { id:3, title:"Assistant Restaurant Manager", dept:"Management", location:"Pan India", type:"Full-Time", desc:"Drive performance, manage costs, and build an exceptional team culture.", skills:["P&L Management","People Development","Customer Experience","KPI Tracking"] },
  { id:4, title:"Restaurant Manager", dept:"Management", location:"Delhi NCR, Mumbai", type:"Full-Time", desc:"Own your restaurant. Deliver results. Build careers. Lead by example.", skills:["Strategic Thinking","Business Acumen","Leadership","Financial Management"] },
  { id:5, title:"McCafé Barista", dept:"McCafé", location:"Delhi, Gurugram, Mumbai", type:"Full-Time", desc:"Craft exceptional coffee experiences and be the highlight of someone's morning.", skills:["Coffee Craft","Customer Service","Attention to Detail","Speed"] },
  { id:6, title:"Digital Marketing Executive", dept:"Corporate", location:"New Delhi (HQ)", type:"Full-Time", desc:"Shape the McDonald's India brand in the digital world. Drive campaigns, grow reach.", skills:["Social Media","SEO/SEM","Content Strategy","Analytics"] },
];

const PERKS = [
  { icon:"🍔", title:"Free Meals", desc:"Enjoy complimentary meals every shift you work." },
  { icon:"📈", title:"Career Growth", desc:"90% of our managers started as crew members." },
  { icon:"🎓", title:"Training & Development", desc:"World-class training programs and certifications." },
  { icon:"🏥", title:"Health Benefits", desc:"Medical coverage for you and your family." },
  { icon:"🌍", title:"Global Network", desc:"Part of a global brand in 100+ countries." },
  { icon:"🎉", title:"Fun Culture", desc:"Team events, recognition programs, and more." },
];

export default function CareersPage() {
  const [search, setSearch] = useState("");
  const [dept,   setDept]   = useState("All");

  const DEPTS = ["All", ...Array.from(new Set(JOBS.map(j => j.dept)))];
  const filtered = JOBS.filter(j => {
    const matchDept = dept === "All" || j.dept === dept;
    const q = search.toLowerCase();
    const matchSearch = !q || j.title.toLowerCase().includes(q) || j.location.toLowerCase().includes(q) || j.dept.toLowerCase().includes(q);
    return matchDept && matchSearch;
  });

  return (
    <div id="careers-root" style={{ fontFamily:"'Outfit',sans-serif", background:"#fff", minHeight:"100vh" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800;900&family=Barlow+Condensed:ital,wght@0,700;0,800;0,900;1,800&display=swap');
        @media (hover: hover) and (pointer: fine) {
          #careers-root, #careers-root * { cursor: none !important; }
        }
        .job-card { transition: box-shadow 0.22s, transform 0.22s, border-color 0.22s; }
        .job-card:hover { box-shadow: 0 12px 40px rgba(0,0,0,0.1) !important; transform: translateY(-3px); border-color: #FFC72C !important; }
        .apply-btn { transition: all 0.18s; }
        .apply-btn:hover { background: #b52018 !important; transform: scale(1.03); }
        .dept-pill { transition: all 0.15s; cursor: pointer; }
        .dept-pill:hover { border-color: #DA291C !important; color: #DA291C !important; }
        .search-inp:focus { border-color: #FFC72C !important; box-shadow: 0 0 0 3px rgba(255,199,44,0.12) !important; }
      `}</style>

      {/* ── HERO ── */}
      <div style={{ background:"#1A1A1A", padding:"80px 64px 72px", position:"relative", overflow:"hidden" }}>
        {/* Yellow stripe top */}
        <div style={{ position:"absolute", top:0, left:0, right:0, height:5, background:"#FFC72C" }} />
        {/* Big M bg */}
        <div aria-hidden="true" style={{ position:"absolute", right:-30, top:"50%", transform:"translateY(-50%)", fontFamily:"'Barlow Condensed',sans-serif", fontSize:"clamp(200px,30vw,460px)", fontWeight:900, fontStyle:"italic", color:"rgba(255,199,44,0.04)", lineHeight:1, userSelect:"none", pointerEvents:"none" }}>M</div>

        <div style={{ maxWidth:1200, margin:"0 auto", position:"relative", zIndex:1 }}>
          <p style={{ fontSize:11, fontWeight:800, letterSpacing:"0.28em", textTransform:"uppercase", color:"#FFC72C", marginBottom:16, fontFamily:"'Outfit',sans-serif" }}>Join Our Team</p>
          <h1 style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:"clamp(52px,8vw,96px)", fontWeight:900, fontStyle:"italic", color:"#fff", lineHeight:0.9, marginBottom:20, letterSpacing:"-0.02em" }}>
            Careers at<br /><span style={{ color:"#FFC72C" }}>McDonald's</span>
          </h1>
          <p style={{ fontSize:"clamp(15px,1.8vw,19px)", color:"rgba(255,255,255,0.55)", maxWidth:540, lineHeight:1.7, marginBottom:36 }}>
            Build more than a career — build a future. Join India&apos;s most loved restaurant brand and grow with us.
          </p>
          <a href="#jobs" style={{ display:"inline-flex", alignItems:"center", gap:8, padding:"14px 32px", background:"#FFC72C", color:"#111", borderRadius:12, fontSize:14, fontWeight:900, textDecoration:"none", letterSpacing:"0.04em", boxShadow:"0 4px 20px rgba(255,199,44,0.3)" }}>
            View Open Positions
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </a>

          {/* Stats */}
          <div style={{ display:"flex", gap:36, marginTop:52, flexWrap:"wrap" }}>
            {[{v:"50,000+",l:"Team Members"},{v:"400+",l:"Restaurants"},{v:"90%",l:"Internal Promotions"},{v:"30+",l:"Years in India"}].map(s => (
              <div key={s.l}>
                <div style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:34, fontWeight:900, color:"#FFC72C", lineHeight:1 }}>{s.v}</div>
                <div style={{ fontSize:11, color:"rgba(255,255,255,0.35)", fontWeight:600, letterSpacing:"0.08em", marginTop:4, fontFamily:"'Outfit',sans-serif", textTransform:"uppercase" }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── PERKS ── */}
      <section style={{ background:"#FAFAFA", padding:"64px 64px", borderBottom:"1px solid #EBEBEB" }}>
        <div style={{ maxWidth:1200, margin:"0 auto" }}>
          <p style={{ color:"#DA291C", fontSize:10, fontWeight:800, letterSpacing:"0.28em", textTransform:"uppercase", marginBottom:12, fontFamily:"'Outfit',sans-serif" }}>Why McDonald's?</p>
          <h2 style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:"clamp(30px,4vw,52px)", fontWeight:900, color:"#1A1A1A", textTransform:"uppercase", marginBottom:44, letterSpacing:"-0.01em" }}>Great Perks. Better People.</h2>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(260px,1fr))", gap:20 }}>
            {PERKS.map(p => (
              <div key={p.title} style={{ background:"#fff", borderRadius:16, border:"1px solid #EBEBEB", padding:"24px", transition:"border-color 0.2s, transform 0.2s" }}
                onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor="#FFC72C"; (e.currentTarget as HTMLDivElement).style.transform="translateY(-3px)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor="#EBEBEB"; (e.currentTarget as HTMLDivElement).style.transform="translateY(0)"; }}>
                <div style={{ fontSize:32, marginBottom:14 }}>{p.icon}</div>
                <h3 style={{ fontSize:15, fontWeight:800, color:"#1A1A1A", marginBottom:8, fontFamily:"'Outfit',sans-serif" }}>{p.title}</h3>
                <p style={{ fontSize:13, color:"#888", lineHeight:1.6, fontFamily:"'Outfit',sans-serif" }}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── JOBS ── */}
      <section id="jobs" style={{ background:"#fff", padding:"64px 64px 80px" }}>
        <div style={{ maxWidth:1200, margin:"0 auto" }}>
          <p style={{ color:"#DA291C", fontSize:10, fontWeight:800, letterSpacing:"0.28em", textTransform:"uppercase", marginBottom:12, fontFamily:"'Outfit',sans-serif" }}>Open Positions</p>
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", gap:24, marginBottom:36, flexWrap:"wrap" }}>
            <h2 style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:"clamp(30px,4vw,52px)", fontWeight:900, color:"#1A1A1A", textTransform:"uppercase", letterSpacing:"-0.01em", margin:0 }}>Current Openings</h2>
            {/* Search */}
            <div style={{ position:"relative", minWidth:240 }}>
              <svg style={{ position:"absolute", left:13, top:"50%", transform:"translateY(-50%)", width:14, height:14, pointerEvents:"none" }} viewBox="0 0 24 24" fill="none" stroke="#AAAAAA" strokeWidth="2.5" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
              <input className="search-inp" type="text" placeholder="Search roles or locations…" value={search} onChange={e => setSearch(e.target.value)}
                style={{ width:"100%", padding:"10px 14px 10px 36px", border:"1.5px solid #E8E8E8", borderRadius:22, fontSize:13, outline:"none", fontFamily:"'Outfit',sans-serif", background:"#FAFAFA", color:"#1A1A1A", boxSizing:"border-box", transition:"border-color 0.2s, box-shadow 0.2s" }} />
            </div>
          </div>

          {/* Dept pills */}
          <div style={{ display:"flex", gap:8, marginBottom:32, flexWrap:"wrap" }}>
            {DEPTS.map(d => (
              <button key={d} className="dept-pill" onClick={() => setDept(d)}
                style={{ padding:"7px 18px", borderRadius:22, border:`1.5px solid ${dept===d?"#DA291C":"#E8E8E8"}`, background:dept===d?"#DA291C":"#fff", color:dept===d?"#fff":"#666", fontSize:12, fontWeight:700, fontFamily:"'Outfit',sans-serif", letterSpacing:"0.04em" }}>
                {d}
              </button>
            ))}
          </div>

          {/* Job cards */}
          {filtered.length === 0 ? (
            <div style={{ textAlign:"center", padding:"60px 20px", color:"#AAA", fontFamily:"'Outfit',sans-serif" }}>
              <div style={{ fontSize:40, marginBottom:12 }}>🔍</div>
              <p style={{ fontSize:15, fontWeight:600 }}>No roles match your search.</p>
              <button onClick={() => { setSearch(""); setDept("All"); }} style={{ marginTop:16, padding:"9px 24px", borderRadius:22, border:"none", background:"#FFC72C", color:"#111", fontSize:13, fontWeight:800, fontFamily:"'Outfit',sans-serif" }}>Clear Search</button>
            </div>
          ) : (
            <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
              {filtered.map(job => (
                <div key={job.id} className="job-card" style={{ background:"#fff", border:"1px solid #EBEBEB", borderRadius:16, padding:"24px 28px", display:"flex", alignItems:"center", gap:24, boxShadow:"0 2px 8px rgba(0,0,0,0.04)", flexWrap:"wrap" }}>
                  {/* Left */}
                  <div style={{ flex:1, minWidth:220 }}>
                    <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:8, flexWrap:"wrap" }}>
                      <span style={{ fontSize:10, fontWeight:800, letterSpacing:"0.14em", textTransform:"uppercase", padding:"3px 10px", borderRadius:99, background:"rgba(255,199,44,0.15)", color:"#B8860B", border:"1px solid rgba(255,199,44,0.3)", fontFamily:"'Outfit',sans-serif" }}>{job.dept}</span>
                      <span style={{ fontSize:10, fontWeight:700, color:"#888", fontFamily:"'Outfit',sans-serif" }}>{job.type}</span>
                    </div>
                    <h3 style={{ fontSize:18, fontWeight:900, color:"#1A1A1A", marginBottom:6, fontFamily:"'Outfit',sans-serif" }}>{job.title}</h3>
                    <p style={{ fontSize:13, color:"#888", marginBottom:12, display:"flex", alignItems:"center", gap:5, fontFamily:"'Outfit',sans-serif" }}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#DA291C" strokeWidth="2.5" strokeLinecap="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                      {job.location}
                    </p>
                    <p style={{ fontSize:13, color:"#666", lineHeight:1.55, fontFamily:"'Outfit',sans-serif", marginBottom:14 }}>{job.desc}</p>
                    {/* Skills */}
                    <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>
                      {job.skills.map(s => (
                        <span key={s} style={{ padding:"3px 10px", borderRadius:99, background:"#F5F5F5", color:"#555", fontSize:11, fontWeight:600, border:"1px solid #EBEBEB", fontFamily:"'Outfit',sans-serif" }}>{s}</span>
                      ))}
                    </div>
                  </div>
                  {/* CTA */}
                  <div style={{ flexShrink:0 }}>
                    <a href="#" className="apply-btn" style={{ display:"inline-flex", alignItems:"center", gap:7, padding:"12px 24px", background:"#DA291C", color:"#fff", borderRadius:12, fontSize:13, fontWeight:900, textDecoration:"none", letterSpacing:"0.04em", fontFamily:"'Outfit',sans-serif", boxShadow:"0 2px 12px rgba(218,41,28,0.25)" }}>
                      Apply Now →
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}