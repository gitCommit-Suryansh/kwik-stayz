"use client";

import { useState } from "react";
import { ArrowUpDown, SlidersHorizontal, X } from "lucide-react";
import SortModal from "./SortModal";
import FiltersSidebar from "../hotels/FiltersSidebar";

export default function MobileSearchActions({ localities, basePath }) {
    const [activeModal, setActiveModal] = useState(null); // 'sort' | 'filters' | null
    const [currentSort, setCurrentSort] = useState("Popularity");

    const closeModals = () => setActiveModal(null);

    return (
        <>
            {/* Fixed Bottom Bar */}
            <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-3 z-40 flex gap-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
                <button
                    onClick={() => setActiveModal("sort")}
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg border border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 active:bg-gray-100 transition-colors"
                >
                    <ArrowUpDown size={18} />
                    Sort
                </button>
                <button
                    onClick={() => setActiveModal("filters")}
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg bg-[#f8a11e] text-white font-semibold shadow-sm hover:bg-[#e0901a] active:bg-[#c88015] transition-colors"
                >
                    <SlidersHorizontal size={18} />
                    Filters
                </button>
            </div>

            {/* Sort Modal */}
            <SortModal
                isOpen={activeModal === "sort"}
                onClose={closeModals}
                currentSort={currentSort}
                onSortChange={setCurrentSort}
                basePath={basePath}
            />

            {/* Full Screen Filter Modal */}
            {activeModal === "filters" && (
                <div className="fixed inset-0 z-50 bg-white animate-in slide-in-from-bottom duration-300 flex flex-col">
                    {/* Header */}
                    <div className="px-4 py-3 border-b border-gray-200 flex items-center justify-between bg-white shrink-0">
                        <h2 className="text-lg font-bold text-gray-900">Filters</h2>
                        <button onClick={closeModals} className="p-2 hover:bg-gray-100 rounded-full">
                            <X size={24} className="text-gray-600" />
                        </button>
                    </div>

                    {/* Scrollable Content */}
                    <div className="flex-1 overflow-y-auto bg-gray-50">
                        {/* 
                We pass isMobile={true} to FiltersSidebar to potentially 
                disable its internal sticky header or adjust styles if needed.
                Currently, we just render it. 
             */}
                        <FiltersSidebar localities={localities} isMobile={true} basePath={basePath} />
                    </div>

                    {/* Bottom Action Footer (Optional Override) */}
                    {/* FiltersSidebar has its own Clear button, but we might want an 'Apply' button here if we controlled state strictly. 
              For now, we assume immediate application or the Sidebar handles it. 
              We can add a 'View Results' button here to close.
          */}
                    <div className="p-4 border-t border-gray-200 bg-white shrink-0">
                        <button
                            onClick={closeModals}
                            className="w-full py-3 bg-[#f8a11e] text-white font-bold rounded-xl shadow-lg"
                        >
                            View Results
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}
