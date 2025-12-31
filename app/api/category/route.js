// app/api/category/route.js

import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Category from "@/models/Category";

/* ----------------------------------------
   POST /api/category
   Create a new category
-----------------------------------------*/
export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();
    const { name, slug, seoTitle, seoDescription } = body;

    if (!name || !slug) {
      return NextResponse.json(
        { message: "Name and slug are required" },
        { status: 400 }
      );
    }

    // Check for duplicate slug
    const existing = await Category.findOne({ slug });
    if (existing) {
      return NextResponse.json(
        { message: "Category with this slug already exists" },
        { status: 409 }
      );
    }

    const category = await Category.create({
      name: name.trim(),
      slug: slug.toLowerCase(),
      seoTitle: seoTitle?.trim(),
      seoDescription: seoDescription?.trim(),
      isActive: true,
    });

    return NextResponse.json(
      { message: "Category created successfully", category },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST /api/category error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

/* ----------------------------------------
   GET /api/category
   Fetch all active categories
-----------------------------------------*/
export async function GET() {
  try {
    await connectDB();

    const categories = await Category.find({ isActive: true })
      .select("name slug seoTitle seoDescription")
      .sort({ name: 1 })
      .lean();

    return NextResponse.json({ categories });
  } catch (error) {
    console.error("GET /api/category error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
