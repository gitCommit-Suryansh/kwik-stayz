import { MapPin, Calendar, Users, Hotel } from "lucide-react";

export default function BookingSummary({ payload }) {
    if (!payload) return null;

    const hotel = payload.hotel || {};
    const roomType = payload.roomType || {};
    const stay = payload.stay || {};
    const rooms = payload.rooms || [];

    const formatDate = (dateStr) => {
        if (!dateStr) return "Select Date";
        const date = new Date(dateStr);
        return isNaN(date.getTime()) ? dateStr : date.toLocaleDateString();
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-5 py-3 border-b border-gray-100 bg-gray-50/50">
                <h2 className="text-base text-xl font-bold text-gray-900 mb-0.5">Booking Summary</h2>
                <p className="text-sm text-gray-500">Review your stay details</p>
            </div>

            <div className="p-5 space-y-4">
                {/* Hotel Info */}
                <div>
                    <h3 className="font-bold text-gray-900 text-lg mb-1">{hotel.name || "Hotel Name"}</h3>
                    <div className="flex items-start gap-2 text-sm text-gray-500">
                        <MapPin size={16} className="mt-0.5 shrink-0" />
                        <p>
                            {[hotel.address.street, hotel.locality, hotel.city].filter(Boolean).join(", ") || "Location"}
                        </p>
                    </div>
                </div>

                <hr className="border-dashed border-gray-200" />

                {/* Dates */}
                <div className="flex items-start gap-3">
                    <Calendar size={18} className="text-gray-400 mt-0.5" />
                    <div className="flex-1">
                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Dates</p>
                        <div className="flex items-center gap-2 text-sm text-gray-900 font-medium">
                            <span>{formatDate(stay.checkIn)}</span>
                            <span className="text-gray-400">→</span>
                            <span>{formatDate(stay.checkOut)}</span>
                        </div>
                        <p className="text-xs text-blue-600 mt-1 font-medium bg-blue-50 inline-block px-2 py-0.5 rounded">
                            {stay.nights || 0} Night{(stay.nights || 0) !== 1 ? "s" : ""}
                        </p>
                    </div>
                </div>

                {/* Room Info */}
                <div className="flex items-start gap-3">
                    <Hotel size={18} className="text-gray-400 mt-0.5" />
                    <div className="flex-1">
                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Room Type</p>
                        <p className="text-sm font-medium text-gray-900">{roomType.name || "Room Selection"}</p>
                    </div>
                </div>

                {/* Guest Breakdown */}
                <div className="bg-gray-50 rounded-lg p-3 space-y-2">
                    <div className="flex items-center gap-2 mb-2">
                        <Users size={16} className="text-gray-500" />
                        <span className="text-sm font-semibold text-gray-700">Guest Distribution</span>
                    </div>
                    {Array.isArray(rooms) && rooms.length > 0 ? (
                        rooms.map((room, i) => (
                            <div key={i} className="flex justify-between text-sm text-gray-600 pl-6">
                                <span>Room {i + 1}</span>
                                <span>
                                    {room.guests || 0} Guest{(room.guests || 0) !== 1 ? "s" : ""}
                                    {room.extras > 0 && <span className="text-gray-400 text-xs ml-1">(+{room.extras} extra)</span>}
                                </span>
                            </div>
                        ))
                    ) : (
                        <p className="text-sm text-gray-500 pl-6">No rooms selected</p>
                    )}
                </div>
            </div>
        </div>
    );
}
