
"use client";

import { Search, Calendar, Users, ArrowLeft, ChevronLeft, Minus, Plus } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { useSearchSuggestions } from "@/lib/search/useSearchSuggestions";
import SearchSuggestions from "@/components/search/SearchSuggestions";
import { useAuth } from "@/context/AuthContext";

export default function SearchBar({ city }) {
  const [query, setQuery] = useState("");
  const [isMobileEditMode, setIsMobileEditMode] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const { cities, localities } = useSearchSuggestions(query);
  const [category, setCategory] = useState(null);
  const [selectedCitySlug, setSelectedCitySlug] = useState("");
  const [selectedLocalitySlug, setSelectedLocalitySlug] = useState("");
  const [selectedCityName, setSelectedCityName] = useState("");
  const [selectedLocalityName, setSelectedLocalityName] = useState("");
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);

  const { user, logout } = useAuth();

  const router = useRouter();
  const searchParams = useSearchParams();
  const mobileInputRef = useRef(null);

  // Helper to format slug to title case (e.g. "new-delhi" -> "New Delhi")
  const formatSlug = (slug) => {
    if (!slug) return "";
    return slug
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  // Sync with URL params on mount/update
  useEffect(() => {
    const cityParam = searchParams.get("city");
    const localityParam = searchParams.get("locality");
    const categoryParam = searchParams.get("category");
    const checkInParam = searchParams.get("checkIn");
    const checkOutParam = searchParams.get("checkOut");
    const guestsParam = searchParams.get("guests");

    if (cityParam) {
      setSelectedCitySlug(cityParam);
      const cityName = formatSlug(cityParam);
      setSelectedCityName(cityName);

      // If locality is present, set it and use it for query
      if (localityParam) {
        setSelectedLocalitySlug(localityParam);
        const localityName = formatSlug(localityParam);
        setSelectedLocalityName(localityName);
        setQuery(localityName);
      } else {
        // Otherwise just city
        setQuery(cityName);
      }
    }

    if (categoryParam) {
      setCategory(categoryParam);
    }

    if (checkInParam) {
      setCheckIn(checkInParam);
    }

    if (checkOutParam) {
      setCheckOut(checkOutParam);
    }

    if (guestsParam) {
      setGuests(Number(guestsParam));
    }
  }, [searchParams]);

  useEffect(() => {
    const checkin = searchParams.get("checkin");
    const checkout = searchParams.get("checkout");
    const guestsParam = searchParams.get("guests");

    if (checkin) setCheckIn(checkin);
    if (checkout) setCheckOut(checkout);
    if (guestsParam) setGuests(Number(guestsParam));
  }, [searchParams]);


  // Auto-focus input when entering mobile edit mode
  useEffect(() => {
    if (isMobileEditMode && mobileInputRef.current) {
      mobileInputRef.current.focus();
    }
  }, [isMobileEditMode]);

  useEffect(() => {
    const handler = () => {
      setShowSuggestions(false);
      setShowCategoryDropdown(false);
    }
    window.addEventListener("click", handler);
    return () => window.removeEventListener("click", handler);
  }, []);



  // Helper for formatting dates in mobile strip
  const getDisplayDate = (dateStr, offsetDays = 0) => {
    const d = dateStr ? new Date(dateStr) : new Date();
    if (!dateStr) d.setDate(d.getDate() + offsetDays);
    return d.toLocaleDateString("en-GB", { weekday: 'short', day: '2-digit', month: 'short' });
  };


  return (
    <>
      {/* ========================================= */}
      {/* DESKTOP SEARCH BAR (Visible on md+) */}
      {/* ========================================= */}
      <div className="hidden md:block w-full bg-white border-b border-gray-200 shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-3">
          <div className="flex items-center justify-between gap-4">

            {/* 1. BRANDING (Left) */}
            <div className="flex-shrink-0 cursor-pointer" onClick={() => router.push('/')}>
              <span className="text-3xl font-brand text-gray-900 tracking-wide">
                Kwik <span className="text-[#f8a11e]">Stayz</span>
              </span>
            </div>

            {/* 2. SEARCH BAR (Center) */}
            <div className="flex-1 max-w-4xl mx-4">
              <div className="flex flex-row items-center bg-white border border-gray-200 rounded-md shadow-sm h-12">
                {/* Location */}
                <div className="flex-[1.5] flex items-center gap-2 px-3 h-full border-r border-gray-200 relative">
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => {
                      setQuery(e.target.value);
                      setShowSuggestions(true);
                    }}
                    placeholder="Search query..."
                    className="w-full text-sm font-medium text-gray-900 placeholder:text-gray-400 focus:outline-none truncate"
                  />
                  {showSuggestions && (
                    <div className="absolute top-full left-0 right-0 mt-2 z-50">
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

                {/* Dates */}
                <div className="flex-1 flex items-center justify-center gap-2 px-3 h-full border-r border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors">
                  <div className="text-sm font-medium text-gray-900 truncate">
                    {checkIn && checkOut
                      ? `${new Date(checkIn).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                      })} - ${new Date(checkOut).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                      })}`
                      : "Today - Tomorrow"}

                  </div>
                </div>

                {/* Guests */}
                <div className="flex-1 flex items-center justify-center gap-2 px-3 h-full border-r border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors relative group">
                  <div className="text-sm font-medium text-gray-900 truncate">
                    1 Room, {guests} Guest{guests > 1 ? 's' : ''}
                  </div>
                </div>

                {/* Category - Integrated Dropdown */}
                <div
                  className="flex-1 flex items-center justify-center gap-2 px-3 h-full border-r border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors relative"
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent closing immediately from parent click listener
                    setShowCategoryDropdown(!showCategoryDropdown);
                  }}
                >
                  <div className="flex flex-col items-start justify-center">
                    <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Category</span>
                    <span className="text-sm font-medium text-gray-900 truncate">
                      {category
                        ? ["Budget", "Luxury", "Business"].find(l => l.toLowerCase() + "-hotels" === category) || "All"
                        : "All Hotels"
                      }
                    </span>
                  </div>

                  {/* Dropdown Menu */}
                  {showCategoryDropdown && (
                    <div className="absolute top-[110%] left-0 w-full min-w-[140px] bg-white border border-gray-100 rounded-lg shadow-xl py-1 z-50">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setCategory(null);
                          setShowCategoryDropdown(false);
                        }}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#f02f32]"
                      >
                        All Hotels
                      </button>
                      {[
                        { label: "Budget", slug: "budget-hotels" },
                        { label: "Luxury", slug: "luxury-hotels" },
                        { label: "Business", slug: "business-hotels" },
                      ].map((c) => (
                        <button
                          key={c.slug}
                          onClick={(e) => {
                            e.stopPropagation();
                            setCategory(c.slug);
                            setShowCategoryDropdown(false);
                          }}
                          className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 hover:text-[#f02f32] ${category === c.slug ? "text-[#f02f32] font-bold bg-gray-50" : "text-gray-700"
                            }`}
                        >
                          {c.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Search Button */}
                <button
                  onClick={() => {
                    if (!selectedCitySlug) return;
                    const params = new URLSearchParams();
                    params.set("city", selectedCitySlug);
                    if (selectedLocalitySlug) params.set("locality", selectedLocalitySlug);
                    if (category) params.set("category", category);
                    const checkinParam = searchParams.get("checkin");
                    const checkoutParam = searchParams.get("checkout");
                    const guestsParam = searchParams.get("guests");

                    if (checkinParam) params.set("checkin", checkinParam);
                    if (checkoutParam) params.set("checkout", checkoutParam);
                    if (guestsParam) params.set("guests", guestsParam);

                    router.push(`/search?${params.toString()}`);
                  }}
                  className="h-full px-6 bg-[#1ab64f] hover:bg-[#128a3b] text-white font-bold text-sm uppercase tracking-wider rounded-r-md transition-colors"
                >
                  Search
                </button>
              </div>


            </div>


            {/* 3. ACTIONS (Right) */}
            <div className="flex items-center gap-6 flex-shrink-0">
              {/* Contact */}
              <div className="hidden lg:flex flex-col items-end">
                <a href="tel:+917709475075" className="flex items-center gap-2 text-gray-800 font-bold hover:text-[#f02f32] transition-colors">
                  <div className="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center">
                    <span className="text-xs">📞</span>
                  </div>
                  <span>+91 77094 75075</span>
                </a>
                <span className="text-[10px] text-gray-500 font-medium">Call us to book now</span>
              </div>

              {/* Login / Signup */}
              <div className="flex items-center divide-x divide-gray-300">
                {user ? (
                  <div className="flex items-center gap-3 pl-3">
                    <span className="text-sm font-bold text-gray-700">
                      Hi, {user.name?.split(" ")[0] || "User"}
                    </span>
                    <button
                      onClick={logout}
                      className="text-sm font-bold text-red-600 hover:text-red-700 transition-colors"
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <>
                    <button
                      onClick={() => router.push("/auth/login")}
                      className="px-3 text-sm font-bold text-gray-700 hover:text-[#f02f32] transition-colors"
                    >
                      Login
                    </button>
                    <button
                      onClick={() => router.push("/auth/login")}
                      className="px-3 text-sm font-bold text-gray-700 hover:text-[#f02f32] transition-colors"
                    >
                      Signup
                    </button>
                  </>
                )}
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* ========================================= */}
      {/* MOBILE HEADER (Visible on <md) */}
      {/* ========================================= */}
      <div className="md:hidden">
        {isMobileEditMode ? (
          /* Active Mobile Search Mode */
          <div className="fixed inset-0 bg-black/50 z-50 flex flex-col justify-start">
            <div className="bg-white rounded-b-2xl shadow-lg overflow-hidden flex flex-col max-h-[90vh]">
              {/* Header Input */}
              <div className="p-4 flex items-center gap-3 border-b border-gray-100">
                <button
                  onClick={() => setIsMobileEditMode(false)}
                  className="p-2 -ml-2 text-gray-500 hover:bg-gray-100 rounded-full"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <div className="flex-1 relative">
                  <input
                    ref={mobileInputRef}
                    type="text"
                    value={query || selectedLocalityName || selectedCityName || ""}
                    onChange={(e) => {
                      setQuery(e.target.value);
                      setShowSuggestions(true);
                    }}
                    placeholder="Search for a city or locality"
                    className="w-full text-base font-medium text-gray-900 placeholder:text-gray-400 focus:outline-none"
                  />
                  {showSuggestions && (
                    <div className="absolute top-full left-0 right-0 mt-4 z-50">
                      <SearchSuggestions
                        cities={cities}
                        localities={localities}
                        onSelect={(name) => {
                          setShowSuggestions(false);
                          if (name) setQuery(name);
                          // Don't close mobile mode yet, let them pick dates/category
                        }}
                        setSelectedCitySlug={setSelectedCitySlug}
                        setSelectedCityName={setSelectedCityName}
                        setSelectedLocalitySlug={setSelectedLocalitySlug}
                        setSelectedLocalityName={setSelectedLocalityName}
                      />
                    </div>
                  )}
                </div>
                {query && (
                  <button
                    onClick={() => setQuery('')}
                    className="text-xs font-bold text-gray-400 uppercase"
                  >
                    Clear
                  </button>
                )}
              </div>

              {/* Mobile Options Body */}
              <div className="p-4 space-y-4 overflow-y-auto">
                {/* Dates Row */}
                <div className="flex gap-3">
                  <div className="flex-1 relative">
                    <label className="block text-xs font-bold text-gray-400 mb-1 uppercase tracking-wider">
                      Check-in
                    </label>
                    <input
                      type="date"
                      value={checkIn}
                      onChange={(e) => setCheckIn(e.target.value)}
                      className="w-full text-sm font-semibold text-gray-900 border-b border-gray-200 pb-2 focus:border-[#f8a11e] focus:outline-none rounded-none bg-transparent"
                    />
                  </div>
                  <div className="flex-1 relative">
                    <label className="block text-xs font-bold text-gray-400 mb-1 uppercase tracking-wider">
                      Check-out
                    </label>
                    <input
                      type="date"
                      value={checkOut}
                      onChange={(e) => setCheckOut(e.target.value)}
                      className="w-full text-sm font-semibold text-gray-900 border-b border-gray-200 pb-2 focus:border-[#f8a11e] focus:outline-none rounded-none bg-transparent"
                    />
                  </div>
                </div>

                {/* Guests Row */}
                <div className="mb-4">
                  <label className="block text-xs font-bold text-gray-400 mb-1 uppercase tracking-wider">
                    Guests
                  </label>
                  <div className="flex items-center justify-between border-b border-gray-200 pb-2">
                    <div className="flex items-center gap-2">
                      <Users className="text-gray-400 w-5 h-5" />
                      <span className="text-md font-semibold text-gray-900">
                        {guests} Guest{guests > 1 ? 's' : ''}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => setGuests(Math.max(1, guests - 1))}
                        className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={guests <= 1}
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setGuests(guests + 1)}
                        className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Categories */}
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-2">Category</label>
                  <div className="flex gap-2">
                    {[
                      { label: "Budget", slug: "budget-hotels" },
                      { label: "Luxury", slug: "luxury-hotels" },
                      { label: "Business", slug: "business-hotels" },
                    ].map((c) => (
                      <button
                        key={c.slug}
                        onClick={() => setCategory(c.slug)}
                        className={`flex-1 py-2 text-xs font-medium rounded-lg border transition-colors ${category === c.slug
                          ? "bg-emerald-600 text-white border-emerald-600"
                          : "bg-white text-gray-600 border-gray-200 hover:border-gray-300"
                          }`}
                      >
                        {c.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Search Button Mobile */}
                <button
                  onClick={() => {
                    if (!selectedCitySlug) return;

                    const params = new URLSearchParams();
                    params.set("city", selectedCitySlug);
                    if (selectedLocalitySlug) {
                      params.set("locality", selectedLocalitySlug);
                    }
                    if (category) {
                      params.set("category", category);
                    }

                    // Use state values, not URL params
                    if (checkIn) params.set("checkin", checkIn);
                    if (checkOut) params.set("checkout", checkOut);
                    if (guests) params.set("guests", guests);


                    router.push(`/search?${params.toString()}`);
                    setIsMobileEditMode(false);
                  }}
                  className="w-full py-3.5 bg-emerald-600 text-white font-bold rounded-xl shadow-sm active:scale-[0.98] transition-transform"
                >
                  Search Hotels
                </button>
              </div>
            </div>

            {/* Click backdrop to close */}
            <div className="flex-1" onClick={() => setIsMobileEditMode(false)} />
          </div>
        ) : (
          /* Static Mobile Header */
          <div>
            <div className="px-4 py-3 bg-white">
              <div
                onClick={() => setIsMobileEditMode(true)}
                className="flex items-center gap-3 bg-gray-100/80 rounded-md px-3 py-2.5 border border-gray-200 shadow-sm active:bg-gray-200 transition-colors cursor-pointer"
              >
                {/* Back Arrow with ChevronLeft */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    router.back();
                  }}
                  className="text-gray-500">
                  <ChevronLeft className="w-5 h-5" />
                </button>

                <div className="flex-1 min-w-0">
                  <div className="text-sm font-bold text-gray-900 truncate">
                    {query || city || "Search Location"}, India
                  </div>
                  {/* Subtext: Dates & Guests */}
                  <div className="text-[10px] text-gray-500 truncate flex items-center gap-1">
                    <span>{checkIn && checkOut
                      ? `${new Date(checkIn).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                      })} - ${new Date(checkOut).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                      })}`
                      : "Today - Tomorrow"}
                    </span>
                    <span className="w-0.5 h-0.5 rounded-full bg-gray-400" />
                    <span>1 Room, {guests} Guest{guests > 1 ? 's' : ''}</span>
                  </div>
                </div>

                {/* Edit / Filter Icon */}
                <div className="pl-3 border-l border-gray-300">
                  <div className="text-emerald-600 font-bold text-xs uppercase tracking-wide">
                    Edit
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Date/Guest Strip */}
            <div className="flex items-center justify-between px-4 py-2.5 bg-white border-t border-gray-100 shadow-sm text-xs font-medium text-gray-600">
              <div className="flex text-center w-full">
                <div className="flex-1 flex flex-col items-center border-r border-gray-100">
                  <span className="text-emerald-600 font-bold">{getDisplayDate(checkIn, 0)}</span>
                  <span className="text-[10px] text-gray-400">12:00 PM</span>
                </div>
                <div className="px-3 flex items-center justify-center">
                  <span className="bg-gray-100 px-1.5 py-0.5 rounded text-[10px] uppercase font-bold text-gray-500">1N</span>
                </div>
                <div className="flex-1 flex flex-col items-center border-r border-gray-100">
                  <span className="text-rose-500 font-bold">{getDisplayDate(checkOut, 1)}</span>
                  <span className="text-[10px] text-gray-400">11:00 AM</span>
                </div>
                <div className="flex-1 flex flex-col items-center">
                  <span className="text-gray-800 font-bold">1 Room</span>
                  <span className="text-[10px] text-gray-400">{guests} Guest{guests > 1 ? 's' : ''}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}