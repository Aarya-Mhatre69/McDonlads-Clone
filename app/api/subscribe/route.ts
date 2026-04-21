import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { Subscriber } from '@/lib/models/Subscriber';

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email || !email.includes('@')) {
      return NextResponse.json({ message: "Valid email is required." }, { status: 400 });
    }

    await connectDB();

    // Check if already subscribed
    const existing = await Subscriber.findOne({ email });
    if (existing) {
      return NextResponse.json({ message: "Already subscribed!" }, { status: 400 });
    }

    await Subscriber.create({ email });

    return NextResponse.json({ message: "Subscribed successfully!" }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ message: "Something went wrong.", error: error.message }, { status: 500 });
  }
}
