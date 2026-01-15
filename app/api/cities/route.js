// app/api/cities/route.js

import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import City from "@/models/City";

export async function GET() {
  try {
    await connectDB();

    const cities = await City.find({ isActive: true }).sort({ name: 1 }).lean();

    return NextResponse.json(cities, { status: 200 });
  } catch (error) {
    console.error("GET /api/cities error:", error);
    return NextResponse.json(
      { message: "Failed to fetch cities" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    await connectDB();
    const body = await request.json();

    const { name, slug, state, country, description, seo } = body;

    if (!name || !slug || !state) {
      return NextResponse.json(
        { message: "Name, slug and state are required" },
        { status: 400 }
      );
    }

    const existingCity = await City.findOne({ slug });
    if (existingCity) {
      return NextResponse.json(
        { message: "City with this slug already exists" },
        { status: 409 }
      );
    }

    const city = await City.create({
      name,
      slug,
      state,
      country,
      description,
      seo,
    });

    return NextResponse.json(city, { status: 201 });
  } catch (error) {
    console.error("POST /api/cities error:", error);
    return NextResponse.json(
      { message: "Failed to create city" },
      { status: 500 }
    );
  }
}
