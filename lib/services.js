import { connectDB } from "@/lib/db";
import Hotel from "@/models/Hotel";
import HomeCity from "@/models/HomeCity";
import City from "@/models/City";
import Locality from "@/models/Locality";

export async function getHomeHotelsService() {
  await connectDB();
  const hotels = await Hotel.find({ isHomeFeatured: true })
    .select(
      "name slug city locality rating reviewCount heroImage priceStartingFrom originalPrice hotelAmenities roomTypes isHomeFeatured isActive"
    )
    .populate("city", "name")
    .populate("locality", "name");

  return JSON.parse(JSON.stringify(hotels));
}

export async function getHomeCitiesService() {
  await connectDB();

  if (!City) {
    /* No-op just to ensure import structure is valid, but importing it above is enough */
  }

  const homeCities = await HomeCity.find({ isActive: true })
    .populate("city", "name slug state country")
    .sort({ order: 1 })
    .lean();

  return JSON.parse(JSON.stringify(homeCities));
}
