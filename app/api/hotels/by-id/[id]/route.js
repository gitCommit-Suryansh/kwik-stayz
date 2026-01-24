import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Hotel from "@/models/Hotel";
import City from "@/models/City"; // Populate dependency
import Locality from "@/models/Locality"; // Populate dependency
import Category from "@/models/Category"; // Populate dependency

export async function GET(request, { params }) {
  try {
    await connectDB();
    const { id } = await params;

    const hotel = await Hotel.findById(id)
      .populate("city")
      .populate("locality")
      .populate("categories");

    if (!hotel) {
      return NextResponse.json({ message: "Hotel not found" }, { status: 404 });
    }

    return NextResponse.json(hotel);
  } catch (error) {
    console.error("GET /api/hotels/[id] error:", error);
    return NextResponse.json(
      { message: "Failed to fetch hotel details" },
      { status: 500 },
    );
  }
}

export async function PATCH(request, { params }) {
  try {
    await connectDB();
    const { id } = await params;
    const body = await request.json();

    // Currently only supporting status update or specific fields
    // But generic update is fine as long as we validate if needed.
    // User specifically asked for isActive editing.

    const updatedHotel = await Hotel.findByIdAndUpdate(
      id,
      { $set: body },
      { new: true }, // Return updated doc
    );

    if (!updatedHotel) {
      return NextResponse.json({ message: "Hotel not found" }, { status: 404 });
    }

    return NextResponse.json(updatedHotel);
  } catch (error) {
    console.error("PATCH /api/hotels/[id] error:", error);
    return NextResponse.json(
      { message: "Failed to update hotel" },
      { status: 500 },
    );
  }
}
