import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
import { getHomeCitiesService } from "@/lib/services";
import { connectDB } from "@/lib/db";
import HomeCity from "@/models/HomeCity";
import City from "@/models/City"; // Ensure City model is registered

//THIS IS API IS ONLY FOR CREATING HOME CITIES NOTHING ELSE

import cloudinary from "@/lib/cloudinary";

export async function POST(request) {
  try {
    await connectDB();
    const formData = await request.formData();

    const city = formData.get("city");
    const displayName = formData.get("displayName");
    const order = formData.get("order");
    const isActive = formData.get("isActive") === "true";
    const heroImageFile = formData.get("heroImage");

    // 1. Basic Validation
    if (!city || !heroImageFile || order === undefined) {
      return NextResponse.json(
        { message: "City ID, heroImage, and order are required" },
        { status: 400 },
      );
    }

    // 2. Upload Image
    let heroImage = "";
    if (heroImageFile && heroImageFile.size > 0) {
      const buffer = Buffer.from(await heroImageFile.arrayBuffer());
      const uploadResult = await new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream({ folder: "KWIK-STAYS" }, (error, result) => {
            if (error) reject(error);
            else resolve(result);
          })
          .end(buffer);
      });
      heroImage = uploadResult.secure_url;
    }

    if (!heroImage) {
      return NextResponse.json(
        { message: "Failed to upload image" },
        { status: 500 },
      );
    }

    // 3. Check if City exists
    const cityExists = await City.findById(city);
    if (!cityExists) {
      return NextResponse.json(
        { message: "Invalid City ID provided" },
        { status: 404 },
      );
    }

    // 4. Check for Duplicate (City) - One HomeCity entry per City
    const existingHomeCity = await HomeCity.findOne({ city });
    if (existingHomeCity) {
      return NextResponse.json(
        { message: "This city is already featured in Home Cities" },
        { status: 409 },
      );
    }

    // 5. Check for Duplicate Order
    const existingOrder = await HomeCity.findOne({ order });
    if (existingOrder) {
      return NextResponse.json(
        { message: `Order position ${order} is already taken` },
        { status: 409 },
      );
    }

    // 6. Create
    const newHomeCity = await HomeCity.create({
      city,
      displayName: displayName || cityExists.name,
      heroImage,
      order,
      isActive,
    });

    return NextResponse.json(newHomeCity, { status: 201 });
  } catch (error) {
    console.error("POST /api/home-cities error:", error);

    // Duplicate key error (if race condition missed by manual checks)
    if (error.code === 11000) {
      return NextResponse.json(
        { message: "Duplicate entry (city or order conflict)" },
        { status: 409 },
      );
    }

    return NextResponse.json(
      { message: "Failed to create home city" },
      { status: 500 },
    );
  }
}

export async function GET() {
  try {
    await connectDB();
    const homeCities = await HomeCity.find()
      .populate("city", "name slug")
      .sort({ order: 1 })
      .lean();

    return NextResponse.json(homeCities);
  } catch (error) {
    console.error("GET /api/home-cities error:", error);
    return NextResponse.json(
      { message: "Failed to fetch home cities" },
      { status: 500 },
    );
  }
}
