"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { useSession, signOut } from "next-auth/react";

const navLinks = [
  { href: "/",        label: "Home",    icon: "🏠" },
  { href: "/menu",    label: "Menu",    icon: "🍔" },
  { href: "/outlets", label: "Outlets", icon: "📍" },
];

export default function Navbar() {
  const pathname  = usePathname();
  const [mode, setMode]         = useState<"delivery" | "dine-in">("delivery");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { totalItems: cartCount } = useCart();
  const { data: session } = useSession();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* lock body scroll when mobile menu is open */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      {/* ─────────── MAIN NAVBAR ─────────── */}
      <header
        id="main-navbar"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-[#111111]/96 backdrop-blur-xl shadow-2xl shadow-black/40 border-b border-white/5"
            : "bg-[#141414] border-b border-white/6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="flex items-center justify-between h-[68px]">

            {/* ── Logo ── */}
            <Link href="/" id="navbar-logo" className="flex items-center gap-3 group flex-shrink-0">
              {/* Golden arch emblem */}
              <div className="relative w-11 h-11 flex items-center justify-center rounded-2xl overflow-hidden shadow-lg group-hover:scale-105 transition-transform duration-300"
                style={{ background: "linear-gradient(135deg, #FFC72C 0%, #FFB800 100%)" }}>
                <span
                  className="font-black text-[#DA291C] text-3xl leading-none select-none"
                  style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "-1px" }}
                >
                  M
                </span>
                {/* shine overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/25 to-transparent pointer-events-none" />
              </div>

              {/* Brand text */}
              <div className="flex flex-col leading-none gap-[2px]">
                <span className="text-white font-bold text-[15px] tracking-tight">
                  McDonald&apos;s
                </span>
                <span
                  className="text-[11px] font-bold tracking-[0.22em] uppercase"
                  style={{ color: "#FFC72C" }}
                >
                  India
                </span>
              </div>
            </Link>

            {/* ── Desktop Nav Links ── */}
            <nav className="hidden md:flex items-center gap-1" aria-label="Primary navigation">
              {navLinks.map((link) => {
                const active = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    id={`nav-link-${link.label.toLowerCase()}`}
                    className={`relative px-5 py-2 rounded-xl text-sm font-semibold transition-all duration-200 group ${
                      active
                        ? "text-[#1A1A1A]"
                        : "text-[#9A9AA8] hover:text-white"
                    }`}
                  >
                    {/* active background pill */}
                    {active && (
                      <span
                        className="absolute inset-0 rounded-xl -z-0"
                        style={{ background: "linear-gradient(135deg, #FFC72C, #FFB800)" }}
                      />
                    )}
                    {/* hover ghost */}
                    {!active && (
                      <span className="absolute inset-0 rounded-xl bg-white/0 group-hover:bg-white/6 transition-colors duration-200 -z-0" />
                    )}
                    <span className="relative z-10">{link.label}</span>
                  </Link>
                );
              })}
            </nav>

            {/* ── Right Controls ── */}
            <div className="flex items-center gap-2.5">

              {/* Delivery / Dine-In Toggle — desktop only */}
              <div
                id="mode-toggle"
                className="hidden lg:flex items-center bg-[#1E1E1E] rounded-full p-1 border border-white/8 gap-0.5"
                role="group"
                aria-label="Order mode"
              >
                {(["delivery", "dine-in"] as const).map((m) => (
                  <button
                    key={m}
                    id={`toggle-${m}`}
                    onClick={() => setMode(m)}
                    aria-pressed={mode === m}
                    className={`px-3.5 py-1.5 rounded-full text-[11px] font-bold tracking-wide transition-all duration-250 whitespace-nowrap ${
                      mode === m
                        ? "text-[#1A1A1A] shadow-sm"
                        : "text-[#6B6B78] hover:text-[#A1A1AA]"
                    }`}
                    style={mode === m ? { background: "linear-gradient(135deg,#FFC72C,#FFB800)" } : {}}
                  >
                    {m === "delivery" ? "🛵  Delivery" : "🍽  Dine-In"}
                  </button>
                ))}
              </div>

              {/* Auth Button */}
              {session ? (
                <div className="hidden lg:flex items-center gap-3 bg-[#1E1E1E] rounded-xl px-4 py-2 border border-white/8">
                  <span className="text-white text-xs font-bold truncate max-w-[100px]">Hi, {session.user?.name?.split(' ')[0] || 'User'}</span>
                  <button onClick={() => signOut()} className="text-[#DA291C] text-xs font-black tracking-wider hover:text-white transition-colors">
                    LOGOUT
                  </button>
                </div>
              ) : (
                <Link href="/login" className="hidden lg:flex items-center gap-2 bg-[#DA291C] hover:bg-[#b52018] rounded-xl px-4 py-2.5 transition-colors">
                  <span className="text-white text-[11px] font-black tracking-widest leading-none">LOGIN</span>
                </Link>
              )}

              {/* Cart */}
              <Link
                href="/cart"
                id="cart-button"
                aria-label={`Cart with ${cartCount} items`}
                className="relative flex items-center justify-center w-10 h-10 rounded-xl border transition-all duration-200 group"
                style={{ background: "#1E1E1E", borderColor: "rgba(255,255,255,0.09)" }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-[18px] h-[18px] text-[#8A8A96] group-hover:text-[#FFC72C] transition-colors duration-200"
                >
                  <circle cx="9" cy="21" r="1" />
                  <circle cx="20" cy="21" r="1" />
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                </svg>
                {cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 min-w-[18px] h-[18px] px-0.5 bg-[#DA291C] text-white text-[10px] font-black rounded-full flex items-center justify-center leading-none shadow-md">
                    {cartCount}
                  </span>
                )}
              </Link>

              {/* Mobile Hamburger */}
              <button
                id="mobile-menu-btn"
                onClick={() => setMenuOpen(!menuOpen)}
                aria-expanded={menuOpen}
                aria-label="Toggle mobile menu"
                className="md:hidden relative flex items-center justify-center w-10 h-10 rounded-xl border transition-all duration-200"
                style={{ background: "#1E1E1E", borderColor: menuOpen ? "rgba(255,199,44,0.4)" : "rgba(255,255,255,0.09)" }}
              >
                <div className="w-[18px] flex flex-col gap-[5px]">
                  <span className={`block h-[2px] rounded-full bg-white transition-all duration-300 origin-center ${menuOpen ? "rotate-45 translate-y-[7px]" : ""}`} />
                  <span className={`block h-[2px] rounded-full bg-white transition-all duration-300 ${menuOpen ? "opacity-0 scale-x-0" : ""}`} />
                  <span className={`block h-[2px] rounded-full bg-white transition-all duration-300 origin-center ${menuOpen ? "-rotate-45 -translate-y-[7px]" : ""}`} />
                </div>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ─────────── MOBILE DRAWER OVERLAY ─────────── */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-all duration-300 ${
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        style={{ background: "rgba(0,0,0,0.65)", backdropFilter: "blur(4px)" }}
        onClick={() => setMenuOpen(false)}
      />

      {/* ─────────── MOBILE DRAWER PANEL ─────────── */}
      <div
        id="mobile-menu"
        className={`fixed top-0 right-0 h-full w-[280px] z-50 md:hidden flex flex-col transition-transform duration-350 ease-out ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
        style={{ background: "#161616", borderLeft: "1px solid rgba(255,255,255,0.07)" }}
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between px-5 pt-5 pb-4 border-b border-white/6">
          <div className="flex items-center gap-2.5">
            <div
              className="w-9 h-9 flex items-center justify-center rounded-xl shadow"
              style={{ background: "linear-gradient(135deg,#FFC72C,#FFB800)" }}
            >
              <span className="font-black text-[#DA291C] text-xl" style={{ fontFamily: "'Bebas Neue',sans-serif" }}>M</span>
            </div>
            <span className="text-white font-bold text-sm">McDonald&apos;s India</span>
          </div>
          <button
            onClick={() => setMenuOpen(false)}
            className="w-8 h-8 flex items-center justify-center rounded-lg text-[#6B6B78] hover:text-white hover:bg-white/8 transition-colors"
            aria-label="Close menu"
          >
            ✕
          </button>
        </div>

        {/* Nav links */}
        <nav className="flex flex-col gap-1 p-4 flex-1">
          {navLinks.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`flex items-center gap-3 px-4 py-3.5 rounded-2xl text-sm font-semibold transition-all duration-200 ${
                  active
                    ? "text-[#1A1A1A]"
                    : "text-[#8A8A96] hover:text-white hover:bg-white/5"
                }`}
                style={active ? { background: "linear-gradient(135deg,#FFC72C,#FFB800)" } : {}}
              >
                <span className="text-base">{link.icon}</span>
                {link.label}
              </Link>
            );
          })}

          {/* Auth Button in Drawer */}
          {session ? (
            <div className="mt-4 p-4 rounded-2xl flex justify-between items-center" style={{ background: "#1E1E1E" }}>
              <span className="text-white text-sm font-bold truncate">Hi, {session.user?.name}</span>
              <button onClick={() => signOut({ callbackUrl: '/' })} className="text-[#DA291C] text-sm font-black tracking-wider hover:text-white transition-colors">
                LOGOUT
              </button>
            </div>
          ) : (
            <Link href="/login" onClick={() => setMenuOpen(false)} className="mt-4 flex items-center justify-center gap-2 w-full py-3.5 rounded-2xl text-sm font-bold text-white bg-[#DA291C] transition-all duration-200 shadow-lg">
              👤 LOGIN / SIGN UP
            </Link>
          )}

          {/* Mode toggle in drawer */}
          <div className="mt-3 p-1 rounded-2xl flex gap-1" style={{ background: "#1E1E1E" }}>
            {(["delivery", "dine-in"] as const).map((m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={`flex-1 py-2.5 rounded-xl text-xs font-bold capitalize transition-all duration-200 ${
                  mode === m ? "text-[#1A1A1A]" : "text-[#6B6B78] hover:text-[#9A9AA8]"
                }`}
                style={mode === m ? { background: "linear-gradient(135deg,#FFC72C,#FFB800)" } : {}}
              >
                {m === "delivery" ? "🛵  Delivery" : "🍽  Dine-In"}
              </button>
            ))}
          </div>
        </nav>

        {/* Drawer footer */}
        <div className="p-4 border-t border-white/6">
          <Link
            href="/cart"
            onClick={() => setMenuOpen(false)}
            className="flex items-center justify-center gap-2 w-full py-3 rounded-2xl text-sm font-bold text-[#1A1A1A] transition-all duration-200 hover:opacity-90"
            style={{ background: "linear-gradient(135deg,#FFC72C,#FFB800)" }}
          >
            🛒 View Cart {cartCount > 0 && `(${cartCount})`}
          </Link>
        </div>
      </div>
    </>
  );
}
