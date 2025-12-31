import React from "react";
import { Star } from "lucide-react";
export default function SimilarHotels({ hotels }) {
  return (
    <section className="my-12">
      <h2 className="text-xl md:text-3xl font-bold mb-6 text-gray-900">Similar Hotels Nearby</h2>
      <div className="flex gap-4 overflow-x-auto pb-3 snap-x md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-6 md:overflow-visible">
        {hotels.map((h, idx) => (
          <div key={idx} className="min-w-[240px] md:min-w-0 bg-white border-2 border-gray-200 rounded-2xl shadow-lg hover:shadow-xl snap-start transition overflow-hidden">
            <img src={h.image} alt={h.name} className="h-40 w-full object-cover" />
            <div className="p-4 flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <Star size={16} className="text-[#f8a11e] fill-[#f8a11e]" />
                <span className="text-sm font-bold text-gray-900">{h.rating}</span>
              </div>
              <h3 className="font-bold text-base text-gray-900 line-clamp-1">{h.name}</h3>
              <div className="text-xs text-gray-600 mb-2">{h.area}</div>
              <div className="flex items-center justify-between pt-2 border-t border-gray-200">
                <div>
                  <span className="font-bold text-lg text-[#f8a11e]">₹{h.price.toLocaleString()}</span>
                  <span className="text-xs text-gray-500 ml-1">/night</span>
                </div>
                <a href="#" className="px-3 py-1.5 rounded-lg font-semibold bg-[#f8a11e] text-white text-xs hover:bg-[#ffb649] transition shadow-md">View</a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
