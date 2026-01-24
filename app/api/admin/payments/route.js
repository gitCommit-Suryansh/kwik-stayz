import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Payment from "@/models/Payment";
import Booking from "@/models/Booking"; // Ensure model registered

export async function GET(request) {
  try {
    await connectDB();

    // Populate booking to show which user/hotel
    const payments = await Payment.find()
      .populate("bookingId", "bookingCode guestDetails")
      .sort({ createdAt: -1 })
      .limit(50);

    return NextResponse.json(payments);
  } catch (error) {
    console.error("GET /api/admin/payments error:", error);
    return NextResponse.json(
      { message: "Failed to fetch payments" },
      { status: 500 },
    );
  }
}
