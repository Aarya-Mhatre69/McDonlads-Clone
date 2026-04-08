import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { CartProvider } from "@/context/CartContext";

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
      <head />
      <body>
        <CartProvider>
          <Navbar />
          <main className="pt-20">{children}</main>
        </CartProvider>
      </body>
    </html>
  );
}

