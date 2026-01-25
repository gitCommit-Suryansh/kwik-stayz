import { Star } from "lucide-react";
import CategoryBadge from "./CategoryBadge";
export default function MobileHotelInfo({ hotel }) {
  return (
    <div className="lg:hidden px-1 pt-2 pb-3">
      <div className="flex flex-wrap items-center gap-2 mb-3">
        <CategoryBadge categories={hotel.categories} />
      </div>
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
      <div className="text-sm text-gray-700 leading-relaxed mb-3">
        {hotel.address.full}
      </div>
      <a
        href="#map-section"
        onClick={(e) => {
          e.preventDefault();
          const element = document.getElementById('map-section');
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }}
        className="text-sm font-bold text-blue-600 hover:underline"
      >
        View on map
      </a>
    </div>
  );
}
