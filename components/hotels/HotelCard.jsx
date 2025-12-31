import { Star, Wifi, Utensils, MapPin, Users, Sparkles } from "lucide-react";

export default function HotelCard({ hotel }) {
  // Calculate discount percentage (mock - you can pass real data)
  const originalPrice = Math.round(hotel.priceStartingFrom * 1.3);
  const discount = Math.round(((originalPrice - hotel.priceStartingFrom) / originalPrice) * 100);

  return (
    <a
      href={`/hotel/${hotel.slug}`}
      className="group flex bg-white rounded-xl shadow-sm overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 w-full border border-gray-100"
    >
      {/* Image Section with Badge */}
      <div className="relative w-2/5 flex-shrink-0">
        <img
          src={hotel.heroImage}
          alt={`${hotel.name} hotel in ${hotel.locality.name}, ${hotel.city.name}`}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />

        {/* Company-Serviced Badge */}
        <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-md flex items-center gap-1.5">
          <Sparkles size={14} className="text-emerald-600" />
          <span className="text-xs font-semibold text-gray-800">Premium Stay</span>
        </div>

        {/* Recent Bookings Badge */}
        {hotel.reviewCount > 50 && (
          <div className="absolute bottom-3 left-3 bg-rose-500 text-white px-2.5 py-1 rounded-md shadow-lg flex items-center gap-1">
            <Users size={12} />
            <span className="text-xs font-medium">Popular</span>
          </div>
        )}

        {/* Image Gallery Indicators */}
        <div className="absolute bottom-3 right-3 flex gap-1">
          {hotel.gallery.slice(0, 3).map((_, idx) => (
            <div key={idx} className="w-1.5 h-1.5 rounded-full bg-white/60 backdrop-blur-sm" />
          ))}
        </div>
      </div>

      {/* Content Section */}
      <div className="flex-1 p-5 flex flex-col justify-between">
        {/* Header */}
        <div>
          <div className="flex items-start justify-between gap-3 mb-2">
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-bold text-gray-900 mb-1 line-clamp-1 group-hover:text-emerald-600 transition-colors">
                {hotel.name}
              </h3>
              <div className="flex items-center gap-1.5 text-gray-600">
                <MapPin size={14} className="flex-shrink-0 text-gray-400" />
                <p className="text-sm truncate">
                  {hotel.locality.name}, {hotel.city.name}
                </p>
              </div>
            </div>

            {/* Rating Badge */}
            <div className="flex flex-col items-end">
              <div className="flex items-center gap-1 bg-emerald-50 px-2.5 py-1 rounded-lg">
                <Star size={14} className="fill-emerald-500 text-emerald-500" />
                <span className="text-sm font-bold text-emerald-700">
                  {(hotel.rating / 10).toFixed(1)}
                </span>
              </div>
              <span className="text-xs text-gray-500 mt-1">
                ({hotel.reviewCount} reviews)
              </span>
            </div>
          </div>

          {/* Amenities */}
          <div className="flex items-center gap-2 mt-3 flex-wrap">
            {hotel.hotelAmenities.slice(0, 3).map((amenity, idx) => {
              // Icon mapping
              const getAmenityIcon = (amenity) => {
                const lowerAmenity = amenity.toLowerCase();
                if (lowerAmenity.includes('wifi') || lowerAmenity.includes('internet')) {
                  return <Wifi size={13} className="text-emerald-600" />;
                }
                if (lowerAmenity.includes('food') || lowerAmenity.includes('restaurant')) {
                  return <Utensils size={13} className="text-emerald-600" />;
                }
                return null;
              };

              const icon = getAmenityIcon(amenity);

              return (
                <div
                  key={idx}
                  className="flex items-center gap-1.5 bg-gray-50 px-2.5 py-1.5 rounded-lg border border-gray-100"
                >
                  {icon}
                  <span className="text-xs font-medium text-gray-700">{amenity}</span>
                </div>
              );
            })}
            {hotel.hotelAmenities.length > 3 && (
              <span className="text-xs font-medium text-emerald-600 px-2">
                +{hotel.hotelAmenities.length - 3} more
              </span>
            )}
          </div>
        </div>

        {/* Footer - Price and CTA */}
        <div className="flex items-end justify-between mt-4 pt-4 border-t border-gray-100">
          <div className="flex flex-col">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-gray-900">
                ₹{hotel.priceStartingFrom.toLocaleString('en-IN')}
              </span>
              <span className="text-sm text-gray-400 line-through">
                ₹{originalPrice.toLocaleString('en-IN')}
              </span>
              {discount > 0 && (
                <span className="text-xs font-semibold text-rose-500 bg-rose-50 px-2 py-0.5 rounded">
                  {discount}% off
                </span>
              )}
            </div>
            <p className="text-xs text-gray-500 mt-0.5">
              + ₹100 taxes & fees · per room per night
            </p>
          </div>

          <button className="px-6 py-2.5 rounded-lg bg-gradient-to-r from-emerald-500 to-emerald-600 text-white text-sm font-semibold hover:from-emerald-600 hover:to-emerald-700 transition-all duration-300 shadow-md hover:shadow-lg active:scale-95 whitespace-nowrap">
            Book Now
          </button>
        </div>
      </div>
    </a>
  );
}