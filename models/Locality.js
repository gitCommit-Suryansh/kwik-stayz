// models/Locality.js

import mongoose from "mongoose";

const LocalitySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      required: true,
      lowercase: true,
      index: true,
    },

    city: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "City",
      required: true,
      index: true,
    },

    description: {
      type: String,
    },

    seo: {
      title: String,
      description: String,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

// Prevent duplicate locality slugs within the same city
LocalitySchema.index({ slug: 1, city: 1 }, { unique: true });

export default mongoose.models.Locality ||
  mongoose.model("Locality", LocalitySchema);
