import { getAmenityIcon } from "./amenityUtils";

export default function QuickAmenities({ hotel }) {
  return (
    <section className="hidden md:flex my-6 md:gap-3 md:flex-wrap">
      {hotel.hotelAmenities.slice(0, 8).map((am, idx) => {
        const Icon = getAmenityIcon(am);
        return (
          <span
            key={idx}
            className="flex gap-2 items-center text-gray-700 bg-gray-50 border border-gray-200 rounded-lg px-3 py-1.5 text-sm font-medium"
          >
            <Icon size={16} className="text-gray-500" />
            {am}
          </span>
        );
      })}
    </section>
  );
}


