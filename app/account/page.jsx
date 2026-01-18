"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Navbar from "@/components/home/Navbar";
import ProfileEdit from "@/components/account/ProfileEdit";
import { Loader2, Briefcase, ChevronRight, ArrowLeft, Heart, LogOut } from "lucide-react";

export default function AccountPage() {
    const [user, setUser] = useState(null);
    const [loadingParams, setLoadingParams] = useState({ page: true });

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

    const handleProfileUpdate = (updatedUser) => {
        setUser(updatedUser);
    };

    const handleLogout = async () => {
        try {
            await axios.post("/api/auth/logout");
            router.push("/");
            // Force refresh to clear state if needed, though router.push usually suffices
            router.refresh();
        } catch (error) {
            console.error("Logout failed", error);
        }
    };

    if (loadingParams.page) {
        return (
            <main className="min-h-screen bg-gray-50 pt-32 pb-12 flex items-center justify-center">
                <Loader2 className="animate-spin text-red-600" size={32} />
            </main>
        );
    }

    if (!user) return null; // Will redirect

    return (
        <div className="min-h-screen bg-gray-50 font-sans pb-24 md:pb-12">
            {/* Desktop Navbar */}
            <div className="hidden md:block">
                <Navbar />
            </div>

            {/* Mobile Header - Premium Gradient */}
            <div className="md:hidden bg-gradient-to-r from-red-600 to-red-700 text-white pb-8 pt-6 rounded-b-[2rem] shadow-lg mb-6 sticky top-0 z-10">
                <div className="px-6 flex items-center justify-between mb-6">
                    <button
                        onClick={() => router.push("/")}
                        className="p-2 bg-white/20 hover:bg-white/30 rounded-full transition-colors backdrop-blur-sm"
                    >
                        <ArrowLeft size={20} className="text-white" />
                    </button>
                    <h1 className="text-lg font-bold tracking-wide">My Account</h1>
                    <div className="w-9"></div> {/* Spacer for centering */}
                </div>

                <div className="px-6 flex items-center gap-4">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-red-600 shadow-inner border-4 border-white/20">
                        <span className="text-2xl font-bold">
                            {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                        </span>
                    </div>
                    <div>
                        <h2 className="text-xl font-bold leading-tight">
                            {user.name || "Traveler"}
                        </h2>
                        <p className="text-red-100 text-sm">{user.email}</p>
                    </div>
                </div>
            </div>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-0 md:pt-32">

                {/* Desktop Header Section */}
                <div className="hidden md:block mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">
                        Hello, {user.name?.split(" ")[0] || "Traveler"}! 👋
                    </h1>
                    <p className="text-gray-500 mt-1">Manage your profile and view your trip history.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

                    {/* LEFT COLUMN - Bookings CTA */}
                    <div className="lg:col-span-2 space-y-4">

                        {/* Mobile Section Title */}
                        <h3 className="md:hidden text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 px-2">
                            Menu
                        </h3>

                        {/* My Bookings Card */}
                        <div
                            onClick={() => router.push("/my-bookings")}
                            className="bg-white rounded-2xl border border-gray-100 md:border-gray-200 p-5 shadow-sm active:scale-[0.98] md:active:scale-100 transition-all cursor-pointer hover:shadow-md group flex items-center justify-between"
                        >
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-blue-50/80 rounded-full flex items-center justify-center text-blue-600">
                                    <Briefcase size={22} />
                                </div>
                                <div>
                                    <h2 className="text-lg font-bold text-gray-900 leading-tight">My Bookings</h2>
                                    <p className="text-sm text-gray-500 mt-0.5">Check your upcoming stays</p>
                                </div>
                            </div>
                            <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-blue-600 group-hover:text-white transition-all">
                                <ChevronRight size={18} />
                            </div>
                        </div>

                        {/* Wishlist */}
                        <button
                            onClick={() => router.push("/wishlist")}
                            className="w-full flex items-center justify-between p-4 rounded-xl bg-white md:bg-transparent hover:bg-gray-50 transition-colors group text-left border border-gray-100 md:border-transparent"
                        >
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center text-red-600 group-hover:scale-110 transition-transform">
                                    <Heart size={18} />
                                </div>
                                <div>
                                    <span className="block font-bold text-gray-900">My Wishlist</span>
                                    <span className="block text-xs text-gray-500 md:hidden">Saved places</span>
                                </div>
                            </div>
                            <ChevronRight size={18} className="text-gray-300 group-hover:text-red-600 transition-colors" />
                        </button>

                        {/* Contact Link */}
                        <button
                            onClick={() => router.push("/contact")}
                            className="w-full flex items-center justify-between p-4 rounded-xl bg-white md:bg-transparent hover:bg-gray-50 transition-colors group text-left border border-gray-100 md:border-transparent"
                        >
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-500 group-hover:scale-110 transition-transform">
                                    <span className="font-bold text-lg">?</span>
                                </div>
                                <span className="block font-bold text-gray-900">Help & Support</span>
                            </div>
                            <ChevronRight size={18} className="text-gray-300 group-hover:text-gray-900 transition-colors" />
                        </button>

                        {/* Mobile Logout */}
                        <button
                            onClick={handleLogout}
                            className="w-full flex items-center justify-between p-4 rounded-xl bg-white md:bg-transparent hover:bg-red-50 transition-colors group text-left border border-gray-100 md:border-transparent md:hidden mt-4"
                        >
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 group-hover:bg-red-100 group-hover:text-red-600 transition-colors">
                                    <LogOut size={18} />
                                </div>
                                <span className="block font-bold text-gray-900 group-hover:text-red-700">Log Out</span>
                            </div>
                        </button>
                    </div>

                    {/* RIGHT CONTENT (Profile Edit) */}
                    <div className="flex-1">
                        <div className="bg-white md:bg-transparent rounded-3xl p-6 md:p-0 border border-gray-100 md:border-none shadow-sm md:shadow-none">
                            <ProfileEdit user={user} onUpdate={handleProfileUpdate} />
                        </div>
                    </div>

                </div>
            </main>
        </div>
    );
}
