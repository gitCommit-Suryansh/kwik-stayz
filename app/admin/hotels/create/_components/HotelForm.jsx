"use client";

import { useState, useEffect } from "react";
import ImageUpload from "./ImageUpload";
import RoomTypeManager from "./RoomTypeManager";
import { useRouter } from "next/navigation";
import { CheckCircleIcon, ExclamationCircleIcon, MapPinIcon, PhotoIcon, TagIcon, CurrencyRupeeIcon, BuildingOfficeIcon, XMarkIcon } from "@heroicons/react/24/outline";

// Tabs Configuration
const TABS = [
    { id: 'basic', name: 'Basic Info', icon: BuildingOfficeIcon },
    { id: 'location', name: 'Location', icon: MapPinIcon },
    { id: 'media', name: 'Media', icon: PhotoIcon },
    { id: 'pricing', name: 'Pricing & Policies', icon: CurrencyRupeeIcon },
    { id: 'rooms', name: 'Room Types', icon: TagIcon },
    { id: 'seo', name: 'SEO & Extras', icon: TagIcon }, // Reusing TagIcon generically
];

export default function HotelForm() {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState('basic');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    // Dropdown Data
    const [cities, setCities] = useState([]);
    const [localities, setLocalities] = useState([]);
    const [categories, setCategories] = useState([]);

    // Form State
    const [formData, setFormData] = useState({
        name: "",
        slug: "",
        citySlug: "",
        localitySlug: "",
        categories: [], // IDs or Slugs? API expects Slugs for creation hookups usually, let's check. Schema has ObjectIds. API resolves slugs. Stick to slugs.

        description: "",
        address: { full: "", street: "", zip: "" },
        geo: { lat: "", lng: "" },

        rating: 4.5,
        reviewCount: 0,

        priceStartingFrom: "",
        originalPrice: "",
        taxes: 12, // %
        currency: "INR",

        hotelAmenities: [],
        roomTypes: [], // Complex array

        policies: {
            checkIn: "12:00 PM",
            checkOut: "11:00 AM",
            coupleAllowed: true,
            idProof: true
        },

        seo: { title: "", description: "" },
        isHomeFeatured: false
    });

    // File State
    const [heroImage, setHeroImage] = useState(null);
    const [gallery, setGallery] = useState([]);

    // Room Type Images: Keyed by index
    // We store the File objects here. The RoomTypeManager passes them up.
    const [roomTypeImages, setRoomTypeImages] = useState({});

    /* ---------------- Fetch Dependencies ---------------- */
    useEffect(() => {
        const fetchInitial = async () => {
            try {
                // Parallel fetch
                const [citiesRes, catsRes] = await Promise.all([
                    fetch("/api/cities").then(r => r.json()),
                    fetch("/api/category").then(r => r.json())
                ]);
                setCities(citiesRes || []);
                setCategories(catsRes.categories || []); // Notice key structure from API
            } catch (err) {
                console.error("Failed to fetch dependencies", err);
            }
        };
        fetchInitial();
    }, []);

    // Fetch Localities when City changes
    useEffect(() => {
        if (!formData.citySlug) {
            setLocalities([]);
            return;
        }
        const fetchLocalities = async () => {
            try {
                const res = await fetch(`/api/localities/${formData.citySlug}`);
                if (res.ok) {
                    const data = await res.json();
                    setLocalities(data);
                }
            } catch (err) {
                console.error(err);
            }
        };
        fetchLocalities();
    }, [formData.citySlug]);


    /* ---------------- Handlers ---------------- */
    const handleChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleNestedChange = (parent, field, value) => {
        setFormData(prev => ({
            ...prev,
            [parent]: { ...prev[parent], [field]: value }
        }));
    };

    // Auto-slug
    const handleNameBlur = () => {
        if (!formData.slug && formData.name) {
            const baseSlug = formData.name.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, "");
            const randomSuffix = Math.floor(100000 + Math.random() * 900000); // 6 digit random number
            handleChange("slug", `${baseSlug}-${randomSuffix}`);
        }
    };

    const handleRoomTypeImageChange = (index, file) => {
        setRoomTypeImages(prev => {
            const copy = { ...prev };
            if (file === null) delete copy[index];
            else copy[index] = file;
            return copy;
        });

        // Also need to update the preview in the roomTypes array itself so RoomTypeManager can show it? 
        // Or RoomTypeManager keeps its own previews?
        // Better: We update the roomTypes array with a 'imageFile' prop for preview ONLY.
        const updatedRooms = [...formData.roomTypes];
        if (updatedRooms[index]) {
            updatedRooms[index].imageFile = file;
            handleRoomTypeChange(updatedRooms);
        }
    };

    const handleRoomTypeChange = (newRoomTypes) => {
        handleChange("roomTypes", newRoomTypes);
    };

    /* ---------------- Submit ---------------- */
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const submitData = new FormData();

            // Append JSON fields
            // We need to strip 'imageFile' from roomTypes before sending JSON to avoid circular errors or garbage
            const cleanRoomTypes = formData.roomTypes.map(({ imageFile, ...rest }) => rest);

            const jsonPayload = {
                ...formData,
                roomTypes: cleanRoomTypes
            };

            // Loop through keys and append
            Object.keys(jsonPayload).forEach(key => {
                if (typeof jsonPayload[key] === 'object') {
                    submitData.append(key, JSON.stringify(jsonPayload[key]));
                } else {
                    submitData.append(key, jsonPayload[key]);
                }
            });

            // Append Files
            if (heroImage) submitData.append("heroImage", heroImage);

            gallery.forEach(file => {
                submitData.append("gallery", file);
            });

            // Append Room Type Images
            // format: roomTypeImage_{index}
            Object.keys(roomTypeImages).forEach(index => {
                submitData.append(`roomTypeImage_${index}`, roomTypeImages[index]);
            });

            const res = await fetch("/api/hotels", {
                method: "POST",
                body: submitData
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.message || "Failed to create hotel");
            }

            setSuccess(true);
            setTimeout(() => {
                router.push("/admin"); // Redirect
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
                <h2 className="mt-4 text-2xl font-bold text-gray-900">Hotel Created Successfully!</h2>
                <p className="text-gray-500">Redirecting you to dashboard...</p>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-8">

            {/* Tabs Navigation */}
            <div className="border-b border-gray-200">
                <nav className="-mb-px flex space-x-8 overflow-x-auto" aria-label="Tabs">
                    {TABS.map((tab) => {
                        const isCurrent = activeTab === tab.id;
                        return (
                            <button
                                key={tab.id}
                                type="button"
                                onClick={() => setActiveTab(tab.id)}
                                className={`
                                    group inline-flex items-center border-b-2 py-4 px-1 text-sm font-medium whitespace-nowrap
                                    ${isCurrent
                                        ? 'border-primary text-primary'
                                        : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                                    }
                                `}
                            >
                                <tab.icon
                                    className={`
                                        -ml-0.5 mr-2 h-5 w-5
                                        ${isCurrent ? 'text-primary' : 'text-gray-400 group-hover:text-gray-500'}
                                    `}
                                />
                                {tab.name}
                            </button>
                        );
                    })}
                </nav>
            </div>

            {/* Error Banner */}
            {error && (
                <div className="rounded-md bg-red-50 p-4">
                    <div className="flex">
                        <div className="flex-shrink-0">
                            <ExclamationCircleIcon className="h-5 w-5 text-red-400" aria-hidden="true" />
                        </div>
                        <div className="ml-3">
                            <h3 className="text-sm font-medium text-red-800">Error creating hotel</h3>
                            <div className="mt-2 text-sm text-red-700">{error}</div>
                        </div>
                    </div>
                </div>
            )}

            {/* ----- Step 1: Basic Info ----- */}
            <div className={activeTab === 'basic' ? 'block' : 'hidden'}>
                <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="sm:col-span-3">
                        <label className="block text-sm font-medium leading-6 text-gray-900">Hotel Name</label>
                        <div className="mt-2">
                            <input type="text" value={formData.name} onChange={e => handleChange('name', e.target.value)} onBlur={handleNameBlur} className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 pl-2" />
                        </div>
                    </div>

                    <div className="sm:col-span-3">
                        <label className="block text-sm font-medium leading-6 text-gray-900">Slug</label>
                        <div className="mt-2">
                            <input type="text" value={formData.slug} onChange={e => handleChange('slug', e.target.value)} className="block w-full rounded-md border-0 py-1.5 text-gray-500 bg-gray-50 shadow-sm ring-1 ring-inset ring-gray-300 sm:text-sm sm:leading-6 pl-2" />
                        </div>
                    </div>

                    <div className="col-span-full">
                        <label className="block text-sm font-medium leading-6 text-gray-900">Description</label>
                        <div className="mt-2">
                            <textarea rows={3} value={formData.description} onChange={e => handleChange('description', e.target.value)} className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 pl-2" />
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="sm:col-span-2">
                        <label className="block text-sm font-medium leading-6 text-gray-900">Rating (0-5)</label>
                        <input type="number" step="0.1" min="0" max="5" value={formData.rating} onChange={e => handleChange('rating', e.target.value)} className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-primary sm:text-sm sm:leading-6 pl-2" />
                    </div>
                    <div className="sm:col-span-2">
                        <label className="block text-sm font-medium leading-6 text-gray-900">Review Count</label>
                        <input type="number" value={formData.reviewCount} onChange={e => handleChange('reviewCount', e.target.value)} className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-primary sm:text-sm sm:leading-6 pl-2" />
                    </div>

                    <div className="col-span-full">
                        <label className="block text-sm font-medium leading-6 text-gray-900">Categories</label>
                        <div className="mt-2 flex gap-4 flex-wrap">
                            {categories.map(cat => (
                                <label key={cat._id} className="inline-flex items-center gap-2 cursor-pointer bg-white border px-3 py-2 rounded-lg hover:bg-gray-50">
                                    <input
                                        type="checkbox"
                                        value={cat.slug}
                                        checked={formData.categories.includes(cat.slug)}
                                        onChange={(e) => {
                                            const val = e.target.value;
                                            const currentlyChecked = formData.categories.includes(val);
                                            handleChange('categories', currentlyChecked
                                                ? formData.categories.filter(c => c !== val)
                                                : [...formData.categories, val]
                                            );
                                        }}
                                        className="rounded border-gray-300 text-primary focus:ring-primary"
                                    />
                                    <span className="text-sm text-gray-700">{cat.name}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Hotel Amenities Input */}
                    <div className="col-span-full">
                        <label className="block text-sm font-medium leading-6 text-gray-900">Hotel Amenities</label>
                        <p className="text-xs text-gray-500 mb-3">Select from common amenities or add custom ones.</p>

                        {/* Predefined Amenities Buttons */}
                        <div className="flex flex-wrap gap-2 mb-4">
                            {[
                                "AC", "Free Wifi", "TV", "Geyser", "Power Backup", "Elevator",
                                "Parking Facility", "Card Payment", "CCTV Cameras", "Reception",
                                "Security", "24/7 Check-in", "Daily Housekeeping", "Fire-Extinguisher",
                                "Attached Bathroom", "First-aid Services", "Complimentary Breakfast",
                                "Kitchen", "Doctor on Call"
                            ].map((amenity) => {
                                const isSelected = formData.hotelAmenities.includes(amenity);
                                return (
                                    <button
                                        key={amenity}
                                        type="button"
                                        onClick={() => {
                                            const newAmenities = isSelected
                                                ? formData.hotelAmenities.filter(a => a !== amenity)
                                                : [...formData.hotelAmenities, amenity];
                                            handleChange('hotelAmenities', newAmenities);
                                        }}
                                        className={`
                                            inline-flex items-center rounded-full px-3 py-1 text-xs font-medium border transition-colors
                                            ${isSelected
                                                ? 'bg-primary text-white border-primary'
                                                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                                            }
                                        `}
                                    >
                                        {amenity}
                                        {isSelected && <CheckCircleIcon className="ml-1.5 h-3 w-3 text-white" />}
                                    </button>
                                );
                            })}
                        </div>

                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Type custom amenity and press enter..."
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-primary sm:text-sm sm:leading-6 pl-2"
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' || e.key === ',') {
                                        e.preventDefault();
                                        const val = e.target.value.trim();
                                        if (val && !formData.hotelAmenities.includes(val)) {
                                            handleChange('hotelAmenities', [...formData.hotelAmenities, val]);
                                            e.target.value = '';
                                        }
                                    }
                                }}
                            />
                            <div className="absolute inset-y-0 right-0 flex py-1.5 pr-1.5">
                                <kbd className="inline-flex items-center rounded border border-gray-200 px-1 font-sans text-xs text-gray-400">↵</kbd>
                            </div>
                        </div>

                        <div className="mt-3 flex flex-wrap gap-2">
                            {formData.hotelAmenities.map((am, i) => (
                                <span key={i} className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary border border-primary/20">
                                    {am}
                                    <button
                                        type="button"
                                        onClick={() => handleChange('hotelAmenities', formData.hotelAmenities.filter((_, idx) => idx !== i))}
                                        className="text-primary/60 hover:text-primary ml-1"
                                    >
                                        <XMarkIcon className="h-3.5 w-3.5" />
                                    </button>
                                </span>
                            ))}
                            {formData.hotelAmenities.length === 0 && (
                                <span className="text-sm text-gray-400 italic">No amenities selected yet.</span>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* ----- Step 2: Location ----- */}
            <div className={activeTab === 'location' ? 'block' : 'hidden'}>
                <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="sm:col-span-3">
                        <label className="block text-sm font-medium leading-6 text-gray-900">City (Dropdown)</label>
                        <div className="mt-2">
                            <select
                                value={formData.citySlug}
                                onChange={e => handleChange("citySlug", e.target.value)}
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 pl-2"
                            >
                                <option value="">Select a City</option>
                                {cities.map(c => <option key={c._id} value={c.slug}>{c.name}</option>)}
                            </select>
                        </div>
                    </div>

                    <div className="sm:col-span-3">
                        <label className="block text-sm font-medium leading-6 text-gray-900">Locality (Dropdown)</label>
                        <div className="mt-2">
                            <select
                                value={formData.localitySlug}
                                onChange={e => handleChange("localitySlug", e.target.value)}
                                disabled={!formData.citySlug}
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 pl-2 disabled:bg-gray-100"
                            >
                                <option value="">Select Locality</option>
                                {localities.map(l => <option key={l._id} value={l.slug}>{l.name}</option>)}
                            </select>
                        </div>
                    </div>

                    <div className="col-span-full">
                        <label className="block text-sm font-medium leading-6 text-gray-900">Display Address (Full)</label>
                        <div className="mt-2">
                            <input type="text" value={formData.address.full} onChange={e => handleNestedChange('address', 'full', e.target.value)} className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 pl-2" />
                        </div>
                    </div>

                    {/* Detailed Address Fields */}
                    <div className="sm:col-span-3">
                        <label className="block text-sm font-medium leading-6 text-gray-900">Street</label>
                        <input type="text" value={formData.address.street} onChange={e => handleNestedChange('address', 'street', e.target.value)} className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-primary sm:text-sm sm:leading-6 pl-2" />
                    </div>
                    <div className="sm:col-span-3">
                        <label className="block text-sm font-medium leading-6 text-gray-900">Area</label>
                        <input type="text" value={formData.address.area} onChange={e => handleNestedChange('address', 'area', e.target.value)} className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-primary sm:text-sm sm:leading-6 pl-2" />
                    </div>
                    <div className="sm:col-span-2">
                        <label className="block text-sm font-medium leading-6 text-gray-900">City Name</label>
                        <input type="text" value={formData.address.city} onChange={e => handleNestedChange('address', 'city', e.target.value)} className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-primary sm:text-sm sm:leading-6 pl-2" />
                    </div>
                    <div className="sm:col-span-2">
                        <label className="block text-sm font-medium leading-6 text-gray-900">State</label>
                        <input type="text" value={formData.address.state} onChange={e => handleNestedChange('address', 'state', e.target.value)} className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-primary sm:text-sm sm:leading-6 pl-2" />
                    </div>
                    <div className="sm:col-span-2">
                        <label className="block text-sm font-medium leading-6 text-gray-900">Pincode</label>
                        <input type="text" value={formData.address.pincode} onChange={e => handleNestedChange('address', 'pincode', e.target.value)} className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-primary sm:text-sm sm:leading-6 pl-2" />
                    </div>


                    <div className="sm:col-span-3">
                        <label className="block text-sm font-medium leading-6 text-gray-900">Latitude</label>
                        <div className="mt-2">
                            <input type="number" step="any" value={formData.geo.lat} onChange={e => handleNestedChange('geo', 'lat', e.target.value)} className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 pl-2" />
                        </div>
                    </div>
                    <div className="sm:col-span-3">
                        <label className="block text-sm font-medium leading-6 text-gray-900">Longitude</label>
                        <div className="mt-2">
                            <input type="number" step="any" value={formData.geo.lng} onChange={e => handleNestedChange('geo', 'lng', e.target.value)} className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 pl-2" />
                        </div>
                    </div>
                </div>
            </div>

            {/* ----- Step 3: Media ----- */}
            <div className={activeTab === 'media' ? 'block' : 'hidden'}>
                <div className="space-y-8">
                    <ImageUpload
                        id="heroImage"
                        label="Hero Image"
                        subLabel="This is the main image displayed on cards."
                        value={heroImage}
                        onChange={setHeroImage}
                        onRemove={() => setHeroImage(null)}
                    />

                    <ImageUpload
                        id="gallery"
                        label="Gallery Images"
                        subLabel="Add multiple images for the hotel gallery."
                        multiple
                        value={gallery}
                        onChange={(files) => setGallery(prev => [...prev, ...files])}
                        onRemove={(index) => setGallery(prev => prev.filter((_, i) => i !== index))}
                    />
                </div>
            </div>

            {/* ----- Step 4: Pricing & Policies ----- */}
            <div className={activeTab === 'pricing' ? 'block' : 'hidden'}>
                <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="sm:col-span-2">
                        <label className="block text-sm font-medium leading-6 text-gray-900">Starting Price</label>
                        <div className="mt-2 relative rounded-md shadow-sm">
                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                <span className="text-gray-500 sm:text-sm">₹</span>
                            </div>
                            <input type="number" value={formData.priceStartingFrom} onChange={(e) => handleChange("priceStartingFrom", e.target.value)} className="block w-full rounded-md border-0 py-1.5 pl-7 pr-12 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6" placeholder="0.00" />
                        </div>
                    </div>
                    <div className="sm:col-span-2">
                        <label className="block text-sm font-medium leading-6 text-gray-900">Original Price</label>
                        <div className="mt-2 relative rounded-md shadow-sm">
                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                <span className="text-gray-500 sm:text-sm">₹</span>
                            </div>
                            <input type="number" value={formData.originalPrice} onChange={(e) => handleChange("originalPrice", e.target.value)} className="block w-full rounded-md border-0 py-1.5 pl-7 pr-12 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6" placeholder="0.00" />
                        </div>
                    </div>
                    <div className="sm:col-span-2">
                        <label className="block text-sm font-medium leading-6 text-gray-900">Taxes (%)</label>
                        <input type="number" value={formData.taxes} onChange={(e) => handleChange("taxes", e.target.value)} className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 pl-2" />
                    </div>

                    <div className="col-span-full border-t pt-6">
                        <h4 className="text-sm font-medium text-gray-900 mb-4">Policies</h4>
                        <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Check In Time</label>
                                <input type="text" value={formData.policies.checkIn} onChange={e => handleNestedChange('policies', 'checkIn', e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm border p-2" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Check Out Time</label>
                                <input type="text" value={formData.policies.checkOut} onChange={e => handleNestedChange('policies', 'checkOut', e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm border p-2" />
                            </div>
                            <div className="col-span-full sm:col-span-2 lg:col-span-3 grid grid-cols-2 gap-4">
                                <label className="flex items-center gap-2">
                                    <input type="checkbox" checked={formData.policies.coupleAllowed} onChange={e => handleNestedChange('policies', 'coupleAllowed', e.target.checked)} className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary" />
                                    <span className="text-sm text-gray-900">Couples Allowed</span>
                                </label>
                                <label className="flex items-center gap-2">
                                    <input type="checkbox" checked={formData.policies.idProof} onChange={e => handleNestedChange('policies', 'idProof', e.target.checked)} className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary" />
                                    <span className="text-sm text-gray-900">ID Proof Required</span>
                                </label>
                                <label className="flex items-center gap-2">
                                    <input type="checkbox" checked={formData.policies.petsAllowed} onChange={e => handleNestedChange('policies', 'petsAllowed', e.target.checked)} className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary" />
                                    <span className="text-sm text-gray-900">Pets Allowed</span>
                                </label>
                            </div>
                            <div className="col-span-full">
                                <label className="block text-sm font-medium text-gray-700">Security / Deposit Info</label>
                                <input type="text" value={formData.policies.security} onChange={e => handleNestedChange('policies', 'security', e.target.value)} placeholder="e.g. ₹500 refundable deposit" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm border p-2" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ----- Step 5: Room Types ----- */}
            <div className={activeTab === 'rooms' ? 'block' : 'hidden'}>
                <RoomTypeManager
                    roomTypes={formData.roomTypes}
                    onChange={handleRoomTypeChange}
                    onImageChange={handleRoomTypeImageChange}
                />
            </div>

            {/* ----- Step 6: SEO & Extras ----- */}
            <div className={activeTab === 'seo' ? 'block' : 'hidden'}>
                <div className="grid grid-cols-1 gap-8">
                    {/* Standard SEO */}
                    <div>
                        <h3 className="text-sm font-semibold text-gray-900 mb-4">Meta Data</h3>
                        <div className="grid grid-cols-1 gap-6">
                            <div>
                                <label className="block text-sm font-medium leading-6 text-gray-900">SEO Title</label>
                                <input type="text" value={formData.seo.title} onChange={e => handleNestedChange('seo', 'title', e.target.value)} placeholder="Basant Hotel in Koramangala, bangalore | Best Price" className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 pl-2" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium leading-6 text-gray-900">SEO Description</label>
                                <textarea rows={3} value={formData.seo.description} onChange={e => handleNestedChange('seo', 'description', e.target.value)} placeholder="Book Basant Premium hotel in Koramangala Bangalore. Clean rooms, modern amenities and best prices guaranteed." className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 pl-2" />
                            </div>
                        </div>
                    </div>

                    {/* Nearby Places */}
                    <div className="border-t pt-6">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-sm font-semibold text-gray-900">Nearby Places</h3>
                            <button
                                type="button"
                                onClick={() => handleChange('nearbyPlaces', [...(formData.nearbyPlaces || []), { name: "", distanceKm: "" }])}
                                className="text-xs text-primary font-medium hover:underline"
                            >
                                + Add Place
                            </button>
                        </div>
                        <div className="space-y-3">
                            {(formData.nearbyPlaces || []).map((place, index) => (
                                <div key={index} className="flex gap-4 items-center">
                                    <input type="text" placeholder="Place Name" value={place.name} onChange={e => {
                                        const copy = [...formData.nearbyPlaces];
                                        copy[index].name = e.target.value;
                                        handleChange('nearbyPlaces', copy);
                                    }} className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 sm:text-sm pl-2" />

                                    <input type="number" step="0.1" placeholder="Distance (km)" value={place.distanceKm} onChange={e => {
                                        const copy = [...formData.nearbyPlaces];
                                        copy[index].distanceKm = e.target.value;
                                        handleChange('nearbyPlaces', copy);
                                    }} className="block w-32 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 sm:text-sm pl-2" />

                                    <button type="button" onClick={() => handleChange('nearbyPlaces', formData.nearbyPlaces.filter((_, i) => i !== index))} className="text-gray-400 hover:text-red-500">
                                        <XMarkIcon className="h-5 w-5" />
                                    </button>
                                </div>
                            ))}
                            {(formData.nearbyPlaces || []).length === 0 && <p className="text-xs text-gray-500 italic">No nearby places added.</p>}
                        </div>
                    </div>

                    {/* FAQs */}
                    <div className="border-t pt-6">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-sm font-semibold text-gray-900">FAQs</h3>
                            <button
                                type="button"
                                onClick={() => handleChange('faqs', [...(formData.faqs || []), { question: "", answer: "" }])}
                                className="text-xs text-primary font-medium hover:underline"
                            >
                                + Add FAQ
                            </button>
                        </div>
                        <div className="space-y-4">
                            {(formData.faqs || []).map((faq, index) => (
                                <div key={index} className="space-y-2 p-4 bg-gray-50 rounded-lg relative">
                                    <input type="text" placeholder="Question" value={faq.question} onChange={e => {
                                        const copy = [...formData.faqs];
                                        copy[index].question = e.target.value;
                                        handleChange('faqs', copy);
                                    }} className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 sm:text-sm pl-2 font-medium" />

                                    <textarea rows={2} placeholder="Answer" value={faq.answer} onChange={e => {
                                        const copy = [...formData.faqs];
                                        copy[index].answer = e.target.value;
                                        handleChange('faqs', copy);
                                    }} className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 sm:text-sm pl-2" />

                                    <button type="button" onClick={() => handleChange('faqs', formData.faqs.filter((_, i) => i !== index))} className="absolute top-2 right-2 text-gray-400 hover:text-red-500">
                                        <XMarkIcon className="h-4 w-4" />
                                    </button>
                                </div>
                            ))}
                            {(formData.faqs || []).length === 0 && <p className="text-xs text-gray-500 italic">No FAQs added.</p>}
                        </div>
                    </div>

                    <div className="flex items-center gap-2 pt-4 border-t">
                        <input type="checkbox" checked={formData.isHomeFeatured} onChange={e => handleChange('isHomeFeatured', e.target.checked)} className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary" />
                        <label className="text-sm font-medium text-gray-900">Feature this hotel on Homepage</label>
                    </div>
                </div>
            </div>


            {/* Footer Actions */}
            <div className="flex items-center justify-end gap-x-6 border-t border-gray-900/10 pt-4 px-4 sm:px-8">
                <button type="button" onClick={() => router.back()} className="text-sm font-semibold leading-6 text-gray-900">Cancel</button>
                <button
                    type="submit"
                    disabled={loading}
                    className="rounded-md bg-gray-900 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900 disabled:opacity-50"
                >
                    {loading ? 'Creating...' : 'Create Hotel'}
                </button>
            </div>

        </form>
    );
}
