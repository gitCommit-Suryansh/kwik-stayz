import React from "react";
export default function QuickAmenities({ hotel }) {
  return (
    <section className="hidden md:flex my-6 md:gap-3 md:flex-wrap">
      {hotel.hotelAmenities.map((am, idx) => (

        <span
          key={idx}
          className="flex gap-3 items-center text-gray-800 text-base md:bg-gradient-to-r md:from-gray-50 md:to-gray-100 md:border md:border-gray-200 md:rounded-full md:px-4 md:py-2 md:text-sm md:font-medium md:shadow-sm"
        >
          {/* <am.icon size={20} className="text-[#f8a11e] flex-shrink-0" /> {am} */}
          {am}
        </span>
      ))}
    </section>
  );
}

