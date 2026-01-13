export const fetchHomeCities = async () => {
  try {
    const res = await fetch("/api/home-cities", {
      next: {
        revalidate: 86400,
        tags: ["home-cities"],
      },
    });

    if (!res.ok) return [];

    return res.json();
  } catch (err) {
    console.error("Failed to fetch cities:", err);
    return [];
  }
};
