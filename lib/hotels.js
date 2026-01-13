// lib/hotels.js

export async function fetchHotelsByCity(citySlug) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/hotels/city/${citySlug}`,
    {
      next: { revalidate: 3600 },
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
    { next: { revalidate: 3600 } }
  );
  if (!res.ok) return null;
  return res.json();
}

export async function fetchHotelsByCategoryCity(categorySlug, citySlug) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/hotels/category/${categorySlug}/${citySlug}`,
    { next: { revalidate: 3600 } }
  );
  if (!res.ok) return null;
  return res.json();
}

export async function fetchSearchResults(params) {
  const cleanParams = {};

  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== "") {
      cleanParams[key] = value;
    }
  }

  const query = new URLSearchParams(cleanParams).toString();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/search?${query}`,
    { cache: "no-store" }
  );

  if (!res.ok) return null;
  return res.json();
}
