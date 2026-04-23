"use client";

import Link from "next/link";

const PACKAGES = [
  {
    name: "Happy Meal Party",
    price: "₹399",
    perChild: "per child",
    minChildren: "Min. 10 children",
    color: "#FFC72C",
    features: [
      "Happy Meal for each child",
      "Birthday cake (1 kg)",
      "Party area decoration",
      "Party host for 2 hours",
      "Goodie bags for all kids",
      "Complimentary meal for birthday child",
    ],
    popular: false,
  },
  {
    name: "McParty Classic",
    price: "₹599",
    perChild: "per child",
    minChildren: "Min. 15 children",
    color: "#DA291C",
    features: [
      "Happy Meal for each child",
      "Birthday cake (2 kg)",
      "Premium decoration & balloons",
      "Dedicated party host",
      "3 hours exclusive party area",
      "Goodie bags + return gifts",
      "Photo booth setup",
      "Complimentary meal for parents",
    ],
    popular: true,
  },
  {
    name: "McParty Premium",
    price: "₹899",
    perChild: "per child",
    minChildren: "Min. 20 children",
    color: "#1A1A1A",
    features: [
      "Happy Meal + dessert for each child",
      "Custom birthday cake (3 kg)",
      "Premium theme decoration",
      "2 dedicated party hosts",
      "4 hours exclusive area",
      "Premium goodie bags",
      "Photo booth + photographer",
      "Ronald McDonald appearance",
      "Complimentary meal for all adults",
    ],
    popular: false,
  },
];

const STEPS = [
  { num: "01", title: "Choose Your Package", desc: "Pick the perfect party package for your little one's special day." },
  { num: "02", title: "Book Your Date", desc: "Fill out our booking form and we'll confirm within 24 hours." },
  { num: "03", title: "We Handle Everything", desc: "Our team sets up the perfect McDonald's birthday experience." },
  { num: "04", title: "Party Time!", desc: "Show up and celebrate — we'll take care of all the fun!" },
];

export default function BirthdayPage() {
  return (
    <div id="birthday-root" style={{ fontFamily:"'Outfit',sans-serif", background:"#fff", minHeight:"100vh" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800;900&family=Barlow+Condensed:ital,wght@0,700;0,800;0,900;1,800&display=swap');
        @media (hover: hover) and (pointer: fine) {
          #birthday-root, #birthday-root * { cursor: none !important; }
        }
        @keyframes fadeUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        .pkg-card { transition: transform 0.25s cubic-bezier(0.16,1,0.3,1), box-shadow 0.25s; }
        .pkg-card:hover { transform: translateY(-6px); box-shadow: 0 20px 56px rgba(0,0,0,0.12) !important; }
        .book-btn { transition: all 0.2s; }
        .book-btn:hover { transform: scale(1.03); opacity: 0.9; }
      `}</style>

      {/* ── HERO ── */}
      <div style={{ background:"linear-gradient(135deg, #FFC72C 0%, #FFD54F 60%, #FFC72C 100%)", padding:"80px 64px 72px", position:"relative", overflow:"hidden", borderBottom:"4px solid #DA291C" }}>
        {/* Confetti */}
        {[{t:"12%",l:"5%",s:18,r:-30,c:"#DA291C"},{t:"22%",l:"88%",s:14,r:25,c:"#DA291C"},{t:"65%",l:"3%",s:12,r:40,c:"rgba(218,41,28,0.5)"},{t:"75%",l:"92%",s:16,r:-20,c:"#DA291C"},{t:"45%",l:"48%",s:10,r:35,c:"rgba(218,41,28,0.4)"},{t:"8%",l:"60%",s:9,r:-45,c:"#DA291C"}].map((d,i) => (
          <div key={i} style={{ position:"absolute", top:d.t, left:d.l, width:d.s, height:d.s*0.55, background:d.c, borderRadius:3, transform:`rotate(${d.r}deg)`, pointerEvents:"none", opacity:0.6 }} />
        ))}
        {/* Large bg M */}
        <div aria-hidden="true" style={{ position:"absolute", right:-30, top:"50%", transform:"translateY(-50%)", fontFamily:"'Barlow Condensed',sans-serif", fontSize:"clamp(220px,30vw,480px)", fontWeight:900, fontStyle:"italic", color:"rgba(218,41,28,0.08)", lineHeight:1, userSelect:"none", pointerEvents:"none" }}>M</div>

        <div style={{ maxWidth:1200, margin:"0 auto", position:"relative", zIndex:1 }}>
          <p style={{ fontSize:11, fontWeight:800, letterSpacing:"0.25em", textTransform:"uppercase", color:"#DA291C", marginBottom:16, fontFamily:"'Outfit',sans-serif" }}>McDonald's India</p>
          <h1 style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:"clamp(52px,8vw,96px)", fontWeight:900, fontStyle:"italic", color:"#1A1A1A", lineHeight:0.9, marginBottom:20, letterSpacing:"-0.02em" }}>
            Birthday<br /><span style={{ color:"#DA291C" }}>Party</span>
          </h1>
          <p style={{ fontSize:"clamp(16px,2vw,22px)", fontWeight:600, color:"#1A1A1A", maxWidth:520, lineHeight:1.6, marginBottom:36, opacity:0.8 }}>
            Make your child's birthday unforgettable with a McDonald's party! Fun, food, and memories that last forever.
          </p>
          <div style={{ display:"flex", gap:12, flexWrap:"wrap" }}>
            <a href="#packages" style={{ display:"inline-flex", alignItems:"center", gap:8, padding:"14px 32px", background:"#DA291C", color:"#fff", borderRadius:12, fontSize:14, fontWeight:900, textDecoration:"none", letterSpacing:"0.04em", boxShadow:"0 4px 16px rgba(218,41,28,0.35)" }}>
              View Packages
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </a>
            <a href="#booking" style={{ display:"inline-flex", alignItems:"center", gap:8, padding:"14px 28px", background:"rgba(0,0,0,0.1)", color:"#1A1A1A", borderRadius:12, fontSize:14, fontWeight:800, textDecoration:"none", letterSpacing:"0.04em" }}>
              Book Now →
            </a>
          </div>

          {/* Stats row */}
          <div style={{ display:"flex", gap:32, marginTop:48, flexWrap:"wrap" }}>
            {[{v:"10,000+",l:"Parties Hosted"},{v:"4.9★",l:"Parent Rating"},{v:"₹399",l:"Starting From"},{v:"2–4 hrs",l:"Party Duration"}].map(s => (
              <div key={s.l}>
                <div style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:32, fontWeight:900, color:"#DA291C", lineHeight:1 }}>{s.v}</div>
                <div style={{ fontSize:11, color:"rgba(0,0,0,0.55)", fontWeight:600, letterSpacing:"0.08em", marginTop:4, fontFamily:"'Outfit',sans-serif", textTransform:"uppercase" }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── HOW IT WORKS ── */}
      <section style={{ background:"#FAFAFA", padding:"72px 64px", borderBottom:"1px solid #EBEBEB" }}>
        <div style={{ maxWidth:1200, margin:"0 auto" }}>
          <p style={{ color:"#DA291C", fontSize:10, fontWeight:800, letterSpacing:"0.28em", textTransform:"uppercase", marginBottom:12, fontFamily:"'Outfit',sans-serif" }}>Simple Process</p>
          <h2 style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:"clamp(32px,4.5vw,56px)", fontWeight:900, color:"#1A1A1A", textTransform:"uppercase", marginBottom:48, letterSpacing:"-0.01em" }}>How It Works</h2>

          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))", gap:24 }}>
            {STEPS.map((step, i) => (
              <div key={step.num} style={{ background:"#fff", borderRadius:16, border:"1px solid #EBEBEB", padding:"28px 24px", position:"relative", overflow:"hidden" }}>
                {/* Step number bg */}
                <div style={{ position:"absolute", top:-10, right:-8, fontFamily:"'Barlow Condensed',sans-serif", fontSize:80, fontWeight:900, color:"rgba(255,199,44,0.1)", lineHeight:1, userSelect:"none", pointerEvents:"none" }}>{step.num}</div>
                <div style={{ width:44, height:44, borderRadius:12, background:"#FFC72C", display:"flex", alignItems:"center", justifyContent:"center", marginBottom:16 }}>
                  <span style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:22, fontWeight:900, color:"#DA291C" }}>{i+1}</span>
                </div>
                <h3 style={{ fontSize:16, fontWeight:800, color:"#1A1A1A", marginBottom:8, fontFamily:"'Outfit',sans-serif" }}>{step.title}</h3>
                <p style={{ fontSize:13, color:"#888", lineHeight:1.6, fontFamily:"'Outfit',sans-serif" }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PACKAGES ── */}
      <section id="packages" style={{ background:"#fff", padding:"72px 64px" }}>
        <div style={{ maxWidth:1200, margin:"0 auto" }}>
          <p style={{ color:"#DA291C", fontSize:10, fontWeight:800, letterSpacing:"0.28em", textTransform:"uppercase", marginBottom:12, fontFamily:"'Outfit',sans-serif" }}>Party Packages</p>
          <h2 style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:"clamp(32px,4.5vw,56px)", fontWeight:900, color:"#1A1A1A", textTransform:"uppercase", marginBottom:12, letterSpacing:"-0.01em" }}>Choose Your Package</h2>
          <p style={{ color:"#888", fontSize:14, marginBottom:48, fontFamily:"'Outfit',sans-serif" }}>All packages include dedicated support. Prices are per child.</p>

          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))", gap:24 }}>
            {PACKAGES.map(pkg => (
              <div key={pkg.name} className="pkg-card" style={{ borderRadius:20, overflow:"hidden", border:"1px solid #EBEBEB", boxShadow:"0 2px 12px rgba(0,0,0,0.06)", display:"flex", flexDirection:"column", position:"relative" }}>
                {pkg.popular && (
                  <div style={{ position:"absolute", top:16, right:16, background:"#DA291C", color:"#fff", fontSize:10, fontWeight:900, letterSpacing:"0.12em", padding:"4px 12px", borderRadius:99, fontFamily:"'Outfit',sans-serif" }}>MOST POPULAR</div>
                )}
                {/* Header */}
                <div style={{ background:pkg.color, padding:"28px 24px 24px" }}>
                  <h3 style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:28, fontWeight:900, color: pkg.color === "#1A1A1A" ? "#FFC72C" : "#1A1A1A", marginBottom:8, textTransform:"uppercase" }}>{pkg.name}</h3>
                  <div style={{ display:"flex", alignItems:"baseline", gap:6 }}>
                    <span style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:48, fontWeight:900, color: pkg.color === "#1A1A1A" ? "#fff" : "#1A1A1A", lineHeight:1 }}>{pkg.price}</span>
                    <span style={{ fontSize:13, color: pkg.color === "#1A1A1A" ? "rgba(255,255,255,0.6)" : "rgba(0,0,0,0.5)", fontFamily:"'Outfit',sans-serif" }}>{pkg.perChild}</span>
                  </div>
                  <p style={{ fontSize:11, color: pkg.color === "#1A1A1A" ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.45)", marginTop:6, fontFamily:"'Outfit',sans-serif", fontWeight:600 }}>{pkg.minChildren}</p>
                </div>
                {/* Features */}
                <div style={{ flex:1, padding:"24px", background:"#fff" }}>
                  {pkg.features.map(f => (
                    <div key={f} style={{ display:"flex", alignItems:"center", gap:10, paddingBottom:11, borderBottom:"1px solid #F5F5F5", marginBottom:11 }}>
                      <div style={{ width:20, height:20, borderRadius:"50%", background:"rgba(34,197,94,0.12)", border:"1.5px solid rgba(34,197,94,0.3)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="3" strokeLinecap="round"><path d="M20 6L9 17l-5-5"/></svg>
                      </div>
                      <span style={{ fontSize:13, color:"#444", fontFamily:"'Outfit',sans-serif", fontWeight:500 }}>{f}</span>
                    </div>
                  ))}
                </div>
                <div style={{ padding:"0 24px 24px" }}>
                  <a href="#booking" className="book-btn" style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:8, width:"100%", padding:"14px", background:pkg.color === "#FFC72C" ? "#DA291C" : pkg.color === "#DA291C" ? "#DA291C" : "#FFC72C", color: pkg.color === "#1A1A1A" ? "#111" : "#fff", borderRadius:12, fontSize:13, fontWeight:900, textDecoration:"none", letterSpacing:"0.05em", fontFamily:"'Outfit',sans-serif" }}>
                    Book This Package →
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BOOKING FORM ── */}
      <section id="booking" style={{ background:"#FAFAFA", padding:"72px 64px", borderTop:"3px solid #FFC72C" }}>
        <div style={{ maxWidth:700, margin:"0 auto" }}>
          <p style={{ color:"#DA291C", fontSize:10, fontWeight:800, letterSpacing:"0.28em", textTransform:"uppercase", marginBottom:12, fontFamily:"'Outfit',sans-serif", textAlign:"center" }}>Reserve Your Spot</p>
          <h2 style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:"clamp(32px,4.5vw,56px)", fontWeight:900, color:"#1A1A1A", textTransform:"uppercase", marginBottom:8, letterSpacing:"-0.01em", textAlign:"center" }}>Book Your Party</h2>
          <p style={{ color:"#888", fontSize:14, marginBottom:40, fontFamily:"'Outfit',sans-serif", textAlign:"center" }}>We&apos;ll confirm within 24 hours. A 30% advance is required to secure your booking.</p>

          <div style={{ background:"#fff", borderRadius:20, border:"1px solid #EBEBEB", padding:"36px", boxShadow:"0 4px 24px rgba(0,0,0,0.06)" }}>
            {[
              { label:"Parent / Guardian Name", placeholder:"Your full name", type:"text" },
              { label:"Email Address", placeholder:"email@example.com", type:"email" },
              { label:"Phone Number", placeholder:"+91 98765 43210", type:"tel" },
              { label:"Child's Name", placeholder:"Birthday child's name", type:"text" },
            ].map(f => (
              <div key={f.label} style={{ marginBottom:20 }}>
                <label style={{ display:"block", fontSize:10, fontWeight:800, letterSpacing:"0.18em", color:"#1A1A1A", textTransform:"uppercase", marginBottom:8, fontFamily:"'Outfit',sans-serif" }}>{f.label}</label>
                <input type={f.type} placeholder={f.placeholder} style={{ width:"100%", padding:"13px 16px", border:"1.5px solid #E8E8E8", borderRadius:10, fontSize:14, fontFamily:"'Outfit',sans-serif", outline:"none", transition:"border-color 0.2s", background:"#FAFAFA", color:"#1A1A1A", boxSizing:"border-box" }}
                  onFocus={e => (e.currentTarget.style.borderColor="#DA291C")}
                  onBlur={e => (e.currentTarget.style.borderColor="#E8E8E8")} />
              </div>
            ))}
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16, marginBottom:20 }}>
              <div>
                <label style={{ display:"block", fontSize:10, fontWeight:800, letterSpacing:"0.18em", color:"#1A1A1A", textTransform:"uppercase", marginBottom:8, fontFamily:"'Outfit',sans-serif" }}>Preferred Date</label>
                <input type="date" style={{ width:"100%", padding:"13px 16px", border:"1.5px solid #E8E8E8", borderRadius:10, fontSize:14, fontFamily:"'Outfit',sans-serif", outline:"none", background:"#FAFAFA", color:"#1A1A1A", boxSizing:"border-box" }}
                  onFocus={e => (e.currentTarget.style.borderColor="#DA291C")}
                  onBlur={e => (e.currentTarget.style.borderColor="#E8E8E8")} />
              </div>
              <div>
                <label style={{ display:"block", fontSize:10, fontWeight:800, letterSpacing:"0.18em", color:"#1A1A1A", textTransform:"uppercase", marginBottom:8, fontFamily:"'Outfit',sans-serif" }}>No. of Children</label>
                <input type="number" placeholder="Min. 10" min={10} style={{ width:"100%", padding:"13px 16px", border:"1.5px solid #E8E8E8", borderRadius:10, fontSize:14, fontFamily:"'Outfit',sans-serif", outline:"none", background:"#FAFAFA", color:"#1A1A1A", boxSizing:"border-box" }}
                  onFocus={e => (e.currentTarget.style.borderColor="#DA291C")}
                  onBlur={e => (e.currentTarget.style.borderColor="#E8E8E8")} />
              </div>
            </div>
            <div style={{ marginBottom:24 }}>
              <label style={{ display:"block", fontSize:10, fontWeight:800, letterSpacing:"0.18em", color:"#1A1A1A", textTransform:"uppercase", marginBottom:8, fontFamily:"'Outfit',sans-serif" }}>Select Package</label>
              <select style={{ width:"100%", padding:"13px 16px", border:"1.5px solid #E8E8E8", borderRadius:10, fontSize:14, fontFamily:"'Outfit',sans-serif", outline:"none", background:"#FAFAFA", color:"#1A1A1A", boxSizing:"border-box" }}
                onFocus={e => (e.currentTarget.style.borderColor="#DA291C")}
                onBlur={e => (e.currentTarget.style.borderColor="#E8E8E8")}>
                <option value="">Choose a package</option>
                {PACKAGES.map(p => <option key={p.name} value={p.name}>{p.name} — {p.price} per child</option>)}
              </select>
            </div>
            <button style={{ width:"100%", padding:"16px", background:"#DA291C", color:"#fff", border:"none", borderRadius:12, fontSize:14, fontWeight:900, letterSpacing:"0.08em", fontFamily:"'Outfit',sans-serif", transition:"all 0.2s", boxShadow:"0 4px 16px rgba(218,41,28,0.3)" }}
              onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background="#b52018"; (e.currentTarget as HTMLButtonElement).style.transform="scale(1.01)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background="#DA291C"; (e.currentTarget as HTMLButtonElement).style.transform="scale(1)"; }}>
              Submit Booking Request →
            </button>
          </div>

          <p style={{ textAlign:"center", marginTop:20, fontSize:13, color:"#AAA", fontFamily:"'Outfit',sans-serif" }}>
            Or call us directly: <a href="tel:1800-103-0000" style={{ color:"#DA291C", fontWeight:700, textDecoration:"none" }}>1800-103-0000</a>
          </p>
        </div>
      </section>
    </div>
  );
}