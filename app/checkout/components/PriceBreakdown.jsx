import { ShieldCheck, Zap } from "lucide-react";

export default function PriceBreakdown({ pricing }) {
    // Default values to prevent crashes if pricing data is missing
    const safePricing = pricing || {
        basePriceTotal: 0,
        totalExtraGuestCost: 0,
        totalPrice: 0,
    };

    return (
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-5 sticky top-24">
            <h2 className="text-lg font-bold mb-4 text-gray-900">Price Details</h2>

            <div className="space-y-2 text-sm text-gray-700">
                <div className="flex justify-between">
                    <span className="text-gray-600">Base Price</span>
                    <span className="font-medium">₹{safePricing.basePriceTotal.toLocaleString()}</span>
                </div>

                {safePricing.totalExtraGuestCost > 0 && (
                    <div className="flex justify-between text-red-600">
                        <span>Extra Guest Charges</span>
                        <span className="font-medium">+ ₹{safePricing.totalExtraGuestCost.toLocaleString()}</span>
                    </div>
                )}

                <div className="flex justify-between text-green-600">
                    <span>Taxes & Fees</span>
                    <span className="font-medium italic">Included</span>
                </div>

                <div className="my-3 border-t border-dashed border-gray-300"></div>

                <div className="flex justify-between items-end mb-1">
                    <span className="font-bold text-base text-gray-900">Total Amount</span>
                    <span className="font-bold text-xl text-gray-900">₹{safePricing.totalPrice.toLocaleString()}</span>
                </div>

                <p className="text-[10px] text-gray-500 text-right">Includes all taxes</p>
            </div>

            <button className="mt-4 w-full py-3 rounded-xl font-bold text-base bg-red-500 hover:bg-red-600 text-white shadow-lg hover:shadow-xl hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 group">
                <span>Pay ₹{safePricing.totalPrice.toLocaleString()}</span>
            </button>

            <div className="mt-4 flex items-center justify-center gap-2 text-xs text-gray-500">
                <ShieldCheck size={14} className="text-green-600" />
                <span>Safe & Secure Payment</span>
            </div>
        </div>
    );
}
