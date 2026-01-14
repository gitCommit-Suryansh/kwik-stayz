export async function fetchHomeCities() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/home-cities`,
    {
      next: {
        revalidate: 86400,
        tags: ["home-cities"],
      },
    }
  );

  if (!res.ok) return [];
  return res.json();
}
