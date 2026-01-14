"use client";

import React, { useState, useEffect, useRef } from "react";
import SearchBar from "@/components/home/HomeSearchBar";
import { Search } from "lucide-react";

// Sticky Search Header (Mobile Only)
const StickySearchHeader = ({ isVisible }) => {
    return (
        <div
            className={`md:hidden fixed top-2 left-2 right-2 z-40 transition-all duration-300 ease-in-out ${isVisible
                    ? "translate-y-0 opacity-100"
                    : "-translate-y-12 opacity-0 pointer-events-none"
                }`}
        >
            {/* Added shadow-xl and rounded-full */}
            <div className="p-2 bg-white shadow-xl rounded-full">
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Search className="h-5 w-5 text-gray-500" />
                    </div>
                    <input
                        type="text"
                        // MODIFIED: py-2.5 and rounded-full
                        className="w-full pl-11 pr-4 py-2.5 bg-gray-100 rounded-full border-none focus:ring-2 focus:ring-[#f8a11e]"
                        placeholder="Search for city, location or hotel"
                    />
                </div>
            </div>
        </div>
    );
};

export default function HomeSearchSection({ children }) {
    const [isStickySearchVisible, setIsStickySearchVisible] = useState(false);
    const searchBarRef = useRef(null);

    useEffect(() => {
        const searchBarEl = searchBarRef.current;
        if (!searchBarEl) return;

        const handleScroll = () => {
            const searchBarTop = searchBarEl.offsetTop;

            if (window.scrollY > searchBarTop) {
                setIsStickySearchVisible(true);
            } else {
                setIsStickySearchVisible(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []); // Runs once on mount, ref will be populated

    return (
        <>
            <StickySearchHeader isVisible={isStickySearchVisible} />
            <div className="flex flex-col md:flex-col-reverse pt-5">
                <SearchBar ref={searchBarRef} />
                {children}
            </div>
        </>
    );
}
