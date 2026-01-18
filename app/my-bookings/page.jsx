"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import {
    Loader2,
    MapPin,
    HelpCircle,
    RotateCcw,
    Hotel,
    Calendar,
    Navigation,
    ChevronRight,
    ArrowLeft,
    Home,
    Search,
    Briefcase,
    BadgePercent,
    User,
} from "lucide-react";

import Navbar from "@/components/home/Navbar";

export default function MyBookingsPage() {
    const router = useRouter();
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBookings = async () => {
            // ... existing fetch logic
            try {
                const res = await fetch("/api/bookings/my-bookings");

                if (res.status === 401) {
                    router.push("/auth/login");
                    return;
                }

                const data = await res.json();

                if (!data.success) {
                    throw new Error(data.message || "Failed to load bookings");
                }

                setBookings(data.bookings);
            } catch (err) {
                console.error(err);
                setError("Could not load your bookings");
            } finally {
                setLoading(false);
            }
        };

        fetchBookings();
    }, [router]);
    console.log(bookings);

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            {/* Desktop Navbar */}
            <div className="hidden md:block">
                <Navbar />
            </div>

            {/* Mobile Header */}
            <div className="md:hidden bg-white border-b border-gray-200 sticky top-0 z-20 shadow-sm">
                <div className="max-w-4xl mx-auto px-4 h-14 flex items-center relative justify-center">
                    <button
                        onClick={() => router.back()}
                        className="absolute left-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                        <ArrowLeft size={20} className="text-gray-700" />
                    </button>
                    <h1 className="text-lg font-bold text-gray-900">
                        My Bookings
                    </h1>
                </div>
            </div>

            <main className="max-w-7xl mx-auto px-0 md:px-4 py-4 md:py-6 md:pt-32">
                {/* PREVIOUS BOOKINGS HEADER */}
                <div className="px-4 md:px-0 mb-4">
                    <h2 className="text-xl font-bold text-gray-800">
                        Your Bookings ({bookings.length})
                    </h2>
                </div>

                {loading ? (
                    <div className="flex flex-col items-center justify-center py-20">
                        <Loader2 className="w-8 h-8 text-gray-400 animate-spin mb-3" />
                        <p className="text-gray-500 text-sm font-medium">Loading...</p>
                    </div>
                ) : error ? (
                    <div className="bg-red-50 text-red-600 p-4 m-4 rounded-md text-center">
                        <p className="text-sm">{error}</p>
                        <button
                            onClick={() => window.location.reload()}
                            className="mt-2 text-sm font-semibold underline"
                        >
                            Retry
                        </button>
                    </div>
                ) : bookings.length === 0 ? (
                    <EmptyState router={router} />
                ) : (
                    <div className="flex flex-col gap-3">
                        {bookings.map((booking) => (
                            <BookingCard key={booking._id} booking={booking} router={router} />
                        ))}
                    </div>
                )}
            </main>
            <BottomNav />
        </div>
    );
}

function BottomNav() {
    const [activeTab, setActiveTab] = useState("Bookings");
    const navItems = [
        { name: "Home", icon: Home, href: "/" },
        { name: "Search", icon: Search, href: "#" },
        { name: "Bookings", icon: Briefcase, href: "/my-bookings" },
        { name: "Offers", icon: BadgePercent, href: "/offers" },
        { name: "Account", icon: User, href: "/account" },
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
                            className={`transition-colors ${activeTab === item.name
                                ? "text-red-500" // Active color from OYO image
                                : "text-gray-500"
                                }`}
                        />
                        <span
                            className={`text-xs font-medium transition-colors ${activeTab === item.name ? "text-red-500" : "text-gray-600"
                                }`}
                        >
                            {item.name}
                        </span>
                    </a>
                ))}
            </div>
        </nav>
    );
}

function EmptyState({ router }) {
    return (
        <div className="bg-white p-10 text-center mt-8 shadow-sm">
            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Hotel className="text-gray-300" size={32} />
            </div>
            <h2 className="text-lg font-bold text-gray-900 mb-2">No bookings yet</h2>
            <p className="text-sm text-gray-500 mb-6">
                Start your journey with KwikStays today.
            </p>
            <button
                onClick={() => router.push("/")}
                className="px-8 py-2.5 bg-red-600 text-white text-sm font-bold rounded shadow-sm hover:bg-red-700 transition-colors"
            >
                Book Now
            </button>
        </div>
    );
}

function BookingCard({ booking, router }) {
    const { hotel, stay, status, bookingCode, pricing } = booking;
    const heroImage = hotel?.id?.heroImage || "/placeholder-hotel.jpg";

    // Derived values
    const city = hotel?.id?.address?.city || "Unknown City";
    const address = hotel?.id?.address?.street || hotel?.id?.address || "Address unavailable";
    const hotelName = hotel?.name || "Hotel Name";
    const checkIn = format(new Date(stay.checkIn), "dd MMM");
    const checkOut = format(new Date(stay.checkOut), "dd MMM");
    const checkInFull = format(new Date(stay.checkIn), "EEE, dd MMM yyyy");
    const checkOutFull = format(new Date(stay.checkOut), "EEE, dd MMM yyyy");
    const guestCount = booking.rooms?.reduce((acc, room) => acc + room.guests, 0) || 1;
    const totalPrice = pricing?.totalPrice || 0;

    // Status Badge Logic
    const StatusBadge = () => {
        switch (status) {
            case "CONFIRMED":
                return <span className="text-[10px] md:text-xs font-bold bg-green-600 text-white px-2 py-0.5 rounded">Confirmed</span>;
            case "CANCELLED":
                return <span className="text-[10px] md:text-xs font-bold bg-gray-500 text-white px-2 py-0.5 rounded">Cancelled</span>;
            case "PAYMENT_FAILED":
                return <span className="text-[10px] md:text-xs font-bold bg-red-500 text-white px-2 py-0.5 rounded">Payment Failed</span>;
            case "EXPIRED":
                return <span className="text-[10px] md:text-xs font-bold bg-gray-400 text-white px-2 py-0.5 rounded">Expired</span>;
            case "PENDING_PAYMENT":
                return <span className="text-[10px] md:text-xs font-bold bg-orange-500 text-white px-2 py-0.5 rounded">Pending Payment</span>;
            default:
                return <span className="text-[10px] md:text-xs font-bold bg-gray-400 text-white px-2 py-0.5 rounded">{status?.replace('_', ' ')}</span>;
        }
    };

    const handleAction = (actionType) => {
        if (actionType === "DIRECTIONS") {
            const lat = hotel?.id?.geo?.lat;
            const lng = hotel?.id?.geo?.lng;
            if (lat && lng) {
                window.open(
                    `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`,
                    "_blank"
                );
            } else {
                alert("Location coordinates not available");
            }
            return;
        }

        if (status === "CONFIRMED" || status === "PENDING_PAYMENT") {
            router.push(`/booking/${booking._id}`);
        } else {
            if (hotel?.id?.slug) {
                router.push(`/hotel/${hotel.id.slug}`);
            } else {
                router.push("/");
            }
        }
    };

    return (
        <>
            {/* MOBILE VIEW (OYO Style - Compact Horizontal) */}
            <div className="bg-white w-full border-b border-gray-200 shadow-sm overflow-hidden md:hidden">
                <div
                    onClick={() => router.push(`/booking/${booking._id}`)}
                    className="p-4 flex gap-4 cursor-pointer hover:bg-gray-50 transition-colors"
                >
                    <div className="w-16 h-16 shrink-0 relative">
                        <img
                            src={heroImage}
                            alt={hotelName}
                            className="w-full h-full object-cover rounded-md"
                        />
                    </div>
                    <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start">
                            <h3 className="text-base font-bold text-gray-800 leading-tight mb-1 truncate">
                                {city}
                            </h3>
                            <StatusBadge />
                        </div>
                        <p className="text-sm text-gray-500 mb-1">
                            {checkIn} - {checkOut} • {guestCount} Guests
                        </p>
                        <p className="text-xs text-gray-400 font-medium truncate">
                            {hotelName} • {bookingCode}
                        </p>
                    </div>
                </div>
                <div className="h-px bg-gray-100 w-full" />
                <div className="flex items-center text-sm font-medium text-gray-600">
                    <button
                        onClick={() =>
                            status === "CONFIRMED" || status === "PENDING_PAYMENT"
                                ? handleAction("DIRECTIONS")
                                : handleAction()
                        }
                        className="flex-1 py-3 hover:bg-gray-50 hover:text-red-600 flex items-center justify-center gap-2 border-r border-gray-100 transition-colors"
                    >
                        {status === "CONFIRMED" || status === "PENDING_PAYMENT" ? (
                            <><Navigation size={16} /> Directions</>
                        ) : (
                            <><RotateCcw size={16} /> Book Again</>
                        )}
                    </button>
                    <button
                        onClick={() => router.push("/contact")}
                        className="flex-1 py-3 hover:bg-gray-50 hover:text-red-600 flex items-center justify-center gap-2 transition-colors"
                    >
                        <HelpCircle size={16} /> Need Help?
                    </button>
                </div>
            </div>

            {/* DESKTOP VIEW (Detailed Style - Large Image & Info) */}
            <div className="hidden md:flex bg-white w-full border rounded-lg border-gray-200 shadow-sm overflow-hidden flex-row transition-all hover:shadow-md">
                <div
                    onClick={() => router.push(`/booking/${booking._id}`)}
                    className="w-72 shrink-0 relative cursor-pointer border-r border-gray-100"
                >
                    <div className="w-full h-full absolute inset-0">
                        <img
                            src={heroImage}
                            alt={hotelName}
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>
                <div className="flex-1 flex flex-row">
                    <div className="flex-1 p-4 flex flex-col justify-between">
                        <div>
                            <div className="flex justify-between items-start mb-2">
                                <div>
                                    <div className="flex items-center gap-2">
                                        <h3 className="text-lg font-bold text-gray-800 leading-tight">
                                            {city}
                                        </h3>
                                    </div>
                                    <p className="text-sm text-gray-500 font-medium mt-1">
                                        {hotelName}
                                    </p>
                                    <p className="text-xs text-gray-400 mt-1 truncate max-w-[250px]">
                                        {address}
                                    </p>
                                </div>
                                <div>
                                    <StatusBadge />
                                </div>
                            </div>
                            <div className="flex flex-wrap gap-4 mt-4">
                                <div className="bg-gray-50 rounded px-3 py-2 border border-gray-100">
                                    <p className="text-[10px] text-gray-500 uppercase font-bold">Check-in</p>
                                    <p className="text-sm font-semibold text-gray-800">{checkInFull}</p>
                                </div>
                                <div className="flex items-center text-gray-300">
                                    <ChevronRight size={16} />
                                </div>
                                <div className="bg-gray-50 rounded px-3 py-2 border border-gray-100">
                                    <p className="text-[10px] text-gray-500 uppercase font-bold">Check-out</p>
                                    <p className="text-sm font-semibold text-gray-800">{checkOutFull}</p>
                                </div>
                                <div className="bg-gray-50 rounded px-3 py-2 border border-gray-100">
                                    <p className="text-[10px] text-gray-500 uppercase font-bold">Guests</p>
                                    <p className="text-sm font-semibold text-gray-800">{guestCount} Guests</p>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-gray-400">
                            <span className="bg-gray-100 px-2 py-1 rounded">Booking ID: {bookingCode}</span>
                        </div>
                    </div>
                    <div className="border-l border-gray-100 w-64 bg-gray-50/30 flex flex-col justify-center p-6">
                        <div className="mb-6 text-center">
                            <p className="text-xs text-gray-500 mb-1">Total Amount</p>
                            <p className="text-2xl font-bold text-gray-900">₹{totalPrice.toLocaleString()}</p>
                            <p className="text-[10px] text-green-600 font-medium">Includes all taxes</p>
                        </div>
                        <div className="flex flex-col gap-3">
                            <button
                                onClick={() =>
                                    status === "CONFIRMED" || status === "PENDING_PAYMENT"
                                        ? handleAction("DIRECTIONS")
                                        : handleAction()
                                }
                                className="py-2.5 px-4 bg-red-600 hover:bg-red-700 text-white flex items-center justify-center gap-2 rounded-lg transition-colors font-medium text-sm shadow-sm"
                            >
                                {status === "CONFIRMED" || status === "PENDING_PAYMENT" ? (
                                    <><Navigation size={16} /> Get Directions</>
                                ) : (
                                    <><RotateCcw size={16} /> Book Again</>
                                )}
                            </button>
                            <button
                                onClick={() => router.push("/contact")}
                                className="py-2.5 px-4 bg-white hover:bg-gray-50 text-gray-600 flex items-center justify-center gap-2 border border-gray-300 rounded-lg transition-colors font-medium text-sm"
                            >
                                <HelpCircle size={16} /> Need Help?
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

