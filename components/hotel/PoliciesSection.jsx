export default function PoliciesSection({ policies }) {
  return (
    <section className="my-8">
      <h2 className="text-xl md:text-3xl font-bold mb-6 text-gray-900">Policies</h2>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {policies.map(p => (
          <div 
            key={p.title}
            className="flex items-center gap-3 text-gray-700 md:py-4 md:px-5 md:bg-gradient-to-br md:from-gray-50 md:to-gray-100 md:border-2 md:border-gray-200 md:rounded-xl md:shadow-sm md:hover:shadow-md md:transition"
          >
            <p.icon size={20} className="text-[#f8a11e] flex-shrink-0" />
            <div className="md:hidden">
              <span className="text-sm">{p.title}: {p.value}</span>
            </div>
            <div className="hidden md:block">
              <span className="font-bold text-gray-900">{p.title}:</span>
              <span className="ml-2">{p.value}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
