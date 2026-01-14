import React from "react";
import Navbar from "@/components/home/Navbar";
import BottomNav from "@/components/home/BottomNav";
import Hero from "@/components/home/Hero";
import CityDestinations from "@/components/home/CityDestinations";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import Recommendations from "@/components/home/Recommendations";
import Footer from "@/components/home/Footer";
import HomeSearchSection from "@/components/home/HomeSearchSection";
import { fetchHomeCities } from "@/lib/Home";

// export const dynamic = "force-dynamic"; // Ensure fresh data if needed, or remove for static generation

export default async function App() {
  // Server-side data fetching
  const data = await fetchHomeCities();
  let cities = [];
  if (data) {
    cities = data
      .filter((item) => item.isActive)
      .sort((a, b) => a.order - b.order)
      .slice(0, 10);
  }

  return (
    <div className="font-sans">
      <Navbar />
      <main className="md:pt-10 pb-16 md:pb-0 bg-white">
        <HomeSearchSection>
          <Hero />
        </HomeSearchSection>

        <CityDestinations cities={cities} />
        <WhyChooseUs />
        <Recommendations />
      </main>
      <Footer />
      <BottomNav />
    </div>
  );
}
