import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Booking from "@/models/Booking";
import Hotel from "@/models/Hotel"; // Ensure Hotel model is loaded
import { verifyToken } from "@/lib/auth/jwt";

export async function GET(req) {
  try {
    await connectDB();

    const token = req.cookies.get("auth_token")?.value;

    if (!token) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 },
      );
    }

    const decoded = verifyToken(token);

    if (!decoded?.userId) {
      return NextResponse.json(
        { success: false, message: "Invalid token" },
        { status: 401 },
      );
    }

    const bookings = await Booking.find({ userId: decoded.userId })
      .populate({
        path: "hotel.id",
        select: "heroImage address slug geo", // Only fetch the image
        model: Hotel,
      })
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json({
      success: true,
      bookings,
    });
  } catch (error) {
    console.error("Fetch My Bookings Error:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 },
    );
  }
}
