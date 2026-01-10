import React from "react";
import { Star, Plus, Minus, Trash2 } from "lucide-react";

export default function BookingCard({
  hotel,
  selectedRoom,
  checkIn,
  setCheckIn,
  checkOut,
  setCheckOut,
  rooms,
  addRoom,
  removeRoom,
  updateRoom,
  pricingResult,
  onBookNow,
}) {
  const maxGuestsPerRoom = selectedRoom?.maxGuests || 2;
  const maxGuestsWithExtra = selectedRoom?.maxGuestsWithExtra || 4;
  const maxExtraGuests = maxGuestsWithExtra - maxGuestsPerRoom;

  return (
    <div className="hidden lg:block lg:sticky lg:top-24 lg:self-start">
      <div className="bg-white border-2 border-gray-200 rounded-2xl shadow-xl p-5 w-80">
        {/* Header */}
        <div className="mb-4">
          <div className="flex items-baseline gap-2 mb-2">
            <span className="text-3xl font-bold text-red-600">
              ₹{pricingResult?.pricing?.totalPrice?.toLocaleString() ?? "..."}
            </span>
            <span className="text-gray-600">/night</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Star size={16} className="text-[#f8a11e] fill-[#f8a11e]" />
            <span className="font-semibold">{hotel.rating}</span>
            <span>・</span>
            <span>{hotel.reviewCount.toLocaleString()} reviews</span>
          </div>
        </div>

        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          {/* Date Pickers */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Check-in
              </label>
              <input
                type="date"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-2 py-1.5 text-sm focus:ring-1 focus:ring-[#f8a11e] outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Check-out
              </label>
              <input
                type="date"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-2 py-1.5 text-sm focus:ring-1 focus:ring-[#f8a11e] outline-none"
              />
            </div>
          </div>

          {/* Rooms List */}
          <div className="space-y-3">
            <div className="flex justify-between items-center pb-2 border-b">
              <span className="font-bold text-gray-800">Rooms & Guests</span>
            </div>

            <div className="max-h-60 overflow-y-auto space-y-3 pr-1">
              {rooms.map((room, idx) => (
                <div
                  key={idx}
                  className="bg-gray-50 rounded-lg p-3 border border-gray-200"
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold text-sm text-gray-700">
                      Room {idx + 1}
                    </span>
                    {rooms.length > 1 && (
                      <button
                        onClick={() => removeRoom(idx)}
                        className="text-red-500 hover:text-red-700 p-1"
                        title="Remove Room"
                      >
                        <Trash2 size={14} />
                      </button>
                    )}
                  </div>

                  {/* Guests Control */}
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-gray-600">Guests (1-{maxGuestsPerRoom})</span>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() =>
                          updateRoom(idx, "guests", Math.max(1, room.guests - 1))
                        }
                        disabled={room.guests <= 1}
                        className="w-6 h-6 flex items-center justify-center rounded border bg-white disabled:opacity-50"
                      >
                        <Minus size={12} />
                      </button>
                      <span className="w-4 text-center text-sm font-medium">
                        {room.guests}
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          updateRoom(idx, "guests", Math.min(maxGuestsPerRoom, room.guests + 1))
                        }
                        disabled={room.guests >= maxGuestsPerRoom}
                        className="w-6 h-6 flex items-center justify-center rounded border bg-white disabled:opacity-50"
                      >
                        <Plus size={12} />
                      </button>
                    </div>
                  </div>

                  {/* Extras Control */}
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className="text-xs text-gray-600">Extras (+{maxExtraGuests})</span>
                      <span className="text-[10px] text-gray-400">
                        ₹{Math.round((selectedRoom.basePrice * selectedRoom.extraGuestPricing) / 100)}/each
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() =>
                          updateRoom(idx, "extras", Math.max(0, room.extras - 1))
                        }
                        disabled={room.extras <= 0}
                        className="w-6 h-6 flex items-center justify-center rounded border bg-white disabled:opacity-50"
                      >
                        <Minus size={12} />
                      </button>
                      <span className="w-4 text-center text-sm font-medium">
                        {room.extras}
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          updateRoom(idx, "extras", Math.min(maxExtraGuests, room.extras + 1))
                        }
                        disabled={room.extras >= maxExtraGuests}
                        className="w-6 h-6 flex items-center justify-center rounded border bg-white disabled:opacity-50"
                      >
                        <Plus size={12} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={addRoom}
              className="w-full py-2 border-2 border-dashed border-gray-300 rounded-lg text-sm text-gray-600 font-medium hover:border-[#f8a11e] hover:text-[#f8a11e] transition-colors"
            >
              + Add Room
            </button>
          </div>

          {/* Book Button */}
          <button
            onClick={onBookNow}
            className="w-full py-3 rounded-xl font-bold text-lg bg-[#f8a11e] hover:bg-[#ffb649] text-white shadow-md transition-all active:scale-95"
          >
            Book Now
          </button>
        </form>

        {/* Pricing Summary */}
        {pricingResult && pricingResult.pricing && (
          <div className="mt-4 pt-4 border-t border-gray-200 text-sm space-y-2">
            <div className="flex justify-between text-gray-600">
              <span>
                Total Rooms
              </span>
              <span>{pricingResult.totalRooms}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>
                Total Guests
              </span>
              <span>
                {pricingResult.guests.total} ({pricingResult.guests.totalBaseGuests} + {pricingResult.guests.totalExtras} extra)
              </span>
            </div>

            <div className="flex justify-between mb-1">
              <span>
                Base Price ({pricingResult.nights} nights)
              </span>
              <span>₹{pricingResult.pricing.basePriceTotal.toLocaleString()}</span>
            </div>

            {pricingResult.pricing.totalExtraGuestCost > 0 && (
              <div className="flex justify-between text-gray-600">
                <span>Extra Guest Charges</span>
                <span>
                  ₹{pricingResult.pricing.totalExtraGuestCost.toLocaleString()}
                </span>
              </div>
            )}

            <div className="flex justify-between font-bold text-lg border-t pt-2 text-gray-800">
              <span>Total Amount</span>
              <span>₹{pricingResult.pricing.totalPrice.toLocaleString()}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
