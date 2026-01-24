"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { format } from "date-fns";
import {
    ArrowLeftIcon,
    CalendarIcon,
    UserIcon,
    MapPinIcon,
    CreditCardIcon,
    PrinterIcon
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

export default function BookingDetailsPage() {
    const params = useParams();
    const router = useRouter();
    const [booking, setBooking] = useState(null);
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);

    useEffect(() => {
        const fetchBooking = async () => {
            try {
                const res = await fetch(`/api/admin/bookings/${params.id}`);
                if (!res.ok) throw new Error("Booking not found");
                const data = await res.json();
                setBooking(data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchBooking();
    }, [params.id]);

    const handleStatusUpdate = async (newStatus) => {
        if (!confirm(`Are you sure you want to mark this booking as ${newStatus}?`)) return;

        setUpdating(true);
        try {
            const res = await fetch(`/api/admin/bookings/${params.id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status: newStatus })
            });

            if (res.ok) {
                setBooking(prev => ({ ...prev, status: newStatus }));
            } else {
                alert("Failed to update status");
            }
        } catch (err) {
            console.error(err);
            alert("Error updating status");
        } finally {
            setUpdating(false);
        }
    };

    if (loading) {
        return (
            <div className="flex h-96 items-center justify-center">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-primary"></div>
            </div>
        );
    }

    if (!booking) return <div className="p-8 text-center bg-white rounded-xl shadow-sm">Booking not found</div>;

    return (
        <div className="max-w-5xl mx-auto pb-12">
            <div className="mb-6 flex items-center justify-between">
                <div>
                    <Link href="/admin/bookings" className="mb-2 inline-flex items-center text-sm text-gray-500 hover:text-gray-900">
                        <ArrowLeftIcon className="mr-1 h-4 w-4" />
                        Back to Bookings
                    </Link>
                    <div className="flex items-center gap-4">
                        <h1 className="text-3xl font-bold text-gray-900">#{booking.bookingCode}</h1>
                        <span className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium ${STATUS_COLORS[booking.status]}`}>
                            {booking.status.replace("_", " ")}
                        </span>
                    </div>
                </div>
                <button onClick={() => window.print()} className="p-2 text-gray-500 hover:text-gray-900 rounded-full hover:bg-gray-100">
                    <PrinterIcon className="h-6 w-6" />
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column: Details */}
                <div className="lg:col-span-2 space-y-6">

                    {/* Hotel Info */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                        <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50">
                            <h2 className="font-semibold text-gray-900 flex items-center gap-2">
                                <MapPinIcon className="h-5 w-5 text-gray-400" />
                                Stay Details
                            </h2>
                        </div>
                        <div className="p-6 space-y-4">
                            <div>
                                <h3 className="text-lg font-bold text-gray-900">
                                    <Link href={`/admin/hotels/${booking.hotel?.id}`} className="hover:text-primary hover:underline">
                                        {booking.hotel?.name}
                                    </Link>
                                </h3>
                                <p className="text-gray-500">{booking.hotel?.address}, {booking.hotel?.city}</p>
                            </div>
                            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100">
                                <div>
                                    <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Check In</p>
                                    <p className="text-gray-900 font-medium">{booking.stay?.checkIn && format(new Date(booking.stay.checkIn), "EEE, MMM d, yyyy")}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Check Out</p>
                                    <p className="text-gray-900 font-medium">{booking.stay?.checkOut && format(new Date(booking.stay.checkOut), "EEE, MMM d, yyyy")}</p>
                                </div>
                            </div>
                            <div className="pt-2">
                                <p className="text-sm text-gray-600">
                                    <span className="font-semibold">{booking.stay?.nights} Night(s)</span> in <span className="font-semibold">{booking.roomType?.name}</span>
                                </p>
                                <p className="text-sm text-gray-600">
                                    {booking.rooms?.length} Room(s), {booking.rooms?.reduce((acc, r) => acc + (r.guests || 0), 0)} Guest(s)
                                    {booking.rooms?.reduce((acc, r) => acc + (r.extras || 0), 0) > 0 && (
                                        <span> + {booking.rooms?.reduce((acc, r) => acc + (r.extras || 0), 0)} Extra(s)</span>
                                    )}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Guest Info */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                        <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50">
                            <h2 className="font-semibold text-gray-900 flex items-center gap-2">
                                <UserIcon className="h-5 w-5 text-gray-400" />
                                Guest Information
                            </h2>
                        </div>
                        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <p className="text-sm text-gray-500">Full Name</p>
                                <p className="font-medium text-gray-900">{booking.guestDetails?.fullName}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Mobile Number</p>
                                <p className="font-medium text-gray-900">{booking.guestDetails?.mobile}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Email Address</p>
                                <p className="font-medium text-gray-900">{booking.guestDetails?.email || "N/A"}</p>
                            </div>
                        </div>
                    </div>

                    {/* Pricing */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                        <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50">
                            <h2 className="font-semibold text-gray-900 flex items-center gap-2">
                                <CreditCardIcon className="h-5 w-5 text-gray-400" />
                                Payment Summary
                            </h2>
                        </div>
                        <div className="p-6">
                            <div className="space-y-3 pb-4 border-b border-gray-100 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Base Price (x{booking.stay?.nights} nights)</span>
                                    <span className="font-medium">₹{booking.pricing?.basePriceTotal}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Taxes & Fees</span>
                                    <span className="font-medium">included</span>
                                </div>
                                {booking.pricing?.totalExtraGuestCost > 0 && (
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Extra Guest Charges</span>
                                        <span className="font-medium">₹{booking.pricing?.totalExtraGuestCost}</span>
                                    </div>
                                )}
                            </div>
                            <div className="pt-4 flex justify-between items-center">
                                <span className="font-bold text-gray-900 text-lg">Total Amount</span>
                                <span className="font-bold text-primary text-xl">₹{booking.pricing?.totalPrice}</span>
                            </div>
                            {booking.paymentId && (
                                <div className="mt-6 p-4 bg-gray-50 rounded-lg text-sm border border-gray-100">
                                    <p>
                                        <span className="font-semibold">Transaction ID:</span>{" "}
                                        <Link href={`/admin/payments/${booking.paymentId._id}`} className="text-primary hover:underline">
                                            {booking.paymentId.transactionId || booking.paymentId.merchantOrderId}
                                        </Link>
                                    </p>
                                    <p><span className="font-semibold">Payment Date:</span> {booking.paymentId.paidAt && format(new Date(booking.paymentId.paidAt), "PP pp")}</p>
                                    <p><span className="font-semibold">Method:</span> {booking.paymentId.provider}</p>
                                </div>
                            )}
                        </div>
                    </div>

                </div>

                {/* Right Column: Actions */}
                <div className="space-y-6">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <h2 className="font-semibold text-gray-900 mb-4">Actions</h2>
                        <div className="flex flex-col gap-3">
                            {booking.status === "CONFIRMED" && (
                                <>
                                    <button
                                        disabled={updating}
                                        onClick={() => handleStatusUpdate("CHECKED_IN")}
                                        className="w-full rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-500 disabled:opacity-50"
                                    >
                                        Check In Guest
                                    </button>
                                    <button
                                        disabled={updating}
                                        onClick={() => handleStatusUpdate("CANCELLED")}
                                        className="w-full rounded-lg bg-white border border-gray-300 px-4 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                                    >
                                        Cancel Booking
                                    </button>
                                </>
                            )}
                            {booking.status === "CHECKED_IN" && (
                                <button
                                    disabled={updating}
                                    onClick={() => handleStatusUpdate("COMPLETED")}
                                    className="w-full rounded-lg bg-green-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-green-500 disabled:opacity-50"
                                >
                                    Check Out / Complete
                                </button>
                            )}
                            {["CANCELLED", "COMPLETED", "EXPIRED", "PAYMENT_FAILED"].includes(booking.status) && (
                                <p className="text-sm text-gray-500 text-center italic">No actions available for this status.</p>
                            )}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
