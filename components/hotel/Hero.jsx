import { MapPin, Star } from "lucide-react";
export default function Hero({ hotel }) {
  return (
    <section className="rounded-b-3xl md:shadow-2xl overflow-hidden md:relative min-h-[280px] md:min-h-[500px] lg:min-h-[600px]">
      <div className="w-full h-[280px] md:h-[500px] lg:h-[600px]">
        <img
          src={hotel.heroImage}
          alt={hotel.name}
          className="w-full h-full object-cover object-center"
        />
      </div>

      <div className="hidden md:block absolute inset-0 bg-linear-to-b from-black/20 via-transparent to-black/80"></div>
      <div 
        className="hidden p-6 md:absolute md:inset-0 md:bg-transparent md:flex md:flex-col md:justify-end md:p-12 lg:p-16"
      >
        <div className="max-w-4xl">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-gray-900 md:text-white md:drop-shadow-2xl mb-3">{hotel.name}</h1>
          <div className="flex flex-col md:flex-row flex-wrap gap-x-4 gap-y-2 items-start md:items-center text-base md:text-lg text-gray-700 md:text-gray-100">
            <div className="flex items-center gap-2">
              <MapPin size={20} className="text-[#f8a11e]" />
              <span className="font-medium">{hotel.address.full}</span>
            </div>
            <span className="hidden md:inline">·</span>
            <div className="flex items-center gap-2">
              <Star size={18} className="text-[#f8a11e] fill-[#f8a11e]" />
              <span className="font-semibold">{hotel.rating}</span>
              <span className="text-sm text-gray-500 md:text-gray-300">({hotel.reviewCount.toLocaleString()} reviews)</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

