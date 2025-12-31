// lib/seo/citySeo.js

export function getCitySeoContent(city, localities = []) {
    const localityNames = localities
      .slice(0, 5)
      .map(l => l.name)
      .join(", ");
  
    return {
      h1: `Hotels in ${city.name}`,
  
    intro: `Hotels in ${city.name} offer a wide range of stays for business travelers, couples, families, and long-term guests. From budget-friendly rooms to premium hotels, ${city.name} has options to suit every travel need.`,
  
      why: `${city.name} is a popular destination offering excellent connectivity, food hubs, shopping areas, and comfortable stays for travelers.`,
  
    footer: `${city.name} is one of India’s most visited destinations. Popular areas such as ${localityNames} are well connected and preferred by travelers for comfort and convenience. Book hotels in ${city.name} at the best prices with verified reviews and trusted stays.`,
    };
  }
  