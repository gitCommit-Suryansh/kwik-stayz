// app/hotels/[citySlug]/[localitySlug]/loading.js

export default function LocalityHotelsLoading() {
  return (
    <div className="bg-gray-50 min-h-screen animate-pulse">
      {/* ---------------------------------- */}
      {/* 1. STICKY SEARCH BAR SKELETON */}
      {/* ---------------------------------- */}
      <div className="bg-white shadow-sm sticky top-0 z-40 border-b border-gray-200 h-20 w-full mb-6">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 h-full flex items-center">
          <div className="h-12 w-full max-w-2xl bg-gray-100 rounded-lg" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 lg:px-6 py-6">
        {/* ---------------------------------- */}
        {/* 2. BREADCRUMB & HEADER SKELETON */}
        {/* ---------------------------------- */}
        <div className="mb-6 space-y-4">
          {/* Breadcrumb */}
          <div className="h-4 w-48 bg-gray-200 rounded" />

          <div className="flex items-end justify-between">
            <div>
              {/* H1 Title */}
              <div className="h-8 w-64 bg-gray-300 rounded mb-2" />
              {/* Subtitle/Count */}
              <div className="h-4 w-40 bg-gray-200 rounded" />
            </div>

            {/* Sort Dropdown Skeleton */}
            <div className="hidden md:flex gap-3">
              <div className="h-10 w-32 bg-gray-200 rounded-lg" />
              <div className="h-10 w-40 bg-gray-200 rounded-lg" />
            </div>
          </div>
        </div>

        {/* ---------------------------------- */}
        {/* 3. MAIN CONTENT GRID */}
        {/* ---------------------------------- */}
        <div className="flex gap-6">
          {/* LEFT SIDEBAR SKELETON (Hidden on Mobile) */}
          <aside className="hidden lg:block w-72 shrink-0 space-y-6">
            {/* Filter Group 1 */}
            <div className="bg-white p-5 rounded-xl border border-gray-200 h-64">
              <div className="h-5 w-1/2 bg-gray-200 rounded mb-4" />
              <div className="space-y-3">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="h-5 w-5 bg-gray-200 rounded" />
                    <div className="h-4 w-3/4 bg-gray-100 rounded" />
                  </div>
                ))}
              </div>
            </div>
            {/* Filter Group 2 */}
            <div className="bg-white p-5 rounded-xl border border-gray-200 h-40">
              <div className="h-5 w-1/2 bg-gray-200 rounded mb-4" />
              <div className="space-y-3">
                {[1, 2].map((i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="h-5 w-5 bg-gray-200 rounded" />
                    <div className="h-4 w-3/4 bg-gray-100 rounded" />
                  </div>
                ))}
              </div>
            </div>
          </aside>

          {/* RIGHT HOTEL LIST SKELETON */}
          <section className="flex-1 min-w-0 space-y-4">
            {/* Repeat Hotel Cards */}
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="bg-white rounded-xl border border-gray-200 p-4 flex flex-col md:flex-row gap-4 md:gap-6"
              >
                {/* Image Placeholder */}
                <div className="w-full md:w-64 h-48 md:h-44 bg-gray-200 rounded-lg flex-shrink-0" />

                {/* Content Placeholder */}
                <div className="flex-1 flex flex-col justify-between">
                  <div className="space-y-3">
                    {/* Hotel Name */}
                    <div className="h-6 w-3/4 bg-gray-300 rounded" />
                    {/* Location/Distance */}
                    <div className="h-4 w-1/2 bg-gray-100 rounded" />

                    {/* Rating Tags */}
                    <div className="flex gap-2 pt-1">
                      <div className="h-6 w-12 bg-emerald-50 rounded" />
                      <div className="h-6 w-20 bg-gray-100 rounded" />
                    </div>

                    {/* Amenities (pills) */}
                    <div className="flex gap-2 pt-2">
                      <div className="h-5 w-16 bg-gray-100 rounded-full" />
                      <div className="h-5 w-16 bg-gray-100 rounded-full" />
                      <div className="h-5 w-16 bg-gray-100 rounded-full" />
                    </div>
                  </div>

                  {/* Price & Action Area (Bottom) */}
                  <div className="flex items-end justify-between mt-4 md:mt-0 pt-4 md:pt-0 border-t md:border-t-0 border-gray-100">
                    <div>
                      <div className="h-3 w-16 bg-gray-100 rounded mb-1" />
                      <div className="h-7 w-24 bg-gray-800 rounded opacity-20" />
                    </div>
                    <div className="h-10 w-32 bg-emerald-600 rounded-lg opacity-30" />
                  </div>
                </div>
              </div>
            ))}
          </section>
        </div>

        {/* SEO Text Bottom Skeleton */}
        <div className="mt-12 bg-white rounded-xl border border-gray-200 p-6 space-y-4">
          <div className="h-6 w-1/3 bg-gray-200 rounded" />
          <div className="h-4 w-full bg-gray-100 rounded" />
          <div className="h-4 w-5/6 bg-gray-100 rounded" />
          <div className="h-4 w-4/6 bg-gray-100 rounded" />
        </div>
      </div>
    </div>
  );
}
