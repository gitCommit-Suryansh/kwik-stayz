"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { format } from "date-fns";
import {
  Loader2,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Printer,
  Phone,
} from "lucide-react";

export default function BookingDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const { id } = params;

  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;

    const fetchBooking = async () => {
      try {
        const res = await fetch(`/api/bookings/${id}`);
        const data = await res.json();

        if (!data.success) {
          throw new Error(data.message || "Failed to load booking");
        }

        setBooking(data.booking);
      } catch (err) {
        console.error(err);
        setError("Could not load booking details");
      } finally {
        setLoading(false);
      }
    };

    fetchBooking();
  }, [id]);

  if (loading) return <LoadingState />;
  if (error)
    return <ErrorState message={error} onHome={() => router.push("/")} />;
  if (!booking) return null;

  const {
    bookingCode,
    hotel,
    stay,
    guestDetails,
    pricing,
    roomType,
    status,
    createdAt,
  } = booking;

  // Formatting
  const checkInDate = stay.checkIn ? new Date(stay.checkIn) : null;
  const checkOutDate = stay.checkOut ? new Date(stay.checkOut) : null;

  const checkInDay = checkInDate ? format(checkInDate, "EEE, d MMM") : "";
  const checkOutDay = checkOutDate ? format(checkOutDate, "EEE, d MMM") : "";
  const nights = stay.nights;

  // Status Configuration
  const getStatusConfig = (status) => {
    switch (status) {
      case "CONFIRMED":
        return {
          title: "Booking Confirmed",
          message: "We hope you enjoy your stay!",
          colorClass: "bg-[#43A047]", // Green
          showBanner: true,
          showFooter: true,
        };
      case "PAYMENT_FAILED":
        return {
          title: "Payment Failed",
          message: "Your payment could not be processed.",
          colorClass: "bg-[#E53935]", // Red
          showBanner: false,
          showFooter: false,
        };
      case "PENDING_PAYMENT":
        return {
          title: "Payment Pending",
          message: "Please complete your payment to confirm.",
          colorClass: "bg-[#F57C00]", // Orange
          showBanner: true,
          showFooter: false,
        };
      case "CANCELLED":
        return {
          title: "Booking Cancelled",
          message: "This booking has been cancelled.",
          colorClass: "bg-gray-700",
          showBanner: false,
          showFooter: false,
        };
      case "CHECKED_IN":
        return {
          title: "Checked In",
          message: "Enjoy your stay!",
          colorClass: "bg-[#43A047]",
          showBanner: true,
          showFooter: true,
        };
      case "COMPLETED":
        return {
          title: "Stay Completed",
          message: "Hope you had a great time!",
          colorClass: "bg-blue-600",
          showBanner: false,
          showFooter: true,
        };
      default:
        return {
          title: "Booking Status: " + status,
          message: "Check details below.",
          colorClass: "bg-[#E53935]",
          showBanner: true,
          showFooter: true,
        };
    }
  };

  const statusConfig = getStatusConfig(status);

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900 pb-12">
      {/* 1. Header Section (Dynamic Color) */}
      <div
        className={`${statusConfig.colorClass} text-white px-4 pt-4 pb-6 sticky top-0 z-10 shadow-md transition-colors duration-300`}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <button
              onClick={() => router.push("/my-bookings")}
              className="mr-4 hover:bg-white/20 p-1 rounded-full transition-colors"
            >
              <ChevronLeft size={28} />
            </button>
          </div>

          <div className="text-center">
            <p className="text-sm font-medium opacity-95 tracking-wide">
              KwikStayz Welcomes you
            </p>
          </div>

          {/* Print Button */}
          <button
            onClick={() => window.print()}
            className="hover:bg-white/20 p-2 rounded-full transition-colors"
            title="Print Booking"
          >
            <Printer size={24} />
          </button>
        </div>

        <div className="text-center mt-2">
          <h1 className="text-2xl font-bold mb-1 uppercase tracking-tight">
            {statusConfig.title}
          </h1>
          <p className="text-sm opacity-90 mb-2 font-medium">
            {statusConfig.message}
          </p>

          <div className="flex flex-col items-center justify-center opacity-80 gap-0.5">
            <p className="text-xs font-mono tracking-wide font-bold">
              ID: {bookingCode}
            </p>
            {createdAt && (
              <p className="text-[10px]">
                Booked on {format(new Date(createdAt), "dd MMM yyyy")}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-xl mx-auto -mt-4 bg-white rounded-t-3xl min-h-screen px-5 pt-6 pb-20 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] relative z-20">
        {/* 2. Savings Banner (Conditional) */}
        {statusConfig.showBanner && (
          <div className="bg-[#43A047] text-white p-4 rounded-xl flex justify-between items-center mb-8 shadow-sm cursor-pointer hover:bg-[#388E3C] transition-colors">
            <p className="font-medium text-sm">
              Want to save more on this booking?
            </p>
            <ChevronRight size={20} />
          </div>
        )}

        {/* 3. Guest & Dates (Centered) */}
        <div className="text-center mb-8 border-b border-gray-100 pb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-3">
            {guestDetails.fullName.toUpperCase()}
          </h2>
          <div className="flex items-center justify-center gap-4 text-sm text-gray-700">
            <span className="font-medium">{checkInDay}</span>
            <span className="bg-gray-100 px-3 py-1 rounded-full text-xs text-gray-600 font-bold border border-gray-200">
              {nights} Night{nights > 1 ? "s" : ""}
            </span>
            <span className="font-medium">{checkOutDay}</span>
          </div>
        </div>

        {/* 4. Hotel Info Split */}
        <div className="flex gap-4 mb-8">
          <div className="flex-1">
            <Link href={`/hotels/${hotel._id || "#"}`}>
              <h3 className="text-lg font-bold text-gray-900 leading-tight mb-2 hover:text-[#E53935] hover:underline transition-colors cursor-pointer">
                {hotel.name}
              </h3>
            </Link>
            <p className="text-sm text-gray-500 leading-relaxed">
              {hotel.address}
            </p>
          </div>
          {hotel.image && (
            <div className="w-24 h-24 shrink-0 rounded-xl overflow-hidden bg-gray-200 shadow-sm">
              <img
                src={hotel.image}
                alt={hotel.name}
                className="w-full h-full object-cover"
              />
            </div>
          )}
        </div>

        {/* 5. 3-Column Grid Details */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {/* Guests */}
          <div className="bg-gray-50 p-4 rounded-xl text-left border border-gray-100 flex flex-col justify-between">
            <p className="text-[10px] font-bold text-[#E53935] uppercase tracking-wide mb-1">
              GUESTS
            </p>
            <p className="text-lg font-bold text-gray-900 leading-none">
              {booking.rooms.reduce((acc, r) => acc + r.guests, 0)}
            </p>
          </div>
          {/* Rooms */}
          <div className="bg-gray-50 p-4 rounded-xl text-left border border-gray-100 flex flex-col justify-between">
            <p className="text-[10px] font-bold text-[#E53935] uppercase tracking-wide mb-1">
              ROOMS
            </p>
            <div className="leading-none">
              <span className="text-lg font-bold text-gray-900 block">
                {booking.rooms.length}
              </span>
              <span className="text-[10px] text-gray-500 font-medium truncate block max-w-full">
                {roomType?.name || "Standard"}
              </span>
            </div>
          </div>
          {/* Price */}
          <div className="bg-gray-50 p-4 rounded-xl text-left border border-gray-100 flex flex-col justify-between">
            <p className="text-[10px] font-bold text-[#E53935] uppercase tracking-wide mb-1">
              PRICE
            </p>
            <div className="leading-none">
              <p className="text-lg font-bold text-gray-900">
                ₹ {pricing.totalPrice.toLocaleString()}
              </p>

              {status === "PAYMENT_FAILED" ? (
                <span className="text-[9px] font-bold uppercase tracking-wider text-red-600">
                  Failed
                </span>
              ) : (
                <span
                  className={`text-[9px] font-bold uppercase tracking-wider ${
                    status === "CONFIRMED"
                      ? "text-green-600"
                      : "text-orange-600"
                  }`}
                >
                  {status === "CONFIRMED" ? "Prepaid" : "Pay at Hotel"}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* 6. Address Section */}
        <div className="flex items-start gap-3 border-t border-gray-100 pt-6 mb-6">
          <MapPin className="mt-1 text-[#E53935] shrink-0" size={20} />
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-800 leading-relaxed mb-2">
              {hotel.name}, {hotel.address}, {hotel.city}
            </p>
            <div className="flex justify-between items-center">
              <p className="text-xs text-gray-500">{hotel.locality}</p>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                  hotel.name + " " + hotel.address
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-bold text-[#E53935] hover:underline"
              >
                Get Directions
              </a>
            </div>
          </div>
        </div>

        {/* Contact / Help Section */}
        <div className="flex items-center gap-3 border-t border-gray-100 pt-6">
          <div className="bg-blue-50 p-2 rounded-full text-blue-600">
            <Phone size={20} />
          </div>
          <div>
            <p className="text-sm font-bold text-gray-900">
              Need help with your booking?
            </p>
            <p className="text-xs text-gray-500">Call our 24/7 support line</p>
          </div>
          <a
            href="tel:+911234567890"
            className="ml-auto text-xs font-bold bg-white border border-gray-200 px-3 py-1.5 rounded-full hover:bg-gray-50 transition-colors"
          >
            Call Now
          </a>
        </div>

        {/* Footer Question (Conditional) */}
        {statusConfig.showFooter && (
          <div className="mt-12 text-center border-t border-gray-100 pt-6">
            <p className="font-bold text-gray-900 text-sm">
              Was the check-in at KwikStayz smooth for you?
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

function LoadingState() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <Loader2 className="w-8 h-8 text-[#E53935] animate-spin" />
    </div>
  );
}

function ErrorState({ message, onHome }) {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="text-center">
        <h2 className="text-xl font-bold text-gray-900 mb-2">Error</h2>
        <p className="text-gray-500 mb-6">{message}</p>
        <button
          onClick={onHome}
          className="text-[#E53935] font-bold hover:underline"
        >
          Go Home
        </button>
      </div>
    </div>
  );
}
