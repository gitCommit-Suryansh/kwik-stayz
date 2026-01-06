
"use client";

import React, { useState, useEffect, forwardRef } from "react";
import { Search, Calendar, Users, MapPin } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useSearchSuggestions } from "@/lib/search/useSearchSuggestions";
import SearchSuggestions from "@/components/search/SearchSuggestions";

const cityData = [
    { name: "Goa" },
    { name: "Mathura" },
    { name: "Agra" },
    { name: "Delhi" },
    { name: "Bangalore" },
    { name: "Jaipur" },
];

const HomeSearchBar = forwardRef((props, ref) => {
    // --- Core Search Logic (from SearchBar.jsx) ---
    const [query, setQuery] = useState("");
    const [showSuggestions, setShowSuggestions] = useState(false);
    const { cities, localities } = useSearchSuggestions(query);
    const [category, setCategory] = useState(null);

    const [selectedCitySlug, setSelectedCitySlug] = useState("");
    const [selectedLocalitySlug, setSelectedLocalitySlug] = useState("");
    const [selectedCityName, setSelectedCityName] = useState("");
    const [selectedLocalityName, setSelectedLocalityName] = useState("");

    const [checkIn, setCheckIn] = useState("");
    const [checkOut, setCheckOut] = useState("");
    const [guests, setGuests] = useState(1); // Match visual default

    const router = useRouter();
    const searchParams = useSearchParams();

    // Helper to format slug to title case
    const formatSlug = (slug) => {
        if (!slug) return "";
        return slug
            .split("-")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ");
    };

    // Sync with URL params on mount
    useEffect(() => {
        const cityParam = searchParams.get("city");
        const localityParam = searchParams.get("locality");
        const categoryParam = searchParams.get("category");

        if (cityParam) {
            setSelectedCitySlug(cityParam);
            const cityName = formatSlug(cityParam);
            setSelectedCityName(cityName);

            if (localityParam) {
                setSelectedLocalitySlug(localityParam);
                const localityName = formatSlug(localityParam);
                setSelectedLocalityName(localityName);
                setQuery(localityName);
            } else {
                setQuery(cityName);
            }
        }

        if (categoryParam) {
            setCategory(categoryParam);
        }
    }, [searchParams]);

    // Click outside to close suggestions
    useEffect(() => {
        const handler = () => setShowSuggestions(false);
        window.addEventListener("click", handler);
        return () => window.removeEventListener("click", handler);
    }, []);

    const handleSearch = () => {
        if (!selectedCitySlug && !query) return; // Basic validation

        if (!selectedCitySlug) return;

        const params = new URLSearchParams();
        params.set("city", selectedCitySlug);

        if (selectedLocalitySlug) {
            params.set("locality", selectedLocalitySlug);
        }
        if (category) {
            params.set("category", category);
        }

        // Add dates/guests if needed (not fully implemented in routing yet but good to have prepared)
        if (checkIn) params.set("checkIn", checkIn);
        if (checkOut) params.set("checkOut", checkOut);
        if (guests) params.set("guests", guests);

        router.push(`/search?${params.toString()}`);
    };

    const handleCityQuickSelect = (city) => {
        // Manually set state for "Trending" buttons
        const slug = city.name.toLowerCase();
        setSelectedCitySlug(slug);
        setSelectedCityName(city.name);
        // Clear locality
        setSelectedLocalitySlug("");
        setSelectedLocalityName("");
        setQuery(city.name);
    };


    return (
        <>
            {/* ========================================= */}
            {/* MOBILE UI SECTION (Matches app/page.js) */}
            {/* ========================================= */}
            <div ref={ref} className="md:hidden flex flex-col gap-6 pb-6 w-full">
                <div className="px-5 mt-20">
                    <h1 className="text-2xl font-bold text-gray-900 mb-4 tracking-tight">
                        Find hotels at best prices
                    </h1>

                    <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-gray-100 p-5">
                        {/* Destination Input */}
                        <div className="mb-4 relative">
                            <label className="block text-xs font-bold text-gray-400 mb-1 uppercase tracking-wider">
                                Destination
                            </label>
                            <input
                                type="text"
                                value={query || selectedLocalityName || selectedCityName || ""}
                                onChange={(e) => {
                                    setQuery(e.target.value);
                                    setShowSuggestions(true);
                                }}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setShowSuggestions(true);
                                }}
                                placeholder="e.g. Koramangala, Bangalore"
                                className="w-full text-md font-semibold text-gray-900 placeholder-gray-400 border-b border-gray-200 pb-2 focus:border-[#f8a11e] focus:outline-none rounded-none bg-transparent"
                            />
                            {showSuggestions && (
                                <div className="absolute left-0 right-0 mt-1 z-50">
                                    <SearchSuggestions
                                        cities={cities}
                                        localities={localities}
                                        onSelect={(name) => {
                                            setShowSuggestions(false);
                                            if (name) setQuery(name);
                                        }}
                                        setSelectedCitySlug={setSelectedCitySlug}
                                        setSelectedCityName={setSelectedCityName}
                                        setSelectedLocalitySlug={setSelectedLocalitySlug}
                                        setSelectedLocalityName={setSelectedLocalityName}
                                    />
                                </div>
                            )}
                        </div>

                        <div className="flex gap-4 mb-4">
                            {/* Date */}
                            <div className="flex-1">
                                <label className="block text-xs font-bold text-gray-400 mb-1 uppercase tracking-wider">
                                    Date
                                </label>
                                <div className="flex items-center gap-2 border-b border-gray-200 pb-2">
                                    <span className="text-sm font-semibold text-gray-900 whitespace-nowrap">
                                        {checkIn
                                            ? new Date(checkIn).toLocaleDateString("en-GB", {
                                                day: "2-digit",
                                                month: "short",
                                            })
                                            : "Today"}
                                        {" - "}
                                        {checkOut
                                            ? new Date(checkOut).toLocaleDateString("en-GB", {
                                                day: "2-digit",
                                                month: "short",
                                            })
                                            : "Tomorrow"}
                                    </span>
                                </div>
                            </div>

                            {/* Guests */}
                            <div className="flex-1">
                                <label className="block text-xs font-bold text-gray-400 mb-1 uppercase tracking-wider">
                                    Guests
                                </label>
                                <div className="flex items-center gap-2 border-b border-gray-200 pb-2">
                                    <span className="text-sm font-semibold text-gray-900">
                                        1 Room, {guests} Guests
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Category Pills (Mobile) - NEW FEATURE */}
                        <div className="mb-6">
                            <div className="flex gap-2">
                                {[
                                    { label: "Budget", slug: "budget-hotels" },
                                    { label: "Luxury", slug: "luxury-hotels" },
                                    { label: "Business", slug: "business-hotels" },
                                ].map((c) => (
                                    <button
                                        key={c.slug}
                                        type="button"
                                        onClick={() => setCategory(c.slug)}
                                        className={`flex-1 py-2 text-xs font-medium rounded-lg border transition-colors ${category === c.slug
                                            ? "bg-[#f8a11e] text-white border-[#f8a11e]"
                                            : "bg-white text-gray-600 border-gray-200 hover:border-gray-300"
                                            }`}
                                    >
                                        {c.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <button
                            onClick={handleSearch}
                            className="w-full bg-[#f02f32] text-white font-bold text-lg py-3.5 rounded-lg shadow-lg hover:bg-[#d6282b] active:scale-[0.98] transition-all"
                        >
                            Search
                        </button>
                    </div>
                </div>
            </div>


            {/* ========================================= */}
            {/* DESKTOP UI SECTION (Matches app/page.js) */}
            {/* ========================================= */}
            <div className="hidden md:block relative -mt-16 z-20 w-full">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-white/80 backdrop-blur-md border border-white/20 rounded-lg shadow-2xl p-6 md:p-8">
                        <div className="grid grid-cols-1 md:grid-cols-10 gap-4 items-end">
                            {/* Location */}
                            <div className="relative md:col-span-3">
                                <input
                                    type="text"
                                    value={query || selectedLocalityName || selectedCityName || ""}
                                    onChange={(e) => {
                                        setQuery(e.target.value);
                                        setShowSuggestions(true);
                                    }}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setShowSuggestions(true);
                                    }}
                                    placeholder="Mathura, Agra, Goa..."
                                    className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-3 sm:text-sm border-gray-300 rounded-md py-3 bg-white/50"
                                />

                                {showSuggestions && (
                                    <div className="absolute top-full left-0 right-0 mt-1 z-50">
                                        <SearchSuggestions
                                            cities={cities}
                                            localities={localities}
                                            onSelect={(name) => {
                                                setShowSuggestions(false);
                                                if (name) setQuery(name);
                                            }}
                                            setSelectedCitySlug={setSelectedCitySlug}
                                            setSelectedCityName={setSelectedCityName}
                                            setSelectedLocalitySlug={setSelectedLocalitySlug}
                                            setSelectedLocalityName={setSelectedLocalityName}
                                        />
                                    </div>
                                )}
                            </div>

                            {/* Check-in */}
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700">Check in Date</label>
                                <input
                                    type="date"
                                    value={checkIn}
                                    onChange={(e) => setCheckIn(e.target.value)}
                                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md py-3 px-3 bg-white/50"
                                    placeholder="Check in"
                                />
                            </div>
                            {/* Check-out */}
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700">Check out Date</label>
                                <input
                                    type="date"
                                    value={checkOut}
                                    onChange={(e) => setCheckOut(e.target.value)}
                                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md py-3 px-3 bg-white/50"
                                    placeholder="Check out"
                                />
                            </div>
                            {/* Guests */}
                            <div className="md:col-span-1">
                                <label className="block text-sm font-medium text-gray-700">Guests</label>
                                <input
                                    type="number"
                                    min="1"
                                    value={guests}
                                    onChange={(e) => setGuests(e.target.value)}
                                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md py-3 px-3 bg-white/50"
                                    placeholder="2"
                                />
                            </div>
                            {/* Search Button */}
                            <div className="md:col-span-2">
                                <button
                                    onClick={handleSearch}
                                    className="w-full flex justify-center items-center px-6 py-3 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-[#f8a11e] hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#f8a11e] transition-all duration-200"
                                >
                                    <Search className="h-5 w-5 mr-2" />
                                    Search
                                </button>
                            </div>

                            {/* Popular Cities (Desktop) */}
                            <div className="md:col-span-10 mt-2 flex justify-between items-center pt-2">
                                <div className="flex gap-3 items-center">
                                    <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">
                                        Trending:
                                    </span>
                                    <div className="flex gap-2">
                                        {cityData.slice(0, 6).map((city) => (
                                            <button
                                                key={city.name}
                                                type="button"
                                                onClick={() => handleCityQuickSelect(city)}
                                                className="px-3 py-1 bg-white/40 border border-gray-200/50 backdrop-blur-sm rounded-full text-xs font-semibold text-gray-600 hover:bg-[#f8a11e] hover:text-white hover:border-[#f8a11e] transition-all cursor-pointer shadow-sm"
                                            >
                                                {city.name}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Category Pills (Desktop) - NEW FEATURE (Placed here for neatness) */}
                                <div className="flex gap-2">
                                    {[
                                        { label: "Budget", slug: "budget-hotels" },
                                        { label: "Luxury", slug: "luxury-hotels" },
                                        { label: "Business", slug: "business-hotels" },
                                    ].map((c) => (
                                        <button
                                            key={c.slug}
                                            type="button"
                                            onClick={() => setCategory(c.slug)}
                                            className={`px-3 py-1 text-xs rounded-full border transition-colors ${category === c.slug
                                                ? "bg-[#f8a11e] text-white border-[#f8a11e]"
                                                : "bg-white/40 border-gray-200 text-gray-600 hover:bg-white"
                                                } `}
                                        >
                                            {c.label}
                                        </button>
                                    ))}
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
});

HomeSearchBar.displayName = "HomeSearchBar";
export default HomeSearchBar;
