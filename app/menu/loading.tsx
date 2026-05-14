export default function MenuLoading() {
  return (
    <div style={{ minHeight: "100vh", background: "#FAFAFA", fontFamily: "'Outfit',sans-serif" }}>
      {/* Header skeleton */}
      <div style={{ background: "#fff", borderBottom: "3px solid #FFC72C", padding: "64px 64px 44px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ height: 72, width: "55%", borderRadius: 12, background: "linear-gradient(90deg,#F0F0F0 25%,#E8E8E8 50%,#F0F0F0 75%)", backgroundSize: "200% 100%", animation: "shimmer 1.5s infinite", marginBottom: 16 }} />
          <div style={{ height: 18, width: "36%", borderRadius: 8, background: "#F0F0F0", marginBottom: 28 }} />
          <div style={{ display: "flex", gap: 8 }}>
            {[120, 110, 100, 108, 90, 102].map((w, i) => (
              <div key={i} style={{ height: 38, width: w, borderRadius: 24, background: "#F0F0F0" }} />
            ))}
          </div>
        </div>
      </div>

      {/* Grid skeleton */}
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "36px 64px 80px" }}>
        {/* Filter pills skeleton */}
        <div style={{ display: "flex", gap: 8, justifyContent: "center", marginBottom: 24 }}>
          {[80, 60, 72, 56].map((w, i) => (
            <div key={i} style={{ height: 38, width: w, borderRadius: 99, background: "#F0F0F0" }} />
          ))}
        </div>

        {/* Cards skeleton */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(290px,1fr))", gap: 22 }}>
          {Array.from({ length: 9 }).map((_, i) => (
            <div key={i} style={{ background: "#fff", borderRadius: 18, overflow: "hidden", border: "1px solid #EBEBEB", boxShadow: "0 2px 10px rgba(0,0,0,0.05)" }}>
              <div style={{ height: 210, background: "linear-gradient(90deg,#F5F5F5 25%,#EEEEEE 50%,#F5F5F5 75%)", backgroundSize: "200% 100%", animation: `shimmer 1.5s ${i * 0.1}s infinite` }} />
              <div style={{ padding: 16, display: "flex", flexDirection: "column", gap: 10 }}>
                <div style={{ height: 20, width: "70%", borderRadius: 6, background: "#F0F0F0" }} />
                <div style={{ height: 14, width: "90%", borderRadius: 6, background: "#F5F5F5" }} />
                <div style={{ height: 14, width: "60%", borderRadius: 6, background: "#F5F5F5" }} />
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 8, paddingTop: 10, borderTop: "1px solid #F0F0F0" }}>
                  <div style={{ height: 28, width: 60, borderRadius: 6, background: "#F0F0F0" }} />
                  <div style={{ height: 36, width: 90, borderRadius: 10, background: "#FFEFED" }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes shimmer {
          0%   { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
    </div>
  );
}
