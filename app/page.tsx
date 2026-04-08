import LocationBar from "@/components/LocationBar";
import OutletList from "@/components/OutletList";

export default function HomePage() {
  return (
    <div className="page-enter">
      {/* ── Hero Section ── */}
      <section
        className="min-h-[90vh] flex flex-col items-center justify-center text-center px-4 relative overflow-hidden"
        aria-label="Hero"
      >
        {/* Background ambient glow */}
        <div className="absolute inset-0 -z-10 blur-3xl opacity-15 bg-[#FFC72C] rounded-full scale-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

        <div className="relative max-w-4xl mx-auto">
          <p className="text-[#FFC72C] text-sm font-semibold tracking-[0.3em] uppercase mb-4">
            Welcome to McDonald's India
          </p>

          <h1
            className="font-display text-7xl sm:text-9xl text-white leading-none mb-6"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            Taste The{" "}
            <span className="text-gradient">Fusion</span>
          </h1>

          <p className="text-[#A1A1AA] text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            Authentic Indian flavours meet McDonald's magic. From McAloo Tikki to McSpicy Paneer —
            crafted exclusively for India's taste buds.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/menu"
              id="hero-cta-menu"
              className="px-8 py-4 bg-[#FFC72C] text-[#1A1A1A] font-bold text-base rounded-2xl hover:bg-[#e6b300] transition-all duration-200 hover:scale-105 glow-yellow"
            >
              Explore Menu →
            </a>
            <a
              href="/outlets"
              id="hero-cta-outlets"
              className="px-8 py-4 bg-white/8 text-white font-semibold text-base rounded-2xl border border-white/12 hover:bg-white/12 hover:border-white/20 transition-all duration-200"
            >
              Find Outlet
            </a>
          </div>
        </div>

        {/* Feature Chips */}
        <div className="flex flex-wrap justify-center gap-3 mt-16">
          {[
            { icon: "🥔", label: "McAloo Tikki" },
            { icon: "🌶️", label: "McSpicy Paneer" },
            { icon: "🍟", label: "Masala Fries" },
            { icon: "🥤", label: "Mango Smoothie" },
            { icon: "🥗", label: "Piri Piri Wrap" },
          ].map((item) => (
            <div
              key={item.label}
              className="glass px-4 py-2.5 rounded-full flex items-center gap-2 text-sm text-[#A1A1AA] hover:text-white hover:border-[#FFC72C]/30 transition-all duration-200 cursor-pointer"
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Location + Outlets Section ── */}
      <div style={{ background: "#f5f5f5", borderTop: "3px solid #FFC72C", paddingBottom: "80px" }}>
        {/* Location bar */}
        <LocationBar />

        {/* Outlet list */}
        <OutletList />
      </div>
    </div>
  );
}
