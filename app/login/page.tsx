"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res?.error) {
      setError(res.error);
      setLoading(false);
    } else {
      router.push("/");
      router.refresh();
    }
  };

  return (
    <div className="min-h-[85vh] bg-[#f5f5f5] flex items-center justify-center p-6">
      <div className="bg-white max-w-md w-full rounded-2xl shadow-xl overflow-hidden">
        {/* Header */}
        <div className="bg-[#FFC72C] p-8 text-center relative">
          <div className="absolute top-0 left-0 w-full h-full opacity-10" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60'%3E%3Cellipse cx='10' cy='8' rx='3' ry='5' fill='%23111' transform='rotate(-30 10 8)'/%3E%3C/svg%3E")`, backgroundSize: "40px" }} />
          <div className="w-16 h-16 bg-[#DA291C] mx-auto rounded-2xl flex items-center justify-center mb-4 relative z-10 shadow-lg">
            <span className="text-[#FFC72C] font-black text-4xl" style={{ fontFamily: "'Arial Black', sans-serif" }}>M</span>
          </div>
          <h1 className="text-2xl font-black text-[#1A1A1A] relative z-10" style={{ fontFamily: "'Arial Black', sans-serif" }}>Welcome Back</h1>
          <p className="text-[#DA291C] font-bold text-sm mt-1 relative z-10">Sign in to order your favorites!</p>
        </div>

        {/* Form */}
        <div className="p-8">
          {error && <div className="bg-[#DA291C]/10 text-[#DA291C] p-3 rounded-xl mb-6 text-sm font-bold text-center">{error}</div>}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-bold text-[#666] uppercase tracking-wider mb-2">Email Address</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#FFC72C] focus:ring-2 focus:ring-[#FFC72C]/20 outline-none transition-all placeholder-gray-400 font-medium"
                placeholder="mcfan@example.com"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-[#666] uppercase tracking-wider mb-2">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#FFC72C] focus:ring-2 focus:ring-[#FFC72C]/20 outline-none transition-all placeholder-gray-400 font-medium"
                placeholder="••••••••"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-[#DA291C] hover:bg-[#b52018] text-white rounded-xl font-black text-sm tracking-wide transition-colors mt-2"
            >
              {loading ? "SIGNING IN..." : "SIGN IN"}
            </button>
          </form>

          <p className="text-center text-sm font-medium text-gray-500 mt-6">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="text-[#DA291C] font-bold hover:underline">
              Sign up today!
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
