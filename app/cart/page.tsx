"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function CartPage() {
  const { items, totalItems, totalPrice, increment, decrement, removeItem, clear } = useCart();

  const gst    = Math.round(totalPrice * 0.05);
  const total  = totalPrice + gst;
  const isFreeDelivery = totalPrice >= 299;

  return (
    <div style={{ minHeight:"100vh", background:"#FAFAFA", fontFamily:"'Outfit',sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800;900&family=Barlow+Condensed:ital,wght@0,700;0,800;0,900;1,800&display=swap');

        @keyframes fadeUp { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
        @keyframes slideIn { from{opacity:0;transform:translateX(-10px)} to{opacity:1;transform:translateX(0)} }

        .cart-item-row {
          display: flex;
          align-items: center;
          gap: 16px;
          background: #fff;
          border: 1px solid #EBEBEB;
          border-radius: 14px;
          padding: 14px 16px;
          transition: box-shadow 0.2s, border-color 0.2s;
          animation: slideIn 0.4s cubic-bezier(0.16,1,0.3,1) both;
        }
        .cart-item-row:hover { box-shadow: 0 4px 20px rgba(0,0,0,0.07); border-color: #FFC72C; }

        .qty-btn {
          width: 30px; height: 30px;
          border-radius: 8px;
          border: 1.5px solid #E8E8E8;
          background: #fff;
          color: #1A1A1A;
          font-size: 16px;
          font-weight: 700;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.15s;
          font-family: 'Outfit', sans-serif;
          flex-shrink: 0;
        }
        .qty-btn:hover { background: #DA291C; color: #fff; border-color: #DA291C; }

        .remove-btn {
          background: none;
          border: none;
          cursor: pointer;
          color: #CCC;
          padding: 4px;
          border-radius: 6px;
          transition: color 0.18s, background 0.18s;
          display: flex;
          align-items: center;
          flex-shrink: 0;
        }
        .remove-btn:hover { color: #DA291C; background: rgba(218,41,28,0.07); }

        .checkout-btn {
          width: 100%;
          padding: 16px;
          background: #DA291C;
          color: #fff;
          font-size: 14px;
          font-weight: 900;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          border: none;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.2s;
          font-family: 'Outfit', sans-serif;
          position: relative;
          overflow: hidden;
        }
        .checkout-btn:hover { background: #b52018; transform: scale(1.01); box-shadow: 0 6px 24px rgba(218,41,28,0.3); }
        .checkout-btn::after { content:''; position:absolute; inset:0; background:linear-gradient(90deg,transparent,rgba(255,255,255,0.12),transparent); transform:translateX(-100%); transition:transform 0.5s; }
        .checkout-btn:hover::after { transform:translateX(100%); }

        .clear-btn {
          padding: 6px 14px;
          border: 1.5px solid rgba(218,41,28,0.25);
          border-radius: 8px;
          background: rgba(218,41,28,0.05);
          color: #DA291C;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 0.18s;
          font-family: 'Outfit', sans-serif;
        }
        .clear-btn:hover { background: #DA291C; color: #fff; }

        .coupon-input {
          flex: 1;
          padding: 11px 14px;
          border: 1.5px solid #E8E8E8;
          border-right: none;
          border-radius: 10px 0 0 10px;
          font-size: 13px;
          outline: none;
          font-family: 'Outfit', sans-serif;
          background: #fff;
          transition: border-color 0.2s;
        }
        .coupon-input:focus { border-color: #FFC72C; }
        .coupon-input::placeholder { color: #BBBBBB; }
        .coupon-apply {
          padding: 11px 20px;
          background: #FFC72C;
          color: #1A1A1A;
          font-size: 12px;
          font-weight: 900;
          letter-spacing: 0.08em;
          border: 1.5px solid #FFC72C;
          border-radius: 0 10px 10px 0;
          cursor: pointer;
          font-family: 'Outfit', sans-serif;
          transition: background 0.18s;
        }
        .coupon-apply:hover { background: #FFD54F; }

        .benefit-chip {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
          background: #fff;
          border: 1px solid #EBEBEB;
          border-radius: 12px;
          padding: 16px 20px;
          flex: 1;
          transition: border-color 0.2s;
        }
        .benefit-chip:hover { border-color: #FFC72C; }
        .benefit-chip-icon { font-size: 22px; }
        .benefit-chip-label { font-size: 11px; font-weight: 700; color: #666; text-align: center; letter-spacing: 0.04em; font-family: 'Outfit', sans-serif; }
      `}</style>

      {/* ── PAGE HEADER ── */}
      <div style={{ background:"#fff", borderBottom:"1px solid #EBEBEB", padding:"60px 32px 36px", position:"relative", overflow:"hidden" }}>
        {/* Background M */}
        <div aria-hidden="true" style={{ position:"absolute", right:-10, top:"50%", transform:"translateY(-50%)", fontFamily:"'Barlow Condensed',sans-serif", fontSize:"clamp(160px,22vw,340px)", fontWeight:900, fontStyle:"italic", color:"rgba(255,199,44,0.07)", lineHeight:1, userSelect:"none", pointerEvents:"none" }}>CART</div>

        <div style={{ maxWidth:900, margin:"0 auto", position:"relative", zIndex:1 }}>
          <p style={{ color:"#DA291C", fontSize:10, fontWeight:800, letterSpacing:"0.25em", textTransform:"uppercase", marginBottom:10, fontFamily:"'Outfit',sans-serif" }}>Your Order</p>
          <div style={{ display:"flex", alignItems:"center", gap:14, flexWrap:"wrap" }}>
            <h1 style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:"clamp(48px,7vw,80px)", fontWeight:900, fontStyle:"italic", color:"#1A1A1A", lineHeight:1, letterSpacing:"-0.02em" }}>My Cart</h1>
            {totalItems > 0 && (
              <div style={{ display:"flex", alignItems:"center", justifyContent:"center", background:"#DA291C", color:"#fff", fontFamily:"'Barlow Condensed',sans-serif", fontSize:28, fontWeight:900, width:48, height:48, borderRadius:"50%", boxShadow:"0 4px 16px rgba(218,41,28,0.35)" }}>
                {totalItems}
              </div>
            )}
          </div>
          {totalItems > 0 && (
            <p style={{ color:"#888", fontSize:14, marginTop:8, fontFamily:"'Outfit',sans-serif" }}>
              {totalItems} item{totalItems!==1?"s":""} · ₹{totalPrice.toLocaleString("en-IN")} subtotal
            </p>
          )}
        </div>
      </div>

      {/* ── CONTENT ── */}
      <div style={{ maxWidth:900, margin:"0 auto", padding:"32px 32px 80px" }}>

        {/* EMPTY STATE */}
        {items.length === 0 ? (
          <div style={{ background:"#fff", borderRadius:20, border:"1px solid #EBEBEB", padding:"64px 32px", display:"flex", flexDirection:"column", alignItems:"center", gap:16, textAlign:"center", marginTop:8 }}>
            {/* Illustration */}
            <div style={{ width:96, height:96, borderRadius:"50%", background:"linear-gradient(135deg,#FFF8E1,#FFF3CC)", border:"3px dashed #FFC72C", display:"flex", alignItems:"center", justifyContent:"center", marginBottom:8 }}>
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#FFC72C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4zM3 6h18M16 10a4 4 0 0 1-8 0"/>
              </svg>
            </div>
            <h2 style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:32, fontWeight:900, color:"#1A1A1A", letterSpacing:"-0.02em" }}>Your cart is empty</h2>
            <p style={{ fontSize:14, color:"#999", maxWidth:320, lineHeight:1.6, fontFamily:"'Outfit',sans-serif" }}>Looks like you haven&apos;t added anything yet. Our menu is waiting for you!</p>
            <Link href="/menu" style={{ display:"inline-flex", alignItems:"center", gap:8, marginTop:8, padding:"14px 32px", background:"#DA291C", color:"#fff", borderRadius:12, fontSize:14, fontWeight:800, textDecoration:"none", letterSpacing:"0.04em", fontFamily:"'Outfit',sans-serif", transition:"all 0.2s", boxShadow:"0 4px 16px rgba(218,41,28,0.3)" }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.background="#b52018"; el.style.transform="scale(1.03)"; }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.background="#DA291C"; el.style.transform="scale(1)"; }}>
              Browse Menu
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </Link>

            {/* Benefits */}
            <div style={{ display:"flex", gap:12, marginTop:20, flexWrap:"wrap", justifyContent:"center", width:"100%", maxWidth:400 }}>
              {[{icon:"⚡",label:"Fast Delivery"},{icon:"🔥",label:"Always Fresh"},{icon:"📦",label:"Safe Packed"},{icon:"🎁",label:"Deals Daily"}].map(b => (
                <div key={b.label} className="benefit-chip">
                  <span className="benefit-chip-icon">{b.icon}</span>
                  <span className="benefit-chip-label">{b.label}</span>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div style={{ display:"grid", gridTemplateColumns:"1fr 360px", gap:24, alignItems:"start" }}>

            {/* Left — items */}
            <div>
              {/* Top action row */}
              <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:16 }}>
                <p style={{ fontSize:13, fontWeight:600, color:"#888", fontFamily:"'Outfit',sans-serif" }}>{totalItems} item{totalItems!==1?"s":""} in your order</p>
                <button className="clear-btn" onClick={clear}>Clear All</button>
              </div>

              {/* Delivery progress bar */}
              {!isFreeDelivery && (
                <div style={{ background:"#fff", border:"1px solid #EBEBEB", borderRadius:12, padding:"14px 18px", marginBottom:16, display:"flex", alignItems:"center", gap:14 }}>
                  <div style={{ flex:1 }}>
                    <div style={{ display:"flex", justifyContent:"space-between", marginBottom:7 }}>
                      <span style={{ fontSize:12, fontWeight:700, color:"#555", fontFamily:"'Outfit',sans-serif" }}>
                        Add ₹{299 - totalPrice} more for free delivery
                      </span>
                      <span style={{ fontSize:12, fontWeight:700, color:"#DA291C", fontFamily:"'Outfit',sans-serif" }}>₹299</span>
                    </div>
                    <div style={{ height:6, background:"#F0F0F0", borderRadius:3, overflow:"hidden" }}>
                      <div style={{ width:`${Math.min((totalPrice/299)*100,100)}%`, height:"100%", background:"linear-gradient(90deg,#FFC72C,#DA291C)", borderRadius:3, transition:"width 0.4s ease" }} />
                    </div>
                  </div>
                  <span style={{ fontSize:20 }}>🛵</span>
                </div>
              )}
              {isFreeDelivery && (
                <div style={{ background:"rgba(34,197,94,0.07)", border:"1px solid rgba(34,197,94,0.22)", borderRadius:12, padding:"12px 18px", marginBottom:16, display:"flex", alignItems:"center", gap:10 }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round"><path d="M20 6L9 17l-5-5"/></svg>
                  <span style={{ fontSize:13, fontWeight:700, color:"#16a34a", fontFamily:"'Outfit',sans-serif" }}>You&apos;ve unlocked free delivery!</span>
                </div>
              )}

              {/* Item list */}
              <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
                {items.map((item, idx) => (
                  <div key={item.id} className="cart-item-row" style={{ animationDelay:`${idx*0.06}s` }}>
                    {/* Image */}
                    <div style={{ width:64, height:64, borderRadius:10, overflow:"hidden", flexShrink:0, background:"linear-gradient(135deg,#FFF8E1,#FFFDF5)", border:"1px solid #F0F0F0" }}>
                      {item.image ? (
                        <img src={item.image} alt={item.name} style={{ width:"100%", height:"100%", objectFit:"cover" }} />
                      ) : (
                        <div style={{ width:"100%", height:"100%", display:"flex", alignItems:"center", justifyContent:"center" }}>
                          <span style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:26, fontWeight:900, color:"#FFC72C" }}>M</span>
                        </div>
                      )}
                    </div>

                    {/* Info */}
                    <div style={{ flex:1, minWidth:0 }}>
                      <h3 style={{ fontSize:14, fontWeight:800, color:"#1A1A1A", fontFamily:"'Outfit',sans-serif", marginBottom:3, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{item.name}</h3>
                      <p style={{ fontSize:12, color:"#AAA", fontFamily:"'Outfit',sans-serif" }}>₹{item.price} each</p>
                    </div>

                    {/* Qty controls */}
                    <div style={{ display:"flex", alignItems:"center", gap:8, background:"#F8F8F8", borderRadius:10, padding:"4px 8px", flexShrink:0 }}>
                      <button className="qty-btn" onClick={() => decrement(item.id)} aria-label={`Decrease ${item.name}`}>−</button>
                      <span style={{ fontSize:15, fontWeight:900, color:"#1A1A1A", minWidth:22, textAlign:"center", fontFamily:"'Outfit',sans-serif" }}>{item.quantity}</span>
                      <button className="qty-btn" onClick={() => increment(item.id)} aria-label={`Increase ${item.name}`}>+</button>
                    </div>

                    {/* Line total */}
                    <div style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:22, fontWeight:900, color:"#1A1A1A", minWidth:64, textAlign:"right", letterSpacing:"-0.3px", flexShrink:0 }}>
                      ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                    </div>

                    {/* Remove */}
                    <button className="remove-btn" onClick={() => removeItem(item.id)} aria-label={`Remove ${item.name}`}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
                    </button>
                  </div>
                ))}
              </div>

              {/* Continue shopping */}
              <Link href="/menu" style={{ display:"inline-flex", alignItems:"center", gap:6, marginTop:16, fontSize:13, color:"#888", textDecoration:"none", fontFamily:"'Outfit',sans-serif", fontWeight:600, transition:"color 0.2s" }}
                onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.color="#DA291C"}
                onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.color="#888"}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
                Continue Shopping
              </Link>
            </div>

            {/* Right — summary */}
            <div style={{ display:"flex", flexDirection:"column", gap:16, position:"sticky", top:90 }}>

              {/* Coupon */}
              <div style={{ background:"#fff", borderRadius:16, border:"1px solid #EBEBEB", padding:"18px 18px" }}>
                <p style={{ fontSize:12, fontWeight:800, color:"#1A1A1A", letterSpacing:"0.08em", textTransform:"uppercase", marginBottom:12, fontFamily:"'Outfit',sans-serif" }}>Apply Coupon</p>
                <div style={{ display:"flex" }}>
                  <input className="coupon-input" type="text" placeholder="Enter coupon code" />
                  <button className="coupon-apply">Apply</button>
                </div>
              </div>

              {/* Order Summary */}
              <div style={{ background:"#fff", borderRadius:16, border:"1px solid #EBEBEB", overflow:"hidden" }}>
                {/* Header */}
                <div style={{ background:"linear-gradient(135deg,#FFC72C,#FFD54F)", padding:"16px 20px" }}>
                  <h2 style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:22, fontWeight:900, color:"#1A1A1A", letterSpacing:"0.02em" }}>Order Summary</h2>
                </div>

                <div style={{ padding:"16px 20px 20px" }}>
                  {/* Rows */}
                  {[
                    { label:`Subtotal (${totalItems} items)`, value:`₹${totalPrice.toLocaleString("en-IN")}`, accent:false },
                    { label:"Delivery Fee", value:isFreeDelivery?"FREE":"₹49", accent:isFreeDelivery },
                    { label:"GST (5%)", value:`₹${gst.toLocaleString("en-IN")}`, accent:false },
                  ].map(row => (
                    <div key={row.label} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"7px 0", fontSize:13, fontFamily:"'Outfit',sans-serif" }}>
                      <span style={{ color:"#666" }}>{row.label}</span>
                      <span style={{ fontWeight:700, color:row.accent?"#22c55e":"#1A1A1A" }}>{row.value}</span>
                    </div>
                  ))}

                  <div style={{ height:1, background:"#F0F0F0", margin:"12px 0" }} />

                  {/* Total */}
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"baseline", marginBottom:18 }}>
                    <span style={{ fontFamily:"'Outfit',sans-serif", fontSize:15, fontWeight:800, color:"#1A1A1A" }}>Total</span>
                    <span style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:30, fontWeight:900, color:"#1A1A1A", letterSpacing:"-0.5px" }}>₹{total.toLocaleString("en-IN")}</span>
                  </div>

                  {/* Checkout */}
                  <button className="checkout-btn">Proceed to Checkout →</button>

                  {/* Trust badges */}
                  <div style={{ display:"flex", gap:8, marginTop:14, justifyContent:"center" }}>
                    {["🔒 Secure","💳 Safe Pay","✅ Verified"].map(b => (
                      <span key={b} style={{ fontSize:11, color:"#AAA", fontFamily:"'Outfit',sans-serif", fontWeight:500 }}>{b}</span>
                    ))}
                  </div>
                </div>
              </div>

              {/* What's popular */}
              <div style={{ background:"#fff", borderRadius:16, border:"1px solid #EBEBEB", padding:"16px 18px" }}>
                <p style={{ fontSize:11, fontWeight:800, color:"#1A1A1A", letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:12, fontFamily:"'Outfit',sans-serif" }}>Don&apos;t forget</p>
                {[{name:"Masala Fries",price:"₹109"},{name:"Soft Serve Cone",price:"₹35"},{name:"Masala Chai",price:"₹49"}].map(s => (
                  <div key={s.name} style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"8px 0", borderBottom:"1px solid #F5F5F5" }}>
                    <div style={{ display:"flex", alignItems:"center", gap:9 }}>
                      <div style={{ width:8, height:8, borderRadius:2, border:"1.5px solid #22c55e", display:"flex", alignItems:"center", justifyContent:"center" }}>
                        <div style={{ width:4, height:4, borderRadius:"50%", background:"#22c55e" }} />
                      </div>
                      <span style={{ fontSize:13, fontWeight:600, color:"#333", fontFamily:"'Outfit',sans-serif" }}>{s.name}</span>
                    </div>
                    <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                      <span style={{ fontSize:13, fontWeight:700, color:"#1A1A1A", fontFamily:"'Barlow Condensed',sans-serif" }}>{s.price}</span>
                      <Link href="/menu" style={{ width:24, height:24, borderRadius:6, background:"#FFC72C", color:"#111", fontSize:14, fontWeight:900, display:"flex", alignItems:"center", justifyContent:"center", textDecoration:"none", flexShrink:0 }}>+</Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}