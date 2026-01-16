"use client";

import { Star, MapPin, Users, Heart } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import CategoryBadge from "@/components/hotel/CategoryBadge";
import { getAmenityIcon } from "@/components/hotel/amenityUtils";

export default function HotelCard({ hotel }) {
  const { user, setUser } = useAuth(); // Need setUser to update local context if needed, or just rely on API
  const router = useRouter();
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Sync wishlist state from user context
  useEffect(() => {
    if (user && user.wishlist) {
      setIsWishlisted(user.wishlist.includes(hotel._id));
    } else {
      setIsWishlisted(false);
    }
  }, [user, hotel._id]);

  const toggleWishlist = async (e) => {
    e.preventDefault(); // Prevent navigating to hotel page
    e.stopPropagation();

    if (!user) {
      router.push("/auth/login");
      return;
    }

    if (isLoading) return;
    setIsLoading(true);

    // Optimistic update
    const previousState = isWishlisted;
    setIsWishlisted(!previousState);

    try {
      const res = await fetch("/api/user/wishlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ hotelId: hotel._id }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to toggle wishlist");

      // Update user context with new wishlist (optional but good for consistency)
      // setUser({ ...user, wishlist: data.wishlist }); 
      // Actually AuthContext setUser might not persist deep merge well without full re-fetch or manual merge
      // For now, local state visual feedback is enough, but updating context helps other components
      if (data.wishlist) {
        setUser(prev => ({ ...prev, wishlist: data.wishlist }));
      }

    } catch (error) {
      console.error("Wishlist error:", error);
      setIsWishlisted(previousState); // Revert on error
    } finally {
      setIsLoading(false);
    }
  };

  // Calculate discount percentage (mock - you can pass real data)
  const originalPrice = Math.round(hotel.priceStartingFrom * 1.3);
  const discount = Math.round(((originalPrice - hotel.priceStartingFrom) / originalPrice) * 100);

  return (
    <div>
      {/* ========================================== */}
      {/* DESKTOP CARD (Visible on md+) */}
      {/* ========================================== */}
      <a
        href={`/hotel/${hotel.slug}`}
        className="hidden md:flex group bg-white rounded-xl shadow-sm overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 w-full border border-gray-100"
      >
        {/* Image Section with Badge */}
        <div className="relative w-2/5 flex-shrink-0">
          <img
            src={hotel.heroImage}
            alt={`${hotel.name} hotel in ${hotel.locality.name}, ${hotel.city.name}`}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />

          {/* Company-Serviced Badge */}
          <div className="absolute top-3 left-3">
            <CategoryBadge categories={hotel.categories} />
          </div>

          {/* Wishlist Heart Desktop */}
          <div className="absolute top-3 right-3 z-10">
            <div className="bg-white/90 backdrop-blur-sm rounded-full p-1.5 shadow-sm cursor-pointer hover:scale-110 transition-transform" onClick={toggleWishlist}>
              <Heart
                size={16}
                className={`transition-colors ${isWishlisted ? "fill-rose-500 text-rose-500" : "text-gray-400"}`}
              />
            </div>
          </div>

          {/* Recent Bookings Badge */}
          {hotel.reviewCount > 50 && (
            <div className="absolute bottom-3 left-3 bg-rose-500 text-white px-2.5 py-1 rounded-md shadow-lg flex items-center gap-1">
              <Users size={12} />
              <span className="text-xs font-medium">Popular</span>
            </div>
          )}

          {/* Image Gallery Indicators */}
          <div className="absolute bottom-3 right-3 flex gap-1">
            {(hotel.gallery || []).slice(0, 3).map((_, idx) => (
              <div key={idx} className="w-1.5 h-1.5 rounded-full bg-white/60 backdrop-blur-sm" />
            ))}
          </div>
        </div>

        {/* Content Section */}
        <div className="flex-1 p-5 flex flex-col justify-between">
          {/* Header */}
          <div>
            <div className="flex items-start justify-between gap-3 mb-2">
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-bold text-gray-900 mb-1 line-clamp-1 group-hover:text-emerald-600 transition-colors">
                  {hotel.name}
                </h3>
                <div className="flex items-center gap-1.5 text-gray-600">
                  <MapPin size={14} className="flex-shrink-0 text-gray-400" />
                  <p className="text-sm truncate">
                    {hotel.locality.name}, {hotel.city.name}
                  </p>
                </div>
              </div>

              {/* Rating Badge */}
              <div className="flex flex-col items-end">
                <div className="flex items-center gap-1 bg-emerald-50 px-2.5 py-1 rounded-lg">
                  <Star size={14} className="fill-emerald-500 text-emerald-500" />
                  <span className="text-sm font-bold text-emerald-700">
                    {(hotel.rating / 10).toFixed(1)}
                  </span>
                </div>
                <span className="text-xs text-gray-500 mt-1">
                  ({hotel.reviewCount} reviews)
                </span>
              </div>
            </div>

            {/* Amenities */}
            <div className="flex items-center gap-2 mt-3 flex-wrap">
              {hotel.hotelAmenities.slice(0, 3).map((amenity, idx) => {
                const IconComponent = getAmenityIcon(amenity);

                return (
                  <div
                    key={idx}
                    className="flex items-center gap-1.5 bg-gray-50 px-2.5 py-1.5 rounded-lg border border-gray-100"
                  >
                    <IconComponent size={13} className="text-emerald-600" />
                    <span className="text-xs font-medium text-gray-700">{amenity}</span>
                  </div>
                );
              })}
              {hotel.hotelAmenities.length > 3 && (
                <span className="text-xs font-medium text-emerald-600 px-2">
                  +{hotel.hotelAmenities.length - 3} more
                </span>
              )}
            </div>
          </div>

          {/* Footer - Price and CTA */}
          <div className="flex items-end justify-between mt-4 pt-4 border-t border-gray-100">
            <div className="flex flex-col">
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-gray-900">
                  ₹{hotel.priceStartingFrom.toLocaleString('en-IN')}
                </span>
                <span className="text-sm text-gray-400 line-through">
                  ₹{originalPrice.toLocaleString('en-IN')}
                </span>
                {discount > 0 && (
                  <span className="text-xs font-semibold text-rose-500 bg-rose-50 px-2 py-0.5 rounded">
                    {discount}% off
                  </span>
                )}
              </div>
              <p className="text-xs text-gray-500 mt-0.5">
                + ₹100 taxes & fees · per room per night
              </p>
            </div>

            <button className="px-6 py-2.5 rounded-lg bg-gradient-to-r from-emerald-500 to-emerald-600 text-white text-sm font-semibold hover:from-emerald-600 hover:to-emerald-700 transition-all duration-300 shadow-md hover:shadow-lg active:scale-95 whitespace-nowrap">
              Book Now
            </button>
          </div>
        </div>
      </a>

      {/* ========================================== */}
      {/* MOBILE CARD (Visible on <md) */}
      {/* ========================================== */}
      <a
        href={`/hotel/${hotel.slug}`}
        className="block md:hidden bg-white border-b border-gray-100 last:border-b-0 pb-4 mb-2"
      >
        {/* Image Carousel / Hero Image */}
        <div className="relative aspect-[16/10] w-full overflow-hidden">
          <img
            src={hotel.heroImage}
            alt={`${hotel.name} - Mobile View`}
            className="w-full h-full object-cover"
          />

          {/* Top Left Badges */}
          <div className="absolute top-2 left-2 flex flex-col gap-1 items-start">
            <CategoryBadge categories={hotel.categories} />
          </div>

          {/* Top Right Badges (Wishlist) */}
          <div className="absolute top-2 right-2">
            <div className="bg-white/90 backdrop-blur-sm rounded-full p-1.5 shadow-sm active:scale-95 transition-transform" onClick={toggleWishlist}>
              <Heart
                size={16}
                className={`transition-colors ${isWishlisted ? "fill-rose-500 text-rose-500" : "text-gray-400"}`}
              />
            </div>
          </div>

          {/* Bottom Left Rating on Image - OYO Style */}
          <div className="absolute bottom-3 left-3 flex items-center gap-1.5">
            <div className="bg-green-600 text-white text-xs font-bold px-1.5 py-0.5 rounded flex items-center gap-0.5">
              {(hotel.rating / 10).toFixed(1)} <Star size={8} className="fill-current" />
            </div>
            <span className="text-white text-xs font-medium drop-shadow-md">
              ({hotel.reviewCount} Ratings)
            </span>
            <span className="text-white/80 text-xs drop-shadow-md">• Very Good</span>
          </div>
        </div>

        {/* Content Body */}
        <div className="px-4 pt-3">
          {/* Title & Locality */}
          <div className="flex justify-between items-start gap-2">
            <h3 className="text-base font-bold text-gray-900 line-clamp-2 leading-tight">
              {hotel.name}
            </h3>
          </div>

          <div className="flex items-center text-gray-500 mt-1 gap-1">
            <MapPin size={12} className="shrink-0" />
            <p className="text-xs truncate max-w-[80%]">
              {hotel.locality.name}, {hotel.city.name}
            </p>
            <span className="text-xs text-rose-500 font-medium ml-auto">
              {/* Distance placeholder if you had it, e.g. "1.2 km" */}
            </span>
          </div>

          {/* Amenities (Compact) */}
          <div className="flex items-center gap-2 mt-2.5 overflow-x-auto scrollbar-hide pb-1">
            {hotel.hotelAmenities.slice(0, 4).map((amenity, i) => (
              <span key={i} className="text-[10px] text-gray-500 bg-gray-50 border border-gray-100 px-1.5 py-0.5 rounded whitespace-nowrap">
                {amenity}
              </span>
            ))}
          </div>

          {/* Pricing Row */}
          <div className="flex items-center mt-3 gap-2">
            <span className="text-xl font-bold text-gray-900">
              ₹{hotel.priceStartingFrom}
            </span>
            <span className="text-xs text-gray-400 line-through">
              ₹{originalPrice}
            </span>
            <span className="text-xs font-bold text-orange-500">
              {discount}% OFF
            </span>
          </div>

          <div className="flex items-center justify-between mt-1">
            <p className="text-[10px] text-gray-400">
              Includes taxes & fees
            </p>
          </div>
        </div>
      </a>
    </div>
  );
}