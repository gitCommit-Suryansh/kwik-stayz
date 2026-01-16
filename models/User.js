import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: { type: String },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    // Auth providers
    googleId: { type: String, default: null },
    password: { type: String, default: null, select: false },

    avatar: { type: String },

    provider: {
      type: String,
      enum: ["google", "email"],
      required: true,
    },
    wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: "Hotel" }],
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model("User", UserSchema);
