import { notFound } from "next/navigation";

import SearchBar from "@/components/hotels/SearchBar";
import FiltersSidebar from "@/components/hotels/FiltersSidebar";
import HotelCard from "@/components/hotels/HotelCard";
import MobileSearchActions from "@/components/common/MobileSearchActions";
import { SortSelect } from "@/components/common/SortModal";

import { fetchSearchResults } from "@/lib/hotels";

/* ---------------- SEO (NOINDEX) ---------------- */

export async function generateMetadata() {
  return {
    robots: {
      index: false,
      follow: true,
    },
  };
}

/* ---------------- PAGE ---------------- */

export default async function SearchPage({ searchParams }) {
  const params = await searchParams; // ✅ UNWRAP
  const data = await fetchSearchResults(params);

  if (!data) {
    notFound();
  }

  const { city, locality, hotels, localities, category } = data;

  const headingLocation = locality
    ? `${locality.name}, ${city.name}`
    : city.name;

  return (
    <main className="bg-gray-50 min-h-screen">
      {/* SEARCH BAR */}
      <div className="bg-white shadow-sm sticky top-0 z-40 border-b border-gray-200">
        <SearchBar city={headingLocation} />
      </div>

      <div className="max-w-7xl mx-auto px-4 lg:px-6 py-6">
        {/* HEADER */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-lg lg:text-3xl font-bold text-gray-900 mb-1">
              {hotels.length} {category?.name || ""} Stayz in {headingLocation}
            </h1>
          </div>

          {/* Sort */}
          <SortSelect />
        </div>

        {/* MAIN LAYOUT */}
        <div className="flex gap-6">
          {/* FILTERS */}
          <aside className="hidden lg:block w-72 shrink-0">
            <FiltersSidebar localities={localities} />
          </aside>

          {/* HOTEL LIST */}
          <section className="flex-1 min-w-0">
            <div className="space-y-4">
              {hotels.map((hotel) => (
                <HotelCard key={hotel.slug} hotel={hotel} />
              ))}
            </div>

            {hotels.length === 0 && (
              <div className="text-center py-16 text-gray-600">
                No hotels found for this search.
              </div>
            )}
          </section>
        </div>
      </div>
      <MobileSearchActions localities={localities} />
    </main>
  );
}
