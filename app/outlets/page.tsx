import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Outlets — McDonald's India",
  description: "Find a McDonald's India outlet near you for dine-in or takeaway.",
};

const OUTLETS = [
  { id: "mcd-connaught",   city: "New Delhi",  name: "Connaught Place",  address: "Block A, CP, New Delhi 110001", hours: "7AM – 12AM", dineIn: true,  delivery: true  },
  { id: "mcd-bandra",      city: "Mumbai",     name: "Bandra West",      address: "Linking Road, Bandra W, Mumbai 400050", hours: "8AM – 1AM",  dineIn: true,  delivery: true  },
  { id: "mcd-koramangala", city: "Bengaluru",  name: "Koramangala",      address: "5th Block, Koramangala, Bengaluru 560095", hours: "7AM – 12AM", dineIn: true,  delivery: true  },
  { id: "mcd-anna-nagar",  city: "Chennai",    name: "Anna Nagar",       address: "2nd Ave, Anna Nagar, Chennai 600040",      hours: "8AM – 11PM", dineIn: true,  delivery: false },
  { id: "mcd-salt-lake",   city: "Kolkata",    name: "Salt Lake Sector V",address: "Sector V, Salt Lake, Kolkata 700091",      hours: "9AM – 11PM", dineIn: false, delivery: true  },
  { id: "mcd-jubilee",     city: "Hyderabad",  name: "Jubilee Hills",    address: "Road No. 36, Jubilee Hills, Hyderabad 500033", hours: "8AM – 12AM", dineIn: true,  delivery: true  },
];

export default function OutletsPage() {
  return (
    <div className="min-h-screen px-4 py-12 max-w-7xl mx-auto page-enter">
      <div className="text-center mb-12">
        <p className="text-[#FFC72C] text-xs font-semibold tracking-[0.3em] uppercase mb-3">Near You</p>
        <h1 className="font-display text-5xl sm:text-7xl text-white" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
          Our Outlets
        </h1>
        <p className="text-[#A1A1AA] mt-3 text-base">Find your nearest McDonald's across India.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {OUTLETS.map((outlet) => (
          <div
            key={outlet.id}
            id={outlet.id}
            className="glass rounded-2xl p-6 hover:border-[#FFC72C]/30 transition-all duration-300 hover:-translate-y-1 group"
          >
            {/* City Badge */}
            <span className="inline-block px-2.5 py-1 bg-[#FFC72C]/10 text-[#FFC72C] text-[10px] font-bold tracking-widest uppercase rounded-lg mb-3">
              {outlet.city}
            </span>

            <h2 className="text-white font-bold text-lg mb-1 group-hover:text-[#FFC72C] transition-colors">
              {outlet.name}
            </h2>
            <p className="text-[#A1A1AA] text-sm mb-3">{outlet.address}</p>

            {/* Hours */}
            <div className="flex items-center gap-1.5 text-[#A1A1AA] text-xs mb-4">
              <span>🕐</span>
              <span>{outlet.hours}</span>
            </div>

            {/* Service Badges */}
            <div className="flex gap-2 mb-4">
              {outlet.dineIn && (
                <span className="px-2 py-1 bg-[#27AE60]/15 text-[#27AE60] text-[10px] font-semibold rounded-md">🍽️ Dine-In</span>
              )}
              {outlet.delivery && (
                <span className="px-2 py-1 bg-[#FFC72C]/10 text-[#FFC72C] text-[10px] font-semibold rounded-md">🛵 Delivery</span>
              )}
            </div>

            <button
              className="w-full py-2.5 rounded-xl bg-white/5 text-white text-sm font-medium hover:bg-[#FFC72C] hover:text-[#1A1A1A] transition-all duration-200"
            >
              Get Directions →
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
