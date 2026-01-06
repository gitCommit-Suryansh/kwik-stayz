// models/Hotel.js

import mongoose from "mongoose";

const RoomTypeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true },
    price: { type: Number, required: true },
    originalPrice: Number,
    maxGuests: Number,
    beds: String,
    refundable: Boolean,
    amenities: [String],
    image: String,
  },
  { _id: false }
);

const HotelSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      index: true,
    },

    city: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "City",
      required: true,
      index: true,
    },

    locality: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Locality",
      required: true,
      index: true,
    },

    address: {
      street: String,
      area: String,
      city: String,
      state: String,
      pincode: String,
      full: String,
    },

    geo: {
      lat: Number,
      lng: Number,
    },

    heroImage: String,
    gallery: [String],

    rating: {
      type: Number,
      default: 0,
    },

    reviewCount: {
      type: Number,
      default: 0,
    },

    categories: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
      },
    ],

    priceStartingFrom: Number,
    originalPrice: Number,
    taxes: Number,
    currency: {
      type: String,
      default: "INR",
    },

    hotelAmenities: [String],

    roomTypes: [RoomTypeSchema],

    description: String,

    policies: {
      checkIn: String,
      checkOut: String,
      petsAllowed: Boolean,
      idProofRequired: Boolean,
      security: String,
      coupleAllowed: Boolean,
    },

    nearbyPlaces: [
      {
        name: String,
        distanceKm: Number,
      },
    ],

    faqs: [
      {
        question: String,
        answer: String,
      },
    ],

    seo: {
      title: String,
      description: String,
      canonical: String,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Hotel || mongoose.model("Hotel", HotelSchema);
