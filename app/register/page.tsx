"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterPage() {
  const router = useRouter();
  const [form,    setForm]    = useState({ name:"", email:"", password:"", confirm:"" });
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState("");
  const [showPass,setShowPass]= useState(false);

  const update = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }));

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name || !form.email || !form.password || !form.confirm) { setError("Please fill in all fields."); return; }
    if (form.password !== form.confirm) { setError("Passwords don't match."); return; }
    if (form.password.length < 6) { setError("Password must be at least 6 characters."); return; }
    setLoading(true); setError("");
    try {
      const res = await fetch("/api/auth/register", { method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify({ name:form.name, email:form.email, password:form.password }) });
      const data = await res.json();
      if (!res.ok) { setError(data.message || "Registration failed."); }
      else { router.push("/login?registered=true"); }
    } catch { setError("Something went wrong. Please try again."); }
    finally { setLoading(false); }
  }

  const fields: { key: keyof typeof form; label: string; type: string; placeholder: string }[] = [
    { key:"name",     label:"Full Name",        type:"text",     placeholder:"Your name" },
    { key:"email",    label:"Email Address",    type:"email",    placeholder:"mcfan@example.com" },
    { key:"password", label:"Password",         type:showPass?"text":"password", placeholder:"Min. 6 characters" },
    { key:"confirm",  label:"Confirm Password", type:showPass?"text":"password", placeholder:"Repeat password" },
  ];

  return (
    <div style={{ minHeight:"100vh", background:"#F5F5F5", display:"flex", alignItems:"center", justifyContent:"center", padding:"20px", fontFamily:"'Outfit',sans-serif", position:"relative", overflow:"hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800;900&family=Barlow+Condensed:ital,wght@0,700;0,800;0,900;1,800&display=swap');
        @keyframes fadeUp { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
        @keyframes spin { to { transform: rotate(360deg); } }
        .reg-card { animation: fadeUp 0.55s cubic-bezier(0.16,1,0.3,1) forwards; }
        .reg-input { width:100%; padding:14px 16px; border:1.5px solid #E8E8E8; border-top:none; border-radius:0; font-size:15px; font-family:'Outfit',sans-serif; background:#fff; color:#1A1A1A; outline:none; transition:border-color 0.2s,box-shadow 0.2s; }
        .reg-input:focus { border-color:#DA291C; box-shadow:0 0 0 3px rgba(218,41,28,0.08); z-index:1; position:relative; }
        .reg-input::placeholder { color:#BBBBBB; }
        .reg-label { display:block; font-size:10px; font-weight:800; letter-spacing:0.18em; color:#1A1A1A; padding:12px 16px 8px; text-transform:uppercase; background:#fff; border-left:1.5px solid #E8E8E8; border-right:1.5px solid #E8E8E8; border-top:1.5px solid #E8E8E8; }
        .reg-submit { width:100%; padding:16px; background:#DA291C; color:#fff; font-size:13px; font-weight:900; letter-spacing:0.18em; text-transform:uppercase; border:none; cursor:pointer; transition:background 0.2s; font-family:'Outfit',sans-serif; position:relative; overflow:hidden; }
        .reg-submit:hover:not(:disabled) { background:#b52018; }
        .reg-submit:disabled { opacity:0.7; }
        .reg-submit::after { content:''; position:absolute; inset:0; background:linear-gradient(90deg,transparent,rgba(255,255,255,0.15),transparent); transform:translateX(-100%); transition:transform 0.5s; }
        .reg-submit:hover::after { transform:translateX(100%); }
        .spinner { width:16px;height:16px;border:2px solid rgba(255,255,255,0.35);border-top-color:#fff;border-radius:50%;animation:spin 0.7s linear infinite;display:inline-block;vertical-align:middle;margin-right:8px; }
      `}</style>

      <div style={{ position:"absolute", inset:0, backgroundImage:"radial-gradient(circle, rgba(218,41,28,0.04) 1px, transparent 1px)", backgroundSize:"28px 28px", pointerEvents:"none" }} />

      <div className="reg-card" style={{ width:"100%", maxWidth:480, borderRadius:18, overflow:"hidden", boxShadow:"0 24px 80px rgba(0,0,0,0.13), 0 2px 8px rgba(0,0,0,0.08)" }}>

        {/* Yellow header */}
        <div style={{ background:"linear-gradient(135deg,#FFC72C,#FFD54F)", padding:"36px 40px 32px", position:"relative", overflow:"hidden" }}>
          {[{top:"15%",left:"18%",s:9,r:-30},{top:"25%",left:"55%",s:7,r:20},{top:"60%",left:"12%",s:11,r:40},{top:"70%",left:"65%",s:8,r:-15},{top:"40%",left:"78%",s:10,r:35},{top:"10%",left:"72%",s:6,r:-40}].map((d,i) => (
            <div key={i} style={{ position:"absolute", top:d.top, left:d.left, width:d.s, height:d.s*0.55, background:"rgba(218,41,28,0.25)", borderRadius:2, transform:`rotate(${d.r}deg)`, pointerEvents:"none" }} />
          ))}
          <div style={{ width:60, height:60, background:"#DA291C", borderRadius:14, display:"flex", alignItems:"center", justifyContent:"center", marginBottom:20, boxShadow:"0 4px 16px rgba(218,41,28,0.35)" }}>
            <span style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:34, fontWeight:900, color:"#FFC72C", lineHeight:1 }}>M</span>
          </div>
          <h1 style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:40, fontWeight:900, color:"#1A1A1A", lineHeight:1, marginBottom:8 }}>Join Us Today</h1>
          <p style={{ color:"#DA291C", fontSize:16, fontWeight:700, fontFamily:"'Outfit',sans-serif" }}>Create your McDonald&apos;s India account!</p>
        </div>

        {/* Form */}
        <div style={{ background:"#fff" }}>
          {error && <div style={{ padding:"10px 16px", background:"#FFF0EE", borderLeft:"3px solid #DA291C", color:"#DA291C", fontSize:13, fontWeight:600, fontFamily:"'Outfit',sans-serif" }}>{error}</div>}

          <form onSubmit={handleSubmit} noValidate>
            <div style={{ borderBottom:"1px solid #E8E8E8" }}>
              {fields.map((f, i) => (
                <div key={f.key} style={{ position:"relative" }}>
                  <label className="reg-label" htmlFor={f.key} style={{ borderTop: i===0?"1.5px solid #E8E8E8":"1px solid #E8E8E8" }}>{f.label}</label>
                  <div style={{ position:"relative" }}>
                    <input
                      id={f.key}
                      type={f.type}
                      value={form[f.key]}
                      onChange={update(f.key)}
                      placeholder={f.placeholder}
                      className="reg-input"
                      style={{ paddingRight: (f.key==="password"||f.key==="confirm") ? 46 : 16 }}
                    />
                    {f.key === "password" && (
                      <button type="button" onClick={() => setShowPass(v => !v)}
                        style={{ position:"absolute", right:14, top:"50%", transform:"translateY(-50%)", background:"none", border:"none", cursor:"pointer", color:"#AAA", display:"flex", alignItems:"center" }}>
                        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                          {showPass ? <><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></> : <><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></>}
                        </svg>
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Terms note */}
            <p style={{ padding:"12px 16px 0", fontSize:12, color:"#AAA", fontFamily:"'Outfit',sans-serif", lineHeight:1.6 }}>
              By signing up, you agree to our{" "}
              <Link href="/terms" style={{ color:"#DA291C", textDecoration:"none", fontWeight:600 }}>Terms of Service</Link>
              {" "}and{" "}
              <Link href="/privacy" style={{ color:"#DA291C", textDecoration:"none", fontWeight:600 }}>Privacy Policy</Link>.
            </p>

            <div style={{ padding:"14px 0 0" }}>
              <button type="submit" className="reg-submit" disabled={loading}>
                {loading ? <><span className="spinner" />Creating Account…</> : "Create Account"}
              </button>
            </div>
          </form>

          <div style={{ textAlign:"center", padding:"18px 24px 24px", fontSize:14, color:"#777", fontFamily:"'Outfit',sans-serif" }}>
            Already have an account?{" "}
            <Link href="/login" style={{ color:"#DA291C", fontWeight:800, textDecoration:"none" }}
              onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.textDecoration="underline"}
              onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.textDecoration="none"}>
              Sign in here!
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
