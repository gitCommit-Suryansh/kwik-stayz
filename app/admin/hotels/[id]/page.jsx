"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
    ArrowLeftIcon,
    MapPinIcon,
    StarIcon,
    BanknotesIcon,
    CheckCircleIcon,
    XCircleIcon,
    PhotoIcon
} from "@heroicons/react/24/outline";
import { BuildingOfficeIcon } from "@heroicons/react/24/solid";

export default function HotelDetailsPage() {
    const params = useParams();
    const router = useRouter();
    const [hotel, setHotel] = useState(null);
    const [loading, setLoading] = useState(true);
    const [toggling, setToggling] = useState(false);

    useEffect(() => {
        const fetchHotel = async () => {
            try {
                const res = await fetch(`/api/hotels/by-id/${params.id}`);
                if (!res.ok) throw new Error("Hotel not found");
                const data = await res.json();
                setHotel(data);
            } catch (err) {
                console.error(err);
                // router.push("/admin/hotels"); // Optional: redirect on error
            } finally {
                setLoading(false);
            }
        };
        if (params.id) fetchHotel();
    }, [params.id, router]);

    const toggleStatus = async () => {
        if (!hotel) return;
        setToggling(true);
        try {
            const newStatus = !hotel.isActive;
            const res = await fetch(`/api/hotels/by-id/${hotel._id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ isActive: newStatus })
            });

            if (res.ok) {
                setHotel(prev => ({ ...prev, isActive: newStatus }));
            }
        } catch (err) {
            console.error("Failed to update status", err);
            alert("Failed to update status");
        } finally {
            setToggling(false);
        }
    };

    if (loading) {
        return (
            <div className="flex h-96 items-center justify-center">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-primary"></div>
            </div>
        );
    }

    if (!hotel) return <div className="p-8 text-center">Hotel not found</div>;

    return (
        <div className="max-w-7xl mx-auto pb-12">
            {/* Header */}
            <div className="mb-8 flex items-start justify-between">
                <div>
                    <Link href="/admin/hotels" className="mb-4 inline-flex items-center text-sm text-gray-500 hover:text-gray-900">
                        <ArrowLeftIcon className="mr-1 h-4 w-4" />
                        Back to Hotels
                    </Link>
                    <h1 className="text-3xl font-bold text-gray-900">{hotel.name}</h1>
                    <div className="mt-2 flex items-center gap-4 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                            <MapPinIcon className="h-4 w-4" />
                            {hotel.locality?.name}, {hotel.city?.name}
                        </span>
                        <span className="flex items-center gap-1">
                            <StarIcon className="h-4 w-4 text-yellow-500" />
                            {hotel.rating} ({hotel.reviewCount} reviews)
                        </span>
                        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${hotel.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                            {hotel.isActive ? 'Active' : 'Inactive'}
                        </span>
                    </div>
                </div>
                <button
                    onClick={toggleStatus}
                    disabled={toggling}
                    className={`inline-flex items-center rounded-md px-4 py-2 text-sm font-semibold text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 ${hotel.isActive
                        ? 'bg-red-600 hover:bg-red-500 focus:ring-red-600'
                        : 'bg-green-600 hover:bg-green-500 focus:ring-green-600'
                        }`}
                >
                    {toggling ? 'Updating...' : (hotel.isActive ? 'Deactivate Hotel' : 'Activate Hotel')}
                </button>
            </div>

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-8">

                    {/* Hero Image */}
                    <div className="relative h-96 overflow-hidden rounded-2xl bg-gray-100">
                        {hotel.heroImage ? (
                            <img
                                src={hotel.heroImage}
                                alt={hotel.name}
                                className="h-full w-full object-cover"
                            />
                        ) : (
                            <div className="flex h-full items-center justify-center text-gray-400">
                                <PhotoIcon className="h-24 w-24" />
                            </div>
                        )}
                    </div>

                    {/* Basic Info */}
                    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                        <h2 className="text-lg font-semibold text-gray-900">About this property</h2>
                        <p className="mt-4 whitespace-pre-line text-gray-600">{hotel.description}</p>

                        <h3 className="mt-8 text-sm font-medium text-gray-900">Amenities</h3>
                        <div className="mt-4 flex flex-wrap gap-2">
                            {hotel.hotelAmenities.map((am, i) => (
                                <span key={i} className="inline-flex items-center rounded-full bg-gray-50 px-3 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">
                                    {am}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Room Types */}
                    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                        <h2 className="text-lg font-semibold text-gray-900">Room Types ({hotel.roomTypes?.length || 0})</h2>
                        <div className="mt-6 space-y-6">
                            {hotel.roomTypes?.map((room, i) => (
                                <div key={i} className="flex gap-6 border-b border-gray-100 pb-6 last:border-0 last:pb-0">
                                    <div className="relative h-24 w-32 flex-none overflow-hidden rounded-lg bg-gray-100">
                                        {room.image ? (
                                            <img src={room.image} alt={room.title} className="h-full w-full object-cover" />
                                        ) : (
                                            <BuildingOfficeIcon className="h-full w-full p-6 text-gray-300" />
                                        )}
                                    </div>
                                    <div>
                                        <h3 className="font-medium text-gray-900">{room.title}</h3>
                                        <div className="mt-1 flex gap-4 text-sm text-gray-500">
                                            <span>Price: ₹{room.basePrice}</span>
                                            {room.originalPrice && <span className="line-through">₹{room.originalPrice}</span>}
                                        </div>
                                        <div className="mt-2 flex flex-wrap gap-1">
                                            {room.amenities?.map((am, j) => (
                                                <span key={j} className="text-xs text-gray-500 bg-gray-50 px-1.5 py-0.5 rounded border border-gray-200">{am}</span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Gallery */}
                    {hotel.gallery?.length > 0 && (
                        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                            <h2 className="text-lg font-semibold text-gray-900">Gallery</h2>
                            <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
                                {hotel.gallery.map((img, i) => (
                                    <div key={i} className="relative aspect-square overflow-hidden rounded-lg bg-gray-100 group">
                                        <img src={img} alt={`Gallery ${i}`} className="h-full w-full object-cover" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    {/* Price Card */}
                    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                        <h3 className="text-sm font-medium text-gray-500">Starting Price</h3>
                        <div className="mt-2 flex items-baseline">
                            <span className="text-3xl font-bold text-gray-900">₹{hotel.priceStartingFrom}</span>
                            <span className="ml-2 text-sm text-gray-500">/ night</span>
                        </div>
                        {hotel.originalPrice && (
                            <p className="mt-1 text-sm text-gray-500 line-through">₹{hotel.originalPrice}</p>
                        )}
                    </div>

                    {/* Location */}
                    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                        <h3 className="text-sm font-medium text-gray-900">Location Details</h3>
                        <div className="mt-4 space-y-4 text-sm text-gray-600">
                            <div>
                                <p className="font-medium text-gray-900">Address</p>
                                <p>{hotel.address?.full}</p>
                                <p>{hotel.address?.street}, {hotel.address?.area}</p>
                                <p>{hotel.address?.city}, {hotel.address?.state} - {hotel.address?.pincode}</p>
                            </div>
                            <div>
                                <p className="font-medium text-gray-900">Coordinates</p>
                                <p>Lat: {hotel.geo?.lat}, Lng: {hotel.geo?.lng}</p>
                            </div>
                        </div>
                    </div>

                    {/* Policies */}
                    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                        <h3 className="text-sm font-medium text-gray-900">Policies</h3>
                        <ul className="mt-4 space-y-2 text-sm text-gray-600">
                            <li className="flex justify-between">
                                <span>Check In</span>
                                <span className="font-medium text-gray-900">{hotel.policies?.checkIn}</span>
                            </li>
                            <li className="flex justify-between">
                                <span>Check Out</span>
                                <span className="font-medium text-gray-900">{hotel.policies?.checkOut}</span>
                            </li>
                            <li className="flex items-center gap-2">
                                {hotel.policies?.coupleAllowed ? <CheckCircleIcon className="h-4 w-4 text-green-500" /> : <XCircleIcon className="h-4 w-4 text-red-500" />}
                                <span>Couple Friendly</span>
                            </li>
                            <li className="flex items-center gap-2">
                                {hotel.policies?.idProof ? <CheckCircleIcon className="h-4 w-4 text-green-500" /> : <XCircleIcon className="h-4 w-4 text-red-500" />}
                                <span>ID Proof Required</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
