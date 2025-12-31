import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-6 text-center">
      {/* 1. Map & Location Illustration */}
      <div className="mb-8 opacity-90">
        <svg
          width="200"
          height="160"
          viewBox="0 0 200 160"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Abstract Map Background (Roads) */}
          <path
            d="M40 140C60 140 70 120 90 120C110 120 120 140 140 140"
            stroke="#E5E7EB"
            strokeWidth="12"
            strokeLinecap="round"
          />
          <path
            d="M160 40C140 40 130 60 110 60C90 60 80 40 60 40"
            stroke="#E5E7EB"
            strokeWidth="12"
            strokeLinecap="round"
          />
          <path
            d="M100 20V140"
            stroke="#F3F4F6"
            strokeWidth="12"
            strokeLinecap="round"
          />

          {/* Dashed Search Area circle */}
          <circle
            cx="100"
            cy="80"
            r="45"
            stroke="#9CA3AF"
            strokeWidth="2"
            strokeDasharray="6 6"
            fill="white"
            fillOpacity="0.5"
          />

          {/* The "Location Pin" with OYO Red */}
          <path
            d="M100 110C100 110 120 85 120 70C120 58.9543 111.046 50 100 50C88.9543 50 80 58.9543 80 70C80 85 100 110 100 110Z"
            fill="#ef3f3e"
          />
          <circle cx="100" cy="70" r="8" fill="white" />

          {/* Question Mark to indicate 'Unknown' */}
          <path
            d="M135 45L145 35"
            stroke="#ef3f3e"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M65 45L55 35"
            stroke="#ef3f3e"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* 2. Consistent Heading Style */}
      <h1 className="text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
        Uh-oh!
      </h1>

      {/* 3. Specific Area Message */}
      <h2 className="text-xl font-bold text-gray-800 mb-2">
        No hotels in this area
      </h2>

      <p className="text-gray-500 font-medium mb-10 max-w-md mx-auto leading-relaxed">
        The locality you’re looking for may not exist, has been renamed, or
        currently has no available hotels.
      </p>

      {/* 4. Actions */}
      <div className="w-full max-w-xs flex flex-col gap-3">
        <span className="text-xs text-center text-gray-400 font-bold uppercase tracking-widest mb-1">
          Try a different spot
        </span>

        {/* Primary: Search Nearby */}
        <Link
          href="/hotels"
          className="w-full flex items-center justify-center bg-[#ef3f3e] hover:bg-red-600 text-white text-lg font-bold py-3.5 px-6 rounded shadow-md hover:shadow-lg transition-all duration-200 transform active:scale-95"
        >
          Search Nearby Areas
        </Link>

        {/* Secondary: Home */}
        <Link
          href="/"
          className="w-full flex items-center justify-center bg-white border border-gray-200 text-gray-600 font-semibold py-3.5 px-6 rounded hover:bg-gray-50 transition-colors"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
}
