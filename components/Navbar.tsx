"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { useSession, signOut } from "next-auth/react";

const NAV_LINKS = [
  { href:"/#menu",       label:"Menu",           isHash:true,  sectionId:"menu",        hasDropdown:true },
  { href:"/outlets",     label:"Restaurants",    isHash:false, sectionId:null,          hasDropdown:false },
  { href:"/#mcdelivery", label:"McDelivery",     isHash:true,  sectionId:"mcdelivery",  hasDropdown:false },
  { href:"/#news",       label:"News",           isHash:true,  sectionId:"news",        hasDropdown:false },
  { href:"/birthday",    label:"Birthday Party", isHash:false, sectionId:null,          hasDropdown:false },
  { href:"/careers",     label:"Careers",        isHash:false, sectionId:null,          hasDropdown:false },
];

const MENU_DROPDOWN = [
  { href:"/menu#burgers",    label:"Burgers & Wraps" },
  { href:"/menu#chicken",    label:"Chicken & Fish" },
  { href:"/menu#snacks",     label:"Snacks & Sides" },
  { href:"/menu#beverages",  label:"Beverages" },
  { href:"/menu#desserts",   label:"Desserts" },
  { href:"/menu#happy-meal", label:"Happy Meal" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled,      setScrolled]      = useState(false);
  const [menuOpen,      setMenuOpen]      = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [ddOpen,        setDdOpen]        = useState(false);
  const { totalItems: cartCount } = useCart();
  const { data: session } = useSession();

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 8);
      const ids = ["menu","mcdelivery","news","restaurants","offers"];
      let found = "";
      ids.forEach(id => {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 110) found = id;
      });
      setActiveSection(found);
    };
    window.addEventListener("scroll", onScroll, { passive:true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const smoothScroll = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior:"smooth" });

  const isActive = (link: typeof NAV_LINKS[0]) => {
    if (!link.isHash) return pathname === link.href || pathname.startsWith(link.href + "/");
    return activeSection === link.sectionId;
  };

  const handleNavClick = (link: typeof NAV_LINKS[0], e: React.MouseEvent) => {
    if (link.isHash && pathname === "/") {
      e.preventDefault();
      smoothScroll(link.sectionId!);
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800;900&display=swap');
        #mcdnav * { font-family:'Outfit',sans-serif; box-sizing:border-box; }
        @media (hover: hover) and (pointer: fine) {
          #mcdnav, #mcdnav *, .mob-ov, .mob-drw, .mob-drw * { cursor: none !important; }
        }

        .mnl { display:inline-flex; align-items:center; gap:4px; padding:8px 12px; border-radius:8px; font-size:13px; font-weight:600; color:#666; text-decoration:none; transition:color 0.15s,background 0.15s; white-space:nowrap; border:none; background:transparent; cursor:pointer; position:relative; }
        .mnl:hover { color:#1A1A1A; background:rgba(0,0,0,0.04); }
        .mnl.act { color:#DA291C; font-weight:700; }
        .mnl.act::after { content:''; position:absolute; bottom:-3px; left:12px; right:12px; height:2.5px; background:#DA291C; border-radius:2px; }

        .mdd { position:absolute; top:calc(100% + 8px); left:50%; transform:translateX(-50%) translateY(-4px); width:196px; background:#fff; border:1px solid #EBEBEB; border-radius:14px; box-shadow:0 10px 36px rgba(0,0,0,0.1); padding:7px; opacity:0; pointer-events:none; transition:opacity .17s,transform .17s; z-index:200; }
        .mdd::before { content:''; position:absolute; top:-5px; left:50%; transform:translateX(-50%) rotate(45deg); width:9px; height:9px; background:#fff; border-left:1px solid #EBEBEB; border-top:1px solid #EBEBEB; }
        .mdd.open { opacity:1; pointer-events:auto; transform:translateX(-50%) translateY(0); }
        .mdi { display:flex; align-items:center; gap:9px; padding:9px 12px; border-radius:8px; font-size:13px; font-weight:500; color:#555; text-decoration:none; transition:background .12s,color .12s; }
        .mdi:hover { background:#FFF8E1; color:#DA291C; }
        .mdi-dot { width:6px; height:6px; border-radius:50%; background:#FFC72C; flex-shrink:0; }

        .n-cart { position:relative; display:flex; align-items:center; justify-content:center; width:40px; height:40px; border-radius:10px; border:1.5px solid #E8E8E8; background:#fff; text-decoration:none; transition:all 0.2s; }
        .n-cart:hover { border-color:#FFC72C; background:#FFF8E1; }
        .n-cart:hover .n-ci { color:#DA291C !important; }
        .n-cbadge { position:absolute; top:-7px; right:-7px; min-width:19px; height:19px; padding:0 4px; background:#DA291C; color:#fff; font-size:10px; font-weight:900; border-radius:99px; display:flex; align-items:center; justify-content:center; border:2px solid #fff; }

        .n-signin { display:flex; align-items:center; gap:6px; padding:8px 18px; border-radius:22px; background:#DA291C; color:#fff !important; font-size:12px; font-weight:800; letter-spacing:0.04em; text-decoration:none; transition:background 0.2s; border:none; cursor:pointer; }
        .n-signin:hover { background:#b52018; }

        .n-ham { display:none; align-items:center; justify-content:center; width:40px; height:40px; border-radius:10px; border:1.5px solid #E8E8E8; background:#fff; cursor:pointer; transition:all .2s; }

        .mob-ov { position:fixed; inset:0; z-index:40; background:rgba(0,0,0,0.5); backdrop-filter:blur(5px); transition:opacity .25s; }
        .mob-ov.off { opacity:0; pointer-events:none; }
        .mob-drw { position:fixed; top:0; right:0; height:100%; width:284px; z-index:50; background:#fff; border-left:1px solid #EBEBEB; display:flex; flex-direction:column; transition:transform .32s cubic-bezier(.32,0,.15,1); box-shadow:-6px 0 32px rgba(0,0,0,0.1); }
        .mob-drw.shut { transform:translateX(100%); }
        .mml { display:flex; align-items:center; padding:12px 14px; border-radius:10px; font-size:14px; font-weight:600; color:#555; text-decoration:none; transition:all .14s; border:none; background:transparent; cursor:pointer; width:100%; text-align:left; }
        .mml:hover,.mml.act { background:#FFF8E1; color:#DA291C; }
        .msub { display:flex; align-items:center; gap:8px; padding:9px 14px 9px 26px; border-radius:8px; font-size:13px; font-weight:500; color:#888; text-decoration:none; transition:color .13s; }
        .msub:hover { color:#DA291C; }
        .msub::before { content:''; width:4px; height:4px; border-radius:50%; background:#FFC72C; flex-shrink:0; }

        @media(max-width:900px) { .n-desklinks { display:none !important; } .n-deskright .n-signin { display:none !important; } .n-ham { display:flex !important; } }
        @media(max-width:640px) { .n-inner { padding:0 16px !important; } }
      `}</style>

      <header id="mcdnav" className="fixed top-0 left-0 right-0 z-50"
        style={{ background:"#fff", borderBottom:"1px solid #EBEBEB", boxShadow:scrolled?"0 2px 18px rgba(0,0,0,0.07)":"none", transition:"box-shadow 0.3s" }}>
        {/* Red stripe */}
        <div style={{ height:5, background:"#DA291C" }} />

        <div className="n-inner" style={{ maxWidth:1280, margin:"0 auto", padding:"0 28px", display:"flex", alignItems:"center", justifyContent:"space-between", height:68, gap:20 }}>

          {/* Logo */}
          <Link href="/" style={{ display:"flex", alignItems:"center", gap:10, textDecoration:"none", flexShrink:0 }}>
            <div style={{ width:40, height:40, background:"#DA291C", borderRadius:8, display:"flex", alignItems:"center", justifyContent:"center" }}>
              <span style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:23, fontWeight:900, color:"#FFC72C", lineHeight:1 }}>M</span>
            </div>
            <div>
              <div style={{ fontSize:14, fontWeight:800, color:"#1A1A1A", lineHeight:1.1, fontFamily:"'Outfit',sans-serif" }}>McDonald&apos;s</div>
              <div style={{ fontSize:8.5, fontWeight:700, color:"#DA291C", letterSpacing:"0.22em", textTransform:"uppercase", fontFamily:"'Outfit',sans-serif" }}>India</div>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="n-desklinks" style={{ display:"flex", alignItems:"center", gap:2, flex:1, justifyContent:"center" }}>
            {NAV_LINKS.map(link => {
              const active = isActive(link);
              return (
                <div key={link.label} style={{ position:"relative" }}
                  onMouseEnter={() => link.hasDropdown && setDdOpen(true)}
                  onMouseLeave={() => link.hasDropdown && setDdOpen(false)}>
                  {link.isHash ? (
                    <a href={link.href} className={`mnl ${active?"act":""}`} onClick={e => handleNavClick(link, e)}>
                      {link.label}
                      {link.hasDropdown && (
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" style={{ transition:"transform .2s", transform:ddOpen?"rotate(180deg)":"rotate(0)" }}><path d="M6 9l6 6 6-6"/></svg>
                      )}
                    </a>
                  ) : (
                    <Link href={link.href} className={`mnl ${active?"act":""}`}>{link.label}</Link>
                  )}
                  {link.hasDropdown && (
                    <div className={`mdd ${ddOpen?"open":""}`}>
                      {MENU_DROPDOWN.map(d => (
                        <Link key={d.href} href={d.href} className="mdi"><span className="mdi-dot"/>{d.label}</Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Right */}
          <div className="n-deskright" style={{ display:"flex", alignItems:"center", gap:10, flexShrink:0 }}>
            {session ? (
              <div style={{ display:"flex", alignItems:"center", gap:8, padding:"6px 6px 6px 14px", background:"#F5F5F5", border:"1.5px solid #E8E8E8", borderRadius:22 }}>
                <span style={{ fontSize:13, fontWeight:700, color:"#1A1A1A", maxWidth:90, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap", fontFamily:"'Outfit',sans-serif" }}>{session.user?.name?.split(" ")[0]||"User"}</span>
                <button onClick={() => signOut()} style={{ padding:"5px 12px", background:"#DA291C", border:"none", borderRadius:18, color:"#fff", fontSize:11, fontWeight:800, letterSpacing:"0.06em", cursor:"pointer", fontFamily:"'Outfit',sans-serif" }}>LOGOUT</button>
              </div>
            ) : (
              <Link href="/login" className="n-signin">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"/></svg>
                Sign In
              </Link>
            )}
            <Link href="/cart" aria-label={`Cart — ${cartCount} items`} className="n-cart">
              <svg className="n-ci" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" style={{ color:"#888" }}>
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4zM3 6h18M16 10a4 4 0 0 1-8 0"/>
              </svg>
              {cartCount > 0 && <span className="n-cbadge">{cartCount}</span>}
            </Link>
            <button className="n-ham" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu" style={{ borderColor:menuOpen?"#FFC72C":"#E8E8E8" }}>
              <div style={{ width:17, display:"flex", flexDirection:"column", gap:5 }}>
                <span style={{ display:"block", height:"1.5px", background:"#333", borderRadius:2, transition:"all .28s", transformOrigin:"center", transform:menuOpen?"rotate(45deg) translate(0,6.5px)":"none" }} />
                <span style={{ display:"block", height:"1.5px", background:"#333", borderRadius:2, transition:"opacity .28s", opacity:menuOpen?0:1 }} />
                <span style={{ display:"block", height:"1.5px", background:"#333", borderRadius:2, transition:"all .28s", transformOrigin:"center", transform:menuOpen?"rotate(-45deg) translate(0,-6.5px)":"none" }} />
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile overlay */}
      <div className={`mob-ov ${menuOpen?"":"off"}`} onClick={() => setMenuOpen(false)} />

      {/* Mobile drawer */}
      <div className={`mob-drw ${menuOpen?"":"shut"}`}>
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"14px 16px 12px", borderBottom:"1px solid #EBEBEB" }}>
          <div style={{ display:"flex", alignItems:"center", gap:10 }}>
            <div style={{ width:34, height:34, background:"#DA291C", borderRadius:7, display:"flex", alignItems:"center", justifyContent:"center" }}>
              <span style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:19, fontWeight:900, color:"#FFC72C", lineHeight:1 }}>M</span>
            </div>
            <div style={{ fontSize:13, fontWeight:800, color:"#1A1A1A", fontFamily:"'Outfit',sans-serif" }}>McDonald&apos;s India</div>
          </div>
          <button onClick={() => setMenuOpen(false)} style={{ width:30, height:30, display:"flex", alignItems:"center", justifyContent:"center", borderRadius:7, border:"1.5px solid #E8E8E8", background:"#fff", cursor:"pointer", color:"#888" }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
          </button>
        </div>

        <nav style={{ flex:1, overflowY:"auto", padding:"10px 8px" }}>
          <div>
            <button className={`mml ${activeSection==="menu"?"act":""}`} onClick={() => { setMenuOpen(false); pathname==="/"?smoothScroll("menu"):window.location.href="/#menu"; }}>Menu</button>
            <div style={{ display:"flex", flexDirection:"column", gap:1, marginBottom:6 }}>
              {MENU_DROPDOWN.map(d => <Link key={d.href} href={d.href} onClick={() => setMenuOpen(false)} className="msub">{d.label}</Link>)}
            </div>
          </div>
          <Link href="/outlets" onClick={() => setMenuOpen(false)} className={`mml ${pathname==="/outlets"?"act":""}`}>Restaurants</Link>
          <button className={`mml ${activeSection==="mcdelivery"?"act":""}`} onClick={() => { setMenuOpen(false); pathname==="/"?smoothScroll("mcdelivery"):window.location.href="/#mcdelivery"; }}>McDelivery</button>
          <button className={`mml ${activeSection==="news"?"act":""}`} onClick={() => { setMenuOpen(false); pathname==="/"?smoothScroll("news"):window.location.href="/#news"; }}>News</button>
          <Link href="/birthday" onClick={() => setMenuOpen(false)} className={`mml ${pathname==="/birthday"?"act":""}`}>Birthday Party</Link>
          <Link href="/careers" onClick={() => setMenuOpen(false)} className={`mml ${pathname==="/careers"?"act":""}`}>Careers</Link>
        </nav>

        <div style={{ padding:"12px 8px", borderTop:"1px solid #EBEBEB" }}>
          {session ? (
            <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"11px 14px", borderRadius:12, background:"#F5F5F5", border:"1.5px solid #E8E8E8" }}>
              <span style={{ fontSize:13, fontWeight:700, color:"#1A1A1A", fontFamily:"'Outfit',sans-serif" }}>{session.user?.name}</span>
              <button onClick={() => signOut({ callbackUrl:"/" })} style={{ padding:"5px 12px", background:"#DA291C", border:"none", borderRadius:18, color:"#fff", fontSize:11, fontWeight:800, cursor:"pointer", fontFamily:"'Outfit',sans-serif" }}>LOGOUT</button>
            </div>
          ) : (
            <Link href="/login" onClick={() => setMenuOpen(false)} style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:8, width:"100%", padding:"12px", borderRadius:22, background:"#DA291C", color:"#fff", fontSize:13, fontWeight:800, textDecoration:"none", fontFamily:"'Outfit',sans-serif" }}>
              Sign In / Register
            </Link>
          )}
        </div>
      </div>
    </>
  );
}