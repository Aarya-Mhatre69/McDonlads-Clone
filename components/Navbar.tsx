"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/",       label: "Home"    },
  { href: "/menu",   label: "Menu"    },
  { href: "/outlets",label: "Outlets" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mode, setMode]           = useState<"delivery" | "dine-in">("delivery");
  const [cartCount, setCartCount] = useState(0);
  const [scrolled, setScrolled]   = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#1A1A1A]/95 backdrop-blur-md shadow-lg shadow-black/30"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">

          {/* ── Logo ── */}
          <Link href="/" id="navbar-logo" className="flex items-center gap-2 group">
            <div className="relative w-10 h-10 flex items-center justify-center bg-[#FFC72C] rounded-xl shadow-md group-hover:scale-110 transition-transform duration-200">
              <span className="font-bold text-[#DA291C] text-2xl leading-none" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                M
              </span>
            </div>
            <div className="hidden sm:flex flex-col leading-none">
              <span className="text-white font-bold text-base tracking-tight">McDonald's</span>
              <span className="text-[#FFC72C] text-[10px] font-semibold tracking-widest uppercase">India</span>
            </div>
          </Link>

          {/* ── Desktop Nav Links ── */}
          <nav className="hidden md:flex items-center gap-1" aria-label="Primary navigation">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                id={`nav-link-${link.label.toLowerCase()}`}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  pathname === link.href
                    ? "bg-[#FFC72C] text-[#1A1A1A]"
                    : "text-[#A1A1AA] hover:text-white hover:bg-white/8"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* ── Right Controls ── */}
          <div className="flex items-center gap-3">

            {/* Delivery / Dine-In Toggle */}
            <div
              id="mode-toggle"
              className="hidden sm:flex items-center bg-[#27272A] rounded-full p-1 gap-1 border border-white/8"
              role="group"
              aria-label="Order mode"
            >
              {(["delivery", "dine-in"] as const).map((m) => (
                <button
                  key={m}
                  id={`toggle-${m}`}
                  onClick={() => setMode(m)}
                  aria-pressed={mode === m}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all duration-200 capitalize ${
                    mode === m
                      ? "bg-[#FFC72C] text-[#1A1A1A] shadow-sm"
                      : "text-[#A1A1AA] hover:text-white"
                  }`}
                >
                  {m === "delivery" ? "🛵 Delivery" : "🍽️ Dine-In"}
                </button>
              ))}
            </div>

            {/* Cart */}
            <Link
              href="/cart"
              id="cart-button"
              aria-label={`Cart with ${cartCount} items`}
              className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-[#27272A] border border-white/8 hover:border-[#FFC72C]/40 hover:bg-[#FFC72C]/10 transition-all duration-200 group"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-5 h-5 text-[#A1A1AA] group-hover:text-[#FFC72C] transition-colors duration-200"
              >
                <circle cx="9" cy="21" r="1" />
                <circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#DA291C] text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-bounce">
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
              className="md:hidden flex items-center justify-center w-10 h-10 rounded-xl bg-[#27272A] border border-white/8 transition-colors duration-200 hover:border-[#FFC72C]/40"
            >
              <div className="w-5 flex flex-col gap-1">
                <span className={`block h-0.5 bg-white rounded transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-1.5" : ""}`} />
                <span className={`block h-0.5 bg-white rounded transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
                <span className={`block h-0.5 bg-white rounded transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-1.5" : ""}`} />
              </div>
            </button>
          </div>
        </div>

        {/* ── Mobile Menu ── */}
        <div
          id="mobile-menu"
          className={`md:hidden overflow-hidden transition-all duration-300 ${
            menuOpen ? "max-h-96 opacity-100 pb-4" : "max-h-0 opacity-0"
          }`}
        >
          <div className="bg-[#1E1E1E] rounded-2xl p-4 mt-1 border border-white/8 flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                  pathname === link.href
                    ? "bg-[#FFC72C] text-[#1A1A1A]"
                    : "text-[#A1A1AA] hover:text-white hover:bg-white/5"
                }`}
              >
                {link.label}
              </Link>
            ))}
            {/* Mobile Mode Toggle */}
            <div className="flex gap-2 mt-2">
              {(["delivery", "dine-in"] as const).map((m) => (
                <button
                  key={m}
                  onClick={() => setMode(m)}
                  className={`flex-1 py-2.5 rounded-xl text-xs font-semibold capitalize transition-all duration-200 ${
                    mode === m
                      ? "bg-[#FFC72C] text-[#1A1A1A]"
                      : "bg-white/5 text-[#A1A1AA]"
                  }`}
                >
                  {m === "delivery" ? "🛵 Delivery" : "🍽️ Dine-In"}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
