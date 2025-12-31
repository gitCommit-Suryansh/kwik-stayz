// app/api/hotels/[slug]/route.js

import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import City from "@/models/City";
import Locality from "@/models/Locality";
import Hotel from "@/models/Hotel";

//Hotel details api

export async function GET(request, { params }) {
  try {
    await connectDB();

    const { slug } = await params;

    if (!slug) {
      return NextResponse.json(
        { message: "Hotel slug is required" },
        { status: 400 }
      );
    }

    const hotel = await Hotel.findOne({
      slug,
      isActive: true,
    })
      .populate("city", "name slug")
      .populate("locality", "name slug")
      .lean();

    if (!hotel) {
      return NextResponse.json(
        { message: "Hotel not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(hotel, { status: 200 });
  } catch (error) {
    console.error("GET /api/hotels/[slug] error:", error);
    return NextResponse.json(
      { message: "Failed to fetch hotel details" },
      { status: 500 }
    );
  }
}
