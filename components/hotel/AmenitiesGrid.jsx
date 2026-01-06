"use client";

import { useState, useEffect } from "react";
import { getAmenityIcon } from "./amenityUtils";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function AmenitiesGrid({ amenities }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [visibleCount, setVisibleCount] = useState(6); // Default to desktop limit (6)

  useEffect(() => {
    const handleResize = () => {
      // Mobile (< 768px): 2 cols * 4 rows = 8 items
      // Desktop (>= 768px): 3 cols * 2 rows = 6 items
      if (window.innerWidth < 768) {
        setVisibleCount(8);
      } else {
        setVisibleCount(6);
      }
    };

    // Initial check
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const displayedAmenities = isExpanded ? amenities : amenities.slice(0, visibleCount);
  const hasMore = amenities.length > visibleCount;

  return (
    <section className="my-8 pt-8 border-t border-gray-100">
      <h2 className="text-xl md:text-2xl font-bold mb-6 text-gray-900">Amenities</h2>
      <div className="grid grid-cols-2 gap-y-4 gap-x-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-3">
        {displayedAmenities.map((am) => {
          const Icon = getAmenityIcon(am);
          return (
            <div key={am} className="flex items-center gap-3 text-gray-700">
              <Icon size={20} className="text-gray-400 flex-shrink-0" />
              <span className="text-sm md:text-base text-gray-700">{am}</span>
            </div>
          );
        })}
      </div>

      {hasMore && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="mt-6 flex items-center gap-1 text-[#f02f32] font-semibold text-sm hover:underline"
        >
          {isExpanded ? "View less amenities" : `View all ${amenities.length} amenities`}
          {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>
      )}
    </section>
  );
}
