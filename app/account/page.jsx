"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import BookingCard from "@/components/account/BookingCard";
import ProfileEdit from "@/components/account/ProfileEdit";
import { Loader2, Ticket } from "lucide-react";

export default function AccountPage() {
    const [user, setUser] = useState(null);
    const [bookings, setBookings] = useState([]);
    const [loadingParams, setLoadingParams] = useState({ page: true, bookings: true });

    const router = useRouter();

    // Fetch User
    useEffect(() => {
        fetch("/api/auth/me")
            .then((res) => res.json())
            .then((data) => {
                if (data.user) {
                    setUser(data.user);
                } else {
                    router.push("/auth/login");
                }
            })
            .catch((err) => {
                console.error("Failed to fetch user", err);
                router.push("/auth/login");
            })
            .finally(() => {
                setLoadingParams(prev => ({ ...prev, page: false }));
            });
    }, [router]);

    // Fetch Bookings (only if user logged in)
    useEffect(() => {
        if (!user) return;

        fetch("/api/account/bookings")
            .then((res) => {
                if (res.status === 401) { router.push("/auth/login"); return null; }
                return res.json();
            })
            .then((data) => {
                if (data && data.bookings) {
                    setBookings(data.bookings);
                }
            })
            .catch((err) => console.error("Failed to fetch bookings", err))
            .finally(() => {
                setLoadingParams(prev => ({ ...prev, bookings: false }));
            });
    }, [user, router]);

    const handleProfileUpdate = (updatedUser) => {
        setUser(updatedUser);
    };

    if (loadingParams.page) {
        return (
            <main className="min-h-screen bg-gray-50 pt-32 pb-12 flex items-center justify-center">
                <Loader2 className="animate-spin text-blue-600" size={32} />
            </main>
        );
    }

    if (!user) return null; // Will redirect

    return (
        <main className="min-h-screen bg-gray-50/50 pt-28 pb-12 font-sans">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header Section */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">
                        Hello, {user.name?.split(" ")[0] || "Traveler"}! 👋
                    </h1>
                    <p className="text-gray-500 mt-1">Manage your profile and view your trip history.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

                    {/* LEFT COLUMN - Bookings */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                                <Ticket className="text-blue-600" size={20} />
                                My Bookings
                            </h2>
                            <span className="text-sm font-medium text-gray-500 bg-white px-3 py-1 rounded-full border border-gray-100 shadow-sm">
                                {bookings.length} Total
                            </span>
                        </div>

                        {loadingParams.bookings ? (
                            <div className="flex justify-center p-12">
                                <Loader2 className="animate-spin text-gray-400" size={24} />
                            </div>
                        ) : bookings.length > 0 ? (
                            <div className="grid gap-4">
                                {bookings.map((booking) => (
                                    <BookingCard key={booking._id} booking={booking} />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-gray-200">
                                <div className="mx-auto w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center text-gray-300 mb-4">
                                    <Ticket size={24} />
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-1">No bookings yet</h3>
                                <p className="text-gray-500 text-sm mb-6 max-w-sm mx-auto">
                                    Looks like you haven't booked any trips yet. Start exploring amazing stays now!
                                </p>
                                <a
                                    href="/"
                                    className="inline-flex items-center justify-center px-6 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition w-auto"
                                >
                                    Explore Hotels
                                </a>
                            </div>
                        )}
                    </div>

                    {/* RIGHT COLUMN - Profile Sidebar */}
                    <div className="lg:col-span-1">
                        <ProfileEdit user={user} onUpdate={handleProfileUpdate} />
                    </div>
                </div>
            </div>
        </main>
    );
}
