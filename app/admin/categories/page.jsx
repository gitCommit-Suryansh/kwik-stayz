"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { PlusIcon } from "@heroicons/react/24/outline";

export default function CategoriesPage() {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await fetch("/api/category");
                const data = await res.json();
                // API returns { categories: [...] }
                setCategories(data.categories || []);
            } catch (err) {
                console.error("Failed to fetch categories", err);
            } finally {
                setLoading(false);
            }
        };
        fetchCategories();
    }, []);

    return (
        <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">Categories</h1>
                    <p className="mt-2 text-gray-500">Manage hotel categories and tags.</p>
                </div>
                <Link
                    href="/admin/categories/create"
                    className="inline-flex items-center rounded-md bg-gray-900 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-800"
                >
                    <PlusIcon className="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />
                    Add Category
                </Link>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                {loading ? (
                    <div className="p-8 text-center text-gray-500">Loading categories...</div>
                ) : categories.length === 0 ? (
                    <div className="p-12 text-center">
                        <h3 className="mt-2 text-sm font-semibold text-gray-900">No categories found</h3>
                        <p className="mt-1 text-sm text-gray-500">Create your first category to tag hotels.</p>
                        <div className="mt-6">
                            <Link
                                href="/admin/categories/create"
                                className="inline-flex items-center rounded-md bg-primary px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary/90"
                            >
                                <PlusIcon className="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />
                                Add Category
                            </Link>
                        </div>
                    </div>
                ) : (
                    <ul role="list" className="divide-y divide-gray-100">
                        {categories.map((category) => (
                            <li key={category._id || category.slug} className="flex items-center justify-between gap-x-6 py-5 px-6 hover:bg-gray-50">
                                <div className="min-w-0">
                                    <div className="flex items-start gap-x-3">
                                        <p className="text-sm font-semibold leading-6 text-gray-900">{category.name}</p>
                                    </div>
                                    <div className="mt-1 flex items-center gap-x-2 text-xs leading-5 text-gray-500">
                                        <p className="truncate">{category.slug}</p>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}
