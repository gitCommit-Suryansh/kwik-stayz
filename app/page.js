"use client";
import React, { useState, useEffect, useRef } from "react";
import {
  Menu,
  X,
  User,
  Briefcase,
  Search,
  MapPin,
  Calendar,
  Users,
  BedDouble,
  Building,
  BadgePercent, // Added
  Globe,
  CheckCircle,
  Star,
  Wifi,
  Utensils,
  Home,
  Languages,
  Phone,
  Headphones,
  Zap,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useSearchSuggestions } from "@/lib/search/useSearchSuggestions";
import SearchSuggestions from "@/components/search/SearchSuggestions";

// --- Mock Data (Unchanged) ---
const hotelData = [
  {
    id: 1,
    name: "The Royal Escape",
    location: "Decision",
    image:
      "https://images.oyoroomscdn.com/uploads/hotel_image/125724/large/dosyynaugcct.jpg",
    rating: 5,
    reviews: 4770,
    reviewText: "Exceptional",
    amenities: ["Wifi", "Food"],
    price: 1299,
  },
  {
    id: 2,
    name: "Seaside Serenity Resort",
    location: "Goa",
    image:
      "https://images.oyoroomscdn.com/uploads/hotel_image/637/large/cqsbdivpcwfp.jpg",
    rating: 4.7,
    reviews: 4770,
    reviewText: "Exceptional",
    amenities: ["Wifi", "Food"],
    price: 3399,
  },
  {
    id: 3,
    name: "Seaside Serenity Resort",
    location: "Goa",
    image:
      "https://images.oyoroomscdn.com/uploads/hotel_image/77355/large/cojdpifvygaq.jpg",
    rating: 4.7,
    reviews: 4770,
    reviewText: "Exceptional",
    amenities: ["Wifi", "Food"],
    price: 1599,
  },
  {
    id: 4,
    name: "Fia Rajasthan",
    location: "Rajasthan",
    image:
      "https://images.oyoroomscdn.com/uploads/hotel_image/109521/large/riqwjeijikth.jpg",
    rating: 4.7,
    reviews: 4770,
    reviewText: "Exceptional",
    amenities: ["Wifi", "Food"],
    price: 2499,
  },
];

const cityData = [
  {
    name: "Goa",
    image:
      "https://hblimg.mmtcdn.com/content/hubble/img/goakolkatadestimages/mmt/activities/m_Goa_3_l_666_1000.jpg",
  },
  {
    name: "Mathura",
    image: "https://skysafar.in/wp-content/uploads/2024/07/Mathura.png",
  },
  {
    name: "Agra",
    image:
      "https://static.wixstatic.com/media/055605_65e20a7fcbc54e2e8720adfc2544c35e~mv2.jpg/v1/fill/w_801,h_634,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/taj_new_contant_edited.jpg",
  },
  {
    name: "Delhi",
    image:
      "https://cdn.britannica.com/37/189837-050-F0AF383E/New-Delhi-India-War-Memorial-arch-Sir.jpg",
  },
  {
    name: "Bangalore",
    image:
      "https://as2.ftcdn.net/v2/jpg/05/57/79/11/1000_F_557791137_tpPXXT6YxaJPKcYwPn1ygvgRdxdCjI8f.jpg",
  },
  {
    name: "Jaipur",
    image:
      "https://www.worldtribune.org/wp-content/uploads/sites/2/2024/01/GettyImages-1191232894.jpg",
  },
  {
    name: "Manali",
    image:
      "https://www.viacation.com/_next/image?url=https%3A%2F%2Fwp.viacation.com%2Fwp-content%2Fuploads%2F2024%2F12%2F847900-1.jpg&w=3840&q=75",
  },
  {
    name: "Dwarka",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/0/0c/Dwarakadheesh_Temple%2C_2014.jpg",
  },
  {
    name: "Badrinath",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTv-ErnCX73kmG7RstUWVF5CZv8aIfNsOEy1w&s",
  },
  {
    name: "Gurgaon",
    image:
      "https://img.cofynd.com/images/latest_images_2024/25f22867daab054386b73c9ac654a8652bbba4fc.webp",
  },
];

// --- Reusable Components ---

// 1. Navigation Bar (Redesigned)
const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "#" },
    { name: "Destinations", href: "#" },
    { name: "About Us", href: "#" },
    { name: "Contact", href: "#" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white shadow-md py-2"
          : "bg-white/95 backdrop-blur-sm py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center md:justify-between h-16">
          {/* Logo & Brand */}
          <div className="shrink-0 flex items-center gap-1 cursor-pointer">
            {/* <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#f8a11e]/10">
              <Zap className="w-5 h-5 text-[#f8a11e] fill-current" />
            </div> */}
            <span className="text-3xl font-brand text-gray-900 tracking-wide">
              Kwik <span className="text-[#f8a11e]">Stayz</span>
            </span>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center space-x-1 bg-gray-50/50 p-1.5 rounded-full border border-gray-100">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="px-5 py-2 rounded-full text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-white hover:shadow-sm transition-all duration-200"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Desktop User Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <button className="flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-[#f8a11e] transition-colors">
              <Briefcase size={18} />
              <span>My Bookings</span>
            </button>
            <div className="h-6 w-px bg-gray-200"></div>
            <button className="flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-bold bg-[#f8a11e] text-white hover:bg-[#e0901a] transition-all transform hover:-translate-y-0.5 shadow-lg shadow-orange-200">
              <User size={18} />
              Login / Signup
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

// 2. Hero Section (Redesigned)
const Hero = () => {
  return (
    <div className="hidden md:block relative h-[550px] lg:h-[650px] overflow-hidden">
      {/* Immersive Background */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=2076&auto=format&fit=crop"
          alt="Hero Background"
          className="w-full h-full object-cover"
        />
        {/* Premium Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-center items-center text-center max-w-5xl mx-auto px-4 -mt-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm font-medium mb-6 animate-fade-in-up">
          <Star size={14} className="text-[#f8a11e] fill-current" />
          <span>Trusted by 1M+ Travelers</span>
        </div>
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-tight mb-6 drop-shadow-lg">
          Find Your Perfect <br />
          <span className="text-transparent bg-clip-text bg-linear-to-r from-[#f8a11e] to-[#ffc45e]">
            Staycation
          </span>{" "}
          Today
        </h1>
        <p className="text-lg md:text-xl text-gray-200 max-w-2xl font-light mb-10 leading-relaxed">
          Discover handpicked hotels, resorts, and homestays across India's most
          beautiful destinations.
        </p>
      </div>
    </div>
  );
};

// 3. Search Bar (ForwardRef for scroll detection)
const SearchBar = React.forwardRef((props, ref) => {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);
  const [query, setQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  const { cities, localities } = useSearchSuggestions(query);
  const router = useRouter();

  return (
    <>
      {/* MOBILE UI SECTION */}
      <div ref={ref} className="md:hidden flex flex-col gap-6 pb-6">
        {/* 1. Search Heading & Box */}
        <div className="px-5 mt-20">
          <h1 className="text-2xl font-bold text-gray-900 mb-4 tracking-tight">
            Find hotels at best prices
          </h1>

          <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-gray-100 p-5">
            {/* Destination Input */}
            <div className="mb-4">
              <label className="block text-xs font-bold text-gray-400 mb-1 uppercase tracking-wider">
                Destination
              </label>
              <input
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setShowSuggestions(true);
                }}
                placeholder="e.g. Koramangala, Bangalore"
                className="w-full text-lg font-semibold text-gray-900 placeholder-gray-400 border-b border-gray-200 pb-2 focus:border-[#f8a11e] focus:outline-none rounded-none bg-transparent"
              />
              {showSuggestions && (
                <div className="absolute left-4 right-4 mt-1 z-50">
                  <SearchSuggestions
                    cities={cities}
                    localities={localities}
                    onSelect={() => {
                      setShowSuggestions(false);
                      setQuery("");
                    }}
                  />
                </div>
              )}
            </div>

            <div className="flex gap-4 mb-6">
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
                {/* Hidden Inputs for logic */}
                <input
                  type="date"
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  className="hidden"
                />
                <input
                  type="date"
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  className="hidden"
                />
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

            <button className="w-full bg-[#f02f32] text-white font-bold text-lg py-3.5 rounded-lg shadow-lg hover:bg-[#d6282b] active:scale-[0.98] transition-all">
              Search
            </button>
          </div>
        </div>

        {/* 2. Explore Destination (Horizontal Scroll) */}
        <div className="pl-5">
          <h2 className="text-lg font-bold text-gray-900 mb-3">
            Explore your next destination
          </h2>
          <div className="flex gap-3 overflow-x-auto pb-4 pr-5 no-scrollbar snap-x">
            {/* 'Near Me' Option */}
            <div className="flex flex-col items-center gap-2 min-w-[72px] snap-start cursor-pointer">
              <div className="w-[72px] h-[72px] rounded-2xl bg-blue-500 flex items-center justify-center text-white shadow-md">
                <MapPin size={28} />
              </div>
              <span className="text-xs font-medium text-gray-600">Near me</span>
            </div>

            {/* Cities */}
            {cityData.slice(0, 8).map((city) => (
              <div
                key={city.name}
                className="flex flex-col items-center gap-2 min-w-[72px] snap-start cursor-pointer"
              >
                <img
                  src={city.image}
                  alt={city.name}
                  className="w-[72px] h-[72px] rounded-2xl object-cover shadow-sm border border-gray-100"
                />
                <span className="text-xs font-medium text-gray-600">
                  {city.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* 3. Promo Banners (Horizontal Scroll) */}
        <div className="px-5">
          <div className="flex gap-4 overflow-x-auto pb-2 no-scrollbar snap-x">
            {/* Banner 1 */}
            <div className="min-w-[85%] h-40 bg-linear-to-r from-gray-900 to-gray-800 rounded-2xl p-5 relative overflow-hidden snap-center text-white flex flex-col justify-center">
              <div className="absolute right-0 bottom-0 opacity-20 transform translate-x-4 translate-y-4">
                <BadgePercent size={120} />
              </div>
              <h3 className="text-2xl font-bold mb-1 relative z-10">
                Book 1, <span className="text-[#f8a11e]">Get 1 Free!</span>
              </h3>
              <p className="text-sm text-gray-300 mb-4 relative z-10">
                Book for 2 Nights, Pay for 1
              </p>
              <button className="w-fit bg-white text-gray-900 px-4 py-2 rounded-lg text-sm font-bold shadow-sm">
                Book Now
              </button>
            </div>

            {/* Banner 2 */}
            <div className="min-w-[85%] h-40 bg-[#fff8e6] rounded-2xl p-5 relative overflow-hidden snap-center text-gray-900 flex flex-col justify-center border border-[#f8a11e]/20">
              <div className="absolute right-0 bottom-0 opacity-10 transform translate-x-4 translate-y-4">
                <Home size={120} className="text-[#f8a11e]" />
              </div>
              <h3 className="text-2xl font-bold mb-1 relative z-10">
                Starting @ <span className="text-[#f8a11e]">₹999</span>
              </h3>
              <p className="text-sm text-gray-600 mb-4 relative z-10">
                Premium stays at budget prices
              </p>
              <button className="w-fit bg-[#ff4f64] text-white px-4 py-2 rounded-lg text-sm font-bold shadow-sm">
                View Offers
              </button>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-2 bg-gray-50 border-t border-b border-gray-100 mt-2"></div>
      </div>

      {/* DESKTOP (Unchanged) */}
      <div className="hidden md:block relative -mt-16 z-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white/80 backdrop-blur-md border border-white/20 rounded-lg shadow-2xl p-6 md:p-8">
            <form className="grid grid-cols-1 md:grid-cols-10 gap-4 items-end">
              {/* Location */}
              <div className="relative md:col-span-3">
                <input
                  type="text"
                  name="location"
                  id="location"
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setShowSuggestions(true);
                  }}
                  placeholder="Mathura, Agra, Goa..."
                  className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-3 sm:text-sm border-gray-300 rounded-md py-3 bg-white/50"
                />

                {showSuggestions && (
                  <SearchSuggestions
                    cities={cities}
                    localities={localities}
                    onSelect={() => {
                      setShowSuggestions(false);
                      setQuery("");
                    }}
                  />
                )}
              </div>

              {/* Check-in */}
              <div className="md:col-span-2">
                <label
                  htmlFor="checkin"
                  className="block text-sm font-medium text-gray-700"
                >
                  Check in Date
                </label>
                <input
                  type="date"
                  name="checkin"
                  id="checkin"
                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md py-3 px-3 bg-white/50"
                />
              </div>
              {/* Check-out */}
              <div className="md:col-span-2">
                <label
                  htmlFor="checkout"
                  className="block text-sm font-medium text-gray-700"
                >
                  Check out Date
                </label>
                <input
                  type="date"
                  name="checkout"
                  id="checkout"
                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md py-3 px-3 bg-white/50"
                />
              </div>
              {/* Guests */}
              <div className="md:col-span-1">
                <label
                  htmlFor="guests"
                  className="block text-sm font-medium text-gray-700"
                >
                  Guests
                </label>
                <input
                  type="number"
                  name="guests"
                  id="guests"
                  min="1"
                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md py-3 px-3 bg-white/50"
                  placeholder="2"
                />
              </div>
              {/* Search Button */}
              <div className="md:col-span-2">
                <button
                  type="submit"
                  className="w-full flex justify-center items-center px-6 py-3 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-[#f8a11e] hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#f8a1tran-all duration-200"
                >
                  <Search className="h-5 w-5 mr-2" />
                  Search
                </button>
              </div>

              {/* Popular Cities (Desktop) */}
              <div className="md:col-span-10 mt-2 flex gap-3 items-center pt-2">
                <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">
                  Trending:
                </span>
                <div className="flex gap-2">
                  {cityData.slice(0, 6).map((city) => (
                    <button
                      key={city.name}
                      type="button"
                      onClick={() => {
                        const locInput = document.getElementById("location");
                        if (locInput) locInput.value = city.name;
                      }}
                      className="px-3 py-1 bg-white/40 border border-gray-200/50 backdrop-blur-sm rounded-full text-xs font-semibold text-gray-600 hover:bg-[#f8a11e] hover:text-white hover:border-[#f8a11e] transition-all cursor-pointer shadow-sm"
                    >
                      {city.name}
                    </button>
                  ))}
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
});
// Add display name for linter/devtools
SearchBar.displayName = "SearchBar";

// 4. City Destinations (Unchanged)
const CityDestinations = () => {
  return (
    <section className="py-12 bg-gray-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <MapPin size={18} className="text-[#f8a11e]" />
              <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
                Trending Getaways
              </h2>
            </div>
            <p className="text-gray-500 text-sm ml-7">
              Most searched destinations by travelers
            </p>
          </div>
          <a
            href="#"
            className="hidden md:inline-flex items-center text-sm font-semibold text-[#f8a11e] hover:text-[#e0901a]"
          >
            View all cities <Search size={14} className="ml-1" />
          </a>
        </div>

        <div className="flex md:grid md:grid-cols-3 lg:grid-cols-5 gap-4 overflow-x-auto pb-4 md:pb-0 snap-x md:snap-none">
          {cityData.slice(0, 5).map((city) => (
            <a
              key={city.name}
              href={`/hotels/${city.name.toLowerCase()}`}
              className="min-w-[160px] md:min-w-0 snap-start group relative h-40 md:h-52 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 block"
            >
              <img
                src={city.image}
                alt={city.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
              <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-1 group-hover:translate-y-0 transition-transform">
                <h3 className="text-lg font-bold text-white mb-0.5">
                  {city.name}
                </h3>
                <p className="text-xs text-gray-300 font-medium">
                  Starting from ₹999
                </p>
              </div>
            </a>
          ))}

          {cityData.slice(5, 10).map((city) => (
            <a
              key={city.name}
              href={`/hotels/${city.name.toLowerCase()}`}
              className="min-w-[160px] md:min-w-0 snap-start group relative h-40 md:h-52 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 block" // Hidden on mobile to save space
            >
              <img
                src={city.image}
                alt={city.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
              <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-1 group-hover:translate-y-0 transition-transform">
                <h3 className="text-lg font-bold text-white mb-0.5">
                  {city.name}
                </h3>
                <p className="text-xs text-gray-300 font-medium">
                  Starting from ₹899
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

// 4.5 Why Choose Us (New Section)
const WhyChooseUs = () => {
  const features = [
    {
      icon: CheckCircle,
      title: "Sanitised Stays",
      desc: "Thoroughly sanitized properties for your safety",
    },
    {
      icon: BadgePercent,
      title: "Best Price Guarantee",
      desc: "Find a lower price? We'll match it.",
    },
    {
      icon: Star,
      title: "Rated 4.5+",
      desc: "Thousands of happy travelers trust us",
    },
    {
      icon: Headphones, // Need to make sure Headphones is imported or use another icon
      title: "24/7 Support",
      desc: "We are always here to help you",
    },
  ];

  return (
    <section className="py-20 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Why Book With KwikStayz?
          </h2>
          <p className="text-gray-500">
            We ensure every stay is memorable, safe, and comfortable.
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {features.map((f, i) => (
            <div
              key={i}
              className="flex flex-col items-center text-center p-6 rounded-2xl bg-gray-50 hover:bg-white hover:shadow-xl transition-all duration-300 border border-transparent hover:border-gray-100 group"
            >
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-[#f8a11e] mb-6 shadow-sm group-hover:scale-110 transition-transform duration-300 border border-gray-100">
                <f.icon size={28} />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                {f.title}
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// 5. Hotel Card (Unchanged)
const HotelCard = ({ hotel }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden transition-shadow duration-300 hover:shadow-xl w-full max-w-xs mx-auto mb-4 border border-gray-100">
      <div className="relative">
        <img
          src={hotel.image}
          alt={hotel.name}
          className="w-full h-44 object-cover"
        />
        <span className="absolute top-3 left-3 bg-black/60 text-white text-xs px-2 py-1 rounded-lg">
          {hotel.location}
        </span>
      </div>
      <div className="p-4 flex flex-col gap-1">
        <div className="flex items-center justify-between gap-2">
          <h3 className="text-base font-bold text-gray-900 truncate">
            {hotel.name}
          </h3>
          <div className="flex items-center text-yellow-400">
            <Star size={14} className="mr-1" />
            <span className="text-xs font-semibold text-yellow-500">
              {hotel.rating}
            </span>
          </div>
        </div>
        <div className="flex items-center text-xs text-gray-500 gap-1">
          <span>
            {hotel.reviewText} ・ {hotel.reviews} reviews
          </span>
        </div>
        <div className="flex items-center gap-3 mt-1">
          {hotel.amenities && hotel.amenities.includes("Wifi") && (
            <Wifi size={14} className="text-[#f8a11e]" />
          )}{" "}
          {hotel.amenities && hotel.amenities.includes("Food") && (
            <Utensils size={14} className="text-[#f8a11e]" />
          )}
        </div>
        <div className="flex items-center justify-between mt-2">
          <span className="text-lg font-bold text-[#f8a11e]">
            ₹{hotel.price.toLocaleString("en-IN")}
          </span>
          <a
            href="/hotel/happy-stays-bangalore-624556"
            className="px-4 py-1.5 rounded-xl bg-[#f8a11e] text-white text-xs font-semibold hover:bg-[#ffb649] transition active:scale-95 shadow"
          >
            View Details
          </a>
        </div>
      </div>
    </div>
  );
};

// 6. Recommendations (Unchanged)
const Recommendations = () => {
  return (
    <section className="py-5 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-xl font-bold text-center text-gray-900 mb-8 tracking-tight md:text-3xl md:mb-12">
          Recommended Stays
        </h2>
        {/* Mobile hotel carousel */}
        <div className="md:hidden flex gap-4 overflow-x-auto pb-2 snap-x">
          {hotelData.map((hotel) => (
            <div
              className="snap-start min-w-[70vw] max-w-xs w-[260px]"
              key={hotel.id}
            >
              <HotelCard hotel={hotel} />
            </div>
          ))}
        </div>
        {/* Desktop grid */}
        <div className="hidden md:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {hotelData.map((hotel) => (
            <HotelCard key={hotel.id} hotel={hotel} />
          ))}
        </div>
      </div>
    </section>
  );
};

// 8. Footer (MODIFIED)
const Footer = () => {
  return (
    <footer className="hidden md:block bg-[#242a3a] text-gray-300 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-white font-semibold mb-4">Destinations</h3>
          <ul>
            <li className="mt-2">
              <a href="#" className="hover:text-white">
                Mathura
              </a>
            </li>
            <li className="mt-2">
              <a href="#" className="hover:text-white">
                Agra
              </a>
            </li>
            <li className="mt-2">
              <a href="#" className="hover:text-white">
                Goa
              </a>
            </li>
            <li className="mt-2">
              <a href="#" className="hover:text-white">
                Rajasthan
              </a>
            </li>
            <li className="mt-2">
              <a href="#" className="hover:text-white">
                Karnataka
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-white font-semibold mb-4">Company</h3>
          <ul>
            <li className="mt-2">
              <a href="#" className="hover:text-white">
                About Us
              </a>
            </li>
            <li className="mt-2">
              <a href="#" className="hover:text-white">
                Careers
              </a>
            </li>
            <li className="mt-2">
              <a href="#" className="hover:text-white">
                Press
              </a>
            </li>
            <li className="mt-2">
              <a href="#" className="hover:text-white">
                Blog
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-white font-semibold mb-4">Support</h3>
          <ul>
            <li className="mt-2">
              <a href="#" className="hover:text-white">
                Contact Us
              </a>
            </li>
            <li className="mt-2">
              <a href="#" className="hover:text-white">
                FAQ
              </a>
            </li>
            <li className="mt-2">
              <a href="#" className="hover:text-white">
                Privacy Policy
              </a>
            </li>
            <li className="mt-2">
              <a href="#" className="hover:text-white">
                Terms of Service
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-white font-semibold mb-4">Follow Us</h3>
          <div className="flex space-x-4 mt-2">
            {/* Example: <a href="#" className="hover:text-white">Facebook</a> */}
          </div>
        </div>
      </div>
      <div className="mt-8 border-t border-gray-700 pt-8 text-center text-sm">
        <p>
          &copy; {new Date().getFullYear()} Your Hotel App. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

// 9. NEW: Sticky Search Header (Mobile Only)
const StickySearchHeader = ({ isVisible }) => {
  return (
    <div
      className={`md:hidden fixed top-2 left-2 right-2 z-40 transition-all duration-300 ease-in-out ${
        isVisible
          ? "translate-y-0 opacity-100"
          : "-translate-y-12 opacity-0 pointer-events-none"
      }`}
    >
      {/* Added shadow-xl and rounded-full */}
      <div className="p-2 bg-white shadow-xl rounded-full">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-500" />
          </div>
          <input
            type="text"
            // MODIFIED: py-2.5 and rounded-full
            className="w-full pl-11 pr-4 py-2.5 bg-gray-100 rounded-full border-none focus:ring-2 focus:ring-[#f8a11e]"
            placeholder="Search for city, location or hotel"
          />
        </div>
      </div>
    </div>
  );
};

// 10. NEW: Bottom Navigation (Mobile Only)

const BottomNav = () => {
  const [activeTab, setActiveTab] = useState("Home");
  const navItems = [
    { name: "Home", icon: Home, href: "#" },
    { name: "Search", icon: Search, href: "#" },
    { name: "Bookings", icon: Briefcase, href: "#" },
    { name: "Offers", icon: BadgePercent, href: "#" },
    { name: "Account", icon: User, href: "#" },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white shadow-[0_-2px_6px_rgba(0,0,0,0.06)] border-t border-gray-200">
      <div className="flex justify-around h-16">
        {navItems.map((item) => (
          <a
            key={item.name}
            href={item.href}
            onClick={() => setActiveTab(item.name)}
            className="flex flex-col items-center justify-center w-full"
          >
            <item.icon
              size={24}
              className={`transition-colors ${
                activeTab === item.name
                  ? "text-red-500" // Active color from OYO image
                  : "text-gray-500"
              }`}
            />
            <span
              className={`text-xs font-medium transition-colors ${
                activeTab === item.name ? "text-red-500" : "text-gray-600"
              }`}
            >
              {item.name}
            </span>
          </a>
        ))}
      </div>
    </nav>
  );
};

export default function App() {
  const [isStickySearchVisible, setIsStickySearchVisible] = useState(false);
  const searchBarRef = useRef(null);

  useEffect(() => {
    const searchBarEl = searchBarRef.current;
    if (!searchBarEl) return;

    const handleScroll = () => {
      const searchBarTop = searchBarEl.offsetTop;

      if (window.scrollY > searchBarTop) {
        setIsStickySearchVisible(true);
      } else {
        setIsStickySearchVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []); // Runs once on mount, ref will be populated

  return (
    <div className="font-sans">
      <StickySearchHeader isVisible={isStickySearchVisible} />

      <Navbar />
      <main className="md:pt-24 pb-16 md:pb-0 bg-white">
        <div className="flex flex-col md:flex-col-reverse pt-5">
          <SearchBar ref={searchBarRef} />
          <Hero />
        </div>

        <CityDestinations />
        <WhyChooseUs />
        <Recommendations />
      </main>
      <Footer />
      <BottomNav />
    </div>
  );
}
