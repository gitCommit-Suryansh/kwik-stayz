"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/home/Navbar";
import ProfileEdit from "@/components/account/ProfileEdit";
import { Loader2, Briefcase, ChevronRight, ArrowLeft } from "lucide-react";

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

    if (loadingParams.page) {
        return (
            <main className="min-h-screen bg-gray-50 pt-32 pb-12 flex items-center justify-center">
                <Loader2 className="animate-spin text-blue-600" size={32} />
            </main>
        );
    }

    if (!user) return null; // Will redirect

    return (
        <div className="min-h-screen bg-gray-50/50 pb-12 font-sans">
            {/* Desktop Navbar */}
            <div className="hidden md:block">
                <Navbar />
            </div>

            {/* Mobile Header */}
            <div className="md:hidden bg-white border-b border-gray-200 sticky top-0 z-20 shadow-sm">
                <div className="max-w-4xl mx-auto px-4 h-14 flex items-center relative justify-center">
                    <button
                        onClick={() => router.push("/")}
                        className="absolute left-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                        <ArrowLeft size={20} className="text-gray-700" />
                    </button>
                    <h1 className="text-lg font-bold text-gray-900">
                        Account
                    </h1>
                </div>
            </div>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:pt-32">

                {/* Header Section */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">
                        Hello, {user.name?.split(" ")[0] || "Traveler"}! 👋
                    </h1>
                    <p className="text-gray-500 mt-1">Manage your profile and view your trip history.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

                    {/* LEFT COLUMN - Bookings CTA */}
                    <div className="lg:col-span-2">
                        <div
                            onClick={() => router.push("/my-bookings")}
                            className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm flex items-center justify-between cursor-pointer hover:bg-gray-50 transition-all group"
                        >
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center text-blue-600">
                                    <Briefcase size={20} />
                                </div>
                                <div>
                                    <h2 className="text-lg font-bold text-gray-900">My Bookings</h2>
                                    <p className="text-sm text-gray-500">View and manage your bookings</p>
                                </div>
                            </div>
                            <div className="flex items-center text-gray-400 group-hover:text-blue-600 transition-colors">
                                <span className="text-sm font-medium mr-2 hidden sm:block">View All</span>
                                <ChevronRight size={20} />
                            </div>
                        </div>
                    </div>

                    {/* RIGHT COLUMN - Profile Sidebar */}
                    <div className="lg:col-span-1">
                        <ProfileEdit user={user} onUpdate={handleProfileUpdate} />
                    </div>
                </div>
            </main>
        </div>
    );
}
