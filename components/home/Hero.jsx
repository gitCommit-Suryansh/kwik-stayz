import React from "react";
import { Star } from "lucide-react";

const Hero = () => {
    return (
        <div className="hidden md:block relative h-[550px] lg:h-[650px] overflow-hidden">
            {/* Immersive Background */}
            <div className="absolute inset-0">
                <img
                    src="https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=2076&auto=format&fit=crop"
                    alt="Hero Background"
                    className="w-full h-full object-cover"
                />
                {/* Premium Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10"></div>
            </div>

            {/* Content */}
            <div className="relative z-10 h-full flex flex-col justify-center items-center text-center max-w-5xl mx-auto px-4 -mt-10">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm font-medium mb-6 animate-fade-in-up">
                    <Star size={14} className="text-[#f8a11e] fill-current" />
                    <span>Trusted by 1M+ Travelers</span>
                </div>
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-tight mb-6 drop-shadow-lg">
                    Find Your Perfect <br />
                    <span className="text-transparent bg-clip-text bg-linear-to-r from-[#f8a11e] to-[#ffc45e]">
                        Staycation
                    </span>{" "}
                    Today
                </h1>
                <p className="text-lg md:text-xl text-gray-200 max-w-2xl font-light mb-10 leading-relaxed">
                    Discover handpicked hotels, resorts, and homestays across India's most
                    beautiful destinations.
                </p>
            </div>
        </div>
    );
};

export default Hero;
