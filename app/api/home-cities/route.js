import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";

import { connectDB } from "@/lib/db";
import HomeCity from "@/models/HomeCity";
import City from "@/models/City"; // Ensure City model is registered

export async function GET() {
  try {
    await connectDB();

    // Fetch active home cities, populated with city details
    const homeCities = await HomeCity.find({ isActive: true })
      .populate("city", "name slug state country") // Populate specific fields from City
      .sort({ order: 1 }) // Sort by priority order
      .lean();

    return NextResponse.json(homeCities, {
      status: 200,
      headers: {
        "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=3600",
      },
    });
  } catch (error) {
    console.error("GET /api/home-cities error:", error);
    return NextResponse.json(
      { message: "Failed to fetch home cities" },
      { status: 500, headers: { "Cache-Control": "no-cache" } }
    );
  }
}

export async function POST(request) {
  try {
    await connectDB();
    const body = await request.json();

    const { city, displayName, heroImage, order, isActive } = body;

    // 1. Basic Validation
    if (!city || !heroImage || order === undefined) {
      return NextResponse.json(
        { message: "City ID, heroImage, and order are required" },
        { status: 400 }
      );
    }

    // 2. Check if City exists
    const cityExists = await City.findById(city);
    if (!cityExists) {
      return NextResponse.json(
        { message: "Invalid City ID provided" },
        { status: 404 }
      );
    }

    // 3. Check for Duplicate (City) - One HomeCity entry per City
    const existingHomeCity = await HomeCity.findOne({ city });
    if (existingHomeCity) {
      return NextResponse.json(
        { message: "This city is already featured in Home Cities" },
        { status: 409 }
      );
    }

    // 4. Check for Duplicate Order
    const existingOrder = await HomeCity.findOne({ order });
    if (existingOrder) {
      return NextResponse.json(
        { message: `Order position ${order} is already taken` },
        { status: 409 }
      );
    }

    // 5. Create
    const newHomeCity = await HomeCity.create({
      city,
      displayName: displayName || cityExists.name,
      heroImage,
      order,
      isActive: isActive !== undefined ? isActive : true,
    });

    revalidateTag("home-cities");

    return NextResponse.json(newHomeCity, { status: 201 });
  } catch (error) {
    console.error("POST /api/home-cities error:", error);

    // Duplicate key error (if race condition missed by manual checks)
    if (error.code === 11000) {
      return NextResponse.json(
        { message: "Duplicate entry (city or order conflict)" },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { message: "Failed to create home city" },
      { status: 500 }
    );
  }
}
