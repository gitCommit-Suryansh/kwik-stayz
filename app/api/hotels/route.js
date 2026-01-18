// // app/api/hotels/route.js

// import { NextResponse } from "next/server";
// import { connectDB } from "@/lib/db";
// import { revalidateTag } from "next/cache";

// import City from "@/models/City";
// import Locality from "@/models/Locality";
// import Hotel from "@/models/Hotel";
// import Category from "@/models/Category";

// export async function POST(request) {
//   try {
//     await connectDB();
//     const body = await request.json();

//     const {
//       name,
//       slug,
//       citySlug,
//       localitySlug,

//       categories,
//       address,
//       geo,
//       rating,
//       reviewCount,

//       heroImage,
//       gallery,

//       priceStartingFrom,
//       originalPrice,
//       taxes,
//       currency,

//       hotelAmenities,
//       roomTypes,

//       description,
//       policies,
//       nearbyPlaces,
//       faqs,
//       seo,
//       isHomeFeatured,
//     } = body;

//     /* ---------------- Basic Validation ---------------- */
//     if (!name || !slug || !citySlug || !localitySlug) {
//       return NextResponse.json(
//         { message: "name, slug, citySlug and localitySlug are required" },
//         { status: 400 }
//       );
//     }

//     /* ---------------- Resolve City ---------------- */
//     const city = await City.findOne({ slug: citySlug });
//     if (!city) {
//       return NextResponse.json({ message: "City not found" }, { status: 404 });
//     }

//     /* ---------------- Resolve Locality ---------------- */
//     const locality = await Locality.findOne({
//       slug: localitySlug,
//       city: city._id,
//     });

//     if (!locality) {
//       return NextResponse.json(
//         { message: "Locality not found for this city" },
//         { status: 404 }
//       );
//     }

//     /* ---------------- Resolve Categories ---------------- */
//     let categoryIds = [];

//     if (Array.isArray(categories) && categories.length > 0) {
//       const foundCategories = await Category.find({
//         slug: { $in: categories },
//         isActive: true,
//       }).select("_id");

//       categoryIds = foundCategories.map((c) => c._id);
//     }

//     /* ---------------- Duplicate Hotel Slug ---------------- */
//     const existingHotel = await Hotel.findOne({ slug });
//     if (existingHotel) {
//       return NextResponse.json(
//         { message: "Hotel with this slug already exists" },
//         { status: 409 }
//       );
//     }

//     /* ---------------- Create Hotel ---------------- */
//     const hotel = await Hotel.create({
//       name,
//       slug,

//       city: city._id,
//       locality: locality._id,

//       categories: categoryIds,

//       address,
//       geo,
//       rating,
//       reviewCount,

//       heroImage,
//       gallery,

//       priceStartingFrom,
//       originalPrice,
//       taxes,
//       currency,

//       hotelAmenities,
//       roomTypes,

//       description,
//       policies,
//       nearbyPlaces,
//       faqs,
//       seo,
//       isHomeFeatured,

//       isActive: true,
//     });
//     revalidateTag("home-hotels");

//     return NextResponse.json(hotel, { status: 201 });
//   } catch (error) {
//     console.error("POST /api/hotels error:", error);
//     return NextResponse.json(
//       { message: "Failed to create hotel" },
//       { status: 500 }
//     );
//   }
// }

import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import cloudinary from "@/lib/cloudinary";
import { revalidateTag } from "next/cache";

import City from "@/models/City";
import Locality from "@/models/Locality";
import Hotel from "@/models/Hotel";
import Category from "@/models/Category";

export async function POST(request) {
  try {
    await connectDB();

    const formData = await request.formData();

    /* ---------------- Basic Fields ---------------- */
    const name = formData.get("name");
    const slug = formData.get("slug");
    const citySlug = formData.get("citySlug");
    const localitySlug = formData.get("localitySlug");

    const categories = JSON.parse(formData.get("categories") || "[]");

    const address = JSON.parse(formData.get("address") || "{}");
    const geo = JSON.parse(formData.get("geo") || "{}");

    const rating = Number(formData.get("rating"));
    const reviewCount = Number(formData.get("reviewCount"));

    const priceStartingFrom = Number(formData.get("priceStartingFrom"));
    const originalPrice = Number(formData.get("originalPrice"));
    const taxes = Number(formData.get("taxes"));
    const currency = formData.get("currency");

    const hotelAmenities = JSON.parse(formData.get("hotelAmenities") || "[]");
    const roomTypes = JSON.parse(formData.get("roomTypes") || "[]");

    const description = formData.get("description") || "";
    const policies = JSON.parse(formData.get("policies") || {});
    const nearbyPlaces = JSON.parse(formData.get("nearbyPlaces") || []);
    const faqs = JSON.parse(formData.get("faqs") || []);
    const seo = JSON.parse(formData.get("seo") || {});

    const isHomeFeatured = formData.get("isHomeFeatured") === "true";

    /* ---------------- Images ---------------- */
    const heroImageFile = formData.get("heroImage");
    const galleryFiles = formData.getAll("gallery");

    /* ---------------- Validation ---------------- */
    if (!name || !slug || !citySlug || !localitySlug) {
      return NextResponse.json(
        { message: "name, slug, citySlug and localitySlug are required" },
        { status: 400 },
      );
    }

    /* ---------------- Upload Hero Image ---------------- */
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

    /* ---------------- Upload Gallery Images ---------------- */
    const gallery = [];

    for (const file of galleryFiles) {
      if (!file || file.size === 0) continue;

      const buffer = Buffer.from(await file.arrayBuffer());

      const uploadResult = await new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream({ folder: "KWIK-STAYS" }, (error, result) => {
            if (error) reject(error);
            else resolve(result);
          })
          .end(buffer);
      });

      gallery.push(uploadResult.secure_url);
    }

    /* ---------------- Upload Room Type Images ---------------- */
    for (let i = 0; i < roomTypes.length; i++) {
      const file = formData.get(`roomTypeImage_${i}`);
      if (file && file.size > 0) {
        const buffer = Buffer.from(await file.arrayBuffer());

        const uploadResult = await new Promise((resolve, reject) => {
          cloudinary.uploader
            .upload_stream({ folder: "KWIK-STAYS" }, (error, result) => {
              if (error) reject(error);
              else resolve(result);
            })
            .end(buffer);
        });

        roomTypes[i].image = uploadResult.secure_url;
      }
    }

    /* ---------------- Resolve City ---------------- */
    const city = await City.findOne({ slug: citySlug });
    if (!city) {
      return NextResponse.json({ message: "City not found" }, { status: 404 });
    }

    /* ---------------- Resolve Locality ---------------- */
    const locality = await Locality.findOne({
      slug: localitySlug,
      city: city._id,
    });

    if (!locality) {
      return NextResponse.json(
        { message: "Locality not found for this city" },
        { status: 404 },
      );
    }

    /* ---------------- Resolve Categories ---------------- */
    let categoryIds = [];

    if (Array.isArray(categories) && categories.length > 0) {
      const foundCategories = await Category.find({
        slug: { $in: categories },
        isActive: true,
      }).select("_id");

      categoryIds = foundCategories.map((c) => c._id);
    }

    /* ---------------- Duplicate Hotel Check ---------------- */
    const existingHotel = await Hotel.findOne({ slug });
    if (existingHotel) {
      return NextResponse.json(
        { message: "Hotel with this slug already exists" },
        { status: 409 },
      );
    }

    /* ---------------- Create Hotel ---------------- */
    const hotel = await Hotel.create({
      name,
      slug,

      city: city._id,
      locality: locality._id,

      categories: categoryIds,

      address,
      geo,

      rating,
      reviewCount,

      heroImage,
      gallery,

      priceStartingFrom,
      originalPrice,
      taxes,
      currency,

      hotelAmenities,
      roomTypes,

      description,
      policies,
      nearbyPlaces,
      faqs,
      seo,

      isHomeFeatured,
      isActive: true,
    });

    return NextResponse.json(hotel, { status: 201 });
  } catch (error) {
    console.error("POST /api/hotels error:", error);
    return NextResponse.json(
      { message: "Failed to create hotel" },
      { status: 500 },
    );
  }
}
