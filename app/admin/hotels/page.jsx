"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { PlusIcon, BuildingOfficeIcon, MapPinIcon, BanknotesIcon } from "@heroicons/react/24/outline";

export default function HotelsPage() {
    const [hotels, setHotels] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchHotels = async () => {
            try {
                const res = await fetch("/api/hotels");
                if (res.ok) {
                    const data = await res.json();
                    setHotels(data);
                }
            } catch (err) {
                console.error("Failed to fetch hotels", err);
            } finally {
                setLoading(false);
            }
        };
        fetchHotels();
    }, []);

    return (
        <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">Hotels</h1>
                    <p className="mt-2 text-gray-500">Manage your hotel properties and listings.</p>
                </div>
                <Link
                    href="/admin/hotels/create"
                    className="inline-flex items-center rounded-md bg-gray-900 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-800"
                >
                    <PlusIcon className="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />
                    Add New Hotel
                </Link>
            </div>

            {loading ? (
                <div className="p-12 text-center">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-gray-200 border-t-primary"></div>
                    <p className="mt-2 text-gray-500">Loading hotels...</p>
                </div>
            ) : hotels.length === 0 ? (
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
                    <BuildingOfficeIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                    <h3 className="mt-2 text-sm font-semibold text-gray-900">No hotels added</h3>
                    <p className="mt-1 text-sm text-gray-500">Get started by creating a new hotel property.</p>
                    <div className="mt-6">
                        <Link
                            href="/admin/hotels/create"
                            className="inline-flex items-center rounded-md bg-primary px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary/90"
                        >
                            <PlusIcon className="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />
                            Add Hotel
                        </Link>
                    </div>
                </div>
            ) : (
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <ul role="list" className="divide-y divide-gray-100">
                        {hotels.map((hotel) => (
                            <li key={hotel._id} className="relative flex justify-between gap-x-6 px-4 py-5 hover:bg-gray-50 sm:px-6">
                                <div className="flex min-w-0 gap-x-4">
                                    <div className="relative h-20 w-20 flex-none rounded-lg bg-gray-50 overflow-hidden">
                                        {hotel.heroImage ? (
                                            <img
                                                src={hotel.heroImage}
                                                alt={hotel.name}
                                                className="h-full w-full object-cover"
                                            />
                                        ) : (
                                            <BuildingOfficeIcon className="h-full w-full p-4 text-gray-300" />
                                        )}
                                    </div>
                                    <div className="min-w-0 flex-auto">
                                        <p className="text-sm font-semibold leading-6 text-gray-900">
                                            <Link href={`/admin/hotels/${hotel._id}`}>
                                                <span className="absolute inset-x-0 -top-px bottom-0" />
                                                {hotel.name}
                                            </Link>
                                        </p>
                                        <div className="mt-1 flex items-center gap-x-2 text-xs leading-5 text-gray-500">
                                            <MapPinIcon className="h-4 w-4" />
                                            <p className="truncate">{hotel.locality?.name}, {hotel.city?.name}</p>
                                        </div>
                                        <div className="mt-1 flex items-center gap-x-2 text-xs leading-5 text-gray-500">
                                            <BanknotesIcon className="h-4 w-4" />
                                            <p>Starts from ₹{hotel.priceStartingFrom}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex shrink-0 items-center gap-x-4">
                                    <div className="hidden sm:flex sm:flex-col sm:items-end">
                                        <p className="text-sm leading-6 text-gray-900">
                                            Rating: <span className="font-semibold">{hotel.rating}/5</span>
                                        </p>
                                        <div className="mt-1 flex items-center gap-x-1.5">
                                            <div className={`flex-none rounded-full p-1 ${hotel.isActive ? 'bg-green-500/20' : 'bg-red-500/20'}`}>
                                                <div className={`h-1.5 w-1.5 rounded-full ${hotel.isActive ? 'bg-green-500' : 'bg-red-500'}`} />
                                            </div>
                                            <p className="text-xs leading-5 text-gray-500">{hotel.isActive ? 'Active' : 'Inactive'}</p>
                                        </div>
                                    </div>
                                    <svg className="h-5 w-5 flex-none text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                        <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                                    </svg>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}
