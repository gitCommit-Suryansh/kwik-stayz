"use client";

import { useState } from "react";
import { PlusIcon, TrashIcon, ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";
import ImageUpload from "../../../_components/ImageUpload";

const BED_TYPES = ["1 King Bed", "1 Queen Bed", "2 Queen Beds", "2 Single Beds", "3 Single Beds"];
const COMMON_AMENITIES = ["AC", "TV", "WiFi", "Mini Fridge", "Geyser", "Heater", "Balcony", "Work Desk"];

export default function RoomTypeManager({ roomTypes, onChange, onImageChange }) {
    const [expandedIndex, setExpandedIndex] = useState(0);

    const addRoomType = () => {
        const newRoom = {
            name: "",
            slug: "",
            basePrice: "",
            originalPrice: "",
            maxGuests: 2,
            maxGuestsWithExtra: 3,
            extraGuestPricing: 35,
            beds: "1 King Bed",
            area: "",
            refundable: false,
            amenities: [],
            image: null // Will hold the file object temporarily in parent state? No, parent manages files separately or we pass callback.
            // We will handle image strictly via callback to parent
        };
        onChange([...roomTypes, newRoom]);
        setExpandedIndex(roomTypes.length); // Open the new one
    };

    const removeRoomType = (index) => {
        const updated = roomTypes.filter((_, i) => i !== index);
        onChange(updated);
        setExpandedIndex(Math.max(0, index - 1));
    };

    const updateRoomType = (index, field, value) => {
        const updated = [...roomTypes];
        updated[index] = { ...updated[index], [field]: value };

        // Auto-generate slug from name if slug is empty or matches old name slug
        if (field === "name") {
            const slug = value.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, "");
            updated[index].slug = slug;
        }

        onChange(updated);
    };

    const toggleAmenity = (index, amenity) => {
        const room = roomTypes[index];
        const current = room.amenities || [];
        let newAmenities;
        if (current.includes(amenity)) {
            newAmenities = current.filter(a => a !== amenity);
        } else {
            newAmenities = [...current, amenity];
        }
        updateRoomType(index, "amenities", newAmenities);
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-900">Room Configuraton</h3>
                <button
                    type="button"
                    onClick={addRoomType}
                    className="inline-flex items-center gap-x-1.5 rounded-md bg-gray-900 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-800"
                >
                    <PlusIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" />
                    Add Room Type
                </button>
            </div>

            {roomTypes.length === 0 && (
                <div className="text-center py-10 border-2 border-dashed border-gray-300 rounded-lg">
                    <p className="text-gray-500">No rooms added yet. Click above to add one.</p>
                </div>
            )}

            <div className="space-y-4">
                {roomTypes.map((room, index) => (
                    <div key={index} className="border border-gray-200 rounded-xl bg-white overflow-hidden shadow-sm transition-all">
                        {/* Header / Accordion Toggle */}
                        <div
                            className="flex items-center justify-between px-4 py-3 bg-gray-50 cursor-pointer hover:bg-gray-100"
                            onClick={() => setExpandedIndex(expandedIndex === index ? -1 : index)}
                        >
                            <div className="flex items-center gap-3">
                                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-200 text-xs font-medium text-gray-600">{index + 1}</span>
                                <span className="font-semibold text-gray-900">{room.name || "New Room Type"}</span>
                                {room.basePrice && <span className="text-sm text-gray-500">• ₹{room.basePrice}/night</span>}
                            </div>
                            <div className="flex items-center gap-2">
                                <button
                                    type="button"
                                    onClick={(e) => { e.stopPropagation(); removeRoomType(index); }}
                                    className="text-gray-400 hover:text-red-500 p-1"
                                >
                                    <TrashIcon className="h-5 w-5" />
                                </button>
                                {expandedIndex === index ? (
                                    <ChevronUpIcon className="h-5 w-5 text-gray-400" />
                                ) : (
                                    <ChevronDownIcon className="h-5 w-5 text-gray-400" />
                                )}
                            </div>
                        </div>

                        {/* Expanded Content */}
                        {expandedIndex === index && (
                            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6 bg-white border-t border-gray-100">

                                {/* Basic Info */}
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Room Name</label>
                                        <input
                                            type="text"
                                            value={room.name}
                                            onChange={(e) => updateRoomType(index, "name", e.target.value)}
                                            placeholder="e.g. Deluxe King"
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-2 border"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Slug</label>
                                        <input
                                            type="text"
                                            value={room.slug}
                                            onChange={(e) => updateRoomType(index, "slug", e.target.value)}
                                            className="mt-1 block w-full rounded-md border-gray-300 bg-gray-50 text-gray-500 shadow-sm sm:text-sm p-2 border"
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Base Price (₹)</label>
                                            <input
                                                type="number"
                                                value={room.basePrice}
                                                onChange={(e) => updateRoomType(index, "basePrice", e.target.value)}
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-2 border"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Original Price (₹)</label>
                                            <input
                                                type="number"
                                                value={room.originalPrice}
                                                onChange={(e) => updateRoomType(index, "originalPrice", e.target.value)}
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-2 border"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Capacity & Specs */}
                                <div className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Max Guests</label>
                                            <input
                                                type="number"
                                                value={room.maxGuests}
                                                onChange={(e) => updateRoomType(index, "maxGuests", e.target.value)}
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-2 border"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Max w/ Extra</label>
                                            <input
                                                type="number"
                                                value={room.maxGuestsWithExtra}
                                                onChange={(e) => updateRoomType(index, "maxGuestsWithExtra", e.target.value)}
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-2 border"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Extra Guest Price (₹)</label>
                                            <input
                                                type="number"
                                                value={room.extraGuestPricing}
                                                onChange={(e) => updateRoomType(index, "extraGuestPricing", e.target.value)}
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-2 border"
                                            />
                                        </div>
                                        <div className="flex items-end pb-3">
                                            <label className="flex items-center gap-2 cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    checked={room.refundable}
                                                    onChange={(e) => updateRoomType(index, "refundable", e.target.checked)}
                                                    className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                                                />
                                                <span className="text-sm font-medium text-gray-700">Refundable Rate</span>
                                            </label>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Bed Type</label>
                                        <select
                                            value={room.beds}
                                            onChange={(e) => updateRoomType(index, "beds", e.target.value)}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-2 border"
                                        >
                                            {BED_TYPES.map(bed => <option key={bed} value={bed}>{bed}</option>)}
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Area</label>
                                        <input
                                            type="text"
                                            value={room.area}
                                            onChange={(e) => updateRoomType(index, "area", e.target.value)}
                                            placeholder="e.g. 250 sq ft"
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-2 border"
                                        />
                                    </div>
                                </div>

                                {/* Amenities - Full Width */}
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Room Amenities</label>
                                    <div className="flex flex-wrap gap-2">
                                        {COMMON_AMENITIES.map(amenity => (
                                            <button
                                                key={amenity}
                                                type="button"
                                                onClick={() => toggleAmenity(index, amenity)}
                                                className={`
                                        px-3 py-1 rounded-full text-xs font-medium border transition-colors
                                        ${(room.amenities || []).includes(amenity)
                                                        ? "bg-black text-white border-black"
                                                        : "bg-white text-gray-900 border-gray-900 hover:bg-gray-50"}
                                    `}
                                            >
                                                {amenity}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Image Upload - Full Width */}
                                <div className="md:col-span-2 border-t pt-4">
                                    <ImageUpload
                                        id={`roomImage_${index}`}
                                        label="Room Image"
                                        subLabel="Primary photo for this room type"
                                        value={room.imageFile} // We use a temp prop 'imageFile' to show preview
                                        onChange={(file) => {
                                            // Add file to parent state through a special callback wrapper or 
                                            // more simply: update the room object with the file locally?
                                            // Better: Pass file up.
                                            onImageChange(index, file);
                                        }}
                                        onRemove={() => onImageChange(index, null)}
                                    />
                                </div>

                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
