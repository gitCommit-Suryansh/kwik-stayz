import { calculateBookingPrice } from "../lib/booking/calculateBookingPrice.js";

function runTest(name, params) {
  try {
    const result = calculateBookingPrice(params);
    console.log(`\nTest: ${name}`);
    console.log(`Input:`, JSON.stringify(params, null, 2));
    console.log(`Output Pricing:`, JSON.stringify(result.pricing, null, 2));

    // Validate Integers
    const checks = [
      result.pricing.extraGuestPricePerNight,
      result.pricing.basePriceTotal,
      result.pricing.totalExtraGuestCost,
      result.pricing.totalPrice,
      ...result.pricing.breakdown.map((b) => b.basePrice),
      ...result.pricing.breakdown.map((b) => b.extraCost),
      ...result.pricing.breakdown.map((b) => b.total),
    ];

    const allIntegers = checks.every((val) => Number.isInteger(val));
    if (allIntegers) {
      console.log("PASS: All values are integers.");
    } else {
      console.error("FAIL: Some values are NOT integers!", checks);
      process.exit(1);
    }
  } catch (e) {
    console.error(`Error in test ${name}:`, e.message);
  }
}

// Mock valid roomType
const roomType = {
  basePrice: 801,
  maxGuests: 2,
  maxGuestsWithExtra: 3,
  extraGuestPricing: 35, // 35%
};

// Test 1: Simple
runTest("Simple Integer", {
  roomType: { ...roomType, basePrice: 800 },
  checkIn: "2023-10-01",
  checkOut: "2023-10-02",
  rooms: [{ guests: 2, extras: 0 }],
});

// Test 2: Fractional Extra Cost
// 801 * 0.35 = 280.35 -> Should be 280
runTest("Fractional Extra Cost", {
  roomType: { ...roomType, basePrice: 801 },
  checkIn: "2023-10-01",
  checkOut: "2023-10-02",
  rooms: [{ guests: 3, extras: 1 }],
});

// Test 3: Multiple Nights, Multiple Rooms
runTest("Complex Scenario", {
  roomType: { ...roomType, basePrice: 1550.55 }, // Fractional base price input
  checkIn: "2023-10-01",
  checkOut: "2023-10-04", // 3 nights
  rooms: [
    { guests: 2, extras: 0 },
    { guests: 3, extras: 1 },
  ],
});
