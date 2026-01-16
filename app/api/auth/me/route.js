import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import User from "@/models/User";
import { verifyToken } from "@/lib/auth/jwt";

export async function GET(req) {
  try {
    await connectDB();

    const token = req.cookies.get("auth_token")?.value;

    if (!token) {
      return NextResponse.json({ user: null }, { status: 200 });
    }

    const decoded = verifyToken(token);

    const user = await User.findById(decoded.userId)
      .select("name email avatar provider wishlist")
      .lean();

    if (!user) {
      return NextResponse.json({ user: null }, { status: 200 });
    }

    return NextResponse.json({
      user,
    });
  } catch (err) {
    console.error("Auth me error:", err);
    return NextResponse.json(
      { user: null },
      { status: 200 } // IMPORTANT: never 401 here
    );
  }
}
