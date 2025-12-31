// app/hotels/[city]/[locality]/page.js
import { notFound } from "next/navigation";

import SearchBar from "@/components/hotels/SearchBar";
import FiltersSidebar from "@/components/hotels/FiltersSidebar";
import HotelCard from "@/components/hotels/HotelCard";

import { fetchHotelsByLocality } from "@/lib/hotels";
import { getLocalitySeoContent } from "@/lib/seo/localitySeo";
import { fetchLocalitiesByCity } from "@/lib/localities";
import { generateFaqSchema } from "@/lib/seo/generateFaqSchema";

export async function generateMetadata({ params }) {
  const { citySlug, localitySlug } = await params;

  const data = await fetchHotelsByLocality(citySlug, localitySlug);

  if (!data) {
    return {
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const cityName = citySlug.replace(/-/g, " ");
  const localityName = localitySlug.replace(/-/g, " ");

  return {
    title: `Hotels in ${localityName}, ${cityName} | Best Prices`,
    description: `Book hotels in ${localityName}, ${cityName}. Compare prices, amenities and reviews.`,
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/hotels/${citySlug}/${localitySlug}`,
    },
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title: `Hotels in ${localityName}, ${cityName} | Best Prices`,
      description: `Book hotels in ${localityName}, ${cityName}. Compare prices, amenities and reviews.`,
      type: "website",
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/hotels/${citySlug}/${localitySlug}`,
    },
    twitter: {
      title: `Hotels in ${localityName}, ${cityName} | Best Prices`,
      description: `Book hotels in ${localityName}, ${cityName}. Compare prices, amenities and reviews.`,
      card: "summary_large_image",
      images: [
        {
          url: "/default-hotel.jpg",
          alt: `Hotels in ${localityName}, ${cityName}`,
        },
      ],
    },
  };
}

export default async function HotelsByLocalityPage({ params }) {
  const { citySlug, localitySlug } = await params;

  const data = await fetchHotelsByLocality(citySlug, localitySlug);
  const localities = await fetchLocalitiesByCity(citySlug);

  if (!data) {
    notFound();
  }

  const { city: cityObj, locality: localityObj, hotels } = data;

  const seoContent = getLocalitySeoContent({
    city: cityObj,
    locality: localityObj,
  });

  const localityFaqs = [
    {
      question: `What are the best hotels in ${localityObj.name}, ${cityObj.name}?`,
      answer: `Many hotels in ${localityObj.name}, ${cityObj.name} offer comfortable rooms, good amenities, and affordable prices.`,
    },
    {
      question: `Are there budget hotels in ${localityObj.name}, ${cityObj.name}?`,
      answer: `Yes, ${localityObj.name}, ${cityObj.name} has budget hotels with basic amenities and affordable prices.`,
    },
    {
      question: `Can I find hotels near business hubs in ${localityObj.name}, ${cityObj.name}?`,
      answer: `Many hotels in ${localityObj.name}, ${cityObj.name} are located close to IT parks, offices, and commercial areas.`,
    },
    {
      question: `Is ${localityObj.name} a good area to stay in ${cityObj.name}?`,
      answer: `Yes, ${localityObj.name} is a popular locality in ${cityObj.name} offering good connectivity, restaurants, and hotels for all budgets.`,
    },
    {
      question: `Are budget hotels available in ${localityObj.name}?`,
      answer: `Yes, travelers can find multiple budget and mid-range hotels in ${localityObj.name}, ${cityObj.name}.`,
    },
  ];

  const faqSchema = generateFaqSchema(localityFaqs);

  return (
    <>
      <main className="bg-gray-50 min-h-screen">
        {/* Search */}
        <div className="bg-white sticky top-0 z-40 border-b">
          <SearchBar city={cityObj.name} />
        </div>

        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-6">
          {/* Header */}
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
                  {cityObj.name} Hotels
                </span>
              </li>
              <li className="text-gray-400">&gt;</li>
              <li>
                <span className="text-gray-900 font-medium">
                  {localityObj.name} Hotels
                </span>
              </li>
            </ol>
          </nav>

          <h1 className="text-2xl lg:text-3xl font-bold mb-2">
            Hotels in {localityObj.name}, {cityObj.name}
          </h1>
          <p className="text-sm text-gray-600 mb-6">
            {hotels.length}+ Hotels in {localityObj.name}, {cityObj.name}
          </p>

          <div className="flex gap-6">
            {/* Filters */}
            <aside className="hidden lg:block w-72">
              <FiltersSidebar localities={localities} />
            </aside>

            {/* Listings */}
            <section className="flex-1 space-y-4">
              {hotels.map((hotel) => (
                <HotelCard key={hotel.slug} hotel={hotel} />
              ))}
            </section>
          </div>

          <article className="mt-12 bg-white rounded-xl shadow-sm p-6 lg:p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              About Hotels in {localityObj.name}, {cityObj.name}
            </h2>

            <div className="prose prose-sm max-w-none text-gray-600 space-y-4">
              <p>{seoContent.intro}</p>
              <p>{seoContent.footer}</p>
            </div>

            {localities && localities.length > 0 && (
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Popular Localities in {cityObj.name}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {localities.map((locality) => (
                    <a
                      key={locality.slug}
                      href={`/hotels/${cityObj.slug}/${locality.slug}`}
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

      {/* ---------- ItemList Schema ---------- */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",

            name: `Hotels in ${localityObj.name}, ${cityObj.name}`,

            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": `${process.env.NEXT_PUBLIC_BASE_URL}/hotels/${cityObj.slug}/${localityObj.slug}`,
            },

            numberOfItems: hotels.length,

            itemListElement: hotels.map((h, i) => ({
              "@type": "ListItem",
              position: i + 1,
              url: `${process.env.NEXT_PUBLIC_BASE_URL}/hotel/${h.slug}`,
              name: h.name,
            })),
          }),
        }}
      />

      {/* ---------- Breadcrumb Schema ---------- */}
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
                item: process.env.NEXT_PUBLIC_BASE_URL,
              },
              {
                "@type": "ListItem",
                position: 2,
                name: `${cityObj.name} Hotels`,
                item: `${process.env.NEXT_PUBLIC_BASE_URL}/hotels/${cityObj.slug}`,
              },
              {
                "@type": "ListItem",
                position: 3,
                name: `${localityObj.name} Hotels`,
                item: `${process.env.NEXT_PUBLIC_BASE_URL}/hotels/${cityObj.slug}/${localityObj.slug}`,
              },
            ],
          }),
        }}
      />

      {/* ---------- FAQ Schema ---------- */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />
    </>
  );
}
