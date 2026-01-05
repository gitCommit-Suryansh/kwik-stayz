//V1

// // "use client";

// // import { MapPin, Building2 } from "lucide-react";
// // import { useRouter } from "next/navigation";

// // export default function SearchSuggestions({ cities, localities, onSelect }) {
// //     const router = useRouter();
// //     if (cities.length === 0 && localities.length === 0) return null;

// //     return (
// //         <div onClick={(e) => e.stopPropagation()} className="absolute top-full left-0 right-0 bg-white border border-gray-100 rounded-2xl shadow-xl mt-3 z-50 overflow-hidden max-h-[400px] overflow-y-auto transform transition-all duration-200">
// //             {/* Cities */}
// //             {cities.length > 0 && (
// //                 <div className="py-2">
// //                     <p className="px-4 py-2 text-xs font-bold text-gray-500 uppercase tracking-wider">
// //                         Cities
// //                     </p>
// //                     {cities.map((city) => (
// //                         <div
// //                             key={city.slug}
// //                             onClick={() => {
// //                                 onSelect()
// //                                 router.push(`/search?city=${city.slug}`)
// //                             }}
// //                             className="group flex items-center px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors duration-200"
// //                         >
// //                             <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 group-hover:bg-blue-100 group-hover:text-blue-600 transition-colors">
// //                                 <MapPin className="w-4 h-4" />
// //                             </div>
// //                             <div className="ml-3 flex-1">
// //                                 <div className="font-medium text-gray-900 group-hover:text-blue-700 transition-colors">
// //                                     {city.name}, India
// //                                 </div>
// //                                 <div className="text-xs text-gray-500 mt-0.5">
// //                                     {city.hotelCount} {city.hotelCount === 1 ? 'property' : 'properties'}
// //                                 </div>
// //                             </div>
// //                         </div>
// //                     ))}
// //                 </div>
// //             )}

// //             {/* Separator if both exist */}
// //             {cities.length > 0 && localities.length > 0 && (
// //                 <div className="h-px bg-gray-100 mx-4" />
// //             )}

// //             {/* Localities */}
// //             {localities.length > 0 && (
// //                 <div className="py-2">
// //                     <p className="px-4 py-2 text-xs font-bold text-gray-500 uppercase tracking-wider">
// //                         Localities
// //                     </p>
// //                     {localities.map((loc) => (
// //                         <div
// //                             key={`${loc.citySlug}-${loc.slug}`}
// //                             onClick={() => {
// //                                 onSelect()
// //                                 router.push(
// //                                     `/search?city=${loc.citySlug}&locality=${loc.slug}`
// //                                 )
// //                             }}
// //                             className="group flex items-center px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors duration-200"
// //                         >
// //                             <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 group-hover:bg-blue-100 group-hover:text-blue-600 transition-colors">
// //                                 <Building2 className="w-4 h-4" />
// //                             </div>
// //                             <div className="ml-3 flex-1">
// //                                 <div className="font-medium text-gray-900 group-hover:text-blue-700 transition-colors">
// //                                     {loc.name}, {loc.cityName}
// //                                 </div>
// //                                 <div className="text-xs text-gray-500 mt-0.5">
// //                                     {loc.hotelCount} {loc.hotelCount === 1 ? 'property' : 'properties'}
// //                                 </div>
// //                             </div>
// //                         </div>
// //                     ))}
// //                 </div>
// //             )}
// //         </div>
// //     );
// // }



//V2


// "use client";

// import { MapPin, Building2 } from "lucide-react";
// import { useRouter } from "next/navigation";

// export default function SearchSuggestions({ cities, localities, onSelect }) {
//     const router = useRouter();
//     if (cities.length === 0 && localities.length === 0) return null;

//     return (
//         <div onClick={(e) => e.stopPropagation()} className="absolute top-full left-0 right-0 bg-white border border-gray-100 rounded-2xl shadow-xl mt-3 z-50 overflow-hidden max-h-[400px] overflow-y-auto transform transition-all duration-200">
//             {/* Cities */}
//             {cities.length > 0 && (
//                 <div className="py-2">
//                     <p className="px-4 py-2 text-xs font-bold text-gray-500 uppercase tracking-wider">
//                         Cities
//                     </p>
//                     {cities.map((city) => (
//                         <div
//                             key={city.slug}
//                             onClick={() => {
//                                 onSelect()
//                                 router.push(`/search?city=${city.slug}${category ? `&category=${category}` : ""}`)
//                             }}
//                             className="group flex items-center px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors duration-200"
//                         >
//                             <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 group-hover:bg-blue-100 group-hover:text-blue-600 transition-colors">
//                                 <MapPin className="w-4 h-4" />
//                             </div>
//                             <div className="ml-3 flex-1">
//                                 <div className="font-medium text-gray-900 group-hover:text-blue-700 transition-colors">
//                                     {city.name}, India
//                                 </div>
//                                 <div className="text-xs text-gray-500 mt-0.5">
//                                     {city.hotelCount} {city.hotelCount === 1 ? 'property' : 'properties'}
//                                 </div>
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             )}

//             {/* Separator if both exist */}
//             {cities.length > 0 && localities.length > 0 && (
//                 <div className="h-px bg-gray-100 mx-4" />
//             )}

//             {/* Localities */}
//             {localities.length > 0 && (
//                 <div className="py-2">
//                     <p className="px-4 py-2 text-xs font-bold text-gray-500 uppercase tracking-wider">
//                         Localities
//                     </p>
//                     {localities.map((loc) => (
//                         <div
//                             key={`${loc.citySlug}-${loc.slug}`}
//                             onClick={() => {
//                                 onSelect()
//                                 router.push(
//                                     `/search?city=${loc.citySlug}&locality=${loc.slug}${category ? `&category=${category}` : ""}`
//                                 )
//                             }}
//                             className="group flex items-center px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors duration-200"
//                         >
//                             <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 group-hover:bg-blue-100 group-hover:text-blue-600 transition-colors">
//                                 <Building2 className="w-4 h-4" />
//                             </div>
//                             <div className="ml-3 flex-1">
//                                 <div className="font-medium text-gray-900 group-hover:text-blue-700 transition-colors">
//                                     {loc.name}, {loc.cityName}
//                                 </div>
//                                 <div className="text-xs text-gray-500 mt-0.5">
//                                     {loc.hotelCount} {loc.hotelCount === 1 ? 'property' : 'properties'}
//                                 </div>
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             )}
//         </div>
//     );
// }



//V3





"use client";

import { MapPin, Building2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function SearchSuggestions({ cities, localities, onSelect, setSelectedCitySlug, setSelectedCityName, setSelectedLocalitySlug, setSelectedLocalityName }) {
    const router = useRouter();
    if (cities.length === 0 && localities.length === 0) return null;

    return (
        <div onClick={(e) => e.stopPropagation()} className="absolute top-full left-0 right-0 bg-white border border-gray-100 rounded-2xl shadow-xl mt-3 z-50 overflow-hidden max-h-[400px] overflow-y-auto transform transition-all duration-200">
            {/* Cities */}
            {cities.length > 0 && (
                <div className="py-2">
                    <p className="px-4 py-2 text-xs font-bold text-gray-500 uppercase tracking-wider">
                        Cities
                    </p>
                    {cities.map((city) => (
                        <div
                            key={city.slug}
                            onClick={() => {
                                setSelectedCitySlug(city.slug);
                                setSelectedCityName(city.name);
                                setSelectedLocalitySlug(""); // clear if previously selected
                                setSelectedLocalityName("");
                                onSelect(city.name); // close suggestions
                            }}

                            className="group flex items-center px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors duration-200"
                        >
                            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 group-hover:bg-blue-100 group-hover:text-blue-600 transition-colors">
                                <MapPin className="w-4 h-4" />
                            </div>
                            <div className="ml-3 flex-1">
                                <div className="font-medium text-gray-900 group-hover:text-blue-700 transition-colors">
                                    {city.name}, India
                                </div>
                                <div className="text-xs text-gray-500 mt-0.5">
                                    {city.hotelCount} {city.hotelCount === 1 ? 'property' : 'properties'}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Separator if both exist */}
            {cities.length > 0 && localities.length > 0 && (
                <div className="h-px bg-gray-100 mx-4" />
            )}

            {/* Localities */}
            {localities.length > 0 && (
                <div className="py-2">
                    <p className="px-4 py-2 text-xs font-bold text-gray-500 uppercase tracking-wider">
                        Localities
                    </p>
                    {localities.map((loc) => (
                        <div
                            key={`${loc.citySlug}-${loc.slug}`}
                            onClick={() => {
                                setSelectedCitySlug(loc.citySlug);
                                setSelectedCityName(loc.cityName);
                                setSelectedLocalitySlug(loc.slug);
                                setSelectedLocalityName(loc.name);
                                onSelect(loc.name); // close suggestions
                            }}

                            className="group flex items-center px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors duration-200"
                        >
                            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 group-hover:bg-blue-100 group-hover:text-blue-600 transition-colors">
                                <Building2 className="w-4 h-4" />
                            </div>
                            <div className="ml-3 flex-1">
                                <div className="font-medium text-gray-900 group-hover:text-blue-700 transition-colors">
                                    {loc.name}, {loc.cityName}
                                </div>
                                <div className="text-xs text-gray-500 mt-0.5">
                                    {loc.hotelCount} {loc.hotelCount === 1 ? 'property' : 'properties'}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

