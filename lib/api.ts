// ─── lib/api.ts ──────────────────────────────────────────────────────────────
// Centralised API helper — all fetch calls go through here.
// Change BASE_URL in one place if the backend port changes.

export const BASE_URL = "http://localhost:5000";

// Generic fetcher — throws on non-2xx so callers can use try/catch
export async function apiFetch<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });

  const json = await res.json();

  if (!res.ok) {
    // Surface the backend error message when available
    throw new Error(json?.message ?? `API error: ${res.status}`);
  }

  return json as T;
}

// ── Typed wrappers ────────────────────────────────────────────────────────────

export interface ApiMenuItem {
  id: string;
  name: string;
  category: "veg" | "nonveg" | "jain";
  price: number;
  ingredients: string[];
  spiceLevel: "low" | "medium" | "high";
  image: string;
  description: string;
  isPopular?: boolean;
}

export interface ApiOutlet {
  id: string;
  name: string;
  location: string;
  address: string;
  distance: number;
  deliveryTime: number;
  status: "open" | "closed";
  rating: number;
  tags: string[];
  phone: string;
}

export interface ApiCoupon {
  id: string;
  code: string;
  discount: number;
  discountType: "flat" | "percent" | "free_delivery";
  description: string;
  minOrderValue: number;
  maxDiscount?: number;
  validUntil: string;
  isActive: boolean;
}

export interface ApiOrderPayload {
  cart: { id: string; quantity: number }[];
  deliveryMode: "delivery" | "dine-in";
  deliveryAddress: string;
  customerName: string;
  phone: string;
  couponCode?: string;
}

export interface ApiOrderResponse {
  success: boolean;
  message: string;
  orderId: string;
  status: string;
  estimatedTime: string;
  totalPrice: number;
  placedAt: string;
}

// ── Named API calls ───────────────────────────────────────────────────────────

export const fetchMenu = (category?: string) =>
  apiFetch<{ success: boolean; count: number; data: ApiMenuItem[] }>(
    category ? `/api/menu?category=${category}` : "/api/menu"
  );

export const fetchOutlets = (params?: { status?: string; sortBy?: string }) => {
  const qs = new URLSearchParams(params as Record<string, string>).toString();
  return apiFetch<{ success: boolean; count: number; data: ApiOutlet[] }>(
    qs ? `/api/outlets?${qs}` : "/api/outlets"
  );
};

export const fetchCoupons = () =>
  apiFetch<{ success: boolean; count: number; data: ApiCoupon[] }>("/api/coupons");

export const placeOrder = (payload: ApiOrderPayload) =>
  apiFetch<ApiOrderResponse>("/api/orders", {
    method: "POST",
    body: JSON.stringify(payload),
  });
