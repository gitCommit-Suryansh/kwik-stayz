// app/api/hotels/route.js

import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { revalidateTag } from "next/cache";

import City from "@/models/City";
import Locality from "@/models/Locality";
import Hotel from "@/models/Hotel";
import Category from "@/models/Category";

export async function POST(request) {
  try {
    await connectDB();
    const body = await request.json();

    const {
      name,
      slug,
      citySlug,
      localitySlug,

      categories,
      address,
      geo,
      rating,
      reviewCount,

      heroImage,
      gallery,

      priceStartingFrom,
      originalPrice,
      taxes,
      currency,

      hotelAmenities,
      roomTypes,

      description,
      policies,
      nearbyPlaces,
      faqs,
      seo,
      isHomeFeatured,
    } = body;

    /* ---------------- Basic Validation ---------------- */
    if (!name || !slug || !citySlug || !localitySlug) {
      return NextResponse.json(
        { message: "name, slug, citySlug and localitySlug are required" },
        { status: 400 }
      );
    }

    /* ---------------- Resolve City ---------------- */
    const city = await City.findOne({ slug: citySlug });
    if (!city) {
      return NextResponse.json({ message: "City not found" }, { status: 404 });
    }

    /* ---------------- Resolve Locality ---------------- */
    const locality = await Locality.findOne({
      slug: localitySlug,
      city: city._id,
    });

    if (!locality) {
      return NextResponse.json(
        { message: "Locality not found for this city" },
        { status: 404 }
      );
    }

    /* ---------------- Resolve Categories ---------------- */
    let categoryIds = [];

    if (Array.isArray(categories) && categories.length > 0) {
      const foundCategories = await Category.find({
        slug: { $in: categories },
        isActive: true,
      }).select("_id");

      categoryIds = foundCategories.map((c) => c._id);
    }

    /* ---------------- Duplicate Hotel Slug ---------------- */
    const existingHotel = await Hotel.findOne({ slug });
    if (existingHotel) {
      return NextResponse.json(
        { message: "Hotel with this slug already exists" },
        { status: 409 }
      );
    }

    /* ---------------- Create Hotel ---------------- */
    const hotel = await Hotel.create({
      name,
      slug,

      city: city._id,
      locality: locality._id,

      categories: categoryIds,

      address,
      geo,
      rating,
      reviewCount,

      heroImage,
      gallery,

      priceStartingFrom,
      originalPrice,
      taxes,
      currency,

      hotelAmenities,
      roomTypes,

      description,
      policies,
      nearbyPlaces,
      faqs,
      seo,
      isHomeFeatured,

      isActive: true,
    });
    revalidateTag("home-hotels");

    return NextResponse.json(hotel, { status: 201 });
  } catch (error) {
    console.error("POST /api/hotels error:", error);
    return NextResponse.json(
      { message: "Failed to create hotel" },
      { status: 500 }
    );
  }
}
