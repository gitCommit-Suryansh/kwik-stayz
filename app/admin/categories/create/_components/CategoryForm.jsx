"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircleIcon, ExclamationCircleIcon } from "@heroicons/react/24/outline";

export default function CategoryForm() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        slug: "",
        seoTitle: "",
        seoDescription: ""
    });

    const handleChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
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
            if (!prev.seoTitle) {
                updates.seoTitle = `${prev.name} in {{city}}`;
            }
            if (!prev.seoDescription) {
                updates.seoDescription = `Book the best ${prev.name} hotels in {{city}} with Kwik Stays. Premium amenities and affordable prices.`;
            }

            return updates;
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const res = await fetch("/api/category", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.message || "Failed to create category");
            }

            setSuccess(true);
            setTimeout(() => {
                router.push("/admin/categories");
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
                <h2 className="mt-4 text-2xl font-bold text-gray-900">Category Created Successfully!</h2>
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
                            <h3 className="text-sm font-medium text-red-800">Error creating category</h3>
                            <div className="mt-2 text-sm text-red-700">{error}</div>
                        </div>
                    </div>
                </div>
            )}

            <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

                {/* Name */}
                <div className="sm:col-span-3">
                    <label className="block text-sm font-medium leading-6 text-gray-900">Category Name</label>
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

                {/* Slug */}
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

                <div className="col-span-full border-t pt-6">
                    <h3 className="text-sm font-semibold text-gray-900 mb-4">SEO Metadata</h3>
                    <div className="grid grid-cols-1 gap-6">
                        <div>
                            <label className="block text-sm font-medium leading-6 text-gray-900">SEO Title</label>
                            <input
                                type="text"
                                value={formData.seoTitle}
                                onChange={e => handleChange('seoTitle', e.target.value)}
                                className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 pl-2"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium leading-6 text-gray-900">SEO Description</label>
                            <textarea
                                rows={2}
                                value={formData.seoDescription}
                                onChange={e => handleChange('seoDescription', e.target.value)}
                                className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 pl-2"
                            />
                        </div>
                    </div>
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
                    {loading ? 'Creating...' : 'Create Category'}
                </button>
            </div>
        </form>
    );
}
