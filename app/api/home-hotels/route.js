import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";

import { connectDB } from "@/lib/db";
import Hotel from "@/models/Hotel";
import Locality from "@/models/Locality";
import City from "@/models/City";

export async function GET() {
  try {
    await connectDB();
    const hotels = await Hotel.find({ isHomeFeatured: true })
      .select(
        "name slug city locality rating reviewCount heroImage priceStartingFrom originalPrice hotelAmenities roomTypes isHomeFeatured isActive"
      )
      .populate("city", "name")
      .populate("locality", "name");
    return NextResponse.json(hotels, {
      status: 200,
      // headers: {
      //   "Cache-Control":
      //     "public, s-maxage=86400, stale-while-revalidate=604800",
      // },
    });
  } catch (error) {
    console.error("GET /api/home-hotels error:", error);
    return NextResponse.json(
      { message: "Failed to fetch hotels" },
      {
        status: 500,
        // headers: {
        //   "Cache-Control": "no-cache",
        // },
      }
    );
  }
}
