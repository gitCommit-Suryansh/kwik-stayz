export default function AmenitiesGrid({ amenities }) {
  return (
    <section className="my-8">
      <h2 className="text-xl md:text-3xl font-bold mb-6 text-gray-900">Amenities</h2>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-3">
        {amenities.map(am => (
          <div 
            key={am}
            className="flex items-center gap-3 text-gray-700 md:bg-gradient-to-br md:from-gray-50 md:to-gray-100 md:border-2 md:border-gray-200 md:rounded-xl md:px-4 md:py-3 md:shadow-sm md:hover:shadow-md md:transition"
          >
            {/* <am.icon size={20} className="text-[#f8a11e] flex-shrink-0" /> */}
            <span className="text-sm font-medium">{am}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
