export default function Breadcrumb({ city,cityName,locality,localityName }) {
  return (
    <nav className="text-xs text-gray-500 py-3 flex flex-wrap gap-1" aria-label="Breadcrumb">
      <a href="/" className="hover:text-[#f8a11e]">Home</a>/
      <a href="/hotels" className="hover:text-[#f8a11e]">Hotels</a>/
      <a href={`/hotels/${cityName}`} className="hover:text-[#f8a11e] capitalize">{city}</a>/
      <span className="font-semibold text-gray-800 truncate max-w-[60vw] md:max-w-xs">{locality}</span>
    </nav>
  );
}

