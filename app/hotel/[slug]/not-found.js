import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-6 text-center">
      {/* 1. Minimal Illustration (Flat Style) */}
      <div className="mb-8 opacity-90">
        <svg
          width="200"
          height="160"
          viewBox="0 0 200 160"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Simple City Skyline Background */}
          <path d="M40 160V100L80 70L120 100V160" fill="#F3F4F6" />
          <path d="M10 160V120L40 100V160" fill="#E5E7EB" />
          <path d="M120 160V90L160 60L190 90V160" fill="#E5E7EB" />

          {/* Main Hotel Building */}
          <rect
            x="65"
            y="60"
            width="70"
            height="100"
            rx="4"
            fill="white"
            stroke="#374151"
            strokeWidth="2"
          />
          <path
            d="M65 60L100 35L135 60"
            stroke="#374151"
            strokeWidth="2"
            fill="white"
          />

          {/* Windows (Simple grids) */}
          <rect
            x="75"
            y="75"
            width="10"
            height="10"
            fill="#ef3f3e"
            fillOpacity="0.2"
          />
          <rect
            x="95"
            y="75"
            width="10"
            height="10"
            fill="#ef3f3e"
            fillOpacity="0.2"
          />
          <rect
            x="115"
            y="75"
            width="10"
            height="10"
            fill="#ef3f3e"
            fillOpacity="0.2"
          />

          <rect
            x="75"
            y="95"
            width="10"
            height="10"
            fill="#ef3f3e"
            fillOpacity="0.2"
          />
          <rect
            x="95"
            y="95"
            width="10"
            height="10"
            fill="#ef3f3e"
            fillOpacity="0.2"
          />
          <rect
            x="115"
            y="95"
            width="10"
            height="10"
            fill="#ef3f3e"
            fillOpacity="0.2"
          />

          {/* Door with 'Closed' or 'Empty' feel */}
          <rect x="90" y="130" width="20" height="30" fill="#374151" />
        </svg>
      </div>

      {/* 2. The "Oh!" Heading */}
      <h1 className="text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
        Oh!
      </h1>

      {/* 3. The Specific Message */}
      <p className="text-lg text-gray-500 font-medium mb-12 max-w-sm mx-auto leading-relaxed">
        The property you are looking for is not available right now.
      </p>

      {/* 4. Action Section (Clean & Direct) */}
      <div className="w-full max-w-xs flex flex-col items-center gap-3">
        <span className="text-sm text-gray-400 font-semibold uppercase tracking-wider">
          Book your next stay here:
        </span>

        <Link
          href="/"
          className="w-full bg-[#ef3f3e] hover:bg-red-600 text-white text-lg font-bold py-3.5 px-6 rounded shadow-md hover:shadow-lg transition-all duration-200 transform active:scale-95"
        >
          Go To Homepage
        </Link>
      </div>
    </div>
  );
}
