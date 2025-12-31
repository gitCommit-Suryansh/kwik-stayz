import React, { useState } from "react";
export default function FaqAccordion({ faqs }) {
  const [openIdx, setOpenIdx] = useState(null);
  return (
    <section className="my-8">
      <h2 className="text-xl md:text-3xl font-bold mb-6 text-gray-900">Frequently Asked Questions</h2>
      <div className="divide-y divide-gray-200 bg-white rounded-2xl border-2 border-gray-200 shadow-lg overflow-hidden">
        {faqs.map((f, idx) => (
          <div key={idx}>
            <button
              className="w-full flex items-center justify-between py-4 px-5 md:py-5 md:px-6 text-left text-gray-900 font-bold text-sm md:text-base hover:bg-gray-50 transition focus:outline-none"
              onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
            >
              <span>{f.q}</span>
              <span className={`text-xl md:text-2xl text-[#f8a11e] transform transition-transform ${openIdx === idx ? 'rotate-45' : ''}`}>+</span>
            </button>
            {openIdx === idx && <div className="px-5 pb-4 md:px-6 md:pb-5 text-gray-700 text-sm leading-relaxed bg-gray-50">{f.a}</div>}
          </div>
        ))}
      </div>
    </section>
  );
}
