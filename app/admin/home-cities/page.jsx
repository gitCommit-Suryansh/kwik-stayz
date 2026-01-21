"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { PlusIcon, TrashIcon } from "@heroicons/react/24/outline";

export default function HomeCitiesPage() {
    const [homeCities, setHomeCities] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchHomeCities = async () => {
            try {
                const res = await fetch("/api/home-cities");
                if (res.ok) {
                    const data = await res.json();
                    setHomeCities(data);
                }
            } catch (err) {
                console.error("Failed to fetch home cities", err);
            } finally {
                setLoading(false);
            }
        };
        fetchHomeCities();
    }, []);

    const handleDelete = async (id) => {
        if (!confirm("Are you sure you want to remove this city from Home?")) return;

        try {
            const res = await fetch(`/api/home-cities/${id}`, {
                method: "DELETE"
            });

            if (res.ok) {
                setHomeCities(prev => prev.filter(c => c._id !== id));
            } else {
                alert("Failed to delete.");
            }
        } catch (err) {
            console.error("Delete failed", err);
        }
    };

    return (
        <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">Home Cities</h1>
                    <p className="mt-2 text-gray-500">Featured cities on the landing page.</p>
                </div>
                <Link
                    href="/admin/home-cities/create"
                    className="inline-flex items-center rounded-md bg-gray-900 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-800"
                >
                    <PlusIcon className="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />
                    Add Featured City
                </Link>
            </div>

            {loading ? (
                <div className="p-8 text-center text-gray-500">Loading...</div>
            ) : homeCities.length === 0 ? (
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
                    <h3 className="mt-2 text-sm font-semibold text-gray-900">No Featured Cities</h3>
                    <p className="mt-1 text-sm text-gray-500">Add a city to feature it on the homepage.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {homeCities.map((item) => (
                        <div key={item._id} className="group relative bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                            <div className="relative h-48 w-full bg-gray-200">
                                <img
                                    src={item.heroImage}
                                    alt={item.displayName}
                                    className="h-full w-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                <div className="absolute bottom-4 left-4 text-white">
                                    <h3 className="text-lg font-bold">{item.displayName}</h3>
                                    <p className="text-sm opacity-90">{item.city?.name}</p>
                                </div>
                                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-2 py-1 rounded text-xs font-bold shadow-sm">
                                    #{item.order}
                                </div>
                            </div>
                            <div className="p-4 flex justify-between items-center">
                                <div className="flex items-center gap-2">
                                    <div className={`h-2.5 w-2.5 rounded-full ${item.isActive ? 'bg-green-500' : 'bg-red-500'}`} />
                                    <span className="text-sm text-gray-600">{item.isActive ? 'Active' : 'Inactive'}</span>
                                </div>
                                <button
                                    onClick={() => handleDelete(item._id)}
                                    className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                                >
                                    <TrashIcon className="h-5 w-5" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
