"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, Search } from "lucide-react";

export default function FiltersSidebar({ localities = [] }) {
  const [priceRange, setPriceRange] = useState([500, 5000]);
  const [localitySearch, setLocalitySearch] = useState("");
  const [expandedSections, setExpandedSections] = useState({
    locations: true,
    price: true,
    collections: false,
    amenities: true,
    rating: true,
  });

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const filteredLocalities = localities.filter((loc) =>
    loc.name.toLowerCase().includes(localitySearch.toLowerCase())
  );

  const FilterSection = ({ title, sectionKey, children }) => (
    <div className="border-b border-gray-200 last:border-0">
      <button
        onClick={() => toggleSection(sectionKey)}
        className="w-full flex items-center justify-between py-4 text-left"
      >
        <h3 className="font-semibold text-gray-900">{title}</h3>
        {expandedSections[sectionKey] ? (
          <ChevronUp className="w-5 h-5 text-gray-500" />
        ) : (
          <ChevronDown className="w-5 h-5 text-gray-500" />
        )}
      </button>
      {expandedSections[sectionKey] && (
        <div className="pb-4">{children}</div>
      )}
    </div>
  );

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden sticky top-24">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 bg-gray-50">
        <h2 className="text-lg font-bold text-gray-900">Filters</h2>
      </div>

      <div className="divide-y divide-gray-200 p-2">
        {/* Popular Locations */}
        {localities.length > 0 && (
          <FilterSection title="Popular locations in Bangalore" sectionKey="locations">
            {/* Search Localities */}
            <div className="relative mb-3">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={localitySearch}
                onChange={(e) => setLocalitySearch(e.target.value)}
                placeholder="Search..."
                className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            {/* Locality Chips */}
            <div className="flex flex-wrap gap-2 max-h-48 overflow-y-auto">
              {(localitySearch ? filteredLocalities : localities.slice(0, 8)).map((locality) => (
                <button
                  key={locality.slug}
                  className="px-3 py-1.5 bg-gray-100 hover:bg-emerald-50 text-gray-700 hover:text-emerald-700 text-sm rounded-full border border-transparent hover:border-emerald-500 transition-colors"
                >
                  {locality.name}
                </button>
              ))}
            </div>

            {localities.length > 8 && !localitySearch && (
              <button className="text-sm text-emerald-600 font-medium mt-3 hover:text-emerald-700">
                + View More
              </button>
            )}
          </FilterSection>
        )}

        {/* Price Range */}
        <FilterSection title="Price" sectionKey="price">
          <div className="space-y-3">
            <div className="flex justify-between text-sm font-medium text-gray-700">
              <span>₹{priceRange[0]}</span>
              <span>₹{priceRange[1]}</span>
            </div>
            <input
              type="range"
              min="500"
              max="10000"
              step="100"
              value={priceRange[1]}
              onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-emerald-500"
            />
            <div className="flex gap-2">
              <input
                type="number"
                value={priceRange[0]}
                onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                placeholder="Min"
              />
              <input
                type="number"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                placeholder="Max"
              />
            </div>
          </div>
        </FilterSection>

        {/* Amenities */}
        <FilterSection title="Amenities" sectionKey="amenities">
          <div className="space-y-2">
            {[
              { name: "AC", icon: "❄️" },
              { name: "Free WiFi", icon: "📶" },
              { name: "Parking", icon: "🅿️" },
              { name: "Breakfast", icon: "🍳" },
              { name: "Elevator", icon: "🛗" },
              { name: "Power Backup", icon: "🔋" },
              { name: "Swimming Pool", icon: "🏊" },
              { name: "Gym", icon: "💪" },
            ].map((amenity) => (
              <label key={amenity.name} className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
                />
                <span className="text-sm text-gray-700 group-hover:text-emerald-600 transition-colors">
                  {amenity.icon} {amenity.name}
                </span>
              </label>
            ))}
          </div>
        </FilterSection>

        {/* Guest Rating */}
        <FilterSection title="Guest Rating" sectionKey="rating">
          <div className="space-y-2">
            {["4.5+", "4.0+", "3.5+", "3.0+"].map((rating) => (
              <label key={rating} className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
                />
                <span className="text-sm text-gray-700 group-hover:text-emerald-600 transition-colors flex items-center gap-1">
                  <span className="text-yellow-500">★</span> {rating}
                </span>
              </label>
            ))}
          </div>
        </FilterSection>
      </div>

      {/* Clear All Button */}
      <div className="p-4 border-t border-gray-200">
        <button className="w-full py-2.5 text-emerald-600 font-semibold border-2 border-emerald-500 rounded-lg hover:bg-emerald-50 transition-colors">
          Clear All Filters
        </button>
      </div>
    </div>
  );
}