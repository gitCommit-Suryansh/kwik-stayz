// app/hotel/loading.js
export default function HotelLoading() {
  return (
    <div className="font-sans bg-gray-50 min-h-screen pb-20 md:pb-0 animate-pulse">
      {/* 1. Header/Hero Skeleton */}
      <div className="max-w-7xl mx-auto">
        <div className="bg-gray-200 rounded-b-2xl md:rounded-2xl mt-0 md:mt-8 h-64 md:h-[450px] w-full" />
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-8 px-4 md:px-6 mt-6 md:mt-8">
          {/* LEFT COLUMN: Main Content */}
          <div className="flex-1 bg-white rounded-2xl shadow-lg p-6 md:p-8 -mt-16 md:mt-0 relative z-10 border border-gray-100">
            {/* Breadcrumb & Title */}
            <div className="h-4 w-32 bg-gray-200 rounded mb-4" />
            <div className="h-8 w-3/4 bg-gray-300 rounded mb-2" />
            <div className="h-4 w-1/2 bg-gray-200 rounded mb-8" />

            {/* Quick Amenities (Icons) */}
            <div className="flex gap-4 mb-8">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-16 w-16 rounded-xl bg-gray-100" />
              ))}
            </div>

            {/* Gallery Grid Skeleton */}
            <div className="grid grid-cols-4 gap-2 mb-8 h-48 md:h-64 rounded-xl overflow-hidden">
              <div className="col-span-4 md:col-span-2 bg-gray-200 h-full" />
              <div className="hidden md:block col-span-1 bg-gray-200 h-full" />
              <div className="hidden md:block col-span-1 space-y-2 h-full">
                <div className="bg-gray-200 h-[48%]" />
                <div className="bg-gray-200 h-[48%]" />
              </div>
            </div>

            {/* Room Types Skeleton */}
            <div className="mb-8">
              <div className="h-6 w-40 bg-gray-200 rounded mb-4" />
              <div className="space-y-4">
                {[1, 2].map((i) => (
                  <div
                    key={i}
                    className="border border-gray-100 rounded-xl p-4 flex gap-4"
                  >
                    <div className="h-24 w-24 bg-gray-200 rounded-lg flex-shrink-0" />
                    <div className="flex-1 space-y-2">
                      <div className="h-5 w-1/3 bg-gray-300 rounded" />
                      <div className="h-3 w-2/3 bg-gray-100 rounded" />
                      <div className="h-3 w-1/2 bg-gray-100 rounded" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Description/About Skeleton */}
            <div className="space-y-3 mb-8">
              <div className="h-4 w-full bg-gray-100 rounded" />
              <div className="h-4 w-full bg-gray-100 rounded" />
              <div className="h-4 w-2/3 bg-gray-100 rounded" />
            </div>

            {/* Amenities Grid Skeleton */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-gray-200" />
                  <div className="h-4 w-24 bg-gray-100 rounded" />
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT COLUMN: Booking Card (Sticky) */}
          <div className="hidden lg:block w-[380px] flex-shrink-0">
            <div className="sticky top-24 bg-white rounded-2xl shadow-lg p-6 border border-gray-100 h-[400px]">
              <div className="flex justify-between items-start mb-6">
                <div className="space-y-2">
                  <div className="h-4 w-20 bg-gray-200 rounded" />
                  <div className="h-8 w-32 bg-gray-300 rounded" />
                </div>
                <div className="h-10 w-16 bg-gray-200 rounded-lg" />
              </div>

              {/* Date Inputs */}
              <div className="h-12 w-full bg-gray-100 rounded-lg mb-4" />
              <div className="h-12 w-full bg-gray-100 rounded-lg mb-6" />

              {/* Button */}
              <div className="h-14 w-full bg-gray-800 rounded-xl opacity-20 mb-4" />

              <div className="flex justify-between text-sm">
                <div className="h-3 w-20 bg-gray-100 rounded" />
                <div className="h-3 w-20 bg-gray-100 rounded" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Sticky Booking Bar Skeleton */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 flex justify-between items-center z-50">
        <div className="space-y-1">
          <div className="h-4 w-20 bg-gray-200 rounded" />
          <div className="h-6 w-24 bg-gray-300 rounded" />
        </div>
        <div className="h-12 w-32 bg-gray-800 rounded-lg opacity-20" />
      </div>
    </div>
  );
}
