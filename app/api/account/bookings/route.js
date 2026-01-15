import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Booking from "@/models/Booking";
import { verifyToken } from "@/lib/auth/jwt";

export async function GET(request) {
  try {
    await connectDB();

    // 1. Authenticate User
    const token = request.cookies.get("auth_token")?.value;
    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const decoded = verifyToken(token);
    if (!decoded) {
      return NextResponse.json({ message: "Invalid session" }, { status: 401 });
    }

    // 2. Fetch Bookings
    const bookings = await Booking.find({ userId: decoded.userId })
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json({ bookings }, { status: 200 });
  } catch (error) {
    console.error("GET /api/account/bookings error:", error);
    return NextResponse.json(
      { message: "Failed to fetch bookings" },
      { status: 500 }
    );
  }
}
