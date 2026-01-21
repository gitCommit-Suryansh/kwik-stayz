"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { PlusIcon } from "@heroicons/react/24/outline";

export default function LocalitiesPage() {
    const [cities, setCities] = useState([]);
    const [selectedCity, setSelectedCity] = useState("");
    const [localities, setLocalities] = useState([]);
    const [loading, setLoading] = useState(false);
    const [initialLoad, setInitialLoad] = useState(true);

    // Fetch Cities
    useEffect(() => {
        const fetchCities = async () => {
            try {
                const res = await fetch("/api/cities");
                const data = await res.json();
                setCities(data);
                if (data.length > 0) {
                    setSelectedCity(data[0].slug); // Default select first
                }
            } catch (err) {
                console.error("Failed to fetch cities", err);
            } finally {
                setInitialLoad(false);
            }
        };
        fetchCities();
    }, []);

    // Fetch Localities when City changes
    useEffect(() => {
        if (!selectedCity) return;

        const fetchLocalities = async () => {
            setLoading(true);
            try {
                const res = await fetch(`/api/localities/${selectedCity}`);
                if (res.ok) {
                    const data = await res.json();
                    setLocalities(data);
                } else {
                    setLocalities([]);
                }
            } catch (err) {
                console.error("Failed to fetch localities", err);
                setLocalities([]);
            } finally {
                setLoading(false);
            }
        };

        fetchLocalities();
    }, [selectedCity]);

    return (
        <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">Localities</h1>
                    <p className="mt-2 text-gray-500">Manage localities for each city.</p>
                </div>
                <Link
                    href="/admin/localities/create"
                    className="inline-flex items-center rounded-md bg-gray-900 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-800"
                >
                    <PlusIcon className="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />
                    Add Locality
                </Link>
            </div>

            {/* City Filter */}
            <div className="mb-6 flex items-center gap-4 bg-white p-4 rounded-lg border border-gray-200">
                <label className="text-sm font-medium text-gray-700 whitespace-nowrap">Filter by City:</label>
                <select
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                    className="block w-full max-w-xs rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 pl-2"
                >
                    {cities.map((city) => (
                        <option key={city._id} value={city.slug}>{city.name}</option>
                    ))}
                </select>
                {cities.length === 0 && !initialLoad && <span className="text-sm text-red-500">No cities found. Create a city first.</span>}
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                {loading ? (
                    <div className="p-8 text-center text-gray-500">Loading localities...</div>
                ) : localities.length === 0 ? (
                    <div className="p-12 text-center">
                        <h3 className="mt-2 text-sm font-semibold text-gray-900">No localities found</h3>
                        <p className="mt-1 text-sm text-gray-500">Select a city and add new localities.</p>
                        <div className="mt-6">
                            <Link
                                href="/admin/localities/create"
                                className="inline-flex items-center rounded-md bg-primary px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary/90"
                            >
                                <PlusIcon className="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />
                                Add Locality
                            </Link>
                        </div>
                    </div>
                ) : (
                    <ul role="list" className="divide-y divide-gray-100">
                        {localities.map((locality) => (
                            <li key={locality._id} className="flex items-center justify-between gap-x-6 py-5 px-6 hover:bg-gray-50">
                                <div className="min-w-0">
                                    <div className="flex items-start gap-x-3">
                                        <p className="text-sm font-semibold leading-6 text-gray-900">{locality.name}</p>
                                        {!locality.isActive && (
                                            <span className="inline-flex items-center rounded-md bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-800 ring-1 ring-inset ring-yellow-600/20">Inactive</span>
                                        )}
                                    </div>
                                    <div className="mt-1 flex items-center gap-x-2 text-xs leading-5 text-gray-500">
                                        <span className="bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded">{selectedCity}</span>
                                        <svg viewBox="0 0 2 2" className="h-0.5 w-0.5 fill-current">
                                            <circle cx={1} cy={1} r={1} />
                                        </svg>
                                        <p className="truncate">{locality.slug}</p>
                                    </div>
                                </div>
                                {/* No Edit buttons */}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}
