// app/api/localities/route.js

import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import City from "@/models/City";
import Locality from "@/models/Locality";

//Return all Locality in a city based on citySlug params

export async function GET(request,{params}) {
  try {
    await connectDB();

    const { citySlug } = await params;

    if (!citySlug) {
      return NextResponse.json(
        { message: "citySlug query param is required" },
        { status: 400 }
      );
    }

    const city = await City.findOne({ slug: citySlug });
    if (!city) {
      return NextResponse.json(
        { message: "City not found" },
        { status: 404 }
      );
    }

    const localities = await Locality.find({
      city: city._id,
      isActive: true,
    })
      .sort({ name: 1 })
      .lean();

    return NextResponse.json(localities, { status: 200 });
  } catch (error) {
    console.error("GET /api/localities error:", error);
    return NextResponse.json(
      { message: "Failed to fetch localities" },
      { status: 500 }
    );
  }
}

//Locality creation api

export async function POST(request) {
  try {
    await connectDB();
    const body = await request.json();

    const { name, slug, citySlug, description, seo } = body;

    if (!name || !slug || !citySlug) {
      return NextResponse.json(
        { message: "Name, slug and citySlug are required" },
        { status: 400 }
      );
    }

    const city = await City.findOne({ slug: citySlug });
    if (!city) {
      return NextResponse.json(
        { message: "City not found" },
        { status: 404 }
      );
    }

    const existingLocality = await Locality.findOne({
      slug,
      city: city._id,
    });

    if (existingLocality) {
      return NextResponse.json(
        { message: "Locality already exists in this city" },
        { status: 409 }
      );
    }

    const locality = await Locality.create({
      name,
      slug,
      city: city._id,
      description,
      seo,
    });

    return NextResponse.json(locality, { status: 201 });
  } catch (error) {
    console.error("POST /api/localities error:", error);
    return NextResponse.json(
      { message: "Failed to create locality" },
      { status: 500 }
    );
  }
}
