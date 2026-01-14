import React from "react";
import { MapPin, Search } from "lucide-react";

/**
 * CityDestinations Component
 * @param {Object} props
 * @param {Array} props.cities - List of city objects
 */
const CityDestinations = ({ cities = [] }) => {
    return (
        <section className="py-12 bg-gray-50/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <MapPin size={18} className="text-[#f8a11e]" />
                            <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
                                Trending Getaways
                            </h2>
                        </div>
                        <p className="text-gray-500 text-sm ml-7">
                            Most searched destinations by travelers
                        </p>
                    </div>
                    <a
                        href="#"
                        className="hidden md:inline-flex items-center text-sm font-semibold text-[#f8a11e] hover:text-[#e0901a]"
                    >
                        View all cities <Search size={14} className="ml-1" />
                    </a>
                </div>

                <div className="flex md:grid md:grid-cols-3 lg:grid-cols-5 gap-4 overflow-x-auto pb-4 md:pb-0 snap-x md:snap-none">
                    {cities.map((city) => (
                        <a
                            key={city._id}
                            href={`/hotels/${city.city?.slug || ""}`}
                            className="min-w-[160px] md:min-w-0 snap-start group relative h-40 md:h-52 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 block"
                        >
                            <img
                                src={city.heroImage}
                                alt={city.displayName}
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                            <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-1 group-hover:translate-y-0 transition-transform">
                                <h3 className="text-lg font-bold text-white mb-0.5">
                                    {city.displayName}
                                </h3>
                                <p className="text-xs text-gray-300 font-medium">
                                    Starting from ₹999
                                </p>
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CityDestinations;
