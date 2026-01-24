import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import User from "@/models/User";
import Hotel from "@/models/Hotel";
import Booking from "@/models/Booking";
import Payment from "@/models/Payment";

export async function GET() {
  try {
    await connectDB();

    /* ---------------- 1. Total Revenue ---------------- */
    // Sum of all SUCCESS payments
    const revenueAggregation = await Payment.aggregate([
      { $match: { status: "SUCCESS" } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);
    const totalRevenue = revenueAggregation[0]?.total || 0;

    /* ---------------- 2. Active Hotels ---------------- */
    const activeHotels = await Hotel.countDocuments({ isActive: true });

    /* ---------------- 3. Total Bookings ---------------- */
    // Count of legitimate bookings (excluding initiated/failed)
    const validBookingStatuses = [
      "CONFIRMED",
      "CHECKED_IN",
      "COMPLETED",
      "CANCELLED",
      "PENDING_PAYMENT",
    ];
    const totalBookings = await Booking.countDocuments({
      status: { $in: validBookingStatuses },
    });

    /* ---------------- 4. Average Stay ---------------- */
    const avgStayAggregation = await Booking.aggregate([
      { $match: { status: { $in: ["CONFIRMED", "CHECKED_IN", "COMPLETED"] } } },
      { $group: { _id: null, avgDays: { $avg: "$stay.nights" } } },
    ]);
    const avgStay = avgStayAggregation[0]?.avgDays || 0;

    /* ---------------- 5. Recent Bookings ---------------- */
    const recentBookings = await Booking.find()
      .populate("hotel", "name city")
      .populate("userId", "fullName") // If user model exists
      .sort({ createdAt: -1 })
      .limit(5);

    return NextResponse.json({
      totalRevenue,
      activeHotels,
      totalBookings,
      avgStay,
      recentBookings,
    });
  } catch (error) {
    console.error("GET /api/admin/dashboard error:", error);
    return NextResponse.json(
      { message: "Failed to fetch dashboard stats" },
      { status: 500 },
    );
  }
}
