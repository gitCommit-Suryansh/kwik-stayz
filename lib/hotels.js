// lib/hotels.js

export async function fetchHotelsByCity(citySlug) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/hotels/city/${citySlug}`,
    {
      // Important for SEO + freshness
      cache: "no-store",
      // or later: next: { revalidate: 3600 }
    }
  );

  if (!res.ok) {
    return null;
  }

  return res.json();
}

export async function fetchHotelsByLocality(citySlug, localitySlug) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/hotels/city/${citySlug}/${localitySlug}`,
    { cache: "no-store" }
  );
  if (!res.ok) return null;
  return res.json();
}

export async function fetchHotelsByCategoryCity(categorySlug, citySlug) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/hotels/category/${categorySlug}/${citySlug}`,
    { cache: "no-store" }
  );
  if (!res.ok) return null;
  return res.json();
}
