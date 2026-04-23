"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function NotFound() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <div id="notfound-root" style={{ fontFamily:"'Outfit',sans-serif", background:"#fff", minHeight:"100vh", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:"40px 24px", position:"relative", overflow:"hidden", textAlign:"center" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800;900&family=Barlow+Condensed:ital,wght@0,700;0,800;0,900;1,800&display=swap');
        @media (hover: hover) and (pointer: fine) {
          #notfound-root, #notfound-root * { cursor: none !important; }
        }
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        .nf-content { animation: fadeUp 0.6s cubic-bezier(0.16,1,0.3,1) forwards; }
        .nf-home-btn { transition: all 0.2s; }
        .nf-home-btn:hover { background: #b52018 !important; transform: scale(1.04); box-shadow: 0 6px 24px rgba(218,41,28,0.35) !important; }
        .nf-menu-btn { transition: all 0.2s; }
        .nf-menu-btn:hover { border-color: #DA291C !important; color: #DA291C !important; }
      `}</style>

      {/* Confetti background */}
      {[{t:"8%",l:"4%",s:16,r:-30,c:"#FFC72C"},{t:"15%",l:"88%",s:12,r:25,c:"#DA291C"},{t:"72%",l:"6%",s:14,r:40,c:"#FFC72C"},{t:"80%",l:"91%",s:10,r:-20,c:"#DA291C"},{t:"50%",l:"94%",s:8,r:35,c:"#FFC72C"},{t:"35%",l:"2%",s:9,r:-45,c:"#DA291C"}].map((d,i) => (
        <div key={i} style={{ position:"absolute", top:d.t, left:d.l, width:d.s, height:d.s*0.55, background:d.c, borderRadius:3, transform:`rotate(${d.r}deg)`, pointerEvents:"none", opacity:0.4 }} />
      ))}

      {/* Large bg 404 */}
      <div aria-hidden="true" style={{ position:"absolute", top:"50%", left:"50%", transform:"translate(-50%,-50%)", fontFamily:"'Barlow Condensed',sans-serif", fontSize:"clamp(200px,35vw,520px)", fontWeight:900, fontStyle:"italic", color:"rgba(255,199,44,0.08)", lineHeight:1, userSelect:"none", pointerEvents:"none", whiteSpace:"nowrap" }}>404</div>

      <div className="nf-content" style={{ position:"relative", zIndex:1, maxWidth:560 }}>
        {/* M badge floating */}
        <div style={{ width:88, height:88, background:"linear-gradient(135deg,#FFC72C,#FFD54F)", borderRadius:24, display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 28px", boxShadow:"0 8px 32px rgba(255,199,44,0.35)", animation:"float 3.5s ease-in-out infinite" }}>
          <span style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:52, fontWeight:900, color:"#DA291C", lineHeight:1 }}>M</span>
        </div>

        {/* 404 */}
        <div style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:"clamp(72px,14vw,140px)", fontWeight:900, fontStyle:"italic", color:"#1A1A1A", lineHeight:0.9, marginBottom:12, letterSpacing:"-0.03em" }}>404</div>

        {/* Red line */}
        <div style={{ width:64, height:4, background:"#DA291C", borderRadius:2, margin:"0 auto 24px" }} />

        <h1 style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:"clamp(24px,4vw,40px)", fontWeight:900, color:"#1A1A1A", marginBottom:14, textTransform:"uppercase", letterSpacing:"-0.01em" }}>
          Page Not Found
        </h1>
        <p style={{ fontSize:15, color:"#888", lineHeight:1.7, marginBottom:36, fontFamily:"'Outfit',sans-serif", maxWidth:400, margin:"0 auto 36px" }}>
          Looks like this page went on a McDelivery and never came back. Let&apos;s get you back to something delicious.
        </p>

        {/* CTAs */}
        <div style={{ display:"flex", gap:12, justifyContent:"center", flexWrap:"wrap" }}>
          <Link href="/" className="nf-home-btn" style={{ display:"inline-flex", alignItems:"center", gap:8, padding:"14px 32px", background:"#DA291C", color:"#fff", borderRadius:12, fontSize:14, fontWeight:900, textDecoration:"none", letterSpacing:"0.04em", boxShadow:"0 4px 16px rgba(218,41,28,0.28)", fontFamily:"'Outfit',sans-serif" }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
            Back to Home
          </Link>
          <Link href="/menu" className="nf-menu-btn" style={{ display:"inline-flex", alignItems:"center", gap:8, padding:"14px 28px", background:"#fff", color:"#1A1A1A", borderRadius:12, fontSize:14, fontWeight:800, textDecoration:"none", letterSpacing:"0.04em", border:"1.5px solid #E8E8E8", fontFamily:"'Outfit',sans-serif" }}>
            View Menu →
          </Link>
        </div>

        {/* Quick links */}
        <div style={{ marginTop:40, paddingTop:28, borderTop:"1px solid #F0F0F0" }}>
          <p style={{ fontSize:12, color:"#AAA", fontWeight:600, marginBottom:16, fontFamily:"'Outfit',sans-serif", letterSpacing:"0.08em", textTransform:"uppercase" }}>Quick Links</p>
          <div style={{ display:"flex", gap:8, justifyContent:"center", flexWrap:"wrap" }}>
            {[{href:"/menu",label:"Menu"},{href:"/outlets",label:"Restaurants"},{href:"/cart",label:"Cart"},{href:"/login",label:"Sign In"}].map(l => (
              <Link key={l.href} href={l.href} style={{ padding:"6px 16px", borderRadius:99, background:"#F5F5F5", color:"#555", fontSize:12, fontWeight:700, textDecoration:"none", fontFamily:"'Outfit',sans-serif", transition:"all 0.18s", border:"1px solid #EBEBEB" }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.background="#FFC72C"; el.style.color="#111"; el.style.borderColor="#FFC72C"; }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.background="#F5F5F5"; el.style.color="#555"; el.style.borderColor="#EBEBEB"; }}>
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}