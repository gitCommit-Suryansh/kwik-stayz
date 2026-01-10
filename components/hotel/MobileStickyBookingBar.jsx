import React from "react";
export default function MobileStickyBookingBar({ hotel, isVisible, selectedRoom, onBookNow }) {
  const price = selectedRoom ? selectedRoom.basePrice : hotel.minPrice;
  const originalPrice = selectedRoom ? selectedRoom.originalPrice : hotel.originalPrice;
  return (
    <div
      className={`md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white shadow-[0_-2px_8px_rgba(0,0,0,0.1)] p-4 transition-transform duration-300 ease-in-out
                  ${isVisible ? 'translate-y-0' : 'translate-y-full'}`}
    >
      <div className="flex justify-between items-center">
        <div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-gray-900">₹{price.toLocaleString()}</span>
            <span className="text-base text-gray-500 line-through">₹{originalPrice.toLocaleString()}</span>
          </div>
          <span className="text-sm font-semibold text-blue-600">+ ₹{hotel.taxes} taxes & fees</span>
        </div>
        <button
          type="button"
          onClick={onBookNow}
          className="w-1/2 py-3.5 rounded-lg font-semibold text-lg bg-red-500 text-white hover:bg-red-600 transition shadow-lg active:scale-95"
        >
          Book now
        </button>
      </div>
    </div>
  );
}
