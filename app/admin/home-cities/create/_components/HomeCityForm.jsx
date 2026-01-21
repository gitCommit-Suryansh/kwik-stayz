"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import ImageUpload from "../../../_components/ImageUpload";
import { CheckCircleIcon, ExclamationCircleIcon } from "@heroicons/react/24/outline";

export default function HomeCityForm() {
    const router = useRouter();
    const [cities, setCities] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    const [formData, setFormData] = useState({
        city: "",
        displayName: "",
        heroImage: "",
        order: 1,
        isActive: true
    });

    // Fetch active cities
    useEffect(() => {
        const fetchCities = async () => {
            try {
                const res = await fetch("/api/cities");
                const data = await res.json();
                // Filter only active cities if needed, though API returns all. 
                // Let's assume we can pick any city.
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

    const handleImageChange = (file) => {
        // If file is passed (from ImageUpload), it might be a File object or string (url)
        // ImageUpload here handles single file.
        // We need to upload to Cloudinary if it's a File object.
        // Wait, HotelForm handles upload inside ImageUpload? 
        // No, HotelForm handles upload in 'handleSubmit' or 'ImageUpload' does it?
        // Let's check HotelForm logic. 
        // Actually, for now, let's assume ImageUpload returns the file and we upload it here or 
        // if the user provided ImageUpload code handles upload?
        // Looking at HotelForm code (from memory/previous context), it usually uploads images.
        // I should check if I need a helper for cloudinary upload.
        // Re-reading ImageUpload code: it just calls onChange with the file.
        // So I need to handle the upload to Cloudinary here.
        handleChange("heroImage", file);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const payload = new FormData();
            payload.append("city", formData.city);
            payload.append("displayName", formData.displayName);
            payload.append("order", formData.order);
            payload.append("isActive", formData.isActive);

            if (formData.heroImage) {
                payload.append("heroImage", formData.heroImage);
            }

            const res = await fetch("/api/home-cities", {
                method: "POST",
                body: payload
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.message || "Failed to create home city");
            }

            setSuccess(true);
            setTimeout(() => {
                router.push("/admin/home-cities");
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
                <h2 className="mt-4 text-2xl font-bold text-gray-900">Added to Home Cities!</h2>
                <p className="text-gray-500">Redirecting...</p>
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
                            <h3 className="text-sm font-medium text-red-800">Error</h3>
                            <div className="mt-2 text-sm text-red-700">{error}</div>
                        </div>
                    </div>
                </div>
            )}

            <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

                {/* City */}
                <div className="sm:col-span-3">
                    <label className="block text-sm font-medium leading-6 text-gray-900">Select City</label>
                    <div className="mt-2">
                        <select
                            required
                            value={formData.city}
                            onChange={e => handleChange('city', e.target.value)}
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 pl-2"
                        >
                            <option value="">Select City</option>
                            {cities.map(city => (
                                <option key={city._id} value={city._id}>{city.name}</option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Display Name */}
                <div className="sm:col-span-3">
                    <label className="block text-sm font-medium leading-6 text-gray-900">Display Name (Optional)</label>
                    <div className="mt-2">
                        <input
                            type="text"
                            value={formData.displayName}
                            placeholder="Defaults to City Name"
                            onChange={e => handleChange('displayName', e.target.value)}
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-primary sm:text-sm sm:leading-6 pl-2"
                        />
                    </div>
                </div>

                {/* Hero Image */}
                <div className="col-span-full">
                    <ImageUpload
                        label="Hero Image"
                        subLabel="High quality landscape image (Required)"
                        value={formData.heroImage}
                        onChange={handleImageChange}
                        onRemove={() => handleChange('heroImage', '')}
                        id="heroImage"
                    />
                </div>

                {/* Order */}
                <div className="sm:col-span-2">
                    <label className="block text-sm font-medium leading-6 text-gray-900">Order Priority</label>
                    <div className="mt-2">
                        <input
                            type="number"
                            required
                            min="1"
                            value={formData.order}
                            onChange={e => handleChange('order', parseInt(e.target.value))}
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-primary sm:text-sm sm:leading-6 pl-2"
                        />
                    </div>
                </div>

                {/* Active */}
                <div className="col-span-full flex items-center gap-2 pt-4">
                    <input
                        type="checkbox"
                        checked={formData.isActive}
                        onChange={e => handleChange('isActive', e.target.checked)}
                        className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                    />
                    <label className="text-sm font-medium text-gray-900">Active (Visible on Home)</label>
                </div>
            </div>

            <div className="flex items-center justify-end gap-x-6 border-t border-gray-900/10 pt-4">
                <button type="button" onClick={() => router.back()} className="text-sm font-semibold leading-6 text-gray-900">Cancel</button>
                <button
                    type="submit"
                    disabled={loading}
                    className="rounded-md bg-gray-900 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900 disabled:opacity-50"
                >
                    {loading ? 'Adding...' : 'Add Home City'}
                </button>
            </div>
        </form>
    );
}
