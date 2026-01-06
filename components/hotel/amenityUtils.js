import {
  Utensils,
  Wind,
  Tv,
  Wifi,
  ChefHat, // Kitchen usually relates to cooking
  BedDouble,
  Zap,
  Droplets, // Geyser replacement (water)
  ArrowUpFromLine, // Elevator
  CreditCard,
  Cctv,
  Martini, // Bar
  Stethoscope, // Doctor
  ConciergeBell, // Reception
  ShieldCheck,
  Clock, // 24/7
  Briefcase, // Luggage
  Coffee, // Kettle
  Sparkles, // Housekeeping
  Flame, // Fire
  BriefcaseMedical, // First aid replacement
  Bath, // Bathroom - Lucide doesn't have 'AttachedBathroom', verify 'Bath' existence
  Cigarette, // Smoking
  Car,
  CircleHelp, // Default
} from "lucide-react";

export const getAmenityIcon = (name) => {
  // Normalize key for loose matching
  const key = name.toLowerCase().trim();

  switch (true) {
    case key.includes("breakfast"):
    case key.includes("buffet"):
      return Utensils;

    case key.includes("ac"):
    case key.includes("air condition"):
      return Wind;

    case key.includes("tv"):
    case key.includes("television"):
      return Tv;

    case key.includes("wifi"):
    case key.includes("wi-fi"):
    case key.includes("internet"):
      return Wifi;

    case key.includes("kitchen"):
    case key.includes("cook"):
      return ChefHat;

    case key.includes("bed"):
    case key.includes("queen"):
    case key.includes("king"):
      return BedDouble;

    case key.includes("power"):
    case key.includes("backup"):
      return Zap;

    case key.includes("geyser"):
    case key.includes("water heater"):
      return Droplets;

    case key.includes("elevator"):
    case key.includes("lift"):
      return ArrowUpFromLine;

    case key.includes("restaurant"):
    case key.includes("dining"):
      return Utensils;

    case key.includes("card"):
    case key.includes("payment"):
      return CreditCard;

    case key.includes("cctv"):
    case key.includes("camera"):
      return Cctv;

    case key.includes("bar"):
    case key.includes("alcohol"):
      return Martini;

    case key.includes("doctor"):
    case key.includes("medical"):
      return Stethoscope;

    case key.includes("reception"):
    case key.includes("front desk"):
      return ConciergeBell;

    case key.includes("security"):
    case key.includes("guard"):
      return ShieldCheck;

    case key.includes("24/7"):
    case key.includes("check-in"):
      return Clock;

    case key.includes("luggage"):
    case key.includes("baggage"):
      return Briefcase;

    case key.includes("kettle"):
    case key.includes("tea"):
    case key.includes("coffee"):
      return Coffee;

    case key.includes("housekeeping"):
    case key.includes("clean"):
      return Sparkles;

    case key.includes("fire"):
    case key.includes("extinguisher"):
      return Flame;

    case key.includes("first-aid"):
    case key.includes("aid"):
      return BriefcaseMedical;

    case key.includes("bath"):
    case key.includes("toilet"):
      return Bath; // Note: 'Bath' might be 'BathTub' check imports

    case key.includes("smoking"):
    case key.includes("cigarette"):
      return Cigarette;

    case key.includes("parking"):
      return Car;

    default:
      return CircleHelp;
  }
};
