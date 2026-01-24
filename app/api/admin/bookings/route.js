import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Booking from "@/models/Booking";
import User from "@/models/User"; // Ensure models are registered

export async function GET(request) {
  try {
    await connectDB();

    // In a real app, you'd add checking for Admin role here.

    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const search = searchParams.get("search"); // e.g., Booking Code or Guest Name

    let query = {};

    if (status && status !== "ALL") {
      query.status = status;
    }

    if (search) {
      query.$or = [
        { bookingCode: { $regex: search, $options: "i" } },
        { "guestDetails.fullName": { $regex: search, $options: "i" } },
        { "guestDetails.mobile": { $regex: search, $options: "i" } },
      ];
    }

    const bookings = await Booking.find(query)
      .sort({ createdAt: -1 })
      .limit(50); // Limit for performance, implement pagination if needed later

    return NextResponse.json(bookings);
  } catch (error) {
    console.error("GET /api/admin/bookings error:", error);
    return NextResponse.json(
      { message: "Failed to fetch bookings" },
      { status: 500 },
    );
  }
}
