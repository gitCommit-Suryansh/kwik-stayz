// lib/seo/localitySeo.js

export function getLocalitySeoContent({ city, locality }) {
  return {
    intro: `Hotels in ${locality.name}, ${city.name} offer comfortable stays for business travelers, couples, and tourists. This area is well-connected to major parts of ${city.name} and is known for its restaurants, offices, and vibrant surroundings.`,

    footer: `${locality.name} is one of the most preferred localities to stay in ${city.name}. Travelers choose hotels here for easy connectivity, safety, and a wide range of budget and premium accommodation options. Book hotels in ${locality.name}, ${city.name} at the best prices with trusted reviews and hassle-free stays.`,
  };
}
