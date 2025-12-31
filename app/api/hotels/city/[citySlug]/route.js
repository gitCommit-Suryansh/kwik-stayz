import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";

import City from "@/models/City";
import Locality from "@/models/Locality";
import Hotel from "@/models/Hotel";

export async function GET(request, { params }) {
  try {
    await connectDB();

    const { citySlug } = await params;

    // 1️⃣ Find city
    const city = await City.findOne({ slug: citySlug })
      .select("name slug")
      .lean();

    if (!city) {
      return NextResponse.json(
        { message: "City not found" },
        { status: 404 }
      );
    }

    // 2️⃣ Find localities in city
    const localities = await Locality.find({ city: city._id })
      .select("name slug")
      .lean();

    // 3️⃣ Find hotels in city
    const hotelsRaw = await Hotel.find({
      city: city._id,
      isActive: true,
    })
      .populate("locality", "name slug")
      .select(
        "name slug heroImage gallery rating reviewCount priceStartingFrom hotelAmenities roomTypes"
      )
      .lean();

    // 4️⃣ Shape hotels for listing cards
    const hotels = hotelsRaw.map((hotel) => ({
      name: hotel.name,
      slug: hotel.slug,
      heroImage: hotel.heroImage,
      gallery: hotel.gallery || [],
      city: {
        name: city.name,
        slug: city.slug,
      },
      locality: hotel.locality,
      rating: hotel.rating,
      reviewCount: hotel.reviewCount,
      priceStartingFrom: hotel.priceStartingFrom,
      hotelAmenities: hotel.hotelAmenities || [],
      roomTypeCount: hotel.roomTypes?.length || 0,
    }));

    // 5️⃣ Final response
    return NextResponse.json({
      city,
      localities,
      hotels,
    });
  } catch (error) {
    console.error("GET /api/hotels/city/[citySlug] error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
