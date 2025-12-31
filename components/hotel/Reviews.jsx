import { Star } from "lucide-react";
export default function Reviews({ reviews }) {
  return (
    <section className="my-8">
      <h2 className="text-xl md:text-3xl font-bold mb-6 text-gray-900">Guest Reviews</h2>
      {reviews.length === 0 ? (
        <p className="text-gray-600">No reviews yet.</p>
      ) : (
        <div className="flex flex-col gap-6">
          {reviews.map((r, idx) => (
            <div 
              key={idx} 
              className="flex gap-3 items-start border-b border-gray-200 pb-6 md:bg-gradient-to-br md:from-white md:to-gray-50 md:border-2 md:rounded-2xl md:shadow-md md:p-6 md:gap-5 md:hover:shadow-lg md:transition md:pb-6"
            >
              <img
                src={r.avatar}
                alt={r.name}
                className="w-10 h-10 rounded-full border-2 border-[#f8a11e] shadow-sm md:w-14 md:h-14 md:shadow-md"
              />
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-2">
                  <span className="font-bold text-sm md:text-base text-gray-900">{r.name}</span>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={16} className={i < r.rating ? "text-[#f8a11e] fill-[#f8a11e]" : "text-gray-300"} />
                    ))}
                  </div>
                  <span className="text-xs md:text-sm text-gray-500">{r.date}</span>
                </div>
                <div className="text-gray-700 text-sm leading-relaxed">{r.text}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
