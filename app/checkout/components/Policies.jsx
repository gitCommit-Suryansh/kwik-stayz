import { Info } from "lucide-react";

export default function Policies() {
    return (
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-3 flex gap-3 text-sm text-blue-800">
            <Info size={18} className="shrink-0 mt-0.5" />
            <div className="space-y-1">
                <p className="font-semibold text-xs uppercase tracking-wide">Cancellation Policy & House Rules</p>
                <p className="text-blue-700/80 text-[11px] leading-relaxed">
                    By proceeding, you agree to the hotel’s cancellation policy. Free cancellation until 24 hours before check-in. Please review the house rules before booking.
                </p>
            </div>
        </div>
    );
}
