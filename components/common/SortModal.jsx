"use client";

import { X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

const sortMap = {
    Popularity: null,
    "Price: Low to High": "price_asc",
    "Price: High to Low": "price_desc",
    "Guest Rating": "rating_desc",
};

const sortOptions = [
    "Popularity",
    "Price: Low to High",
    "Price: High to Low",
    "Guest Rating",
];

export function SortSelect({ value, onChange }) {
    const router = useRouter();
    const searchParams = useSearchParams();

    const currentSortParam = searchParams.get("sort");

    const currentLabel =
        Object.entries(sortMap).find(
            ([_, value]) => value === currentSortParam
        )?.[0] || "Popularity";

    const handleChange = (label) => {
        const params = new URLSearchParams(searchParams.toString());
        const value = sortMap[label];

        if (value) params.set("sort", value);
        else params.delete("sort");

        router.push(`/search?${params.toString()}`);
    }
    return (
        <div className="hidden lg:flex items-center gap-2">
            <span className="text-sm text-gray-600">Sort By</span>
            <select
                value={currentLabel}
                onChange={(e) => handleChange(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
                {Object.keys(sortMap).map((option) => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default function SortModal({ isOpen, onClose }) {
    if (!isOpen) return null;
    const router = useRouter();
    const searchParams = useSearchParams();

    if (!isOpen) return null;

    const currentSortParam = searchParams.get("sort");
    const currentLabel =
        Object.entries(sortMap).find(
            ([_, value]) => value === currentSortParam
        )?.[0] || "Popularity";

    const handleSort = (label) => {
        const params = new URLSearchParams(searchParams.toString());
        const value = sortMap[label];

        if (value) params.set("sort", value);
        else params.delete("sort");

        router.push(`/search?${params.toString()}`);
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50">
            <div className="absolute inset-0" onClick={onClose} />

            <div className="relative w-full bg-white rounded-t-2xl shadow-xl">
                <div className="flex items-center justify-between p-4 border-b">
                    <h3 className="text-lg font-bold">Sort By</h3>
                    <button onClick={onClose}>
                        <X />
                    </button>
                </div>

                <div className="p-4 space-y-2">
                    {sortOptions.map((option) => (
                        <button
                            key={option}
                            onClick={() => handleSort(option)}
                            className={`w-full text-left px-4 py-3 rounded-xl font-medium ${currentLabel === option
                                    ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                                    : "hover:bg-gray-50"
                                }`}
                        >
                            {option}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    )
}
