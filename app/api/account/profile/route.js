import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import User from "@/models/User";
import { verifyToken } from "@/lib/auth/jwt";

export async function PUT(request) {
  try {
    await connectDB();

    // 1. Authenticate User
    const token = request.cookies.get("auth_token")?.value;
    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const decoded = verifyToken(token);
    if (!decoded) {
      return NextResponse.json({ message: "Invalid session" }, { status: 401 });
    }

    const body = await request.json();
    const { name } = body;

    // 2. Update User
    const updatedUser = await User.findByIdAndUpdate(
      decoded.userId,
      { name },
      { new: true } // Return the updated document
    ).select("name email avatar provider"); // Return safe fields

    if (!updatedUser) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ user: updatedUser }, { status: 200 });
  } catch (error) {
    console.error("PUT /api/account/profile error:", error);
    return NextResponse.json(
      { message: "Failed to update profile" },
      { status: 500 }
    );
  }
}
