import type { NextConfig } from "next";

const securityHeaders = [
  { key: "X-Frame-Options",            value: "DENY" },
  { key: "X-Content-Type-Options",      value: "nosniff" },
  { key: "X-XSS-Protection",           value: "1; mode=block" },
  { key: "Referrer-Policy",             value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy",          value: "camera=(), microphone=(), geolocation=(self)" },
  { key: "Strict-Transport-Security",   value: "max-age=63072000; includeSubDomains; preload" },
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://fonts.googleapis.com",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com",
      "img-src 'self' data: blob: https://images.unsplash.com https://source.unsplash.com",
      "connect-src 'self' http://localhost:5000",
      "frame-ancestors 'none'",
    ].join("; "),
  },
];

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "source.unsplash.com" },
    ],
    formats: ["image/avif", "image/webp"],
  },

  async headers() {
    return [
      { source: "/(.*)", headers: securityHeaders },
    ];
  },

  // Redirect www → non-www in production
  async redirects() {
    return process.env.NODE_ENV === "production"
      ? [{ source: "/:path*", has: [{ type: "host", value: "www.mcdonaldsindia.example.com" }], destination: "https://mcdonaldsindia.example.com/:path*", permanent: true }]
      : [];
  },
};

export default nextConfig;
