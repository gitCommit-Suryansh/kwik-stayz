export default function PoliciesSection({ policies }) {
  return (
    <section className="my-8 pt-8 border-t border-gray-100">
      <h2 className="text-xl md:text-2xl font-bold mb-6 text-gray-900">
        Hotel policies
      </h2>

      {/* Check-in / Check-out Times */}
      <div className="flex flex-wrap gap-8 mb-8">
        <div className="flex flex-col gap-2">
          <span className="text-sm font-medium text-gray-600 uppercase tracking-wide">Check-in</span>
          <div className="px-5 py-2.5 bg-white border border-gray-200 rounded-lg shadow-sm">
            <span className="text-base font-bold text-gray-900">{policies?.checkIn || "12:00 PM"}</span>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-sm font-medium text-gray-600 uppercase tracking-wide">Check-out</span>
          <div className="px-5 py-2.5 bg-white border border-gray-200 rounded-lg shadow-sm">
            <span className="text-base font-bold text-gray-900">{policies?.checkOut || "11:00 AM"}</span>
          </div>
        </div>
      </div>

      {/* Policy List */}
      <ul className="space-y-3 list-disc pl-5 text-gray-700 text-sm md:text-base marker:text-gray-400">
        <li>
          {policies?.petsAllowed
            ? "Pets are welcome at this property."
            : "Pets are not allowed."}
        </li>
        <li>
          {policies?.idProofRequired
            ? "Guests can check in using any local or outstation ID proof (PAN card not accepted)."
            : "No specific ID proof requirements stated."}
        </li>
        <li>
          {policies?.coupleAllowed
            ? "Couples are welcome at this property."
            : "Couples are not allowed."}
        </li>
        {policies?.security && <li>{policies.security}</li>}
        <li>
          This hotel is serviced under the trade name of KwikStayz as per quality standards.
        </li>
      </ul>
    </section>
  );
}
