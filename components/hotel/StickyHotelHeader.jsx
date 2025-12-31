"use client";
import React, { useState, useEffect } from "react";
import { ArrowLeft, Share2, Heart } from "lucide-react";

export default function StickyHotelHeader({ title }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 240);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out px-4 py-3 flex items-center justify-between ${
        isScrolled
          ? "bg-white text-gray-900 shadow-md"
          : "bg-gradient-to-b from-black/60 to-transparent text-white"
      }`}
    >
      <button 
        onClick={() => window.history.back()} 
        className={`p-2 rounded-full transition-colors ${isScrolled ? 'hover:bg-gray-100' : 'hover:bg-white/20'}`}
      >
        <ArrowLeft size={24} />
      </button>
      <div
        className={`absolute left-1/2 transform -translate-x-1/2 font-bold text-lg truncate max-w-[50%] transition-opacity duration-300 ${
          isScrolled ? "opacity-100" : "opacity-0"
        }`}
      >
        {title}
      </div>
      <div className="flex gap-3">
        <button 
           onClick={() => setIsLiked(!isLiked)}
           className={`p-2 rounded-full transition-colors ${isScrolled ? 'hover:bg-gray-100' : 'hover:bg-white/20'}`}
        >
          <Heart size={24} className={isLiked ? "fill-red-500 text-red-500" : ""} />
        </button>
        <button 
           className={`p-2 rounded-full transition-colors ${isScrolled ? 'hover:bg-gray-100' : 'hover:bg-white/20'}`}
        >
          <Share2 size={24} />
        </button>
      </div>
    </header>
  );
}

