// app/(categories)/[categorySlug]/[citySlug]/page.js
import { notFound } from "next/navigation";

import SearchBar from "@/components/hotels/SearchBar";
import FiltersSidebar from "@/components/hotels/FiltersSidebar";
import HotelCard from "@/components/hotels/HotelCard";

import { fetchHotelsByCategoryCity } from "@/lib/hotels";
import { generateFaqSchema } from "@/lib/seo/generateFaqSchema";

/* ---------------- SEO METADATA ---------------- */

export async function generateMetadata({ params }) {
  const { categorySlug, citySlug } = await params;

  const data = await fetchHotelsByCategoryCity(categorySlug, citySlug);

  if (!data || data.hotels.length === 0) {
    return {
      robots: { index: false, follow: false },
    };
  }

  const { city, category } = data;

  const title =
    category.seoTitle?.replace("{{city}}", city.name) ||
    `${category.name} in ${city.name}`;

  const description =
    category.seoDescription?.replace("{{city}}", city.name) ||
    `Book ${category.name.toLowerCase()} in ${city.name}.`;

  const canonical = `${process.env.NEXT_PUBLIC_BASE_URL}/${category.slug}/${city.slug}`;

  return {
    title,
    description,

    alternates: {
      canonical,
    },

    robots: {
      index: true,
      follow: true,
      "max-image-preview": "large",
    },

    openGraph: {
      title,
      description,
      type: "website",
      url: canonical,
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

/* ---------------- PAGE ---------------- */

export default async function CategoryCityHotelsPage({ params }) {
  const { categorySlug, citySlug } = await params;

  const data = await fetchHotelsByCategoryCity(categorySlug, citySlug);

  if (!data) {
    notFound();
  }

  const { city, category, hotels, localities } = data;

  const categoryFaqs = [
    {
      question: `What are the best ${category.name.toLowerCase()} in ${
        city.name
      }?`,
      answer: `${category.name} in ${
        city.name
      } are available across popular areas such as ${localities
        .slice(0, 3)
        .map((l) => l.name)
        .join(", ")} with good amenities and competitive prices.`,
    },
    {
      question: `Are ${category.name.toLowerCase()} affordable in ${
        city.name
      }?`,
      answer: `Yes, you can find multiple ${category.name.toLowerCase()} in ${
        city.name
      } offering comfortable stays at competitive prices.`,
    },
    {
      question: `Can I book ${category.name.toLowerCase()} online in ${
        city.name
      }?`,
      answer: `Yes, all ${category.name.toLowerCase()} in ${
        city.name
      } listed here can be booked online with verified reviews.`,
    },
  ];

  const faqSchema = generateFaqSchema(categoryFaqs);

  return (
    <>
      <main className="bg-gray-50 min-h-screen">
        {/* SEARCH BAR */}
        <div className="bg-white shadow-sm sticky top-0 z-40 border-b border-gray-200">
          <SearchBar city={city.name} />
        </div>

        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-6">
          {/* BREADCRUMB */}
          <nav className="mb-4" aria-label="Breadcrumb">
            <ol className="flex items-center gap-2 text-sm text-gray-600">
              <li>
                <a href="/" className="hover:text-emerald-600">
                  India
                </a>
              </li>
              <li className="text-gray-400">&gt;</li>
              <li>
                <a
                  href={`/${category.slug}`}
                  className="hover:text-emerald-600"
                >
                  {category.name}
                </a>
              </li>
              <li className="text-gray-400">&gt;</li>
              <li>
                <span className="text-gray-900 font-medium">{city.name}</span>
              </li>
            </ol>
          </nav>

          {/* HEADER */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-1">
                {category.name} in {city.name}
              </h1>
              <p className="text-sm text-gray-600">
                {hotels.length}+ {category.name} in {city.name}
              </p>
            </div>
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
            </section>
          </div>

          {/* SEO CONTENT */}
          <article className="mt-12 bg-white rounded-xl shadow-sm p-6 lg:p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              About {category.name} in {city.name}
            </h2>

            <div className="prose prose-sm max-w-none text-gray-600 space-y-4">
              <p>
                {category.name} in {city.name} offer comfortable stays with
                essential amenities and convenient locations.
              </p>
              <p>
                Travelers can choose from multiple options across popular
                localities such as{" "}
                {localities.slice(0, 5).map((l, i) => (
                  <a
                    key={l.slug}
                    href={`/hotels/${city.slug}/${l.slug}`}
                    className="text-emerald-600 hover:underline"
                  >
                    {l.name}
                    {i < 4 ? ", " : ""}
                  </a>
                ))}
                .
              </p>
            </div>
          </article>
        </div>
      </main>

      {/* -------- Breadcrumb Schema -------- */}
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
                name: category.name,
                item: `${process.env.NEXT_PUBLIC_BASE_URL}/${category.slug}`,
              },
              {
                "@type": "ListItem",
                position: 3,
                name: city.name,
                item: `${process.env.NEXT_PUBLIC_BASE_URL}/${category.slug}/${city.slug}`,
              },
            ],
          }),
        }}
      />

      {/* -------- FAQ Schema -------- */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />

      {/* -------- ItemList Schema -------- */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",

            name: `${category.name} in ${city.name}`,

            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": `${process.env.NEXT_PUBLIC_BASE_URL}/${category.slug}/${city.slug}`,
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
