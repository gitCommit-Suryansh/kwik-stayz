import React from "react";
import { Star } from "lucide-react";
import { getAmenityIcon } from "@/components/hotel/amenityUtils"; // Import utility

const HotelCard = ({ hotel }) => {
    // Determine location string safely
    const locationName = hotel.city?.name || hotel.locality?.name || "KwikStayz";

    return (
        <a
            href={`/hotel/${hotel.slug}`}
            className="block group bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 w-full max-w-[280px] xs:max-w-xs mx-auto flex flex-col h-full"
        >
            {/* Image Container */}
            <div className="relative overflow-hidden h-40 sm:h-48 bg-gray-100">
                <img
                    src={hotel.heroImage || "/placeholder-hotel.jpg"}
                    alt={hotel.name}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
                <span className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm text-gray-800 text-[10px] font-bold px-2 py-1 rounded-md shadow-sm uppercase tracking-wider">
                    {locationName}
                </span>
                {/* Rating Badge Overlay */}
                <div className="absolute top-3 right-3 flex items-center gap-1 bg-white/95 px-2 py-1 rounded-full shadow-md">
                    <Star size={12} className="text-yellow-500 fill-yellow-500" />
                    <span className="text-xs font-bold text-gray-800">
                        {hotel.rating || "New"}
                    </span>
                </div>
            </div>

            {/* Content Container */}
            <div className="p-4 flex flex-col flex-grow gap-2">
                {/* Header */}
                <div className="flex justify-between items-start gap-2">
                    <h3 className="text-lg font-bold text-gray-800 leading-snug line-clamp-2 group-hover:text-[#f8a11e] transition-colors">
                        {hotel.name}
                    </h3>
                </div>

                {/* Subtitle / address hint */}
                <p className="text-xs text-gray-500 line-clamp-1">
                    {hotel.address?.area || hotel.locality?.name}, {hotel.city?.name}
                </p>

                {/* Amenities - Dynamic */}
                <div className="flex items-center gap-3 mt-1 min-h-[20px]">
                    {hotel.hotelAmenities && hotel.hotelAmenities.slice(0, 4).map((amenity, index) => {
                        const Icon = getAmenityIcon(amenity);
                        return (
                            <div key={index} className="flex items-center text-gray-400" title={amenity}>
                                <Icon size={16} strokeWidth={2} />
                            </div>
                        );
                    })}
                    {/* Clean fallback if no amenities */}
                    {(!hotel.hotelAmenities || hotel.hotelAmenities.length === 0) && (
                        <span className="text-[10px] text-gray-300 italic">Standard Amenities</span>
                    )}
                </div>

                <div className="mt-auto pt-3 border-t border-dashed border-gray-100 flex items-end justify-between">
                    <div>
                        <p className="text-[10px] text-gray-400 line-through decoration-red-400">
                            {hotel.originalPrice ? `₹${hotel.originalPrice.toLocaleString("en-IN")}` : ""}
                        </p>
                        <p className="text-xl font-bold text-gray-900 leading-tight">
                            ₹{hotel.priceStartingFrom?.toLocaleString("en-IN")}<span className="text-xs font-normal text-gray-400 ml-1">/night</span>
                        </p>
                    </div>
                </div>
            </div>
        </a>
    );
};

const Recommendations = ({ hotels }) => {
    // If no hotels passed or empty, hide section or show fallback
    if (!hotels || hotels.length === 0) return null;

    return (
        <section className="py-8 md:py-24 bg-gray-50/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between mb-8 md:mb-12">
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">
                        Recommended Stays
                    </h2>
                    {/* Optional: 'View All' link could go here */}
                </div>

                {/* Mobile hotel carousel */}
                <div className="md:hidden flex gap-4 overflow-x-auto pb-4 snap-x -mx-4 px-4 scrollbar-hide">
                    {hotels.map((hotel) => (
                        <div
                            className="snap-center min-w-[260px] max-w-[260px]"
                            key={hotel._id || hotel.id}
                        >
                            <HotelCard hotel={hotel} />
                        </div>
                    ))}
                </div>

                {/* Desktop grid */}
                <div className="hidden md:grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8">
                    {hotels.map((hotel) => (
                        <HotelCard key={hotel._id || hotel.id} hotel={hotel} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Recommendations;
