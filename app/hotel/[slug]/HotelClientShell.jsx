"use client";

import React, { useState, useEffect, useRef } from "react";
import { Star, Wifi, Utensils, MapPin, Users, Sparkles } from "lucide-react";
// import { CheckCircle, Clock, ShieldCheck } from "lucide-react";


/* IMPORT ALL YOUR COMPONENTS HERE */
import StickyHotelHeader from "@/components/hotel/StickyHotelHeader";
import Hero from "@/components/hotel/Hero";
import Breadcrumb from "@/components/common/Breadcrumb";
import MobileHotelInfo from "@/components/hotel/MobileHotelInfo";
import QuickAmenities from "@/components/hotel/QuickAmenities";
import Gallery from "@/components/hotel/Gallery";
import RoomTypes from "@/components/hotel/RoomTypes";
import BookingCard from "@/components/hotel/BookingCard";
import AmenitiesGrid from "@/components/hotel/AmenitiesGrid";
import PoliciesSection from "@/components/hotel/PoliciesSection";
import MapSection from "@/components/hotel/MapSection";
import Reviews from "@/components/hotel/Reviews";
import FaqAccordion from "@/components/hotel/FaqAccordion";
import MobilePricingDetails from "@/components/hotel/MobilePricingDetails";
import MobileStickyBookingBar from "@/components/hotel/MobileStickyBookingBar";
import SimilarHotels from "@/components/hotel/SimilarHotels";
import AboutSection from "@/components/hotel/AboutSection";

export default function HotelClientShell({ hotel }) {
  const pricingRef = useRef(null);
  const [isBottomBarVisible, setIsBottomBarVisible] = useState(true);
  const [selectedRoom, setSelectedRoom] = useState(
    hotel.roomTypes?.[0] || null
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsBottomBarVisible(!entry.isIntersecting),
      { threshold: 0.1 }
    );

    if (pricingRef.current) observer.observe(pricingRef.current);
    return () =>
      pricingRef.current && observer.unobserve(pricingRef.current);
  }, []);



  return (
    <div className="font-sans bg-gray-50 min-h-screen pb-20 md:pb-0">
      <StickyHotelHeader title={hotel.name} />
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-b-2xl md:rounded-2xl md:shadow-2xl mt-0 md:mt-8 overflow-hidden mb-0 md:mb-6">
          <Hero hotel={hotel} />
        </div>
        <div className="flex flex-col lg:flex-row gap-8 px-2 md:px-3">
          <div className="flex-1 bg-white rounded-2xl shadow-lg p-6 md:p-8 lg:p-10 -mt-8 md:mt-0 relative z-10">
            <div className="md:hidden">
              <Breadcrumb city={hotel.city.name} cityName={hotel.city.slug} locality={hotel.locality.name} localityName={hotel.locality.slug} />
            </div>
            <MobileHotelInfo hotel={hotel} />
            <div className="hidden md:block">
              <Breadcrumb city={hotel.city.name} cityName={hotel.city.slug} locality={hotel.locality.name} localityName={hotel.locality.slug} />
            </div>
            <QuickAmenities hotel={hotel} />
            <Gallery gallery={hotel.gallery || []} />
            <RoomTypes
              roomTypes={hotel.roomTypes || []}
              selectedRoom={selectedRoom || {}}
              setSelectedRoom={setSelectedRoom}
            />
            <AboutSection description={hotel.description || ""} />
            <AmenitiesGrid amenities={hotel.hotelAmenities || []} />
            <PoliciesSection policies={hotel.policies || {}} />

            <MapSection
              geo={{
                lat: hotel.geo.lat,
                lng: hotel.geo.lng,
              }}
              nearby={(hotel.nearbyPlaces || []).map(
                p => `${p.name} (${p.distanceKm} km)`
              )}
            />

            <Reviews reviews={hotel.reviews || []} />
            <FaqAccordion faqs={(hotel.faqs || []).map(f => ({ q: f.question, a: f.answer }))} />
            <MobilePricingDetails
              hotel={hotel}
              pricingRef={pricingRef}
              selectedRoom={selectedRoom || {}}
            />
            <SimilarHotels hotels={hotel.similarHotels || []} />
          </div>
          <BookingCard hotel={{ ...hotel, minPrice: hotel.priceStartingFrom, originalPrice: hotel.originalPrice, rating: hotel.rating, reviewCount: hotel.reviewCount }} selectedRoom={selectedRoom || {}} />
        </div>
      </div>
      <MobileStickyBookingBar
        hotel={{ ...hotel, minPrice: hotel.priceStartingFrom, originalPrice: hotel.originalPrice, taxes: hotel.taxes }}
        isVisible={isBottomBarVisible}
        selectedRoom={selectedRoom || {}}
      />
    </div>
  );
}
