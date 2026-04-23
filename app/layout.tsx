import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import CursorFX from "@/components/CursorFX";
import { CartProvider } from "@/context/CartContext";
import { AuthProvider } from "@/context/AuthProvider";

export const metadata: Metadata = {
  title: "McDonald's India — Taste the Fusion",
  description:
    "Discover McDonald's India exclusive fusion menu crafted for Indian taste buds. Order delivery or find a dine-in outlet near you.",
  keywords: "McDonald's India, McAloo Tikki, McSpicy Paneer, delivery, dine-in",
  openGraph: {
    title: "McDonald's India — Taste the Fusion",
    description: "India's favourite burgers, wraps & fries. Delivery or Dine-In.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>
        <AuthProvider>
          <CartProvider>
            <CursorFX />
            <Navbar />
            <main className="pt-[68px]">{children}</main>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}