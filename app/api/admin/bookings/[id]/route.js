import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Booking from "@/models/Booking";
import Payment from "@/models/Payment";

export async function GET(request, { params }) {
  try {
    await connectDB();
    const { id } = await params;

    const booking = await Booking.findById(id).populate("paymentId");

    if (!booking) {
      return NextResponse.json(
        { message: "Booking not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(booking);
  } catch (error) {
    console.error("GET /api/admin/bookings/[id] error:", error);
    return NextResponse.json(
      { message: "Failed to fetch booking details" },
      { status: 500 },
    );
  }
}

export async function PATCH(request, { params }) {
  try {
    await connectDB();
    const { id } = await params;
    const body = await request.json();
    const { status } = body;

    // Validate Status Transition
    const validStatuses = [
      "PENDING_PAYMENT",
      "CONFIRMED",
      "PAYMENT_FAILED",
      "CANCELLED",
      "EXPIRED",
      "CHECKED_IN",
      "COMPLETED",
    ];

    if (!validStatuses.includes(status)) {
      return NextResponse.json({ message: "Invalid status" }, { status: 400 });
    }

    const updatedBooking = await Booking.findByIdAndUpdate(
      id,
      { status },
      { new: true },
    );

    if (!updatedBooking) {
      return NextResponse.json(
        { message: "Booking not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(updatedBooking);
  } catch (error) {
    console.error("PATCH /api/admin/bookings/[id] error:", error);
    return NextResponse.json(
      { message: "Failed to update booking" },
      { status: 500 },
    );
  }
}
