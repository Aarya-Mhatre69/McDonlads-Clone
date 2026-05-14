import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { connectToDatabase } from "@/lib/mongodb";

// ── POST /api/feedback ────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ success: false, error: "Invalid request body." }, { status: 400 });
  }

  const { rating, comment, page } = body as { rating: number; comment?: string; page?: string };

  const r = Number(rating);
  if (!r || r < 1 || r > 5) {
    return NextResponse.json({ success: false, error: "Rating must be between 1 and 5." }, { status: 400 });
  }

  const session = await getServerSession(authOptions);
  const { db } = await connectToDatabase();

  await db.collection("feedback").insertOne({
    userId:    (session?.user as { id?: string })?.id ?? "anonymous",
    rating:    r,
    comment:   typeof comment === "string" ? comment.slice(0, 500) : "",
    page:      typeof page    === "string" ? page.slice(0, 100)    : "unknown",
    createdAt: new Date(),
  });

  return NextResponse.json(
    { success: true, message: "Thank you for your feedback!" },
    { status: 201 }
  );
}

// ── GET /api/feedback — admin only (basic protection) ────────────────────────
export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ success: false, error: "Unauthorized." }, { status: 401 });
  }

  const { db } = await connectToDatabase();
  const feedback = await db
    .collection("feedback")
    .find({})
    .sort({ createdAt: -1 })
    .limit(100)
    .toArray();

  const avg = feedback.reduce((s, f) => s + f.rating, 0) / (feedback.length || 1);

  return NextResponse.json({
    success: true,
    count:   feedback.length,
    average: Math.round(avg * 10) / 10,
    data:    feedback,
  });
}
