"use client";

import { Search, Calendar, Users } from "lucide-react";

export default function SearchBar({ city }) {
  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-6 py-4">
      <div className="flex flex-col md:flex-row items-center gap-4 bg-white border border-gray-200 rounded-lg p-2 shadow-sm">
        {/* Location */}
        <div className="flex-1 flex items-center gap-3 px-4 py-2 border-b md:border-b-0 md:border-r border-gray-200 w-full md:w-auto">
          <Search className="w-5 h-5 text-gray-400" />
          <div className="flex-1">
            <label className="block text-xs font-medium text-gray-500">Location</label>
            <input
              type="text"
              defaultValue={city}
              className="w-full text-sm font-medium text-gray-900 focus:outline-none placeholder-gray-400"
              placeholder="Where are you going?"
            />
          </div>
        </div>

        {/* Dates */}
        <div className="flex-1 flex items-center gap-3 px-4 py-2 border-b md:border-b-0 md:border-r border-gray-200 w-full md:w-auto">
          <Calendar className="w-5 h-5 text-gray-400" />
          <div className="flex-1">
            <label className="block text-xs font-medium text-gray-500">Check-in - Check-out</label>
            <div className="text-sm font-medium text-gray-900">
              Today - Tomorrow
            </div>
          </div>
        </div>

        {/* Guests */}
        <div className="flex-1 flex items-center gap-3 px-4 py-2 w-full md:w-auto">
          <Users className="w-5 h-5 text-gray-400" />
          <div className="flex-1">
            <label className="block text-xs font-medium text-gray-500">Guests</label>
            <div className="text-sm font-medium text-gray-900">
              2 Guests, 1 Room
            </div>
          </div>
        </div>

        {/* Search Button */}
        <button className="w-full md:w-auto px-8 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg transition-colors">
          Search
        </button>
      </div>
    </div>
  );
}