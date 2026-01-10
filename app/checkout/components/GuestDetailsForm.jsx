export default function GuestDetailsForm({ initialValues }) {
    const { fullName = "", mobile = "", email = "" } = initialValues || {};

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
            <h2 className="text-base font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span className="bg-red-100 text-red-700 w-5 h-5 rounded-full flex items-center justify-center text-[10px]">1</span>
                Guest Details
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-700 uppercase tracking-wide">Full Name</label>
                    <input
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-1 focus:ring-red-500 focus:border-red-500 outline-none transition-all placeholder:text-gray-400"
                        placeholder="John Doe"
                        defaultValue={fullName}
                    />
                </div>

                <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-700 uppercase tracking-wide">Phone Number</label>
                    <div className="flex rounded-lg shadow-sm">
                        <span className="inline-flex items-center px-3 py-2 rounded-l-lg border border-r-0 border-gray-300 bg-gray-50 text-gray-500 font-medium text-sm">
                            +91
                        </span>
                        <input
                            type="tel"
                            className="flex-1 min-w-0 block w-full px-3 py-2 bg-white border border-gray-300 rounded-r-lg text-gray-900 text-sm focus:ring-1 focus:ring-red-500 focus:border-red-500 outline-none transition-all placeholder:text-gray-400"
                            placeholder="98765 43210"
                            defaultValue={mobile}
                        />
                    </div>
                </div>

                <div className="space-y-1 md:col-span-2">
                    <label className="text-[10px] font-bold text-gray-700 uppercase tracking-wide">Email Address</label>
                    <input
                        type="email"
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-1 focus:ring-red-500 focus:border-red-500 outline-none transition-all placeholder:text-gray-400"
                        placeholder="john.doe@example.com"
                        defaultValue={email}
                    />
                    <p className="text-[10px] text-gray-500">Your booking confirmation will be sent here.</p>
                </div>
            </div>
        </div>
    );
}
