import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
import { getHomeCitiesService } from "@/lib/services";
import { connectDB } from "@/lib/db";
import HomeCity from "@/models/HomeCity";
import City from "@/models/City"; // Ensure City model is registered

//THIS IS API IS ONLY FOR CREATING HOME CITIES NOTHING ELSE

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
