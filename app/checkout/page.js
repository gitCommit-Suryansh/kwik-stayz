"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import BookingSummary from "./components/BookingSummary";
import GuestDetailsForm from "./components/GuestDetailsForm";
import PriceBreakdown from "./components/PriceBreakdown";
import Policies from "./components/Policies";

import { ChevronLeft, Lock } from "lucide-react";

export default function CheckoutPage() {
  const router = useRouter();
  const [payload, setPayload] = useState(null);

  useEffect(() => {
    const stored = sessionStorage.getItem("checkout_payload");

    if (!stored) {
      router.push("/");
      return;
    }

    setPayload(JSON.parse(stored));
  }, [router]);

  if (!payload) return null;

  return (
    <div className="min-h-screen bg-gray-50/50">
      {/* Simple Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-1 text-sm font-semibold text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ChevronLeft size={18} />
            Back
          </button>

          <div className="flex items-center gap-2 text-green-700 bg-green-50 px-3 py-1.5 rounded-full">
            <Lock size={14} />
            <span className="text-xs font-bold uppercase tracking-wide">
              Secure Checkout
            </span>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-5 px-4 py-6">
        {/* LEFT */}
        <div className="lg:col-span-2 space-y-4">
          <BookingSummary payload={payload} />
          <GuestDetailsForm initialValues={payload.guestDetails} />
          <Policies />
        </div>

        {/* RIGHT */}
        <div className="lg:col-span-1">
          <PriceBreakdown pricing={payload.pricing} />
        </div>
      </div>
    </div>
  );
}
