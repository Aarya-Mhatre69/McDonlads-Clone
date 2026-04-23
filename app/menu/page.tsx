"use client";

import MenuList from "@/components/MenuList";

export default function MenuPage() {
  return (
    <div id="menu-page-root" style={{ minHeight:"100vh", background:"#FAFAFA", fontFamily:"'Outfit',sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800;900&family=Barlow+Condensed:ital,wght@0,700;0,800;0,900;1,800&display=swap');
        @media (hover: hover) and (pointer: fine) { #menu-page-root, #menu-page-root * { cursor: none !important; } }

        .mcat-pill { padding:9px 20px; border-radius:24px; border:1.5px solid #E8E8E8; background:#fff; color:#555; font-size:13px; font-weight:700; text-decoration:none; font-family:'Outfit',sans-serif; letter-spacing:0.03em; transition:all 0.18s ease; white-space:nowrap; display:inline-block; }
        .mcat-pill:hover { border-color:#DA291C; color:#DA291C; background:rgba(218,41,28,0.03); transform:translateY(-1px); }

        /* Search */
        .menu-search-wrap { position:relative; max-width:560px; margin:0 auto 24px; }
        .menu-search-icon { position:absolute; left:16px; top:50%; transform:translateY(-50%); width:16px; height:16px; color:#AAAAAA; pointer-events:none; }
        .menu-search-input { width:100%; padding:13px 44px 13px 46px; border:1.5px solid #E8E8E8; border-radius:14px; font-size:14px; background:#fff !important; color:#1A1A1A !important; outline:none; transition:border-color 0.2s,box-shadow 0.2s; font-family:'Outfit',sans-serif; box-shadow:0 2px 8px rgba(0,0,0,0.04); }
        .menu-search-input:focus { border-color:#DA291C; box-shadow:0 0 0 3px rgba(218,41,28,0.07); }
        .menu-search-input::placeholder { color:#AAAAAA; }
        .menu-search-clear { position:absolute; right:14px; top:50%; transform:translateY(-50%); background:none; border:none; color:#AAA; cursor:pointer; font-size:13px; padding:4px; transition:color 0.2s; }
        .menu-search-clear:hover { color:#DA291C; }

        /* Filter pills */
        .menu-filter-bar { display:flex; gap:8px; flex-wrap:wrap; justify-content:center; margin-bottom:20px; }
        .menu-filter-pill { display:inline-flex; align-items:center; gap:7px; padding:9px 20px; border-radius:99px; border:1.5px solid #E8E8E8; background:#fff; color:#555; font-size:13px; font-weight:700; cursor:pointer; transition:all 0.18s; font-family:'Outfit',sans-serif; letter-spacing:0.03em; }
        .menu-filter-pill:hover { border-color:#DA291C; color:#DA291C; }
        .menu-filter-pill-active { background:#DA291C !important; border-color:#DA291C !important; color:#fff !important; }
        .menu-filter-count { display:inline-flex; align-items:center; justify-content:center; min-width:20px; height:20px; padding:0 5px; border-radius:99px; background:rgba(0,0,0,0.08); color:inherit; font-size:11px; font-weight:800; }
        .menu-filter-count-active { background:rgba(255,255,255,0.22) !important; color:#fff !important; }

        /* Result count */
        .menu-result-count { text-align:center; font-size:13px; color:#AAA; font-family:'Outfit',sans-serif; margin-bottom:24px; }

        /* Grid */
        .menu-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(290px,1fr)); gap:22px; }

        /* Card */
        .menu-card { background:#fff !important; border-radius:18px !important; overflow:hidden !important; border:1px solid #EBEBEB !important; box-shadow:0 2px 10px rgba(0,0,0,0.05) !important; display:flex !important; flex-direction:column !important; transition:transform 0.25s cubic-bezier(0.16,1,0.3,1),box-shadow 0.25s,border-color 0.25s !important; }
        .menu-card:hover { transform:translateY(-5px) !important; box-shadow:0 16px 40px rgba(0,0,0,0.1) !important; border-color:#FFC72C !important; }
        .menu-card-image-wrap { position:relative !important; width:100% !important; height:210px !important; overflow:hidden !important; background:#F5F5F5 !important; }
        .menu-card-image { width:100% !important; height:100% !important; object-fit:cover !important; }
        .menu-card-category-dot { position:absolute !important; top:12px !important; left:12px !important; width:22px !important; height:22px !important; border:2px solid currentColor !important; border-radius:3px !important; background:#fff !important; display:flex !important; align-items:center !important; justify-content:center !important; box-shadow:0 1px 4px rgba(0,0,0,0.12) !important; }
        .menu-card-category-dot-inner { width:10px !important; height:10px !important; border-radius:50% !important; display:block !important; }
        .menu-card-popular-badge { position:absolute !important; bottom:10px !important; right:10px !important; background:#FFC72C !important; color:#1A1A1A !important; font-size:10px !important; font-weight:800 !important; padding:4px 10px !important; border-radius:99px !important; letter-spacing:0.04em !important; font-family:'Outfit',sans-serif !important; }
        .menu-card-body { padding:16px !important; display:flex !important; flex-direction:column !important; flex:1 !important; gap:9px !important; }
        .menu-card-name { font-size:16px !important; font-weight:800 !important; color:#1A1A1A !important; line-height:1.25 !important; font-family:'Outfit',sans-serif !important; }
        .menu-card-desc { font-size:12px !important; color:#888 !important; line-height:1.6 !important; font-family:'Outfit',sans-serif !important; }
        .menu-card-ingredients { display:flex !important; flex-wrap:wrap !important; gap:5px !important; }
        .menu-card-ingredient { padding:2px 8px !important; background:#F5F5F5 !important; color:#666 !important; font-size:10px !important; font-weight:600 !important; border-radius:99px !important; border:1px solid #EBEBEB !important; font-family:'Outfit',sans-serif !important; }
        .menu-card-ingredient-more { background:#FFF8E1 !important; color:#B8860B !important; border-color:rgba(255,199,44,0.3) !important; }
        .menu-card-spice { display:inline-flex !important; align-items:center !important; gap:7px !important; padding:4px 10px !important; border-radius:99px !important; align-self:flex-start !important; }
        .menu-card-spice-dots { display:flex !important; gap:3px !important; align-items:center !important; }
        .menu-card-spice-dot { width:6px !important; height:6px !important; border-radius:50% !important; display:inline-block !important; }
        .menu-card-spice-label { font-size:10px !important; font-weight:800 !important; text-transform:uppercase !important; letter-spacing:0.07em !important; font-family:'Outfit',sans-serif !important; }
        .menu-card-footer { display:flex !important; align-items:center !important; justify-content:space-between !important; margin-top:auto !important; padding-top:10px !important; border-top:1px solid #F0F0F0 !important; }
        .menu-card-price-wrap { display:flex !important; flex-direction:column !important; gap:2px !important; }
        .menu-card-price { font-size:22px !important; font-weight:900 !important; color:#1A1A1A !important; font-family:'Barlow Condensed',sans-serif !important; letter-spacing:-0.5px !important; }
        .menu-card-in-cart { font-size:10px !important; font-weight:700 !important; color:#22c55e !important; font-family:'Outfit',sans-serif !important; }
        .menu-card-add-btn { padding:9px 20px !important; background:#DA291C !important; color:#fff !important; font-size:12px !important; font-weight:900 !important; border:none !important; border-radius:10px !important; cursor:pointer !important; transition:all 0.2s !important; font-family:'Outfit',sans-serif !important; letter-spacing:0.04em !important; white-space:nowrap !important; }
        .menu-card-add-btn:hover { background:#b52018 !important; transform:scale(1.05) !important; box-shadow:0 4px 14px rgba(218,41,28,0.3) !important; }
        .menu-card-add-btn-flash { background:#22c55e !important; }

        /* Empty state */
        .menu-empty { text-align:center; padding:60px 20px; color:#AAA; display:flex; flex-direction:column; align-items:center; gap:14px; font-size:15px; }
        .menu-reset-btn { padding:9px 26px; border-radius:99px; border:1.5px solid #DA291C; background:#fff; color:#DA291C; font-size:13px; font-weight:700; cursor:pointer; font-family:'Outfit',sans-serif; transition:all 0.18s; }
        .menu-reset-btn:hover { background:#DA291C; color:#fff; }

        @media(max-width:640px) {
          .menu-grid { grid-template-columns:1fr; }
          .menu-filter-bar { gap:6px; }
          .menu-filter-pill { padding:7px 14px; font-size:12px; }
        }
      `}</style>

      {/* ══ PAGE HEADER ══ */}
      <div style={{ background:"#fff", borderBottom:"3px solid #FFC72C", padding:"64px 64px 44px", position:"relative", overflow:"hidden" }}>
        <div aria-hidden="true" style={{ position:"absolute", right:-20, top:"50%", transform:"translateY(-50%)", fontFamily:"'Barlow Condensed',sans-serif", fontSize:"clamp(160px,24vw,380px)", fontWeight:900, fontStyle:"italic", color:"rgba(255,199,44,0.055)", lineHeight:1, userSelect:"none", pointerEvents:"none" }}>MENU</div>

        <div style={{ maxWidth:1280, margin:"0 auto", position:"relative", zIndex:1 }}>
          <p style={{ color:"#DA291C", fontSize:10, fontWeight:800, letterSpacing:"0.28em", textTransform:"uppercase", marginBottom:14, fontFamily:"'Outfit',sans-serif" }}></p>

          <h1 style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:"clamp(48px,7vw,88px)", fontWeight:900, fontStyle:"italic", color:"#1A1A1A", lineHeight:0.92, marginBottom:18, letterSpacing:"-0.02em" }}>
            What Would You<br />
            <span style={{ WebkitTextStroke:"2.5px #DA291C", color:"transparent" }}>Like Today?</span>
          </h1>

          <p style={{ color:"#888", fontSize:15, maxWidth:480, lineHeight:1.7, marginBottom:32, fontFamily:"'Outfit',sans-serif" }}>
            Authentic Indian flavours meet McDonald&apos;s magic — 50+ items crafted for your taste buds.
          </p>

          {/* Quick-jump pills — match sections in MenuList */}
          <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
            {[
              { href:"#burgers",     label:"Burgers & Wraps" },
              { href:"#chicken",     label:"Chicken & Fish" },
              { href:"#snacks",      label:"Snacks & Sides" },
              { href:"#beverages",   label:"Beverages" },
              { href:"#desserts",    label:"Desserts" },
              { href:"#happy-meal",  label:"Happy Meal" },
            ].map(a => (
              <a key={a.href} href={a.href} className="mcat-pill">{a.label}</a>
            ))}
          </div>
        </div>
      </div>

      {/* Sticky search strip */}
      <div style={{ background:"#fff", borderBottom:"1px solid #EBEBEB", padding:"16px 64px", position:"sticky", top:68, zIndex:30, boxShadow:"0 2px 8px rgba(0,0,0,0.04)" }}>
        <div style={{ maxWidth:1280, margin:"0 auto", display:"flex", alignItems:"center", gap:16, flexWrap:"wrap" }}>
          <div style={{ position:"relative", flex:1, maxWidth:440 }}>
            <svg style={{ position:"absolute", left:16, top:"50%", transform:"translateY(-50%)", width:15, height:15, pointerEvents:"none" }} viewBox="0 0 24 24" fill="none" stroke="#AAAAAA" strokeWidth="2.5" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
            <input
              type="text"
              placeholder="Search items, ingredients…"
              style={{ width:"100%", padding:"11px 14px 11px 42px", border:"1.5px solid #E8E8E8", borderRadius:24, fontSize:13, outline:"none", fontFamily:"'Outfit',sans-serif", background:"#FAFAFA", color:"#1A1A1A", transition:"border-color 0.2s, box-shadow 0.2s", boxSizing:"border-box" }}
              onFocus={e => { e.currentTarget.style.borderColor="#DA291C"; e.currentTarget.style.boxShadow="0 0 0 3px rgba(218,41,28,0.07)"; }}
              onBlur={e => { e.currentTarget.style.borderColor="#E8E8E8"; e.currentTarget.style.boxShadow="none"; }}
            />
          </div>
          <p style={{ fontSize:13, color:"#AAA", fontFamily:"'Outfit',sans-serif", marginLeft:"auto" }}>Use the filters below to narrow results</p>
        </div>
      </div>

      {/* ══ MENU CONTENT (MenuList handles filters + grid) ══ */}
      <div style={{ maxWidth:1280, margin:"0 auto", padding:"36px 64px 80px" }}>
        <MenuList />
      </div>
    </div>
  );
}