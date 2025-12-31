import React, { useState } from "react";
import { Star } from "lucide-react";
export default function BookingCard({ hotel, selectedRoom }) {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(2);

  const price = selectedRoom ? selectedRoom.price : hotel.minPrice;
  const serviceFee = price * 0.1;
  const totalPrice = price + serviceFee;

  return (
    <div className="hidden lg:block lg:sticky lg:top-24 lg:self-start">
      <div className="bg-white border-2 border-gray-200 rounded-2xl shadow-xl p-6 w-80">
        <div className="mb-6">
          <div className="flex items-baseline gap-2 mb-2">
            <span className="text-3xl font-bold text-red-600">₹{price.toLocaleString()}</span>
            <span className="text-gray-600">/night</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Star size={16} className="text-[#f8a11e] fill-[#f8a11e]" />
            <span className="font-semibold">{hotel.rating}</span>
            <span>・</span>
            <span>{hotel.reviewCount.toLocaleString()} reviews</span>
          </div>
        </div>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Check-in</label>
            <input
              type="date"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              className="w-full border-2 border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-[#f8a11e] focus:border-[#f8a11e] outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Check-out</label>
            <input
              type="date"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              className="w-full border-2 border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-[#f8a11e] focus:border-[#f8a11e] outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Guests</label>
            <input
              type="number"
              min="1"
              value={guests}
              onChange={(e) => setGuests(Number(e.target.value))}
              className="w-full border-2 border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-[#f8a11e] focus:border-[#f8a11e] outline-none"
            />
          </div>
          <button
            type="submit"
            className="w-full py-4 rounded-xl font-bold text-lg bg-[#f8a11e] text-white hover:bg-[#ffb649] transition shadow-lg hover:shadow-xl"
          >
            Check Availability
          </button>
        </form>
        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="space-y-2 text-sm text-gray-600">
            <div className="flex justify-between">
              <span>₹{price.toLocaleString()} x 1 night</span>
              <span>₹{price.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>Service fee</span>
              <span>₹{serviceFee.toFixed(0)}</span>
            </div>
            <div className="flex justify-between font-bold text-lg text-gray-900 pt-2 border-t border-gray-200">
              <span>Total</span>
              <span>₹{totalPrice.toFixed(0)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

