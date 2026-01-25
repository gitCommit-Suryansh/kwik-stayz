"use client";

import React, { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Briefcase, User, LogOut } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { Outfit } from "next/font/google";

const brandFont = Outfit({ subsets: ["latin"], weight: ["700", "800"] });

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const router = useRouter();
    const pathname = usePathname();
    const { user, logout, loading } = useAuth();

    // Check if we are on the home page
    const isHome = pathname === "/";

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { name: "Home", href: "/" },
        { name: "About Us", href: "/about" },
        { name: "Contact", href: "/contact" },
    ];

    if (loading) return null;

    // Dynamic styles based on page and scroll state
    // On Home Mobile: Always White Background, Black Text
    // On Home Desktop: Transparent (text-white) -> White (text-black) on scroll
    // On Others: Always White (text-black)

    const isTransparent = isHome && !isScrolled;

    // Text Color: Black on Mobile, White on Desktop (when transparent)
    const textColorClass = isTransparent ? "text-gray-900 md:text-white" : "text-gray-900";
    const subTextColorClass = isTransparent ? "text-gray-500 md:text-gray-200" : "text-gray-500";

    const navLinkClass = isTransparent
        ? "text-white/90 hover:text-white hover:bg-white/10"
        : "text-gray-600 hover:text-gray-900 hover:bg-gray-100";
    const activeLinkClass = isTransparent
        ? "bg-white/20 text-white font-bold"
        : "bg-orange-50 text-orange-600 font-bold";

    return (
        <nav
            className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ease-in-out ${isHome
                ? (isScrolled
                    ? "bg-white/95 backdrop-blur-md py-3"
                    : "bg-white md:bg-transparent py-3 md:py-5 md:shadow-none")
                : "bg-white py-3"
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center md:justify-between">

                {/* Logo - Centered on Mobile */}
                {/* <div
                    className="cursor-pointer flex items-center gap-2 group"
                    onClick={() => router.push("/")}
                >
                    <div className="flex flex-col items-center md:items-start">
                        <span className={`text-3xl font-extrabold leading-none tracking-tight transition-colors ${textColorClass} ${brandFont.className}`}>
                            Kwik<span className="text-orange-600">Stays</span>
                        </span>
                    </div>
                    
                </div> */}

                <div className="flex-shrink-0 cursor-pointer" onClick={() => router.push('/')}>
                    <span className="text-3xl font-brand text-gray-900 tracking-wide">
                        Kwik <span className="text-[#f8a11e]">Stays</span>
                    </span>
                </div>

                {/* Desktop Nav Links */}
                <div className={`hidden md:flex items-center gap-1 p-1 rounded-full transition-all ${isTransparent ? 'bg-transparent' : 'bg-transparent'}`}>
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${pathname === link.href ? activeLinkClass : navLinkClass
                                }`}
                        >
                            {link.name}
                        </a>
                    ))}
                </div>

                {/* Right Actions - Hidden on Mobile */}
                <div className="hidden md:flex items-center gap-4">
                    {user ? (
                        <>
                            <button
                                onClick={() => router.push("/my-bookings")}
                                className={`hidden md:flex items-center gap-2 text-sm font-semibold transition-colors ${navLinkClass}`}
                            >
                                <Briefcase size={18} />
                                <span className="hidden lg:inline">My Bookings</span>
                            </button>

                            <div className={`h-6 w-px hidden md:block ${isTransparent ? 'bg-white/30' : 'bg-gray-200'}`} />

                            <div className="flex items-center gap-3 pl-1">
                                <button
                                    onClick={() => router.push("/account")}
                                    className={`flex items-center gap-2 group p-1 pr-3 rounded-full transition-all ${isTransparent ? 'hover:bg-white/10' : 'hover:bg-gray-100'}`}
                                >
                                    <span className={`text-sm font-bold transition-colors group-hover:text-orange-600 ${textColorClass}`}>
                                        Hi, {user.name?.split(" ")[0]}
                                    </span>
                                </button>

                                <button
                                    onClick={logout}
                                    title="Logout"
                                    className={`p-2 rounded-full transition-all duration-300 ${isTransparent ? 'text-white/70 hover:text-red-400 hover:bg-white/10' : 'text-gray-400 hover:text-red-500 hover:bg-red-50'}`}
                                >
                                    <LogOut size={18} />
                                </button>
                            </div>
                        </>
                    ) : (
                        <div className="flex items-center gap-3">
                            <a
                                href="/my-bookings"
                                className={`hidden md:flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-full transition-colors ${navLinkClass}`}
                            >
                                <Briefcase size={18} />
                                <span>Bookings</span>
                            </a>
                            <button
                                onClick={() => router.push("/auth/login")}
                                className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-bold shadow-lg transition-all duration-300 transform hover:scale-105 ${isTransparent
                                    ? "bg-white text-orange-600 hover:bg-gray-100" // White button on dark bg
                                    : "bg-gradient-to-r from-orange-500 to-red-600 text-white shadow-orange-200"
                                    }`}
                            >
                                <User size={18} />
                                Login
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
