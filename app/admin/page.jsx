"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { format } from "date-fns";
import {
    BuildingOffice2Icon,
    MapIcon,
    HomeModernIcon,
    TagIcon,
    StarIcon,
    ArrowTrendingUpIcon,
    UsersIcon,
    CurrencyRupeeIcon,
    ClockIcon
} from "@heroicons/react/24/outline";

const quickLinks = [
    {
        title: "Add New Hotel",
        href: "/admin/hotels/create",
        icon: BuildingOffice2Icon,
        description: "Onboard a new property",
        color: "from-blue-500 to-blue-600",
    },
    {
        title: "Add City",
        href: "/admin/cities/create",
        icon: MapIcon,
        description: "Expand to new regions",
        color: "from-emerald-500 to-emerald-600",
    },
    {
        title: "Add Locality",
        href: "/admin/localities/create",
        icon: HomeModernIcon,
        description: "Define city areas",
        color: "from-purple-500 to-purple-600",
    },
    {
        title: "New Category",
        href: "/admin/categories/create",
        icon: TagIcon,
        description: "Create hotel tags",
        color: "from-orange-500 to-orange-600",
    },
    {
        title: "Feature City",
        href: "/admin/home-cities/create",
        icon: StarIcon,
        description: "Update home page",
        color: "from-rose-500 to-rose-600",
    },
];

export default function AdminDashboard() {
    const [stats, setStats] = useState({
        totalRevenue: 0,
        activeHotels: 0,
        totalBookings: 0,
        avgStay: 0,
        recentBookings: []
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await fetch("/api/admin/dashboard");
                if (res.ok) {
                    const data = await res.json();
                    setStats(data);
                }
            } catch (err) {
                console.error("Failed to fetch dashboard stats", err);
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    const statCards = [
        { name: 'Total Revenue', value: `₹${stats.totalRevenue.toLocaleString()}`, icon: CurrencyRupeeIcon, color: 'text-green-600' },
        { name: 'Active Hotels', value: stats.activeHotels, icon: BuildingOffice2Icon, color: 'text-blue-600' },
        { name: 'Total Bookings', value: stats.totalBookings, icon: UsersIcon, color: 'text-purple-600' },
        { name: 'Avg. Stay', value: `${stats.avgStay.toFixed(1)} Days`, icon: ClockIcon, color: 'text-orange-600' },
    ];

    if (loading) {
        return (
            <div className="flex h-96 items-center justify-center">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-primary"></div>
            </div>
        );
    }

    return (
        <div className="space-y-10">

            {/* Header Section */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 font-brand tracking-wide">Good Morning, Admin</h1>
                    <p className="text-gray-500 mt-1">Here's what's happening with your properties today.</p>
                </div>
                <div className="flex gap-3">
                    <button className="px-4 py-2 bg-white border border-gray-200 text-sm font-medium rounded-lg text-gray-700 hover:bg-gray-50">
                        Download Report
                    </button>
                    <Link href="/" target="_blank" className="px-4 py-2 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary/90">
                        View Live Site
                    </Link>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {statCards.map((item) => (
                    <div key={item.name} className="relative overflow-hidden rounded-2xl bg-white p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                        <dt>
                            <div className="absolute rounded-md bg-primary/5 p-3">
                                <item.icon className="h-6 w-6 text-primary" aria-hidden="true" />
                            </div>
                            <p className="ml-16 truncate text-sm font-medium text-gray-500">{item.name}</p>
                        </dt>
                        <dd className="ml-16 flex items-baseline pb-1 sm:pb-2">
                            <p className="text-2xl font-semibold text-gray-900">{item.value}</p>
                        </dd>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Quick Actions Panel */}
                <div className="lg:col-span-2 space-y-6">
                    <h2 className="text-lg font-semibold text-gray-900">Quick Management</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {quickLinks.map((link) => (
                            <Link
                                key={link.title}
                                href={link.href}
                                className="group flex items-center gap-4 bg-white p-4 rounded-xl border border-gray-100 shadow-sm hover:border-gray-300 hover:shadow-md transition-all"
                            >
                                <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br ${link.color} text-white shadow-md group-hover:scale-110 transition-transform`}>
                                    <link.icon className="h-6 w-6" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-900 group-hover:text-primary">{link.title}</h3>
                                    <p className="text-xs text-gray-500">{link.description}</p>
                                </div>
                            </Link>
                        ))}
                    </div>

                    {/* Recent Details Table */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mt-8">
                        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
                            <h3 className="font-semibold text-gray-900">Recent Bookings</h3>
                            <Link href="/admin/bookings" className="text-sm text-primary font-medium hover:underline">View All</Link>
                        </div>
                        <div className="overflow-x-auto">
                            {stats.recentBookings.length === 0 ? (
                                <p className="text-center py-6 text-gray-500 text-sm">No recent bookings found.</p>
                            ) : (
                                <table className="min-w-full whitespace-nowrap text-left text-sm">
                                    <thead className="bg-gray-50/50 text-gray-500">
                                        <tr>
                                            <th className="px-6 py-3 font-medium">Guest</th>
                                            <th className="px-6 py-3 font-medium">Hotel</th>
                                            <th className="px-6 py-3 font-medium">Status</th>
                                            <th className="px-6 py-3 font-medium">Date</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                        {stats.recentBookings.map((booking) => (
                                            <tr key={booking._id} className="hover:bg-gray-50/50 transition-colors">
                                                <td className="px-6 py-3 font-medium text-gray-900">
                                                    {booking.guestDetails?.fullName || "Guest"}
                                                </td>
                                                <td className="px-6 py-3 text-gray-500">{booking.hotel?.name}</td>
                                                <td className="px-6 py-3">
                                                    <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium 
                                                        ${booking.status === 'CONFIRMED' ? 'bg-green-50 text-green-700 ring-1 ring-inset ring-green-600/20' :
                                                            booking.status === 'PENDING_PAYMENT' ? 'bg-yellow-50 text-yellow-700 ring-1 ring-inset ring-yellow-600/20' :
                                                                'bg-gray-50 text-gray-700 ring-1 ring-inset ring-gray-600/20'}`}>
                                                        {booking.status.replace("_", " ")}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-3 text-gray-400">
                                                    {booking.createdAt && format(new Date(booking.createdAt), "MMM d, HH:mm")}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            )}
                        </div>
                    </div>
                </div>

                {/* Side Panel / Notifications */}
                <div className="space-y-6">
                    <h2 className="text-lg font-semibold text-gray-900">System Activity</h2>
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                        <p className="text-sm text-gray-500 italic">No verified system notifications yet.</p>
                    </div>

                    {/* Promo / Banner */}
                    <div className="relative overflow-hidden rounded-2xl bg-primary p-6 shadow-lg">
                        <div className="relative z-10">
                            <h3 className="text-lg font-bold text-white">Need Help?</h3>
                            <p className="mt-2 text-sm text-gray-300">Check the documentation for API usage and dashboard guides.</p>
                            <button className="mt-4 px-4 py-2 bg-white/10 text-white text-sm font-medium rounded-lg hover:bg-white/20 backdrop-blur-sm border border-white/10">Documentation</button>
                        </div>
                        <div className="absolute -bottom-12 -right-12 h-40 w-40 rounded-full bg-accent/20 blur-3xl"></div>
                        <div className="absolute top-0 right-0 h-32 w-32 rounded-full bg-blue-500/20 blur-2xl"></div>
                    </div>

                </div>

            </div>

        </div>
    );
}
