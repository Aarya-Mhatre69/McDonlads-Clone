import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { connectToDatabase } from "@/lib/mongodb";

// ── POST /api/orders ──────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ success: false, error: "Unauthorized. Please sign in." }, { status: 401 });
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ success: false, error: "Invalid request body." }, { status: 400 });
  }

  const { items, deliveryMode, deliveryAddress, couponCode, discount } = body as {
    items:           Array<{ id: string; name: string; price: number; quantity: number; image?: string; category?: string }>;
    deliveryMode:    string;
    deliveryAddress: string;
    couponCode?:     string;
    discount?:       number;
  };

  if (!Array.isArray(items) || items.length === 0) {
    return NextResponse.json({ success: false, error: "Order must contain at least one item." }, { status: 400 });
  }
  if (!["delivery", "dine-in"].includes(deliveryMode)) {
    return NextResponse.json({ success: false, error: "deliveryMode must be 'delivery' or 'dine-in'." }, { status: 400 });
  }

  const subtotal    = items.reduce((s, i) => s + i.price * i.quantity, 0);
  const gst         = Math.round(subtotal * 0.05);
  const deliveryFee = deliveryMode === "delivery" && subtotal < 299 ? 49 : 0;
  const totalAmount = Math.max(0, subtotal + gst + deliveryFee - (Number(discount) || 0));

  const { db } = await connectToDatabase();

  const result = await db.collection("orders").insertOne({
    userId:          (session.user as { id?: string }).id,
    items:           items.map(i => ({ id: i.id, name: i.name, price: i.price, qty: i.quantity, image: i.image || "", category: i.category || "" })),
    deliveryMode,
    deliveryAddress: (deliveryAddress || "").slice(0, 300),
    couponCode:      couponCode || null,
    discount:        Number(discount) || 0,
    subtotal,
    gst,
    deliveryFee,
    totalAmount,
    status:    "confirmed",
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  return NextResponse.json(
    {
      success: true,
      message: "Order placed successfully!",
      data: {
        orderId:       result.insertedId.toString(),
        status:        "confirmed",
        totalAmount,
        estimatedTime: deliveryMode === "delivery" ? "30–45 mins" : "15–20 mins",
        placedAt:      new Date().toISOString(),
      },
    },
    { status: 201 }
  );
}

// ── GET /api/orders ───────────────────────────────────────────────────────────
export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ success: false, error: "Unauthorized." }, { status: 401 });
  }

  const { db } = await connectToDatabase();
  const orders = await db
    .collection("orders")
    .find({ userId: (session.user as { id?: string }).id })
    .sort({ createdAt: -1 })
    .limit(20)
    .toArray();

  return NextResponse.json({ success: true, count: orders.length, data: orders });
}
