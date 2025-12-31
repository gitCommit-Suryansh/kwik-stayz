import React from "react";
import { BadgePercent } from "lucide-react";
export default function MobilePricingDetails({ hotel, pricingRef, selectedRoom }) {
  const price = selectedRoom ? selectedRoom.price : hotel.priceStartingFrom;
  const originalPrice = selectedRoom ? selectedRoom.originalPrice : hotel.priceStartingFrom;
  return (
    <section ref={pricingRef} className="my-8 md:hidden">
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-4 text-gray-900">Pricing details</h2>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-700">Price to pay</span>
            <div className="flex items-baseline gap-2">
              <span className="text-sm text-gray-500 line-through">₹{originalPrice.toLocaleString()}</span>
              <span className="text-lg font-bold text-gray-900">₹{price.toLocaleString()}</span>
            </div>
          </div>
          <button className="flex items-center gap-2 text-sm font-bold text-blue-600">
            <BadgePercent size={18} />
            Apply coupon
          </button>
          <a href="#" className="text-sm font-semibold text-blue-600">More offers</a>
        </div>
      </div>
      <div>
        <h2 className="text-xl font-bold mb-4 text-gray-900">Your booking details</h2>
        <form className="space-y-4">
          <div>
            <label htmlFor="full-name" className="block text-sm font-medium text-gray-700 mb-1">Full name</label>
            <input 
              type="text" 
              id="full-name" 
              placeholder="First name and last name" 
              className="w-full border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500" 
            />
          </div>
          <div>
            <label htmlFor="mobile-number" className="block text-sm font-medium text-gray-700 mb-1">Mobile number</label>
            <div className="flex">
              <span className="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-gray-300 bg-gray-50 text-gray-600 text-sm">
                +91
              </span>
              <input 
                type="tel" 
                id="mobile-number" 
                placeholder="Enter mobile number" 
                className="w-full border-gray-300 rounded-r-lg shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500" 
              />
            </div>
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email address</label>
            <input 
              type="email" 
              id="email" 
              placeholder="abc@xyz.com" 
              className="w-full border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500" 
            />
          </div>
          <button
            type="submit"
            className="w-full py-3.5 rounded-lg font-semibold text-lg bg-red-500 text-white hover:bg-red-600 transition shadow-lg hover:shadow-xl active:scale-95"
          >
            Book now & pay at hotel
          </button>
        </form>
      </div>
    </section>
  );
}
