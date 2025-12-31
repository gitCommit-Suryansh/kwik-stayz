// app/hotels/[citySlug]/page.js
import { notFound } from "next/navigation";

import SearchBar from "@/components/hotels/SearchBar";
import FiltersSidebar from "@/components/hotels/FiltersSidebar";
import HotelCard from "@/components/hotels/HotelCard";

import { fetchHotelsByCity } from "@/lib/hotels";
import { getCitySeoContent } from "@/lib/seo/citySeo";
import { generateFaqSchema } from "@/lib/seo/generateFaqSchema";

/* ---------------- SEO METADATA ---------------- */

export async function generateMetadata({ params }) {
  const { citySlug } = await params;

  const data = await fetchHotelsByCity(citySlug);

  if (!data || data.hotels.length === 0) {
    return {
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const cityName = citySlug.replace(/-/g, " ");

  return {
    title: `Hotels in ${cityName} | Budget, Premium & Business Stays`,
    description: `Book hotels in ${cityName} with verified reviews, best prices, and flexible stays. Compare budget, premium, and business hotels easily.`,

    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/hotels/${citySlug}`,
    },
    robots: {
      index: true,
      follow: true,
    },

    openGraph: {
      title: `Hotels in ${cityName} | Best Prices`,
      description: `Compare hotels in ${cityName}. Book budget and premium stays with trusted reviews.`,
      type: "website",
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/hotels/${citySlug}`,
    },

    twitter: {
      card: "summary_large_image",
      title: `Hotels in ${cityName} | Best Prices`,
      description: `Compare hotels in ${cityName}. Book budget and premium stays with trusted reviews.`,
      images: [
        {
          url: "/default-hotel.jpg",
          alt: `Hotels in ${cityName}`,
        },
      ],
    },
  };
}

/* ---------------- PAGE ---------------- */

export default async function HotelsByCityPage({ params }) {
  const { citySlug } = await params;
  const data = await fetchHotelsByCity(citySlug);

  if (!data) {
    return notFound();
  }

  const { city, hotels, localities } = data;

  const seo = getCitySeoContent(city, localities);
  const cityFaqs = [
    {
      question: `What are the best areas to stay in ${city.name}?`,
      answer: `${city.name} offers popular localities such as ${localities
        .slice(0, 3)
        .map((l) => l.name)
        .join(", ")} with good connectivity and hotels for all budgets.`,
    },
    {
      question: `Are budget hotels available in ${city.name}?`,
      answer: `Yes, ${city.name} has a wide range of budget hotels with clean rooms, essential amenities, and affordable prices.`,
    },
    {
      question: `Can I find hotels near business hubs in ${city.name}?`,
      answer: `Yes, many hotels in ${city.name} are located close to IT parks, offices, and commercial areas.`,
    },
  ];

  const faqSchema = generateFaqSchema(cityFaqs);

  return (
    <>
      <main className="bg-gray-50 min-h-screen">
        {/* ---------------------------------- */}
        {/* SEARCH BAR (Sticky) */}
        {/* ---------------------------------- */}
        <div className="bg-white shadow-sm sticky top-0 z-40 border-b border-gray-200">
          <SearchBar city={city.name} />
        </div>

        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-6">
          {/* ---------------------------------- */}
          {/* BREADCRUMB & PAGE HEADER */}
          {/* ---------------------------------- */}
          <nav className="mb-4" aria-label="Breadcrumb">
            <ol className="flex items-center gap-2 text-sm text-gray-600">
              <li>
                <a
                  href="/"
                  className="hover:text-emerald-600 transition-colors"
                >
                  India
                </a>
              </li>
              <li className="text-gray-400">&gt;</li>
              <li>
                <span className="text-gray-900 font-medium">
                  {city.name} Hotels
                </span>
              </li>
            </ol>
          </nav>

          <div className="flex items-center justify-between mb-6">
            <div>
              {/* SEO H1 — VISIBLE AND STYLED */}
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-1">
                Hotels in {city.name}
              </h1>
              <p className="text-sm text-gray-600">
                {hotels.length}+ Hotels in {city.name}
              </p>
            </div>

            {/* Map View Toggle & Sort */}
            <div className="flex items-center gap-3">
              <button className="hidden md:flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:border-emerald-500 transition-colors">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                  />
                </svg>
                <span className="text-sm font-medium">Map View</span>
              </button>

              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Sort By</span>
                <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500">
                  <option>Popularity</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Guest Rating</option>
                </select>
              </div>
            </div>
          </div>

          {/* ---------------------------------- */}
          {/* MAIN LAYOUT */}
          {/* ---------------------------------- */}
          <div className="flex gap-6">
            {/* LEFT FILTERS */}
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

              {/* Load More / Pagination */}
              {hotels.length >= 20 && (
                <div className="mt-8 text-center">
                  <button className="px-6 py-3 border-2 border-emerald-500 text-emerald-600 font-semibold rounded-lg hover:bg-emerald-50 transition-colors">
                    Load More Hotels
                  </button>
                </div>
              )}
            </section>
          </div>

          {/* ---------------------------------- */}
          {/* SEO CONTENT — BOTTOM SECTION */}
          {/* ---------------------------------- */}
          <article className="mt-12 bg-white rounded-xl shadow-sm p-6 lg:p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              About Hotels in {city.name}
            </h2>

            <div className="prose prose-sm max-w-none text-gray-600 space-y-4">
              <p>{seo.intro}</p>
              <p>{seo.footer}</p>
            </div>

            {/* Popular Localities */}
            {localities && localities.length > 0 && (
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Popular Localities in {city.name}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {localities.map((locality) => (
                    <a
                      key={locality.slug}
                      href={`/hotels/${city.slug}/${locality.slug}`}
                      className="px-4 py-2 bg-gray-100 hover:bg-emerald-50 text-gray-700 hover:text-emerald-700 rounded-lg text-sm font-medium transition-colors"
                    >
                      {locality.name}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </article>
        </div>
      </main>

      {/* -------- Breadcrumb Structured Data (SEO) -------- */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "India",
                item: `${process.env.NEXT_PUBLIC_BASE_URL}`,
              },
              {
                "@type": "ListItem",
                position: 2,
                name: `${city.name} Hotels`,
                item: `${process.env.NEXT_PUBLIC_BASE_URL}/hotels/${city.slug}`,
              },
            ],
          }),
        }}
      />

      {/* -------- FAQ Structured Data (SEO) -------- */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />

      {/* -------- Structured Data: ItemList (Hotels) -------- */}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",

            name: `Hotels in ${city.name}`,

            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": `${process.env.NEXT_PUBLIC_BASE_URL}/hotels/${city.slug}`,
            },

            numberOfItems: hotels.length,

            itemListElement: hotels.map((hotel, index) => ({
              "@type": "ListItem",
              position: index + 1,
              url: `${process.env.NEXT_PUBLIC_BASE_URL}/hotel/${hotel.slug}`,
              name: hotel.name,
            })),
          }),
        }}
      />
    </>
  );
}
