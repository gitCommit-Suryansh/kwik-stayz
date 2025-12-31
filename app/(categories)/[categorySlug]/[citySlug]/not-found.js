import Link from "next/link";

export default function CategoryNotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-6 text-center">
      {/* 1. Illustration: Empty Search/Filter Results */}
      <div className="mb-8 opacity-90">
        <svg
          width="200"
          height="160"
          viewBox="0 0 200 160"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Abstract Background Blobs */}
          <circle cx="100" cy="80" r="60" fill="#F3F4F6" />

          {/* The "List/Category" Card */}
          <rect
            x="60"
            y="40"
            width="80"
            height="90"
            rx="8"
            fill="white"
            stroke="#E5E7EB"
            strokeWidth="2"
          />

          {/* Skeleton Lines representing items */}
          <rect x="75" y="60" width="50" height="4" rx="2" fill="#E5E7EB" />
          <rect x="75" y="75" width="30" height="4" rx="2" fill="#E5E7EB" />
          <rect x="75" y="90" width="40" height="4" rx="2" fill="#E5E7EB" />

          {/* Magnifying Glass with Red 'Not Found' State */}
          <circle
            cx="120"
            cy="110"
            r="22"
            fill="white"
            stroke="#374151"
            strokeWidth="2"
          />
          <path
            d="M135 125L145 135"
            stroke="#374151"
            strokeWidth="3"
            strokeLinecap="round"
          />

          {/* The "Cross" inside the glass indicating 0 results */}
          <path
            d="M113 103L127 117"
            stroke="#ef3f3e"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path
            d="M127 103L113 117"
            stroke="#ef3f3e"
            strokeWidth="3"
            strokeLinecap="round"
          />

          {/* Floating 'Filter' Icon showing criteria was applied */}
          <g transform="translate(150, 40)">
            <circle cx="15" cy="15" r="15" fill="#FEF2F2" />
            <path
              d="M10 12H20M12 18H18M8 6H22"
              stroke="#ef3f3e"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </g>
        </svg>
      </div>

      {/* 2. Heading */}
      <h1 className="text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
        No Matches
      </h1>

      {/* 3. Specific Message for Category + City */}
      <h2 className="text-xl font-bold text-gray-800 mb-2">
        No hotels found in this category
      </h2>

      <p className="text-gray-500 font-medium mb-10 max-w-md mx-auto leading-relaxed">
        We couldn't find any hotels matching this specific category or city. Try
        clearing the category filter.
      </p>

      {/* 4. Actions */}
      <div className="w-full max-w-xs flex flex-col gap-3">
        <span className="text-xs text-center text-gray-400 font-bold uppercase tracking-widest mb-1">
          View all options instead
        </span>

        {/* Primary: Browse All in City (Generic Link) */}
        <Link
          href="/hotels"
          className="w-full flex items-center justify-center bg-[#ef3f3e] hover:bg-red-600 text-white text-lg font-bold py-3.5 px-6 rounded shadow-md hover:shadow-lg transition-all duration-200 transform active:scale-95"
        >
          Browse All Hotels
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
