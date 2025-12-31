import { Building, Star } from "lucide-react";
export default function MobileHotelInfo({ hotel }) {
  return (
    <div className="md:hidden px-1 pt-2 pb-6">
      <span className="inline-flex items-center gap-2 bg-gray-100 text-gray-800 text-xs font-semibold px-3 py-1.5 rounded-lg mb-3">
        <Building size={16} />
        Company-Serviced
      </span>
      <h1 className="text-2xl font-bold text-gray-900 mb-2 leading-tight">
        {hotel.name}
      </h1>
      <div className="flex items-center gap-2 mb-2">
        <Star size={16} className="text-red-500 fill-red-500" />
        <span className="font-bold text-gray-800">{hotel.rating}</span>
        <span className="text-sm text-gray-500">({hotel.reviewCount.toLocaleString()} ratings)</span>
      </div>
      <div className="flex items-center gap-2 text-sm text-gray-700 mb-4">
        <Star size={14} className="text-gray-400" />
        <span><span className="font-bold">5.0</span> · Check-in rating <span className="font-bold">Delightful experience</span></span>
      </div>
      <div className="text-xs text-gray-700 leading-relaxed mb-3">
        {hotel.address.full}
      </div>
      <a href="#" className="text-sm font-bold text-blue-600 hover:underline">
        View on map
      </a>
    </div>
  );
}
