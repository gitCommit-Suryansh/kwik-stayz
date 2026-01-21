"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { CheckCircleIcon, ExclamationCircleIcon } from "@heroicons/react/24/outline";

export default function LocalityForm() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const [cities, setCities] = useState([]);

    const [formData, setFormData] = useState({
        citySlug: "",
        name: "",
        slug: "",
        description: "",
        seo: { title: "", description: "" },
        isActive: true // Default active
    });

    // Fetch Cities
    useEffect(() => {
        const fetchCities = async () => {
            try {
                const res = await fetch("/api/cities");
                const data = await res.json();
                setCities(data);
            } catch (err) {
                console.error("Failed to fetch cities", err);
            }
        };
        fetchCities();
    }, []);

    const handleChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleNestedChange = (parent, field, value) => {
        setFormData(prev => ({
            ...prev,
            [parent]: { ...prev[parent], [field]: value }
        }));
    };

    // Auto-slug and SEO
    const handleNameBlur = () => {
        if (!formData.name) return;

        setFormData(prev => {
            const updates = { ...prev };

            // Auto Slug
            if (!prev.slug) {
                updates.slug = prev.name.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, "");
            }

            // Auto SEO
            const cityName = cities.find(c => c.slug === prev.citySlug)?.name || "City";
            const seoUpdates = { ...prev.seo };
            let seoChanged = false;

            if (!seoUpdates.title) {
                seoUpdates.title = `Hotels in ${prev.name}, ${cityName}`;
                seoChanged = true;
            }
            if (!seoUpdates.description) {
                seoUpdates.description = `Book the best hotels in ${prev.name}, ${cityName}. Affordable prices and premium amenities.`;
                seoChanged = true;
            }

            if (seoChanged) {
                updates.seo = seoUpdates;
            }

            return updates;
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        if (!formData.citySlug) {
            setError("Please select a city.");
            setLoading(false);
            return;
        }

        try {
            // Using a placeholder slug 'new' because the API reads citySlug from body
            const res = await fetch("/api/localities/new", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.message || "Failed to create locality");
            }

            setSuccess(true);
            setTimeout(() => {
                router.push("/admin/localities");
            }, 2000);

        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div className="flex flex-col items-center justify-center py-20">
                <CheckCircleIcon className="h-16 w-16 text-green-500" />
                <h2 className="mt-4 text-2xl font-bold text-gray-900">Locality Created Successfully!</h2>
                <p className="text-gray-500">Redirecting to list...</p>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-8">

            {error && (
                <div className="rounded-md bg-red-50 p-4">
                    <div className="flex">
                        <div className="flex-shrink-0">
                            <ExclamationCircleIcon className="h-5 w-5 text-red-400" aria-hidden="true" />
                        </div>
                        <div className="ml-3">
                            <h3 className="text-sm font-medium text-red-800">Error creating locality</h3>
                            <div className="mt-2 text-sm text-red-700">{error}</div>
                        </div>
                    </div>
                </div>
            )}

            <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

                {/* City Selection */}
                <div className="sm:col-span-3">
                    <label className="block text-sm font-medium leading-6 text-gray-900">Select City</label>
                    <div className="mt-2">
                        <select
                            required
                            value={formData.citySlug}
                            onChange={e => handleChange('citySlug', e.target.value)}
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 pl-2"
                        >
                            <option value="">Select City</option>
                            {cities.map(city => (
                                <option key={city._id} value={city.slug}>{city.name}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="col-span-full border-t my-2"></div>

                {/* Basic Info */}
                <div className="sm:col-span-3">
                    <label className="block text-sm font-medium leading-6 text-gray-900">Locality Name</label>
                    <div className="mt-2">
                        <input
                            type="text"
                            required
                            value={formData.name}
                            onChange={e => handleChange('name', e.target.value)}
                            onBlur={handleNameBlur}
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 pl-2"
                        />
                    </div>
                </div>

                <div className="sm:col-span-3">
                    <label className="block text-sm font-medium leading-6 text-gray-900">Slug</label>
                    <div className="mt-2">
                        <input
                            type="text"
                            required
                            value={formData.slug}
                            onChange={e => handleChange('slug', e.target.value)}
                            className="block w-full rounded-md border-0 py-1.5 text-gray-500 bg-gray-50 shadow-sm ring-1 ring-inset ring-gray-300 sm:text-sm sm:leading-6 pl-2"
                        />
                    </div>
                </div>

                <div className="col-span-full">
                    <label className="block text-sm font-medium leading-6 text-gray-900">Description</label>
                    <div className="mt-2">
                        <textarea
                            rows={3}
                            value={formData.description}
                            onChange={e => handleChange('description', e.target.value)}
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 pl-2"
                        />
                    </div>
                </div>

                <div className="col-span-full border-t pt-6">
                    <h3 className="text-sm font-semibold text-gray-900 mb-4">SEO Metadata</h3>
                    <div className="grid grid-cols-1 gap-6">
                        <div>
                            <label className="block text-sm font-medium leading-6 text-gray-900">SEO Title</label>
                            <input
                                type="text"
                                value={formData.seo.title}
                                onChange={e => handleNestedChange('seo', 'title', e.target.value)}
                                className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 pl-2"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium leading-6 text-gray-900">SEO Description</label>
                            <textarea
                                rows={2}
                                value={formData.seo.description}
                                onChange={e => handleNestedChange('seo', 'description', e.target.value)}
                                className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 pl-2"
                            />
                        </div>
                    </div>
                </div>

                <div className="col-span-full flex items-center gap-2 pt-4">
                    <input
                        type="checkbox"
                        checked={formData.isActive}
                        onChange={e => handleChange('isActive', e.target.checked)}
                        className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                    />
                    <label className="text-sm font-medium text-gray-900">Active (Visible to users)</label>
                </div>
            </div>

            {/* Footer Actions */}
            <div className="flex items-center justify-end gap-x-6 border-t border-gray-900/10 pt-4">
                <button type="button" onClick={() => router.back()} className="text-sm font-semibold leading-6 text-gray-900">Cancel</button>
                <button
                    type="submit"
                    disabled={loading}
                    className="rounded-md bg-gray-900 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900 disabled:opacity-50"
                >
                    {loading ? 'Creating...' : 'Create Locality'}
                </button>
            </div>
        </form>
    );
}
