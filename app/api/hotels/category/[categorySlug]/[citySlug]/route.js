import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";

import City from "@/models/City";
import Category from "@/models/Category";
import Hotel from "@/models/Hotel";
import Locality from "@/models/Locality";

export async function GET(req, { params }) {
  try {
    await connectDB();

    const { categorySlug, citySlug } = await params;

    // 1️⃣ City
    const city = await City.findOne({ slug: citySlug }).lean();
    if (!city) {
      return NextResponse.json({ message: "City not found" }, { status: 404 });
    }

    // 2️⃣ Category
    const category = await Category.findOne({
      slug: categorySlug,
      isActive: true,
    }).lean();

    if (!category) {
      return NextResponse.json(
        { message: "Category not found" },
        { status: 404 }
      );
    }

    // 3️⃣ Hotels in category + city
    const hotels = await Hotel.find({
      city: city._id,
      categories: category._id,
      isActive: true,
    })
      .populate("locality", "name slug")
      .populate("city", "name slug")
      .select(
        "name slug heroImage gallery rating reviewCount priceStartingFrom hotelAmenities locality city"
      )
      .lean();

    // 4️⃣ Localities for filters + SEO
    const localities = await Locality.find({ city: city._id })
      .select("name slug")
      .lean();

    // 5️⃣ Response
    return NextResponse.json({
      city: {
        name: city.name,
        slug: city.slug,
      },
      category: {
        name: category.name,
        slug: category.slug,
        seoTitle: category.seoTitle,
        seoDescription: category.seoDescription,
      },
      localities, // ✅ THIS FIXES YOUR ERROR
      hotels,
    });
  } catch (err) {
    console.error("Category city hotels error:", err);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
