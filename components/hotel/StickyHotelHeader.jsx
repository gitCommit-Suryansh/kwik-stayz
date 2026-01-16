"use client";
import React, { useState, useEffect } from "react";
import { ArrowLeft, Share2, Heart } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function StickyHotelHeader({ title, hotelId }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, setUser } = useAuth();
  const router = useRouter();
  const [isLiked, setIsLiked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 240);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Sync wishlist state from user context
  useEffect(() => {
    if (user && user.wishlist && hotelId) {
      setIsLiked(user.wishlist.includes(hotelId));
    } else {
      setIsLiked(false);
    }
  }, [user, hotelId]);

  const toggleWishlist = async () => {
    if (!user) {
      router.push("/auth/login");
      return;
    }

    if (isLoading) return;
    setIsLoading(true);

    // Optimistic update
    const previousState = isLiked;
    setIsLiked(!previousState);

    try {
      const res = await fetch("/api/user/wishlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ hotelId }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to toggle wishlist");

      if (data.wishlist) {
        setUser((prev) => ({ ...prev, wishlist: data.wishlist }));
      }
    } catch (error) {
      console.error("Wishlist error:", error);
      setIsLiked(previousState); // Revert on error
    } finally {
      setIsLoading(false);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          url: window.location.href,
        });
      } catch (err) {
        console.error("Share failed:", err);
      }
    } else {
      try {
        await navigator.clipboard.writeText(window.location.href);
        alert("Link copied to clipboard!");
      } catch (err) {
        console.error("Copy failed:", err);
      }
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out px-4 py-3 flex items-center justify-between ${isScrolled
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
        className={`absolute left-1/2 transform -translate-x-1/2 font-bold text-lg truncate max-w-[50%] transition-opacity duration-300 ${isScrolled ? "opacity-100" : "opacity-0"
          }`}
      >
        {title}
      </div>
      <div className="flex gap-3">
        <button
          onClick={toggleWishlist}
          className={`p-2 rounded-full transition-colors ${isScrolled ? 'hover:bg-gray-100' : 'hover:bg-white/20'}`}
        >
          <Heart size={24} className={isLiked ? "fill-red-500 text-red-500" : ""} />
        </button>
        <button
          onClick={handleShare}
          className={`p-2 rounded-full transition-colors ${isScrolled ? 'hover:bg-gray-100' : 'hover:bg-white/20'}`}
        >
          <Share2 size={24} />
        </button>
      </div>
    </header>
  );
}

