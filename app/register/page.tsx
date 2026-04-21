"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      if (res.ok) {
        router.push("/login?registered=true");
      } else {
        const data = await res.json();
        setError(data.message || "Registration failed");
      }
    } catch (err: any) {
      setError("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] bg-[#f5f5f5] flex items-center justify-center p-6">
      <div className="bg-white max-w-md w-full rounded-2xl shadow-xl overflow-hidden mt-6 mb-6">
        {/* Header */}
        <div className="bg-[#DA291C] p-8 text-center relative">
          <div className="absolute top-0 left-0 w-full h-full opacity-10" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60'%3E%3Cellipse cx='50' cy='20' rx='3' ry='5' fill='%23fff' transform='rotate(45 50 20)'/%3E%3C/svg%3E")`, backgroundSize: "40px" }} />
          <div className="w-16 h-16 bg-[#FFC72C] mx-auto rounded-2xl flex items-center justify-center mb-4 relative z-10 shadow-lg">
            <span className="text-[#DA291C] font-black text-4xl" style={{ fontFamily: "'Arial Black', sans-serif" }}>M</span>
          </div>
          <h1 className="text-2xl font-black text-white relative z-10" style={{ fontFamily: "'Arial Black', sans-serif" }}>Create Account</h1>
          <p className="text-[#FFC72C] font-bold text-sm mt-1 relative z-10">Join the McDonald&apos;s family</p>
        </div>

        {/* Form */}
        <div className="p-8">
          {error && <div className="bg-[#DA291C]/10 text-[#DA291C] p-3 rounded-xl mb-6 text-sm font-bold text-center">{error}</div>}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-[#666] uppercase tracking-wider mb-2">Full Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#DA291C] focus:ring-2 focus:ring-[#DA291C]/20 outline-none transition-all placeholder-gray-400 font-medium"
                placeholder="Ronald McDonald"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-[#666] uppercase tracking-wider mb-2">Email Address</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#DA291C] focus:ring-2 focus:ring-[#DA291C]/20 outline-none transition-all placeholder-gray-400 font-medium"
                placeholder="mcfan@example.com"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-[#666] uppercase tracking-wider mb-2">Password</label>
              <input
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#DA291C] focus:ring-2 focus:ring-[#DA291C]/20 outline-none transition-all placeholder-gray-400 font-medium"
                placeholder="6+ characters"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-[#FFC72C] hover:bg-[#F0B810] text-[#1A1A1A] rounded-xl font-black text-sm tracking-wide transition-colors mt-4"
            >
              {loading ? "CREATING..." : "CREATE ACCOUNT"}
            </button>
          </form>

          <p className="text-center text-sm font-medium text-gray-500 mt-6">
            Already have an account?{" "}
            <Link href="/login" className="text-[#DA291C] font-bold hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
