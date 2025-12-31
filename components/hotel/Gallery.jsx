import React, { useState } from "react";
export default function Gallery({ gallery }) {
  const [selectedImage, setSelectedImage] = useState(0);
  return (
    <section className="my-8">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3">
        {gallery.map((img, idx) => (
          <button
            key={idx}
            onClick={() => setSelectedImage(idx)}
            className={`relative overflow-hidden rounded-xl ${
              idx === 0 ? "col-span-2 md:col-span-2 row-span-2" : ""
            } ${selectedImage === idx ? "ring-2 ring-[#f8a11e]" : ""}`}
          >
            <img
              src={img}
              alt={`Gallery ${idx + 1}`}
              className={`w-full h-full object-cover transition-transform ${
                idx === 0 ? "h-48 md:h-80" : "h-24 md:h-36"
              } hover:scale-105`}
            />
          </button>
        ))}
      </div>
    </section>
  );
}

