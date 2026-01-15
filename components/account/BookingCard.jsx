import Link from "next/link";
import React from "react";
import { Calendar, MapPin, CreditCard, ChevronRight } from "lucide-react";

/**
 * BookingCard Component
 * Displays a summary of a single booking.
 *
 * @param {Object} booking - The booking object from the API.
 */
const BookingCard = ({ booking }) => {
    // Format dates
    const checkIn = new Date(booking.stay.checkIn).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
    });
    const checkOut = new Date(booking.stay.checkOut).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
    });

    // Status Badge Logic
    const getStatusColor = (status) => {
        switch (status) {
            case "CONFIRMED":
            case "CHECKED_IN":
            case "COMPLETED":
                return "bg-green-100 text-green-700 border-green-200";
            case "PENDING_PAYMENT":
                return "bg-yellow-100 text-yellow-700 border-yellow-200";
            case "CANCELLED":
            case "PAYMENT_FAILED":
                return "bg-red-100 text-red-700 border-red-200";
            default:
                return "bg-gray-100 text-gray-700 border-gray-200";
        }
    };

    return (
        <Link
            href={`/booking/${booking._id}`}
            className="block group"
        >
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm group-hover:shadow-md transition-all duration-200 overflow-hidden flex flex-col sm:flex-row cursor-pointer">
                {/* Left: Image (Thumbnail) - Placeholder for now as discussed */}

                {/* Content */}
                <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                    <div className="flex justify-between items-start mb-2">
                        <div>
                            <p className="text-xs text-gray-500 font-medium uppercase tracking-wider mb-1">
                                Booking ID: {booking.bookingCode}
                            </p>
                            <h3 className="text-lg font-bold text-gray-900 leading-tight group-hover:text-blue-600 transition-colors">
                                {booking.hotel?.name || "Hotel Name Unavailable"}
                            </h3>
                            <div className="flex items-center text-sm text-gray-500 mt-1">
                                <MapPin size={14} className="mr-1" />
                                {booking.hotel?.address || "City Unavailable"}
                            </div>
                        </div>

                        <span
                            className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(
                                booking.status
                            )}`}
                        >
                            {booking.status.replace("_", " ")}
                        </span>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-4 text-sm text-gray-600">
                        <div className="flex items-center bg-gray-50 px-3 py-2 rounded-lg border border-gray-100">
                            <Calendar size={16} className="text-blue-500 mr-2" />
                            <span className="font-medium text-gray-900">{checkIn}</span>
                            <span className="mx-2 text-gray-400">→</span>
                            <span className="font-medium text-gray-900">{checkOut}</span>
                        </div>

                        <div className="flex items-center bg-gray-50 px-3 py-2 rounded-lg border border-gray-100">
                            <CreditCard size={16} className="text-green-500 mr-2" />
                            <span className="font-bold text-gray-900">
                                ₹{booking.pricing.totalPrice.toLocaleString("en-IN")}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Right: Action Indicator */}
                <div className="hidden sm:flex items-center justify-center w-12 bg-gray-50 border-l border-gray-100 group-hover:bg-blue-50 transition-colors">
                    <ChevronRight size={20} className="text-gray-400 group-hover:text-blue-600" />
                </div>
            </div>
        </Link>
    );
};

export default BookingCard;
