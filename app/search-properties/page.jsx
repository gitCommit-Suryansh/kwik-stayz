"use client";

import React from "react";
import HomeSearchBar from "@/components/home/HomeSearchBar";
import BottomNav from "@/components/home/BottomNav";

export default function SearchPropertiesPage() {
    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            <main className="max-w-md mx-auto w-full bg-white min-h-screen">
                <HomeSearchBar />
            </main>
            <BottomNav />
        </div>
    );
}
