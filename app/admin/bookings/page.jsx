"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { format } from "date-fns";
import {
    CalendarIcon,
    MagnifyingGlassIcon,
    FunnelIcon,
    CheckCircleIcon,
    XCircleIcon,
    ClockIcon
} from "@heroicons/react/24/outline";

const STATUS_COLORS = {
    PENDING_PAYMENT: "bg-yellow-100 text-yellow-800",
    CONFIRMED: "bg-green-100 text-green-800",
    PAYMENT_FAILED: "bg-red-100 text-red-800",
    CANCELLED: "bg-gray-100 text-gray-800",
    EXPIRED: "bg-gray-100 text-gray-800",
    CHECKED_IN: "bg-blue-100 text-blue-800",
    COMPLETED: "bg-purple-100 text-purple-800",
};

export default function BookingsPage() {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filterStatus, setFilterStatus] = useState("ALL");
    const [search, setSearch] = useState("");

    const fetchBookings = async () => {
        setLoading(true);
        try {
            const params = new URLSearchParams();
            if (filterStatus !== "ALL") params.append("status", filterStatus);
            if (search) params.append("search", search);

            const res = await fetch(`/api/admin/bookings?${params.toString()}`);
            if (res.ok) {
                const data = await res.json();
                setBookings(data);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBookings();
    }, [filterStatus]); // Re-fetch when filter changes

    // Search debounce could be added, for now manual enter or blur? 
    // Let's just use a button or Enter key for simplicity or simple effect on debounce.
    // For simplicity, let's trigger search on Enter in input.

    return (
        <div className="max-w-7xl mx-auto">
            <div className="md:flex md:items-center md:justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">Bookings</h1>
                    <p className="mt-2 text-gray-500">Manage hotel reservations and guest stays.</p>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6 flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="relative w-full md:w-96">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                    </div>
                    <input
                        type="text"
                        placeholder="Search by code, guest name or mobile..."
                        className="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && fetchBookings()}
                    />
                </div>

                <div className="flex items-center gap-2 w-full md:w-auto">
                    <FunnelIcon className="h-5 w-5 text-gray-400" />
                    <select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                        className="block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-primary sm:text-sm sm:leading-6"
                    >
                        <option value="ALL">All Statuses</option>
                        <option value="CONFIRMED">Confirmed</option>
                        <option value="PENDING_PAYMENT">Pending Payment</option>
                        <option value="CHECKED_IN">Checked In</option>
                        <option value="COMPLETED">Completed</option>
                        <option value="CANCELLED">Cancelled</option>
                    </select>
                </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                {loading ? (
                    <div className="p-12 text-center">
                        <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-gray-200 border-t-primary"></div>
                        <p className="mt-2 text-gray-500">Loading bookings...</p>
                    </div>
                ) : bookings.length === 0 ? (
                    <div className="p-12 text-center text-gray-500">
                        No bookings found matching your criteria.
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="min-w-full whitespace-nowrap text-left text-sm">
                            <thead className="bg-gray-50/50 text-gray-500">
                                <tr>
                                    <th className="px-6 py-4 font-medium">Booking Code</th>
                                    <th className="px-6 py-4 font-medium">Guest</th>
                                    <th className="px-6 py-4 font-medium">Hotel</th>
                                    <th className="px-6 py-4 font-medium">Dates</th>
                                    <th className="px-6 py-4 font-medium">Amount</th>
                                    <th className="px-6 py-4 font-medium">Status</th>
                                    <th className="px-6 py-4 font-medium">Created</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {bookings.map((booking) => (
                                    <tr key={booking._id} className="hover:bg-gray-50/50 transition-colors">
                                        <td className="px-6 py-4 font-medium text-primary">
                                            <Link href={`/admin/bookings/${booking._id}`} className="hover:underline">
                                                #{booking.bookingCode}
                                            </Link>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="font-medium text-gray-900">{booking.guestDetails?.fullName}</div>
                                            <div className="text-xs text-gray-500">{booking.guestDetails?.mobile}</div>
                                        </td>
                                        <td className="px-6 py-4 max-w-xs truncate">
                                            <div className="text-gray-900" title={booking.hotel?.name}>{booking.hotel?.name}</div>
                                            <div className="text-xs text-gray-500">{booking.roomType?.name}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-gray-900">
                                                {booking.stay?.checkIn && format(new Date(booking.stay.checkIn), "MMM d")} - {booking.stay?.checkOut && format(new Date(booking.stay.checkOut), "MMM d")}
                                            </div>
                                            <div className="text-xs text-gray-500">{booking.stay?.nights} Nights</div>
                                        </td>
                                        <td className="px-6 py-4 font-medium">
                                            ₹{booking.pricing?.totalPrice}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${STATUS_COLORS[booking.status] || 'bg-gray-100 text-gray-800'}`}>
                                                {booking.status.replace("_", " ")}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-gray-400 text-xs">
                                            {format(new Date(booking.createdAt), "MMM d, HH:mm")}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}
