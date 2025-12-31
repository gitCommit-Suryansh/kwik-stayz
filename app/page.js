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
  Home, // Added
  Languages, // Added
  Phone, // Added
} from "lucide-react";
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

const testimonials = [
  {
    id: 1,
    name: "Golidhvyi Ber",
    quote:
      '"Insomr toe dolorlorem oit, consetot add elistsclng elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua."',
    image: "https://placehold.co/100x100/e2e8f0/333?text=GB&font=roboto",
  },
  {
    id: 2,
    name: "Pauliang Inlove",
    image: "https://placehold.co/100x100/e2e8f0/333?text=PI&font=roboto",
  },
  {
    id: 3,
    name: "Vino Relact Intio",
    image: "https://placehold.co/100x100/e2e8f0/333?text=VRI&font=roboto",
  },
  {
    id: 4,
    name: "Pauliang Intipe",
    image: "https://placehold.co/100x100/e2e8f0/333?text=PI&font=roboto",
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
    name: "Karnataka",
    image:
      "https://i0.wp.com/www.tusktravel.com/blog/wp-content/uploads/2023/06/Hampi-in-karnataka-min.jpg?fit=1024%2C668&ssl=1",
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

// 1. Navigation Bar
const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "#" },
    { name: "Destinations", href: "#" },
    { name: "About Us", href: "#" },
    { name: "Contact", href: "#" },
  ];

  return (
    // Mobile: relative, bg-white. Desktop: absolute, bg-dark
    <nav className="relative md:absolute top-0 left-0 right-0 z-40 bg-white md:bg-[#242a3a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* --- DESKTOP NAV (Unchanged) --- */}
        <div className="hidden md:flex items-center justify-between h-20 text-white">
          {/* Logo */}
          <div className="shrink-0">
            <a href="/" className="flex items-center gap-3 group">
              <div className="relative">
                {/* FIXED: Replaced next/image with <img> */}
                <img
                  src="/logo.png"
                  alt="Kwik Stayz Logo"
                  width="50"
                  height="50"
                  className="rounded-full transition-transform group-hover:scale-105"
                />
              </div>
              <span className="text-xl font-bold text-white">
                Kwik Stayz
              </span>
            </a>
          </div>

          {/* Desktop Nav Links */}
          <div className="flex items-center space-x-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="px-4 py-2 rounded-lg text-sm font-semibold text-gray-200 hover:text-white hover:bg-white/10 transition-all duration-200"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Desktop User Actions */}
          <div className="flex items-center space-x-3">
            <button
              className="p-2.5 rounded-full text-white hover:bg-white/10 transition-all duration-200"
              aria-label="User Profile"
            >
              <User size={22} />
            </button>
            <button
              className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold bg-white text-[#242a3a] hover:bg-gray-100 transition-all duration-200 shadow-md hover:shadow-lg"
            >
              <Briefcase size={18} />
              My Bookings
            </button>
          </div>
        </div>

        {/* --- MOBILE NAV (New White Design) --- */}
        <div className="md:hidden flex items-center justify-between h-20 text-gray-900">
           {/* Left Icon (Translate) */}
           <button className="text-gray-700 p-2">
            <Languages size={24} /> 
          </button>
          
          {/* Centered Brand Name */}
          <span className="text-2xl font-bold text-gray-900">
            Kwik Stayz
          </span>
          
          {/* Right Icon (Phone) */}
          <button className="text-gray-700 p-2">
            <Phone size={24} />
          </button>
        </div>
      </div>

    </nav>
  );
};

// 2. Hero Section (Unchanged)
const Hero = () => {
  return (
    <div className="hidden md:block relative pt-20 h-[500px] md:h-[550px] lg:h-[600px] text-white">
      {/* Background Images */}
      <div className="absolute inset-0 flex">
        <div className="w-1/3 h-full">
          <img
            src="https://hblimg.mmtcdn.com/content/hubble/img/goakolkatadestimages/mmt/activities/m_Goa_3_l_666_1000.jpg"
            alt="Goa Beach"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="w-1/3 h-full">
          <img
            src="https://static.wixstatic.com/media/055605_65e20a7fcbc54e2e8720adfc2544c35e~mv2.jpg/v1/fill/w_801,h_634,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/taj_new_contant_edited.jpg"
            alt="Taj Mahal"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="w-1/3 h-full">
          <img
            src="https://d3rr2gvhjw0wwy.cloudfront.net/uploads/mandators/49581/file-manager/camel-caravan-sahara-morocco.jpg"
            alt="Rajasthan Fort"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      {/* Overlay */}
      <div className="absolute inset-0 bg-linear-to-b from-black/10 via-black/50 to-black/10"></div>
      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
            Your Journey Begins Here
          </h1>
          <p className="mt-4 text-lg md:text-xl">
            Experience Handpicked Stays in India's Most Enchanting Destinations
          </p>
          <a
            href="#"
            className="mt-8 inline-block bg-[#f8a11e] text-white px-8 py-3 rounded-full font-semibold text-lg hover:bg-opacity-90 transition-colors"
          >
            Find Your Escape
          </a>
        </div>
      </div>
    </div>
  );
};

// 3. Search Bar (ForwardRef for scroll detection)
const SearchBar = React.forwardRef((props, ref) => {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);

  return (
    <>
      {/* MOBILE SEARCH BAR */}
      <div ref={ref} className="md:hidden mx-3 mt-4 mb-6 rounded-2xl shadow-xl bg-white/95 p-4 relative z-30">
        <div className="flex flex-col gap-2">
          <label htmlFor="mobile-location" className="block text-xs font-semibold text-gray-600 pl-1">Destination</label>
          <input
            type="text"
            name="mobile-location"
            id="mobile-location"
            className="text-lg text-gray-900 placeholder-gray-400 w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-[#f8a11e] focus:ring-2 focus:outline-none transition"
            placeholder="Search for city, location or hotel"
          />
        </div>
        <div className="flex flex-col gap-2 mt-4">
          <div className="flex gap-2">
            <div className="flex-1 flex flex-col">
              <label htmlFor="checkin-date" className="block text-xs font-semibold text-gray-600 mb-1">Check-in</label>
              <input
                type="date"
                id="checkin-date"
                name="checkin-date"
                value={checkIn}
                onChange={e => setCheckIn(e.target.value)}
                className="rounded-xl border border-gray-200 px-3 py-2 text-base font-medium text-gray-700 focus:ring-[#f8a11e] focus:border-[#f8a11e] focus:outline-none"
              />
            </div>
            <div className="flex-1 flex flex-col">
              <label htmlFor="checkout-date" className="block text-xs font-semibold text-gray-600 mb-1">Check-out</label>
              <input
                type="date"
                id="checkout-date"
                name="checkout-date"
                value={checkOut}
                onChange={e => setCheckOut(e.target.value)}
                className="rounded-xl border border-gray-200 px-3 py-2 text-base font-medium text-gray-700 focus:ring-[#f8a11e] focus:border-[#f8a11e] focus:outline-none"
              />
            </div>
          </div>
          <div className="flex flex-col mt-2">
            <label htmlFor="mobile-guests" className="block text-xs font-semibold text-gray-600 mb-1">Guests</label>
            <input
              type="number"
              id="mobile-guests"
              name="mobile-guests"
              min={1}
              value={guests}
              onChange={e => setGuests(Number(e.target.value))}
              className="rounded-xl border border-gray-200 px-3 py-2 text-base font-medium text-gray-700 w-full focus:ring-[#f8a11e] focus:border-[#f8a11e] focus:outline-none"
            />
          </div>
        </div>
        <div className="pt-5">
          <button
            type="submit"
            className="w-full flex justify-center items-center px-6 py-3 border border-transparent rounded-xl shadow-lg text-lg font-semibold text-white bg-[#f8a11e] hover:bg-[#ffb649] focus:outline-none focus:ring-2 focus:ring-[#f8a11e] active:scale-95 transition"
          >
            Search
          </button>
        </div>
      </div>
      
      {/* Divider */}
      <div className="md:hidden w-full border-t border-gray-200 mb-4" />
      
      {/* DESKTOP (Unchanged) */}
      <div className="hidden md:block relative -mt-16 z-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white/80 backdrop-blur-md border border-white/20 rounded-lg shadow-2xl p-6 md:p-8">
            <form className="grid grid-cols-1 md:grid-cols-10 gap-4 items-end">
              {/* Location */}
              <div className="md:col-span-3">
                <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location</label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MapPin className="h-5 w-5 text-gray-500" />
                  </div>
                  <input
                    type="text"
                    name="location"
                    id="location"
                    className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-3 bg-white/50"
                    placeholder="Mathura, Agra, Goa..."
                  />
                </div>
              </div>
              {/* Check-in */}
              <div className="md:col-span-2">
                <label htmlFor="checkin" className="block text-sm font-medium text-gray-700">Check in Date</label>
                <input
                  type="date"
                  name="checkin"
                  id="checkin"
                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md py-3 px-3 bg-white/50"
                />
              </div>
              {/* Check-out */}
              <div className="md:col-span-2">
                <label htmlFor="checkout" className="block text-sm font-medium text-gray-700">Check out Date</label>
                <input
                  type="date"
                  name="checkout"
                  id="checkout"
                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md py-3 px-3 bg-white/50"
                />
              </div>
              {/* Guests */}
              <div className="md:col-span-1">
                <label htmlFor="guests" className="block text-sm font-medium text-gray-700">Guests</label>
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
    <section className="py-8 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-center mb-5 gap-2">
          <MapPin size={20} className="text-[#f8a11e]" />
          <h2 className="text-xl font-bold text-center text-gray-900 tracking-tight">Top Destinations</h2>
        </div>
        <div className="flex overflow-x-auto gap-4 pb-4 snap-x">
          {cityData.map((city) => (
            <div
              key={city.name}
              className="flex-none text-center w-24 snap-start"
            >
              <a
                href="/hotels/bangalore"
                className="group block px-1 active:scale-95 transition"
                tabIndex={0}
              >
                <div className="w-24 h-24 rounded-2xl overflow-hidden shadow-md border border-gray-200 bg-gray-50 transition-transform group-hover:scale-105 group-active:scale-95 mx-auto">
                  <img
                    src={city.image}
                    alt={city.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = 'https://placehold.co/150x150/cccccc/969696?text=Image+Not+Found';
                    }}
                  />
                </div>
                <p className="mt-3 text-sm font-semibold text-gray-700 group-hover:text-[#f8a11e] truncate">
                  {city.name}
                </p>
              </a>
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
          <h3 className="text-base font-bold text-gray-900 truncate">{hotel.name}</h3>
          <div className="flex items-center text-yellow-400">
            <Star size={14} className="mr-1" />
            <span className="text-xs font-semibold text-yellow-500">{hotel.rating}</span>
          </div>
        </div>
        <div className="flex items-center text-xs text-gray-500 gap-1">
          <span>{hotel.reviewText} ・ {hotel.reviews} reviews</span>
        </div>
        <div className="flex items-center gap-3 mt-1">
          {hotel.amenities && hotel.amenities.includes('Wifi') && <Wifi size={14} className="text-[#f8a11e]" />} {hotel.amenities && hotel.amenities.includes('Food') && <Utensils size={14} className="text-[#f8a11e]" />} 
        </div>
        <div className="flex items-center justify-between mt-2">
          <span className="text-lg font-bold text-[#f8a11e]">₹{hotel.price.toLocaleString("en-IN")}</span>
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
            <div className="snap-start min-w-[70vw] max-w-xs w-[260px]" key={hotel.id}>
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

// 7. Testimonials (Unchanged)
const Testimonials = () => {
  return (
    <section className="hidden md:block py-10 md:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-xl font-bold text-center text-gray-900 mb-5 tracking-tight md:text-3xl md:mb-12">
          Customer Testimonials
        </h2>
        <div className="flex flex-col items-center md:grid md:grid-cols-2 gap-6 md:gap-12 ">
          <div className="text-center md:text-left">
            <img src={testimonials[0].image} alt={testimonials[0].name} className="rounded-full mx-auto w-20 h-20 shadow mb-4 border-2 border-[#f8a11e]" />
            <p className="text-base text-[#f8a11e] italic font-semibold mb-2">{testimonials[0].quote}</p>
            <p className="font-semibold text-gray-800">{testimonials[0].name}</p>
          </div>
          <div className="flex justify-center md:justify-end items-center gap-4">
            {testimonials.slice(1).map((testimonial) => (
              <div key={testimonial.id} className="text-center flex flex-col items-center">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-14 h-14 md:w-20 md:h-20 rounded-full shadow-lg border-2 border-gray-100 mb-1"
                />
                <p className="text-xs md:text-sm font-medium text-gray-700 truncate w-16">{testimonial.name}</p>
              </div>
            ))}
          </div>
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
              <a href="#" className="hover:text-white">Mathura</a>
            </li>
            <li className="mt-2">
              <a href="#" className="hover:text-white">Agra</a>
            </li>
            <li className="mt-2">
              <a href="#" className="hover:text-white">Goa</a>
            </li>
            <li className="mt-2">
              <a href="#" className="hover:text-white">Rajasthan</a>
            </li>
            <li className="mt-2">
              <a href="#" className="hover:text-white">Karnataka</a>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-white font-semibold mb-4">Company</h3>
          <ul>
            <li className="mt-2">
              <a href="#" className="hover:text-white">About Us</a>
            </li>
            <li className="mt-2">
              <a href="#" className="hover:text-white">Careers</a>
            </li>
            <li className="mt-2">
              <a href="#" className="hover:text-white">Press</a>
            </li>
            <li className="mt-2">
              <a href="#" className="hover:text-white">Blog</a>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-white font-semibold mb-4">Support</h3>
          <ul>
            <li className="mt-2">
              <a href="#" className="hover:text-white">Contact Us</a>
            </li>
            <li className="mt-2">
              <a href="#" className="hover:text-white">FAQ</a>
            </li>
            <li className="mt-2">
              <a href="#" className="hover:text-white">Privacy Policy</a>
            </li>
            <li className="mt-2">
              <a href="#" className="hover:text-white">Terms of Service</a>
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
        isVisible ? "translate-y-0 opacity-100" : "-translate-y-12 opacity-0 pointer-events-none"
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
                activeTab === item.name
                  ? "text-red-500"
                  : "text-gray-600"
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
      <main className="md:pt-20 pb-16 md:pb-0 bg-white">
        
        <div className="flex flex-col md:flex-col-reverse">
          <SearchBar ref={searchBarRef} /> 
          <Hero />
        </div>
        
        <CityDestinations />
        <Recommendations />
        <Testimonials />
      </main>
      <Footer />
      <BottomNav />
    </div>
  );
}