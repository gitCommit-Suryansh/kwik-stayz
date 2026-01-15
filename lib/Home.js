import { getHomeCitiesService, getHomeHotelsService } from "@/lib/services";

export async function fetchHomeCities() {
  // If we are on the server, call the DB directly to avoid build-time fetch errors
  try {
    const data = await getHomeCitiesService();
    return data;
  } catch (error) {
    console.error("fetchHomeCities error:", error);
    return [];
  }
}

export async function fetchHomeHotels() {
  try {
    const data = await getHomeHotelsService();
    return data;
  } catch (error) {
    console.error("fetchHomeHotels error:", error);
    return [];
  }
}
