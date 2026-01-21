"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { PlusIcon, PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";

export default function CitiesPage() {
    const [cities, setCities] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCities = async () => {
            try {
                const res = await fetch("/api/cities");
                const data = await res.json();
                setCities(data);
            } catch (err) {
                console.error("Failed to fetch cities", err);
            } finally {
                setLoading(false);
            }
        };
        fetchCities();
    }, []);

    return (
        <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">Cities</h1>
                    <p className="mt-2 text-gray-500">Manage all cities where Kwik Stays operates.</p>
                </div>
                <Link
                    href="/admin/cities/create"
                    className="inline-flex items-center rounded-md bg-gray-900 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-800"
                >
                    <PlusIcon className="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />
                    Add City
                </Link>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                {loading ? (
                    <div className="p-8 text-center text-gray-500">Loading cities...</div>
                ) : cities.length === 0 ? (
                    <div className="p-12 text-center">
                        <h3 className="mt-2 text-sm font-semibold text-gray-900">No cities found</h3>
                        <p className="mt-1 text-sm text-gray-500">Get started by creating a new city.</p>
                        <div className="mt-6">
                            <Link
                                href="/admin/cities/create"
                                className="inline-flex items-center rounded-md bg-primary px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary/90"
                            >
                                <PlusIcon className="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />
                                Add City
                            </Link>
                        </div>
                    </div>
                ) : (
                    <ul role="list" className="divide-y divide-gray-100">
                        {cities.map((city) => (
                            <li key={city._id} className="flex items-center justify-between gap-x-6 py-5 px-6 hover:bg-gray-50">
                                <div className="min-w-0">
                                    <div className="flex items-start gap-x-3">
                                        <p className="text-sm font-semibold leading-6 text-gray-900">{city.name}</p>
                                        {!city.isActive && (
                                            <span className="inline-flex items-center rounded-md bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-800 ring-1 ring-inset ring-yellow-600/20">Inactive</span>
                                        )}
                                    </div>
                                    <div className="mt-1 flex items-center gap-x-2 text-xs leading-5 text-gray-500">
                                        <p className="truncate">{city.state}, {city.country}</p>
                                        <svg viewBox="0 0 2 2" className="h-0.5 w-0.5 fill-current">
                                            <circle cx={1} cy={1} r={1} />
                                        </svg>
                                        <p className="truncate">{city.slug}</p>
                                    </div>
                                </div>
                                <div className="flex flex-none items-center gap-x-4">
                                    {/* Edit/Delete removed per request */}
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}
