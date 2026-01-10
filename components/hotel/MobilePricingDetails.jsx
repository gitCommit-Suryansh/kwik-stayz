import React from "react";
import { BadgePercent, Plus, Minus, Trash2 } from "lucide-react";

export default function MobilePricingDetails({
  hotel,
  pricingRef,
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

  // Local state for guest details (Mobile only)
  const [fullName, setFullName] = React.useState("");
  const [mobile, setMobile] = React.useState("");
  const [email, setEmail] = React.useState("");

  // Fallback price if calculation fails or not ready
  const displayPrice =
    pricingResult?.pricing?.totalPrice ??
    selectedRoom?.basePrice ??
    hotel.priceStartingFrom;

  const handleBookClick = () => {
    // Pass the collected details to the parent handler
    onBookNow({ fullName, mobile, email });
  };

  return (
    <section ref={pricingRef} className="my-8 md:hidden px-1">
      <div className="bg-white border text-sm border-gray-200 rounded-xl shadow-sm p-4 mb-6">
        <h2 className="text-base font-bold mb-4 text-gray-900 border-b pb-2">Booking Details</h2>

        {/* Date Selection */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">Check-in</label>
            <input
              type="date"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              className="w-full border border-gray-200 bg-gray-50 rounded-lg px-3 py-2 text-sm focus:ring-1 focus:ring-red-500 focus:border-red-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">Check-out</label>
            <input
              type="date"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              className="w-full border border-gray-200 bg-gray-50 rounded-lg px-3 py-2 text-sm focus:ring-1 focus:ring-red-500 focus:border-red-500 outline-none"
            />
          </div>
        </div>

        {/* Room Management */}
        <div className="space-y-4 mb-4">
          <div className="flex justify-between items-center">
            <span className="font-bold text-gray-800">Rooms & Guests</span>
            <span className="text-xs text-gray-500 font-medium">{rooms.length} Room(s)</span>
          </div>

          <div className="space-y-3">
            {rooms.map((room, idx) => (
              <div key={idx} className="bg-white rounded-lg p-3 border border-gray-200">
                <div className="flex justify-between items-center mb-3">
                  <span className="font-semibold text-gray-700">Room {idx + 1}</span>
                  {rooms.length > 1 && (
                    <button onClick={() => removeRoom(idx)} className="text-gray-400 hover:text-red-500">
                      <Trash2 size={16} />
                    </button>
                  )}
                </div>

                {/* Guests */}
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-600 text-xs">Guests (1-{maxGuestsPerRoom})</span>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => updateRoom(idx, "guests", Math.max(1, room.guests - 1))}
                      disabled={room.guests <= 1}
                      className="w-7 h-7 flex items-center justify-center rounded border border-gray-300 bg-white disabled:opacity-50"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="w-4 text-center font-medium">{room.guests}</span>
                    <button
                      type="button"
                      onClick={() => updateRoom(idx, "guests", Math.min(maxGuestsPerRoom, room.guests + 1))}
                      disabled={room.guests >= maxGuestsPerRoom}
                      className="w-7 h-7 flex items-center justify-center rounded border border-gray-300 bg-white disabled:opacity-50"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                </div>

                {/* Extras */}
                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-gray-600 text-xs">Extras (+{maxExtraGuests})</span>
                    <span className="text-[10px] text-gray-400">
                      +₹{selectedRoom ? Math.round((selectedRoom.basePrice * selectedRoom.extraGuestPricing) / 100) : 0}/person
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => updateRoom(idx, "extras", Math.max(0, room.extras - 1))}
                      disabled={room.extras <= 0}
                      className="w-7 h-7 flex items-center justify-center rounded border border-gray-300 bg-white disabled:opacity-50"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="w-4 text-center font-medium">{room.extras}</span>
                    <button
                      type="button"
                      onClick={() => updateRoom(idx, "extras", Math.min(maxExtraGuests, room.extras + 1))}
                      disabled={room.extras >= maxExtraGuests}
                      className="w-7 h-7 flex items-center justify-center rounded border border-gray-300 bg-white disabled:opacity-50"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={addRoom}
            className="w-full py-2 border border-dashed border-red-500 rounded-lg text-sm text-red-600 font-medium hover:bg-red-50 transition-colors"
          >
            + Add Another Room
          </button>
        </div>

        {/* Pricing Summary */}
        {pricingResult && pricingResult.pricing && (
          <div className="mt-4 pt-4 border-t border-dashed border-gray-300 space-y-2">
            <div className="flex justify-between text-gray-600 text-xs">
              <span>Base Price ({pricingResult.nights} nights)</span>
              <span>₹{pricingResult.pricing.basePriceTotal.toLocaleString()}</span>
            </div>
            {pricingResult.pricing.totalExtraGuestCost > 0 && (
              <div className="flex justify-between text-gray-600 text-xs">
                <span>Extra Guest Charges</span>
                <span>₹{pricingResult.pricing.totalExtraGuestCost.toLocaleString()}</span>
              </div>
            )}
            <div className="flex justify-between font-bold text-lg border-t border-gray-100 pt-2 text-gray-900">
              <span>Total Payable</span>
              <span className="text-red-600">₹{pricingResult.pricing.totalPrice.toLocaleString()}</span>
            </div>
          </div>
        )}
      </div>

      <div className="mb-6">
        <div className="bg-blue-50 border border-blue-100 rounded-lg p-3 flex items-center gap-2 text-blue-700">
          <BadgePercent size={18} />
          <span className="text-sm font-semibold">Coupon applied! You saved more with KwikStayz.</span>
        </div>
      </div>


      {/* Your Details Section */}
      <div>
        <h2 className="text-lg font-bold mb-4 text-gray-900">Your details</h2>
        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <div>
            <input
              type="text"
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 text-sm focus:ring-1 focus:ring-red-500 focus:border-red-500 outline-none transition-all placeholder:text-gray-400"
            />
          </div>
          <div className="flex gap-2">
            <div className="flex items-center justify-center px-3 bg-gray-100 border border-gray-300 rounded-lg font-medium text-gray-600 text-sm">
              +91
            </div>
            <input
              type="tel"
              placeholder="Mobile Number"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              className="flex-1 px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 text-sm focus:ring-1 focus:ring-red-500 focus:border-red-500 outline-none transition-all placeholder:text-gray-400"
            />
          </div>
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 text-sm focus:ring-1 focus:ring-red-500 focus:border-red-500 outline-none transition-all placeholder:text-gray-400"
          />

          <button
            type="button"
            onClick={handleBookClick}
            className="w-full py-3.5 rounded-xl font-bold text-lg bg-red-500 text-white hover:bg-red-600 transition-all shadow-md active:scale-[0.98] mt-2"
          >
            Pay ₹{displayPrice.toLocaleString()} & Book
          </button>
        </form>
      </div>
    </section>
  );
}
