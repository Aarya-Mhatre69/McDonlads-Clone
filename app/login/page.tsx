"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [email,    setEmail]    = useState("");
  const [password, setPassword] = useState("");
  const [loading,  setLoading]  = useState(false);
  const [error,    setError]    = useState("");
  const [showPass, setShowPass] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !password) { setError("Please fill in all fields."); return; }
    setLoading(true);
    setError("");
    try {
      const res = await signIn("credentials", { email, password, redirect: false });
      if (res?.error) { setError("Invalid email or password. Please try again."); }
      else { router.push("/"); }
    } catch { setError("Something went wrong. Please try again."); }
    finally { setLoading(false); }
  }

  return (
    <div style={{
      minHeight: "100vh",
      background: "#F5F5F5",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "20px",
      fontFamily: "'Outfit', sans-serif",
      position: "relative",
      overflow: "hidden",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800;900&family=Barlow+Condensed:ital,wght@0,700;0,800;0,900;1,800&display=swap');

        @keyframes fadeUp {
          from { opacity:0; transform:translateY(24px); }
          to   { opacity:1; transform:translateY(0); }
        }
        @keyframes shimmer {
          0%   { background-position:-400px 0; }
          100% { background-position: 400px 0; }
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        @keyframes confettiFall {
          0%   { transform: translateY(0) rotate(0deg); opacity: 1; }
          100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
        }

        .login-card { animation: fadeUp 0.55s cubic-bezier(0.16,1,0.3,1) forwards; }

        .login-input {
          width: 100%;
          padding: 14px 16px;
          border: 1.5px solid #E8E8E8;
          border-radius: 0;
          font-size: 15px;
          font-family: 'Outfit', sans-serif;
          background: #fff;
          color: #1A1A1A;
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .login-input:focus {
          border-color: #DA291C;
          box-shadow: 0 0 0 3px rgba(218,41,28,0.08);
          z-index: 1;
          position: relative;
        }
        .login-input::placeholder { color: #BBBBBB; }

        .login-label {
          display: block;
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 0.18em;
          color: #1A1A1A;
          padding: 12px 16px 8px;
          text-transform: uppercase;
          background: #fff;
          border-left: 1.5px solid #E8E8E8;
          border-right: 1.5px solid #E8E8E8;
          border-top: 1.5px solid #E8E8E8;
        }
        .login-label:first-of-type { border-radius: 0; }

        .field-group { position: relative; }
        .field-group + .field-group { margin-top: -1px; }

        .signin-btn {
          width: 100%;
          padding: 16px;
          background: #DA291C;
          color: #fff;
          font-size: 13px;
          font-weight: 900;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          border: none;
          border-radius: 0;
          cursor: pointer;
          transition: background 0.2s, transform 0.15s;
          font-family: 'Outfit', sans-serif;
          position: relative;
          overflow: hidden;
        }
        .signin-btn:hover:not(:disabled) { background: #b52018; }
        .signin-btn:active:not(:disabled) { transform: scale(0.99); }
        .signin-btn:disabled { opacity: 0.7; cursor: not-allowed; }
        .signin-btn::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent);
          transform: translateX(-100%);
          transition: transform 0.5s;
        }
        .signin-btn:hover::after { transform: translateX(100%); }

        .spinner {
          width: 16px; height: 16px;
          border: 2px solid rgba(255,255,255,0.35);
          border-top-color: #fff;
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
          display: inline-block;
          vertical-align: middle;
          margin-right: 8px;
        }

        .error-box {
          padding: 10px 16px;
          background: #FFF0EE;
          border-left: 3px solid #DA291C;
          color: #DA291C;
          font-size: 13px;
          font-weight: 600;
          margin-bottom: 0;
          font-family: 'Outfit', sans-serif;
        }

        .pass-toggle {
          position: absolute;
          right: 14px;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          cursor: pointer;
          color: #AAA;
          font-size: 18px;
          padding: 4px;
          transition: color 0.2s;
          display: flex;
          align-items: center;
        }
        .pass-toggle:hover { color: #555; }
      `}</style>

      {/* Subtle background pattern */}
      <div style={{ position:"absolute", inset:0, backgroundImage:"radial-gradient(circle, rgba(218,41,28,0.04) 1px, transparent 1px)", backgroundSize:"28px 28px", pointerEvents:"none" }} />

      {/* Card */}
      <div className="login-card" style={{ width:"100%", maxWidth:480, borderRadius:18, overflow:"hidden", boxShadow:"0 24px 80px rgba(0,0,0,0.13), 0 2px 8px rgba(0,0,0,0.08)", position:"relative" }}>

        {/* ── Yellow header — matches reference ── */}
        <div style={{
          background: "linear-gradient(135deg, #FFC72C 0%, #FFD54F 100%)",
          padding: "36px 40px 32px",
          position: "relative",
          overflow: "hidden",
        }}>
          {/* Confetti dots — matches reference */}
          {[
            {top:"15%",left:"18%",size:9,r:-30},{top:"25%",left:"55%",size:7,r:20},
            {top:"60%",left:"12%",size:11,r:40},{top:"70%",left:"65%",size:8,r:-15},
            {top:"40%",left:"78%",size:10,r:35},{top:"10%",left:"72%",size:6,r:-40},
            {top:"80%",left:"35%",size:7,r:25},{top:"50%",left:"45%",size:5,r:-20},
          ].map((d,i) => (
            <div key={i} style={{ position:"absolute", top:d.top, left:d.left, width:d.size, height:d.size*0.55, background:"rgba(218,41,28,0.25)", borderRadius:2, transform:`rotate(${d.r}deg)`, pointerEvents:"none" }} />
          ))}

          {/* M Logo — exact match to reference */}
          <div style={{ width:60, height:60, background:"#DA291C", borderRadius:14, display:"flex", alignItems:"center", justifyContent:"center", marginBottom:20, boxShadow:"0 4px 16px rgba(218,41,28,0.35)" }}>
            <span style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:34, fontWeight:900, color:"#FFC72C", lineHeight:1 }}>M</span>
          </div>

          <h1 style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:40, fontWeight:900, color:"#1A1A1A", lineHeight:1, marginBottom:8 }}>Welcome Back</h1>
          <p style={{ color:"#DA291C", fontSize:16, fontWeight:700, fontFamily:"'Outfit',sans-serif" }}>Sign in to order your favorites!</p>
        </div>

        {/* ── Form body ── */}
        <div style={{ background:"#fff" }}>
          {error && <div className="error-box">{error}</div>}

          <form onSubmit={handleSubmit} noValidate>
            <div style={{ borderBottom:"1px solid #E8E8E8" }}>
              {/* Email field */}
              <div className="field-group">
                <label className="login-label" htmlFor="email">Email Address</label>
                <div style={{ position:"relative" }}>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="mcfan@example.com"
                    autoComplete="email"
                    className="login-input"
                    style={{ borderTop:"none", borderRadius:0 }}
                  />
                </div>
              </div>

              {/* Password field */}
              <div className="field-group">
                <label className="login-label" htmlFor="password" style={{ borderTop:"1px solid #E8E8E8" }}>Password</label>
                <div style={{ position:"relative" }}>
                  <input
                    id="password"
                    type={showPass ? "text" : "password"}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="••••••••••"
                    autoComplete="current-password"
                    className="login-input"
                    style={{ borderTop:"none", borderRadius:0, paddingRight:46 }}
                  />
                  <button type="button" className="pass-toggle" onClick={() => setShowPass(v => !v)} aria-label={showPass?"Hide password":"Show password"}>
                    {showPass ? (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                    ) : (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Forgot password */}
            <div style={{ display:"flex", justifyContent:"flex-end", padding:"10px 16px 0" }}>
              <Link href="/forgot-password" style={{ fontSize:12, color:"#DA291C", fontWeight:600, textDecoration:"none", fontFamily:"'Outfit',sans-serif" }}
                onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.textDecoration="underline"}
                onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.textDecoration="none"}>
                Forgot password?
              </Link>
            </div>

            {/* Submit */}
            <div style={{ padding:"14px 0 0" }}>
              <button type="submit" className="signin-btn" disabled={loading}>
                {loading ? <><span className="spinner" />Signing In…</> : "Sign In"}
              </button>
            </div>
          </form>

          {/* Sign up link — matches reference */}
          <div style={{ textAlign:"center", padding:"18px 24px 24px", fontSize:14, color:"#777", fontFamily:"'Outfit',sans-serif" }}>
            Don&apos;t have an account?{" "}
            <Link href="/register" style={{ color:"#DA291C", fontWeight:800, textDecoration:"none" }}
              onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.textDecoration="underline"}
              onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.textDecoration="none"}>
              Sign up today!
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

