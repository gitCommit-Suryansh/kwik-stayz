// lib/booking/calculateBookingPrice.js

export function calculateBookingPrice({
  roomType,
  checkIn,
  checkOut,
  rooms = [{ guests: 1, extras: 0 }],
}) {
  if (!roomType) {
    throw new Error("Room type is required");
  }

  if (!checkIn || !checkOut) {
    throw new Error("Check-in and check-out dates are required");
  }

  const checkInDate = new Date(checkIn);
  const checkOutDate = new Date(checkOut);

  const MS_PER_DAY = 1000 * 60 * 60 * 24;
  const nights = Math.ceil((checkOutDate - checkInDate) / MS_PER_DAY);

  if (nights <= 0) {
    throw new Error("Invalid date range");
  }

  const { basePrice, maxGuests, maxGuestsWithExtra, extraGuestPricing } =
    roomType;

  // Validate rooms
  rooms.forEach((room, index) => {
    if (room.guests < 1) {
      throw new Error(`Room ${index + 1} must have at least 1 guest`);
    }

    if (room.guests > maxGuests) {
      throw new Error(`Room ${index + 1} exceeds base guest limit`);
    }

    if (room.extras > maxGuestsWithExtra - maxGuests) {
      throw new Error(`Room ${index + 1} exceeds extra guest limit`);
    }
  });

  // extraGuestPricing is now a flat percentage (e.g., 35)
  const extraGuestPricePerNight = (basePrice * extraGuestPricing) / 100;

  let totalBasePrice = 0;
  let totalExtraGuestCost = 0;
  let totalGuests = 0;
  let totalExtras = 0;

  const breakdown = rooms.map((room, index) => {
    const roomBasePrice = basePrice * nights;
    const roomExtraCost = room.extras * extraGuestPricePerNight * nights;
    const roomTotal = roomBasePrice + roomExtraCost;

    totalBasePrice += roomBasePrice;
    totalExtraGuestCost += roomExtraCost;
    totalGuests += room.guests;
    totalExtras += room.extras;

    return {
      id: index + 1,
      guests: room.guests,
      extras: room.extras,
      basePrice: roomBasePrice,
      extraCost: roomExtraCost,
      total: roomTotal,
    };
  });

  const totalPrice = totalBasePrice + totalExtraGuestCost;

  return {
    valid: true,
    nights,
    totalRooms: rooms.length,
    guests: {
      totalBaseGuests: totalGuests,
      totalExtras: totalExtras,
      total: totalGuests + totalExtras,
    },
    pricing: {
      basePricePerNight: basePrice, // Base price for one room per night
      basePriceTotal: totalBasePrice, // Base price for all rooms for all nights
      extraGuestPricePerNight, // Cost of one extra guest per night
      totalExtraGuestCost,
      totalPrice,
      breakdown, // Individual room details
    },
  };
}
