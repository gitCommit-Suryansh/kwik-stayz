import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-6 text-center">
      {/* 1. Minimal City Illustration (Flat Style) */}
      <div className="mb-8 opacity-90">
        <svg
          width="200"
          height="160"
          viewBox="0 0 200 160"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Background Clouds */}
          <path
            d="M140 50C140 38.9543 131.046 30 120 30C110.88 30 103.242 36.0969 100.866 44.389C98.4284 42.875 95.5562 42 92.5 42C82.835 42 75 49.835 75 59.5C75 60.6766 75.116 61.8227 75.3366 62.929C71.7483 63.9213 68.6111 66.0881 66.4265 69.0494"
            stroke="#E5E7EB"
            strokeWidth="2"
            strokeLinecap="round"
          />

          {/* City Skyline Silhouette */}
          <path
            d="M40 160V110L70 90L100 110V160"
            fill="#F9FAFB"
            stroke="#9CA3AF"
            strokeWidth="2"
          />
          <path
            d="M100 160V70L130 50L160 70V160"
            fill="white"
            stroke="#374151"
            strokeWidth="2"
          />
          <path
            d="M160 160V100L180 90V160"
            fill="#F3F4F6"
            stroke="#9CA3AF"
            strokeWidth="2"
          />
          <path
            d="M20 160V120L40 110V160"
            fill="#F3F4F6"
            stroke="#9CA3AF"
            strokeWidth="2"
          />

          {/* Windows on Main Building */}
          <rect
            x="115"
            y="80"
            width="8"
            height="12"
            rx="1"
            fill="#ef3f3e"
            fillOpacity="0.2"
          />
          <rect
            x="137"
            y="80"
            width="8"
            height="12"
            rx="1"
            fill="#ef3f3e"
            fillOpacity="0.2"
          />
          <rect
            x="115"
            y="105"
            width="8"
            height="12"
            rx="1"
            fill="#ef3f3e"
            fillOpacity="0.2"
          />
          <rect
            x="137"
            y="105"
            width="8"
            height="12"
            rx="1"
            fill="#ef3f3e"
            fillOpacity="0.2"
          />
          <rect
            x="115"
            y="130"
            width="8"
            height="12"
            rx="1"
            fill="#ef3f3e"
            fillOpacity="0.2"
          />
          <rect
            x="137"
            y="130"
            width="8"
            height="12"
            rx="1"
            fill="#ef3f3e"
            fillOpacity="0.2"
          />

          {/* Search Magnifying Glass Icon indicating "Not Found" */}
          <circle
            cx="150"
            cy="130"
            r="15"
            fill="white"
            stroke="#ef3f3e"
            strokeWidth="2"
          />
          <path
            d="M160 140L170 150"
            stroke="#ef3f3e"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M145 130H155"
            stroke="#ef3f3e"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* 2. Consistent "Oops!" Heading */}
      <h1 className="text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
        Oops!
      </h1>

      {/* 3. The Message */}
      <h2 className="text-xl font-bold text-gray-800 mb-2">
        No hotels found in this city
      </h2>
      <p className="text-gray-500 font-medium mb-10 max-w-md mx-auto leading-relaxed">
        The city you’re looking for may not exist, has been renamed, or
        currently has no available hotels.
      </p>

      {/* 4. Action Section (Stacked for Mobile/App feel) */}
      <div className="w-full max-w-xs flex flex-col gap-3">
        <span className="text-xs text-center text-gray-400 font-bold uppercase tracking-widest mb-1">
          Explore elsewhere
        </span>

        {/* Primary Action */}
        <Link
          href="/hotels"
          className="w-full flex items-center justify-center bg-[#ef3f3e] hover:bg-red-600 text-white text-lg font-bold py-3.5 px-6 rounded shadow-md hover:shadow-lg transition-all duration-200 transform active:scale-95"
        >
          Browse All Cities
        </Link>

        {/* Secondary Action */}
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
