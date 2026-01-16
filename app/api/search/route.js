import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";

import City from "@/models/City";
import Locality from "@/models/Locality";
import Hotel from "@/models/Hotel";
import Category from "@/models/Category";

export async function GET(req) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);

    const citySlug = searchParams.get("city");
    const localitySlug = searchParams.get("locality");
    const categorySlug = searchParams.get("category");
    const priceMinParam = searchParams.get("priceMin");
    const priceMaxParam = searchParams.get("priceMax");
    const amenitiesParam = searchParams.get("amenities"); // "wifi,parking"
    const ratingParam = Number(searchParams.get("rating"));
    const sortParam = searchParams.get("sort");

    const priceMin = priceMinParam !== null ? Number(priceMinParam) : undefined;

    const priceMax = priceMaxParam !== null ? Number(priceMaxParam) : undefined;

    if (!citySlug) {
      return NextResponse.json(
        { message: "city is required" },
        { status: 400 }
      );
    }

    const city = await City.findOne({ slug: citySlug }).lean();
    if (!city) {
      return NextResponse.json({ message: "City not found" }, { status: 404 });
    }

    let locality = null;
    if (localitySlug) {
      locality = await Locality.findOne({
        slug: localitySlug,
        city: city._id,
      }).lean();
    }

    let category = null;
    if (categorySlug) {
      category = await Category.findOne({
        slug: categorySlug,
        isActive: true,
      }).lean();
    }

    const query = {
      city: city._id,
      isActive: true,
    };

    if (locality) query.locality = locality._id;
    if (category) query.categories = category._id;

    // Price filter (OPTIONAL)
    if (priceMin !== undefined || priceMax !== undefined) {
      query.priceStartingFrom = {};

      if (priceMin !== undefined && !isNaN(priceMin)) {
        query.priceStartingFrom.$gte = priceMin;
      }

      if (priceMax !== undefined && !isNaN(priceMax)) {
        query.priceStartingFrom.$lte = priceMax;
      }
    }

    // Amenities filter
    if (amenitiesParam) {
      const amenities = amenitiesParam.split(","); // ["wifi","parking"]
      query.hotelAmenities = { $all: amenities };
    }

    // Rating filter
    if (ratingParam) {
      const ratingScaled = Math.floor(Number(ratingParam) * 10);
      if (!isNaN(ratingScaled)) {
        query.rating = { $gte: ratingScaled };
      }
    }

    //Sorting filtering

    let sortQuery = {};

    switch (sortParam) {
      case "price_asc":
        sortQuery = { priceStartingFrom: 1 };
        break;

      case "price_desc":
        sortQuery = { priceStartingFrom: -1 };
        break;

      case "rating_desc":
        sortQuery = { rating: -1 };
        break;

      default:
        // Popularity / default
        sortQuery = {};
    }

    const hotels = await Hotel.find(query)
      .sort(sortQuery)
      .populate("city", "name slug")
      .populate("locality", "name slug")
      .populate("categories", "name slug")
      .select(
        "name slug heroImage rating reviewCount priceStartingFrom hotelAmenities locality city categories"
      )
      .lean();

    const localities = await Locality.find({ city: city._id })
      .select("name slug")
      .lean();

    return NextResponse.json({
      city: {
        name: city.name,
        slug: city.slug,
      },
      locality: locality ? { name: locality.name, slug: locality.slug } : null,
      category: category ? { name: category.name, slug: category.slug } : null,
      hotels,
      localities,
    });
  } catch (err) {
    console.error("Search API error:", err);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
