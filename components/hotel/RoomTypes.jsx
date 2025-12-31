import React from "react";
import { Check } from "lucide-react";
export default function RoomTypes({ roomTypes, selectedRoom, setSelectedRoom }) {
  return (
    <section className="my-8">
      <h2 className="text-xl md:text-3xl font-bold mb-6 text-gray-900">Available Rooms</h2>
      <div className="flex gap-4 pb-4 overflow-x-auto snap-x md:grid md:grid-cols-2 lg:grid-cols-2 md:gap-6 md:overflow-visible" aria-label="Available rooms">
        {roomTypes.map(room => {
          const isSelected = selectedRoom.name === room.name;
          return (
            <div 
              key={room.name} 
              className="relative min-w-[280px] md:min-w-0 bg-white rounded-2xl shadow-lg hover:shadow-xl snap-start flex flex-col transition-all duration-300 overflow-hidden"
            >
              {isSelected && (
                <div className="absolute top-2 left-2 z-10 bg-red-500 rounded-full p-1 text-white shadow-lg">
                  <Check size={14} strokeWidth={3} />
                </div>
              )}
              <img src={room.image} alt={room.name} className="h-40 md:h-48 w-full object-cover" />
              <div className="p-5 flex-1 flex flex-col gap-3">
                <div>
                  <h3 className="font-bold text-base md:text-lg text-gray-900 mb-1">{room.name}</h3>
                  <div className="text-xs md:text-sm text-gray-600 mb-2">{room.beds} ・ Up to {room.occupancy} guests</div>
                  <div className="flex gap-2 text-xs text-gray-600 flex-wrap">
                    {room.amenities.map(a => <span key={a} className="bg-gray-100 rounded-full px-3 py-1 font-medium">{a}</span>)}
                  </div>
                </div>
                <div className="mt-auto pt-3 border-t border-gray-200">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <span className="text-xl md:text-2xl font-bold text-[#f8a11e]">₹{room.price.toLocaleString()}</span>
                      <span className="text-xs md:text-sm text-gray-500 ml-1">/night</span>
                    </div>
                    {room.refundable ? (
                      <span className="text-green-600 text-xs font-semibold bg-green-50 px-2 py-1 rounded-full">Free cancellation</span>
                    ) : (
                      <span className="text-red-600 text-xs font-semibold bg-red-50 px-2 py-1 rounded-full">Non-refundable</span>
                    )}
                  </div>
                  <button 
                    onClick={() => setSelectedRoom(room)}
                    disabled={isSelected}
                    className={`w-full py-3 rounded-xl font-semibold text-center text-sm md:text-base transition active:scale-95 shadow-md hover:shadow-lg
                               ${isSelected 
                                 ? "bg-[#d88c1a] text-white cursor-not-allowed" 
                                 : "bg-[#f8a11e] text-white hover:bg-[#ffb649]"
                               }`}
                  >
                    {isSelected ? "Selected" : "Select"}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

