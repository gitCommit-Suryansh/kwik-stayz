import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Payment from "@/models/Payment";
import Booking from "@/models/Booking";

export async function GET(request, { params }) {
  try {
    await connectDB();
    const { id } = await params;

    const payment = await Payment.findById(id).populate(
      "bookingId",
      "bookingCode guestDetails",
    );

    if (!payment) {
      return NextResponse.json(
        { message: "Payment not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(payment);
  } catch (error) {
    console.error("GET /api/admin/payments/[id] error:", error);
    return NextResponse.json(
      { message: "Failed to fetch payment details" },
      { status: 500 },
    );
  }
}
