import React from "react";
import { Star, Wifi, Utensils } from "lucide-react";

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

export default Recommendations;
