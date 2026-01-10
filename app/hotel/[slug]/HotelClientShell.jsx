"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Star, Wifi, Utensils, MapPin, Users, Sparkles } from "lucide-react";
// import { CheckCircle, Clock, ShieldCheck } from "lucide-react";
import { calculateBookingPrice } from "@/lib/booking/calculateBookingPrice";

/* IMPORT ALL YOUR COMPONENTS HERE */
import StickyHotelHeader from "@/components/hotel/StickyHotelHeader";
import Hero from "@/components/hotel/Hero";
import DesktopHotelInfo from "@/components/hotel/DesktopHotelInfo";
import Breadcrumb from "@/components/common/Breadcrumb";
import MobileHotelInfo from "@/components/hotel/MobileHotelInfo";

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
  const router = useRouter();
  const pricingRef = useRef(null);
  const [isBottomBarVisible, setIsBottomBarVisible] = useState(true);
  const [selectedRoom, setSelectedRoom] = useState(
    hotel.roomTypes?.[0] || null
  );

  // Helper to get local date string YYYY-MM-DD
  const getLocalDateString = (addDays = 0) => {
    const date = new Date();
    date.setDate(date.getDate() + addDays);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const [checkIn, setCheckIn] = useState(getLocalDateString(0));
  const [checkOut, setCheckOut] = useState(getLocalDateString(1));
  const [rooms, setRooms] = useState([{ id: 1, guests: 1, extras: 0 }]);

  // Room Management Helpers
  const addRoom = () => {
    setRooms([...rooms, { id: rooms.length + 1, guests: 1, extras: 0 }]);
  };

  const removeRoom = (index) => {
    setRooms(rooms.filter((_, i) => i !== index));
  };

  const updateRoom = (index, field, value) => {
    const newRooms = [...rooms];
    newRooms[index] = { ...newRooms[index], [field]: value };
    setRooms(newRooms);
  };

  // Pricing Calculation
  const pricingResult = useMemo(() => {
    if (checkIn && checkOut && selectedRoom) {
      try {
        return calculateBookingPrice({
          roomType: selectedRoom,
          checkIn,
          checkOut,
          rooms,
        });
      } catch (error) {
        console.error("Pricing calculation error:", error);
        return null;
      }
    }
    return null;
  }, [checkIn, checkOut, selectedRoom, rooms]);

  // Booking Handler
  const handleBookNow = (guestDetails = null) => {
    if (!pricingResult || !pricingResult.valid) return;

    // Sanitize guestDetails: if it comes from an event (onClick), it might be an Event object.
    // We only want it if it's a plain object with our expected fields.
    const safeGuestDetails =
      guestDetails && typeof guestDetails === 'object' && !guestDetails.nativeEvent && !guestDetails.preventDefault
        ? guestDetails
        : null;

    const payload = {
      hotel: {
        id: hotel.id || hotel._id, // Ensure ID is captured
        name: hotel.name,
        city: hotel.city?.name || hotel.city,
        locality: hotel.locality?.name || hotel.locality,
        address: hotel.address,
      },
      roomType: {
        name: selectedRoom.name,
        slug: selectedRoom.slug,
        basePrice: selectedRoom.basePrice,
        extraGuestPricing: selectedRoom.extraGuestPricing,
      },
      stay: {
        checkIn,
        checkOut,
        nights: pricingResult.nights,
      },
      rooms,
      pricing: pricingResult.pricing,
      guestDetails: safeGuestDetails,
    };

    try {
      sessionStorage.setItem("checkout_payload", JSON.stringify(payload));
      router.push("/checkout");
    } catch (error) {
      console.error("Failed to save checkout payload", error);
    }
  };

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

      {/* Full Width Hero */}
      <div className="w-full md:mt-0">
        <Hero hotel={hotel} gallery={hotel.gallery} />
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Desktop Hotel Info (Below Hero on Desktop) */}
        <div className="hidden md:block px-3 mb-6">
          <DesktopHotelInfo hotel={hotel} />
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
            {/* <Gallery gallery={hotel.gallery || []} /> */}

            <AmenitiesGrid amenities={hotel.hotelAmenities || []} />
            <AboutSection description={hotel.description || ""} />

            <RoomTypes
              roomTypes={hotel.roomTypes || []}
              selectedRoom={selectedRoom || {}}
              setSelectedRoom={setSelectedRoom}
            />

            <Reviews reviews={hotel.reviews || []} />
            <PoliciesSection policies={hotel.policies || {}} />

            <div id="map-section" className="scroll-mt-24">
              <MapSection
                geo={{
                  lat: hotel.geo.lat,
                  lng: hotel.geo.lng,
                }}
                nearby={(hotel.nearbyPlaces || []).map(
                  p => `${p.name} (${p.distanceKm} km)`
                )}
              />
            </div>

            <FaqAccordion faqs={(hotel.faqs || []).map(f => ({ q: f.question, a: f.answer }))} />
            <MobilePricingDetails
              hotel={hotel}
              pricingRef={pricingRef}
              selectedRoom={selectedRoom || {}}
              checkIn={checkIn}
              setCheckIn={setCheckIn}
              checkOut={checkOut}
              setCheckOut={setCheckOut}
              rooms={rooms}
              addRoom={addRoom}
              removeRoom={removeRoom}
              updateRoom={updateRoom}
              pricingResult={pricingResult}
              onBookNow={handleBookNow}
            />
            <SimilarHotels hotels={hotel.similarHotels || []} />
          </div>
          <BookingCard
            hotel={{
              ...hotel,
              minPrice: hotel.priceStartingFrom,
              originalPrice: hotel.originalPrice,
              rating: hotel.rating,
              reviewCount: hotel.reviewCount,
            }}
            selectedRoom={selectedRoom || {}}
            checkIn={checkIn}
            setCheckIn={setCheckIn}
            checkOut={checkOut}
            setCheckOut={setCheckOut}
            rooms={rooms}
            addRoom={addRoom}
            removeRoom={removeRoom}
            updateRoom={updateRoom}
            pricingResult={pricingResult}
            onBookNow={handleBookNow}
          />
        </div>
      </div>
      <MobileStickyBookingBar
        hotel={{
          ...hotel,
          minPrice: hotel.priceStartingFrom,
          originalPrice: hotel.originalPrice,
          taxes: hotel.taxes,
        }}
        isVisible={isBottomBarVisible}
        selectedRoom={selectedRoom || {}}
        onBookNow={handleBookNow}
      />
    </div >
  );
}
