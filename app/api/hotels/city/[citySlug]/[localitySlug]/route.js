// app/api/hotels/city/[citySlug]/[localitySlug]/route.js

import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import City from "@/models/City";
import Locality from "@/models/Locality";
import Hotel from "@/models/Hotel";

export async function GET(req, { params }) {
  try {
    await connectDB();

    const { citySlug, localitySlug } = await params;

    const city = await City.findOne({ slug: citySlug }).lean();
    if (!city) {
      return NextResponse.json({ message: "City not found" }, { status: 404 });
    }

    const locality = await Locality.findOne({
      slug: localitySlug,
      city: city._id,
    }).lean();

    if (!locality) {
      return NextResponse.json({ message: "Locality not found" }, { status: 404 });
    }

    const hotels = await Hotel.find({
      city: city._id,
      locality: locality._id,
      isActive: true,
    })
      .populate("city", "name slug")
      .populate("locality", "name slug")
      .select(
        "name slug heroImage rating reviewCount priceStartingFrom hotelAmenities gallery"
      )
      .lean();

    return NextResponse.json({
      city: { name: city.name, slug: city.slug },
      locality: { name: locality.name, slug: locality.slug },
      hotels,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
