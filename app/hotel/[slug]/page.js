import { notFound } from "next/navigation";

import HotelClientShell from "./HotelClientShell";
import { fetchHotelBySlug } from "@/lib/hotel";

export async function generateMetadata({ params }) {
  const { slug } = await params;

  const hotel = await fetchHotelBySlug(slug);

  if (!hotel || !hotel.isActive) {
    return {
      robots: { index: false, follow: false },
    };
  }

  const title =
    hotel.seo?.title ||
    `${hotel.name} Hotel in ${hotel.locality?.name}, ${hotel.city?.name} | Best Price`;

  const description =
    hotel.seo?.description ||
    `Book ${hotel.name} hotel in ${hotel.locality?.name}, ${hotel.city?.name}. Check photos, amenities, reviews and best prices.`;

  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/hotel/${hotel.slug}`;

  return {
    title,
    description,

    alternates: {
      canonical: url,
    },

    openGraph: {
      title,
      description,
      url,
      type: "website",
      images: hotel.heroImage
        ? [
            {
              url: hotel.heroImage,
              alt: `${hotel.name} hotel in ${hotel.locality?.name}`,
            },
          ]
        : [],
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: hotel.heroImage ? [hotel.heroImage] : [],
    },
  };
}

export default async function HotelDetailsPage({ params }) {
  const { slug } = await params;

  const hotel = await fetchHotelBySlug(slug);

  if (!hotel || !hotel.isActive) {
    return notFound();
  }

  const breadcrumbSchema = {
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
        name: `${hotel.city.name} Hotels`,
        item: `${process.env.NEXT_PUBLIC_BASE_URL}/hotels/${hotel.city.slug}`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: `${hotel.locality.name} Hotels`,
        item: `${process.env.NEXT_PUBLIC_BASE_URL}/hotels/${hotel.city.slug}/${hotel.locality.slug}`,
      },
      {
        "@type": "ListItem",
        position: 4,
        name: hotel.name,
        item: `${process.env.NEXT_PUBLIC_BASE_URL}/hotel/${hotel.slug}`,
      },
    ],
  };

  const hotelSchema = {
    "@context": "https://schema.org",
    "@type": "LodgingBusiness",

    name: hotel.name,

    image: [
      ...(hotel.heroImage ? [hotel.heroImage] : []),
      ...(hotel.gallery || []),
    ],

    address: {
      "@type": "PostalAddress",
      addressLocality: hotel.locality.name,
      addressRegion: hotel.city.name,
      addressCountry: "IN",
    },

    aggregateRating: hotel.rating
      ? {
          "@type": "AggregateRating",
          ratingValue: (hotel.rating / 10).toFixed(1),
          reviewCount: hotel.reviewCount || 3,
        }
      : undefined,

    /* ✅ STATIC REVIEWS (TEMPORARY) */
    review: [
      {
        "@type": "Review",
        author: {
          "@type": "Person",
          name: "Rahul Sharma",
        },
        datePublished: "2025-03-15",
        reviewBody:
          "Clean rooms, good location and polite staff. Value for money stay.",
        reviewRating: {
          "@type": "Rating",
          ratingValue: "4.5",
          bestRating: "5",
        },
      },
      {
        "@type": "Review",
        author: {
          "@type": "Person",
          name: "Ananya Verma",
        },
        datePublished: "2025-12-21",
        reviewBody:
          "Comfortable stay with nice amenities. Would recommend for families.",
        reviewRating: {
          "@type": "Rating",
          ratingValue: "4.2",
          bestRating: "5",
        },
      },
    ],

    priceRange: `₹${hotel.priceStartingFrom}+`,

    offers: {
      "@type": "Offer",
      priceCurrency: "INR",
      price: hotel.priceStartingFrom,
      availability: "https://schema.org/InStock",
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/hotel/${hotel.slug}`,
    },

    geo: {
      "@type": "GeoCoordinates",
      latitude: hotel.geo.lat,
      longitude: hotel.geo.lng,
    },

    url: `${process.env.NEXT_PUBLIC_BASE_URL}/hotel/${hotel.slug}`,
  };

  const faqSchema =
    hotel.faqs?.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: hotel.faqs.map((f) => ({
            "@type": "Question",
            name: f.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: f.answer,
            },
          })),
        }
      : null;

  return (
    <>
      {/* Breadcrumb Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />

      {/* Hotel Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(hotelSchema),
        }}
      />

      {/* FAQ Schema */}
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(faqSchema),
          }}
        />
      )}

      <HotelClientShell hotel={hotel} />
    </>
  );
}
