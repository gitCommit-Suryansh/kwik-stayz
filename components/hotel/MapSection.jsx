import { MapPin } from "lucide-react";

export default function MapSection({ geo, nearby = [] }) {
  if (!geo?.lat || !geo?.lng) return null;

  const mapSrc = `https://www.google.com/maps?q=${geo.lat},${geo.lng}&z=15&output=embed`;

  return (
    <section className="my-8">
      <h2 className="text-xl md:text-3xl font-bold mb-6 text-gray-900">
        Location & Nearby
      </h2>

      <div className="flex gap-6 flex-col lg:flex-row">
        {/* REAL MAP */}
        <div className="w-full lg:w-96 lg:h-64 h-64 rounded-2xl overflow-hidden border-2 border-gray-200 shadow-lg">
          <iframe
            src={mapSrc}
            width="100%"
            height="100%"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full h-full"
            allowFullScreen
          />
        </div>

        {/* NEARBY PLACES */}
        <ul className="flex-1 text-gray-700 text-sm grid grid-cols-2 gap-x-4 gap-y-3 md:flex md:flex-col md:gap-3">
          {nearby.map((place, idx) => (
            <li
              key={idx}
              className="flex items-center gap-3 md:py-2 md:px-4 md:bg-gray-50 md:border md:border-gray-200 md:rounded-lg md:hover:bg-gray-100 md:transition"
            >
              <MapPin size={18} className="text-[#f8a11e] flex-shrink-0" />
              <span className="font-medium text-sm">{place}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
