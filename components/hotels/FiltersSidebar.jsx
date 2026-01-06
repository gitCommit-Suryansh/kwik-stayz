"use client";

import { useSearchParams, useRouter } from "next/navigation";
import {
  ChevronDown,
  ChevronUp,
  Wifi,
  Car,
  Utensils,
  Wind,
  Star
} from "lucide-react";
import { useState, useEffect } from "react";

export default function FiltersSidebar({ isMobile = false }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  /* -----------------------------------------
     State & Handlers
  ------------------------------------------ */

  const [expandedSections, setExpandedSections] = useState({
    price: true,
    amenities: true,
    rating: false,
  });

  const toggleSection = (key) => {
    setExpandedSections((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  // Local state for deferred application
  const [filters, setFilters] = useState({
    priceMin: null,
    priceMax: null,
    amenities: [],
    rating: null,
  });

  // Sync with URL when it changes (initial load or navigation)
  useEffect(() => {
    const pMin = searchParams.get("priceMin");
    const pMax = searchParams.get("priceMax");
    const am = searchParams.get("amenities");
    const r = searchParams.get("rating");

    setFilters({
      priceMin: pMin !== null ? Number(pMin) : null,
      priceMax: pMax !== null ? Number(pMax) : null,
      amenities: am ? am.split(",") : [],
      rating: r !== null ? Number(r) : null,
    });
  }, [searchParams]);

  const handlePriceSelect = (min, max) => {
    setFilters((prev) => ({ ...prev, priceMin: min, priceMax: max }));
  };

  const handleAmenityToggle = (key) => {
    setFilters((prev) => {
      const active = prev.amenities;
      if (active.includes(key)) {
        return { ...prev, amenities: active.filter((k) => k !== key) };
      } else {
        return { ...prev, amenities: [...active, key] };
      }
    });
  };

  const handleRatingSelect = (r) => {
    setFilters((prev) => ({ ...prev, rating: r }));
  };

  const clearFilters = () => {
    setFilters({
      priceMin: null,
      priceMax: null,
      amenities: [],
      rating: null,
    });
  };

  const applyFilters = () => {
    const params = new URLSearchParams(searchParams.toString());

    // Price
    if (filters.priceMin !== null) params.set("priceMin", filters.priceMin);
    else params.delete("priceMin");

    if (filters.priceMax !== null) params.set("priceMax", filters.priceMax);
    else params.delete("priceMax");

    // Amenities
    if (filters.amenities.length > 0)
      params.set("amenities", filters.amenities.join(","));
    else params.delete("amenities");

    // Rating
    if (filters.rating !== null) params.set("rating", filters.rating);
    else params.delete("rating");

    router.push(`/search?${params.toString()}`);
  };

  /* -----------------------------------------
     Active State Checkers (Local State)
  ------------------------------------------ */

  const isActivePrice = (min, max) => {
    return filters.priceMin === min && filters.priceMax === max;
  };

  const isActiveRating = (r) => {
    return filters.rating === r;
  };

  const isAmenitySelected = (key) => filters.amenities.includes(key);

  const hasActiveFilters =
    filters.priceMin !== null ||
    filters.amenities.length > 0 ||
    filters.rating !== null;

  /* -----------------------------------------
     Reusable Section Wrapper
  ------------------------------------------ */

  const FilterSection = ({ title, sectionKey, children }) => (
    <div className="border-b border-gray-100 last:border-0">
      <button
        onClick={() => toggleSection(sectionKey)}
        className="w-full flex items-center justify-between py-2 text-left group"
      >
        <h3 className="font-semibold text-gray-900 text-sm">{title}</h3>
        {expandedSections[sectionKey] ? (
          <ChevronUp className="w-4 h-4 text-gray-400 group-hover:text-emerald-600" />
        ) : (
          <ChevronDown className="w-4 h-4 text-gray-400 group-hover:text-emerald-600" />
        )}
      </button>
      {expandedSections[sectionKey] && (
        <div className="pb-2 space-y-1 text-sm scale-in">{children}</div>
      )}
    </div>
  );

  return (
    <div
      className={`bg-white flex flex-col ${isMobile
        ? "h-full"
        : "rounded-xl shadow-sm border border-gray-100 sticky top-24 max-h-[calc(100vh-8rem)]"
        }`}
    >
      {/* Header */}
      <div className="px-3 py-2 border-b border-gray-100 bg-gray-50/50 rounded-t-xl flex justify-between items-center shrink-0">
        <h2 className="text-base font-bold text-gray-900">Filters</h2>
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="text-xs font-medium text-red-500 hover:text-red-600"
          >
            Clear All
          </button>
        )}
      </div>

      {/* Scrollable Content */}
      <div className="px-3 py-1 overflow-y-auto flex-1 custom-scrollbar">
        {/* PRICE */}
        <FilterSection title="Price Range" sectionKey="price">
          {[
            { min: 0, max: 1500, label: "Below ₹1500" },
            { min: 1500, max: 3000, label: "₹1500 – ₹3000" },
            { min: 3000, max: 6000, label: "₹3000 – ₹6000" },
            { min: 6000, max: null, label: "Above ₹6000" },
          ].map((p) => {
            const active = isActivePrice(p.min, p.max);
            return (
              <button
                key={p.label}
                onClick={() => handlePriceSelect(p.min ?? null, p.max ?? null)}
                className={`w-full text-left px-3 py-1.5 rounded-lg border transition-all duration-200 text-sm
                ${active
                    ? "border-emerald-500 bg-emerald-50/80 text-emerald-700 font-medium shadow-sm ring-1 ring-emerald-500/20"
                    : "border-gray-200 text-gray-600 hover:border-emerald-300 hover:text-emerald-600 hover:bg-gray-50"
                  }`}
              >
                {p.label}
              </button>
            );
          })}
        </FilterSection>

        {/* AMENITIES */}
        <FilterSection title="Amenities" sectionKey="amenities">
          {[
            { key: "Free WiFi", label: "Free WiFi", icon: Wifi },
            { key: "Parking", label: "Parking", icon: Car },
            { key: "Breakfast", label: "Breakfast", icon: Utensils },
            { key: "AC", label: "AC", icon: Wind },
          ].map((a) => {
            const isSelected = isAmenitySelected(a.key);
            const Icon = a.icon;

            return (
              <label
                key={a.key}
                className={`flex items-center gap-2 px-2 py-1.5 rounded-lg cursor-pointer border transition-all duration-200
                ${isSelected
                    ? "border-emerald-500 bg-emerald-50/80 ring-1 ring-emerald-500/20"
                    : "border-transparent hover:bg-gray-50"
                  }`}
              >
                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={() => handleAmenityToggle(a.key)}
                  className="w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
                />
                <div
                  className={`flex items-center gap-2 ${isSelected ? "text-emerald-700 font-medium" : "text-gray-600"
                    }`}
                >
                  <Icon
                    className={`w-4 h-4 ${isSelected ? "text-emerald-600" : "text-gray-400"
                      }`}
                  />
                  <span className="text-sm">{a.label}</span>
                </div>
              </label>
            );
          })}
        </FilterSection>

        {/* RATING */}
        <FilterSection title="Guest Rating" sectionKey="rating">
          {[9, 8, 7].map((r) => {
            const active = isActiveRating(r);
            return (
              <button
                key={r}
                onClick={() => handleRatingSelect(r)}
                className={`w-full flex items-center justify-between px-3 py-1.5 rounded-lg border transition-all duration-200 text-sm
                ${active
                    ? "border-emerald-500 bg-emerald-50/80 text-emerald-700 font-medium shadow-sm ring-1 ring-emerald-500/20"
                    : "border-gray-200 text-gray-600 hover:border-emerald-300 hover:text-emerald-600 hover:bg-gray-50"
                  }`}
              >
                <span>{r}+ Rated</span>
                <div className="flex items-center gap-0.5">
                  <span className="text-xs font-semibold">{r}</span>
                  <Star
                    className={`w-3 h-3 ${active
                      ? "fill-emerald-600 text-emerald-600"
                      : "fill-amber-400 text-amber-400"
                      }`}
                  />
                </div>
              </button>
            );
          })}
        </FilterSection>
      </div>

      {/* Footer / Apply Button */}
      <div className="p-3 border-t border-gray-100 bg-white rounded-b-xl shrink-0">
        <button
          onClick={applyFilters}
          className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg shadow-sm transition-colors active:scale-[0.98]"
        >
          Apply Filters
        </button>
      </div>
    </div>
  );
}
