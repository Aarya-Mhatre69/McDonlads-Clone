export default function OutletsLoading() {
  return (
    <div style={{ minHeight: "100vh", background: "#FAFAFA", fontFamily: "'Outfit',sans-serif" }}>
      {/* Header skeleton */}
      <div style={{ background: "#fff", borderBottom: "1px solid #EBEBEB", padding: "80px 48px 40px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ height: 80, width: "45%", borderRadius: 12, background: "linear-gradient(90deg,#F0F0F0 25%,#E8E8E8 50%,#F0F0F0 75%)", backgroundSize: "200% 100%", animation: "shimmer 1.5s infinite", marginBottom: 16 }} />
          <div style={{ height: 18, width: "50%", borderRadius: 8, background: "#F0F0F0", marginBottom: 12 }} />
          <div style={{ display: "flex", gap: 10 }}>
            {[90, 80, 88, 120].map((w, i) => (
              <div key={i} style={{ height: 34, width: w, borderRadius: 99, background: "#F5F5F5" }} />
            ))}
          </div>
        </div>
      </div>

      {/* Controls bar skeleton */}
      <div style={{ background: "#fff", borderBottom: "1px solid #EBEBEB", padding: "14px 48px", display: "flex", gap: 14 }}>
        <div style={{ height: 38, width: 240, borderRadius: 24, background: "#F0F0F0" }} />
        <div style={{ height: 38, width: 120, borderRadius: 99, background: "#F0F0F0", marginLeft: "auto" }} />
        {[80, 80, 90].map((w, i) => (
          <div key={i} style={{ height: 38, width: w, borderRadius: 22, background: "#F0F0F0" }} />
        ))}
      </div>

      {/* Outlet grid skeleton */}
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "40px 48px 80px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))", gap: 22 }}>
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} style={{ background: "#fff", borderRadius: 16, overflow: "hidden", border: "1px solid #EBEBEB" }}>
              <div style={{ height: 3, background: "linear-gradient(90deg,#DA291C,#FFC72C)" }} />
              <div style={{ height: 160, background: "linear-gradient(90deg,#F5F5F5 25%,#EEEEEE 50%,#F5F5F5 75%)", backgroundSize: "200% 100%", animation: `shimmer 1.5s ${i * 0.12}s infinite` }} />
              <div style={{ padding: "16px 18px 18px", display: "flex", flexDirection: "column", gap: 10 }}>
                <div style={{ height: 14, width: "40%", borderRadius: 6, background: "#F0F0F0" }} />
                <div style={{ height: 18, width: "70%", borderRadius: 6, background: "#F0F0F0" }} />
                <div style={{ height: 14, width: "90%", borderRadius: 6, background: "#F5F5F5" }} />
                <div style={{ height: 14, width: "55%", borderRadius: 6, background: "#F5F5F5" }} />
                <div style={{ display: "flex", gap: 8 }}>
                  <div style={{ height: 24, width: 80, borderRadius: 99, background: "#F0F0F0" }} />
                  <div style={{ height: 24, width: 88, borderRadius: 99, background: "#F0F0F0" }} />
                </div>
                <div style={{ height: 1, background: "#F0F0F0" }} />
                <div style={{ display: "flex", gap: 8 }}>
                  <div style={{ height: 36, width: 100, borderRadius: 22, background: "#F0F0F0" }} />
                  <div style={{ height: 36, width: 90, borderRadius: 22, background: "#FFEFED" }} />
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
