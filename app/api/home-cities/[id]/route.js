import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import HomeCity from "@/models/HomeCity";

export async function DELETE(request, { params }) {
  try {
    await connectDB();
    const { id } = await params;

    const deleted = await HomeCity.findByIdAndDelete(id);

    if (!deleted) {
      return NextResponse.json(
        { message: "Home City not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(
      { message: "Home City deleted successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.error("DELETE /api/home-cities/[id] error:", error);
    return NextResponse.json(
      { message: "Failed to delete home city" },
      { status: 500 },
    );
  }
}
