"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Briefcase, User } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const router = useRouter();

    const { user, logout, loading } = useAuth();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { name: "Home", href: "/" },
        { name: "Destinations", href: "/destinations" },
        { name: "About Us", href: "/about" },
        { name: "Contact", href: "/contact" },
    ];

    // ⛔ Prevent flicker while auth is loading
    if (loading) return null;

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
                    ? "bg-white shadow-md py-2"
                    : "bg-white/95 backdrop-blur-sm py-4"
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 flex items-center justify-center md:justify-between h-16">
                {/* Logo */}
                <div
                    className="cursor-pointer text-3xl font-brand"
                    onClick={() => router.push("/")}
                >
                    Kwik <span className="text-[#f8a11e]">Stayz</span>
                </div>
                {/* Desktop Nav Links */}{" "}
                <div className="hidden md:flex items-center space-x-1 bg-gray-50/50 p-1.5 rounded-full border border-gray-100">
                    {" "}
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            className="px-5 py-2 rounded-full text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-white hover:shadow-sm transition-all duration-200"
                        >
                            {" "}
                            {link.name}{" "}
                        </a>
                    ))}{" "}
                </div>
                {/* Right actions */}
                <div className="hidden md:flex items-center gap-4">
                    {user ? (
                        <>
                            <button
                                onClick={() => router.push("/my-bookings")}
                                className="flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-[#f8a11e]"
                            >
                                <Briefcase size={18} />
                                My Bookings
                            </button>

                            <div className="h-6 w-px bg-gray-200" />

                            <button
                                onClick={() => router.push("/account")}
                                className="text-sm font-medium text-gray-700 hover:text-[#f8a11e]"
                            >
                                Hi, {user.name?.split(" ")[0] || "User"}
                            </button>

                            <button
                                onClick={logout}
                                className="px-5 py-2 rounded-full bg-gray-100 text-sm font-bold hover:bg-gray-200"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <button className="flex items-center gap-2 text-sm font-semibold text-gray-600">
                                <Briefcase size={18} />
                                My Bookings
                            </button>

                            <div className="h-6 w-px bg-gray-200" />

                            <button
                                onClick={() => router.push("/auth/login")}
                                className="flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-bold bg-[#f8a11e] text-white hover:bg-[#e0901a]"
                            >
                                <User size={18} />
                                Login / Signup
                            </button>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
