import React from "react";
import { CheckCircle, BadgePercent, Star, Headphones } from "lucide-react";

const WhyChooseUs = () => {
    const features = [
        {
            icon: CheckCircle,
            title: "Sanitised Stays",
            desc: "Thoroughly sanitized properties for your safety",
        },
        {
            icon: BadgePercent,
            title: "Best Price Guarantee",
            desc: "Find a lower price? We'll match it.",
        },
        {
            icon: Star,
            title: "Rated 4.5+",
            desc: "Thousands of happy travelers trust us",
        },
        {
            icon: Headphones,
            title: "24/7 Support",
            desc: "We are always here to help you",
        },
    ];

    return (
        <section className="py-20 bg-white border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">
                        Why Book With KwikStayz?
                    </h2>
                    <p className="text-gray-500">
                        We ensure every stay is memorable, safe, and comfortable.
                    </p>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {features.map((f, i) => (
                        <div
                            key={i}
                            className="flex flex-col items-center text-center p-6 rounded-2xl bg-gray-50 hover:bg-white hover:shadow-xl transition-all duration-300 border border-transparent hover:border-gray-100 group"
                        >
                            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-[#f8a11e] mb-6 shadow-sm group-hover:scale-110 transition-transform duration-300 border border-gray-100">
                                <f.icon size={28} />
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 mb-2">
                                {f.title}
                            </h3>
                            <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WhyChooseUs;
