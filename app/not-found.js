import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-6 text-center">
      {/* 1. Global 404 Illustration */}
      <div className="mb-8 opacity-90">
        <svg
          width="240"
          height="160"
          viewBox="0 0 240 160"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* The giant 404 Text Background */}
          <text
            x="50%"
            y="50%"
            dominantBaseline="middle"
            textAnchor="middle"
            fontSize="120"
            fontWeight="900"
            fill="#F3F4F6"
            dy="20"
          >
            404
          </text>

          {/* A playful 'disconnect' line */}
          <path
            d="M40 140C80 140 80 100 120 100C160 100 160 60 200 60"
            stroke="#E5E7EB"
            strokeWidth="4"
            strokeDasharray="10 10"
          />

          {/* Connection Points */}
          <circle cx="40" cy="140" r="6" fill="#9CA3AF" />
          <circle cx="200" cy="60" r="6" fill="#ef3f3e" />

          {/* The "Lost" Indicator Icon */}
          <g transform="translate(100, 80)">
            <circle
              cx="20"
              cy="20"
              r="20"
              fill="white"
              stroke="#ef3f3e"
              strokeWidth="2"
            />
            <path
              d="M20 10V22"
              stroke="#ef3f3e"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <circle cx="20" cy="28" r="2" fill="#ef3f3e" />
          </g>
        </svg>
      </div>

      {/* 2. Heading */}
      <h1 className="text-4xl font-extrabold text-gray-900 mb-2 tracking-tight">
        Page Not Found
      </h1>

      {/* 3. Description */}
      <p className="text-gray-500 font-medium mb-10 max-w-sm mx-auto leading-relaxed">
        We can't seem to find the page you're looking for. It might have been
        removed or the link is broken.
      </p>

      {/* 4. Single Clear Action */}
      <div className="w-full max-w-xs flex flex-col gap-4">
        <Link
          href="/"
          className="w-full flex items-center justify-center bg-[#ef3f3e] hover:bg-red-600 text-white text-lg font-bold py-3.5 px-6 rounded shadow-md hover:shadow-lg transition-all duration-200 transform active:scale-95"
        >
          Back to Homepage
        </Link>

        {/* Optional Secondary Link for global nav */}
        <Link
          href="/contact"
          className="text-sm text-gray-400 hover:text-gray-600 font-semibold transition-colors"
        >
          Report a Problem
        </Link>
      </div>
    </div>
  );
}
